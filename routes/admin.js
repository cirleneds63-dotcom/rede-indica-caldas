const express = require('express');
const User = require('../models/User');
const Profissional = require('../models/Profissional');
const Indicacao = require('../models/Indicacao');
const { auth } = require('./auth');
const router = express.Router();

// Middleware para verificar se é admin
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.userType !== 'admin') {
      return res.status(403).json({ erro: 'Apenas administradores podem acessar' });
    }
    next();
  });
};

// Listar profissionais pendentes de aprovação
router.get('/pendentes', adminAuth, async (req, res) => {
  try {
    const pendentes = await Profissional.find({ status: 'pendente' })
      .populate('usuarioId', 'nome email');

    res.json(pendentes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Aprovar profissional
router.patch('/profissional/:id/aprovar', adminAuth, async (req, res) => {
  try {
    const profissional = await Profissional.findByIdAndUpdate(
      req.params.id,
      { status: 'aprovado' },
      { new: true }
    ).populate('usuarioId', 'nome email');

    // Ativar usuário
    await User.findByIdAndUpdate(profissional.usuarioId._id, { ativo: true });

    res.json({ 
      mensagem: 'Profissional aprovado com sucesso!',
      profissional 
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rejeitar profissional
router.patch('/profissional/:id/rejeitar', adminAuth, async (req, res) => {
  try {
    const profissional = await Profissional.findByIdAndUpdate(
      req.params.id,
      { status: 'rejeitado' },
      { new: true }
    ).populate('usuarioId', 'nome email');

    res.json({ 
      mensagem: 'Profissional rejeitado',
      profissional 
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Listar todas as indicações
router.get('/indicacoes', adminAuth, async (req, res) => {
  try {
    const indicacoes = await Indicacao.find()
      .populate('quemIndicou', 'empresa profissao whatsapp')
      .populate('paraQuem', 'empresa profissao whatsapp')
      .sort({ dataIndicacao: -1 });

    res.json(indicacoes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Relatorio de comissões
router.get('/relatorio/comissoes', adminAuth, async (req, res) => {
  try {
    const indicacoes = await Indicacao.find({ status: 'concluído' })
      .populate('quemIndicou', 'empresa profissao');

    const relatorio = {};
    const totalGeral = {
      indicacoes: 0,
      valorTotal: 0,
      comissoesTotal: 0
    };

    indicacoes.forEach(ind => {
      const empresa = ind.quemIndicou.empresa;
      if (!relatorio[empresa]) {
        relatorio[empresa] = {
          empresa,
          profissao: ind.quemIndicou.profissao,
          indicacoes: 0,
          valorTotal: 0,
          comissoesTotal: 0,
          percentualMedio: 0
        };
      }
      relatorio[empresa].indicacoes += 1;
      relatorio[empresa].valorTotal += ind.valorNegocio || 0;
      relatorio[empresa].comissoesTotal += ind.valorComissao || 0;
      
      totalGeral.indicacoes += 1;
      totalGeral.valorTotal += ind.valorNegocio || 0;
      totalGeral.comissoesTotal += ind.valorComissao || 0;
    });

    // Calcular percentual médio
    Object.keys(relatorio).forEach(empresa => {
      if (relatorio[empresa].valorTotal > 0) {
        relatorio[empresa].percentualMedio = 
          (relatorio[empresa].comissoesTotal / relatorio[empresa].valorTotal * 100).toFixed(2);
      }
    });

    res.json({
      relatorio: Object.values(relatorio),
      totalGeral: {
        ...totalGeral,
        percentualMedio: totalGeral.valorTotal > 0 
          ? (totalGeral.comissoesTotal / totalGeral.valorTotal * 100).toFixed(2)
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Relatorio de profissionais
router.get('/relatorio/profissionais', adminAuth, async (req, res) => {
  try {
    const profissionais = await Profissional.find()
      .populate('usuarioId', 'nome email')
      .select('-endereco.cep');

    const totalPorStatus = {
      total: profissionais.length,
      aprovados: profissionais.filter(p => p.status === 'aprovado').length,
      pendentes: profissionais.filter(p => p.status === 'pendente').length,
      rejeitados: profissionais.filter(p => p.status === 'rejeitado').length
    };

    res.json({
      profissionais,
      resumo: totalPorStatus
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Estatísticas gerais
router.get('/estatisticas', adminAuth, async (req, res) => {
  try {
    const totalUsuarios = await User.countDocuments();
    const totalProfissionais = await Profissional.countDocuments();
    const totalIndicacoes = await Indicacao.countDocuments();
    const indicacoesConcluidas = await Indicacao.countDocuments({ status: 'concluído' });
    
    const comissoesTotal = await Indicacao.aggregate([
      { $match: { status: 'concluído' } },
      { $group: { _id: null, total: { $sum: '$valorComissao' } } }
    ]);

    const negociosTotal = await Indicacao.aggregate([
      { $match: { status: 'concluído' } },
      { $group: { _id: null, total: { $sum: '$valorNegocio' } } }
    ]);

    res.json({
      totalUsuarios,
      totalProfissionais,
      totalIndicacoes,
      indicacoesConcluidas,
      comissoesTotal: comissoesTotal[0]?.total || 0,
      negociosTotal: negociosTotal[0]?.total || 0,
      taxaMedio: totalIndicacoes > 0 
        ? ((comissoesTotal[0]?.total || 0) / (negociosTotal[0]?.total || 1) * 100).toFixed(2)
        : 0
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

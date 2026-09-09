const express = require('express');
const User = require('../models/User');
const Profissional = require('../models/Profissional');
const Indicacao = require('../models/Indicacao');
const router = express.Router();

// Listar profissionais pendentes de aprovação
router.get('/pendentes', async (req, res) => {
  try {
    const pendentes = await Profissional.find({ status: 'pendente' })
      .populate('usuarioId', 'nome email');

    res.json(pendentes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Aprovar profissional
router.patch('/profissional/:id/aprovar', async (req, res) => {
  try {
    const profissional = await Profissional.findByIdAndUpdate(
      req.params.id,
      { status: 'aprovado' },
      { new: true }
    );

    // Ativar usuário
    await User.findByIdAndUpdate(profissional.usuarioId, { ativo: true });

    res.json({ mensagem: 'Profissional aprovado', profissional });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rejeitar profissional
router.patch('/profissional/:id/rejeitar', async (req, res) => {
  try {
    const profissional = await Profissional.findByIdAndUpdate(
      req.params.id,
      { status: 'rejeitado' },
      { new: true }
    );

    res.json({ mensagem: 'Profissional rejeitado', profissional });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Relatório de comissões
router.get('/relatorio/comissoes', async (req, res) => {
  try {
    const indicacoes = await Indicacao.find({ status: 'concluído' })
      .populate('quemIndicou', 'empresa profissao');

    const relatorio = {};
    indicacoes.forEach(ind => {
      const profissional = ind.quemIndicou.empresa;
      if (!relatorio[profissional]) {
        relatorio[profissional] = { total: 0, indicacoes: 0 };
      }
      relatorio[profissional].total += ind.valorComissao || 0;
      relatorio[profissional].indicacoes += 1;
    });

    res.json(relatorio);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

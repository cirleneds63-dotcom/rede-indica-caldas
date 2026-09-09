const express = require('express');
const Profissional = require('../models/Profissional');
const router = express.Router();

// Listar profissionais por profissão (público)
router.get('/buscar', async (req, res) => {
  try {
    const { profissao, cidade } = req.query;
    const filtro = { status: 'aprovado' };

    if (profissao) {
      filtro.profissao = { $regex: profissao, $options: 'i' };
    }

    if (cidade) {
      filtro['endereco.cidade'] = { $regex: cidade, $options: 'i' };
    }

    const profissionais = await Profissional.find(filtro)
      .select('-endereco.cep')
      .populate('usuarioId', 'nome email');

    res.json(profissionais);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Obter perfil completo de um profissional
router.get('/:id', async (req, res) => {
  try {
    const profissional = await Profissional.findById(req.params.id)
      .populate('usuarioId', 'nome email');

    if (!profissional) {
      return res.status(404).json({ erro: 'Profissional não encontrado' });
    }

    res.json(profissional);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Criar/atualizar perfil profissional (requer autenticação)
router.post('/criar', async (req, res) => {
  try {
    const { usuarioId, profissao, empresa, whatsapp, endereco, servicos, percentualComissao } = req.body;

    const profissionalExistente = await Profissional.findOne({ usuarioId });
    
    if (profissionalExistente) {
      // Atualizar
      Object.assign(profissionalExistente, req.body);
      await profissionalExistente.save();
      return res.json({ mensagem: 'Perfil atualizado', profissional: profissionalExistente });
    }

    // Criar novo
    const novoProfissional = new Profissional(req.body);
    await novoProfissional.save();

    res.status(201).json({ mensagem: 'Perfil criado com sucesso', profissional: novoProfissional });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

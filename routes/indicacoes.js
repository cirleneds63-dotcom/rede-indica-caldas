const express = require('express');
const Indicacao = require('../models/Indicacao');
const router = express.Router();

// Criar indicação
router.post('/criar', async (req, res) => {
  try {
    const { quemIndicou, paraQuem, nomeCliente, telefoneCliente, emailCliente, descricaoServico } = req.body;

    const novaIndicacao = new Indicacao({
      quemIndicou,
      paraQuem,
      nomeCliente,
      telefoneCliente,
      emailCliente,
      descricaoServico
    });

    await novaIndicacao.save();

    res.status(201).json({ mensagem: 'Indicação registrada', indicacao: novaIndicacao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Obter indicações de um profissional
router.get('/profissional/:profissionalId', async (req, res) => {
  try {
    const indicacoes = await Indicacao.find({
      $or: [
        { quemIndicou: req.params.profissionalId },
        { paraQuem: req.params.profissionalId }
      ]
    })
      .populate('quemIndicou', 'empresa profissao')
      .populate('paraQuem', 'empresa profissao')
      .sort({ dataIndicacao: -1 });

    res.json(indicacoes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Atualizar status da indicação
router.patch('/:id', async (req, res) => {
  try {
    const { status, valorNegocio } = req.body;
    const indicacao = await Indicacao.findByIdAndUpdate(
      req.params.id,
      { status, valorNegocio, dataConclusao: new Date() },
      { new: true }
    );

    res.json({ mensagem: 'Indicação atualizada', indicacao });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

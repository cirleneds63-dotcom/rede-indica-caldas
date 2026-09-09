const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Dados obrigatórios faltando' });
    }

    // Verificar se usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    // Criar novo usuário
    const novoUsuario = new User({
      nome,
      email,
      senha,
      tipo: tipo || 'profissional'
    });

    await novoUsuario.save();

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuarioId: novoUsuario._id
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha obrigatórios' });
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    if (!usuario.ativo) {
      return res.status(403).json({ erro: 'Usuário não aprovado ainda' });
    }

    const token = jwt.sign(
      { userId: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'chave_segura',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;

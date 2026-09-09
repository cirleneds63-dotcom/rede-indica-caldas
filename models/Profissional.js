const mongoose = require('mongoose');

const profissionalSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profissao: {
    type: String,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  servicos: [{
    descricao: String,
    valor: Number
  }],
  fotos: [String],
  percentualComissao: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  descricao: String,
  biografia: String,
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'rejeitado'],
    default: 'pendente'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profissional', profissionalSchema);

const mongoose = require('mongoose');

const ProfissionalSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profissao: {
    type: String,
    required: [true, 'Profissão é obrigatória'],
    trim: true
  },
  empresa: {
    type: String,
    required: [true, 'Empresa é obrigatória'],
    trim: true
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp é obrigatório'],
    match: [/^\(\d{2}\)\s?\d{4,5}-\d{4}$|^\d{10,11}$/, 'WhatsApp inválido']
  },
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: { type: String, default: 'Caldas Novas' },
    estado: { type: String, default: 'GO' },
    cep: String
  },
  servicos: [{
    type: String
  }],
  percentualComissao: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  descricao: String,
  fotos: [String],
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

module.exports = mongoose.model('Profissional', ProfissionalSchema);

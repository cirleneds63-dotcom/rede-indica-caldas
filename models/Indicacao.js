const mongoose = require('mongoose');

const indicacaoSchema = new mongoose.Schema({
  quemIndicou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profissional',
    required: true
  },
  paraQuem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profissional',
    required: true
  },
  nomeCliente: {
    type: String,
    required: true
  },
  telefoneCliente: String,
  emailCliente: String,
  descricaoServico: String,
  dataIndicacao: {
    type: Date,
    default: Date.now
  },
  valorNegocio: {
    type: Number,
    default: 0
  },
  percentualComissao: {
    type: Number,
    default: 0
  },
  valorComissao: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'concluído', 'cancelado'],
    default: 'pendente'
  },
  dataConclusao: Date,
  notas: String,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Middleware para calcular comissão
indicacaoSchema.pre('save', function(next) {
  if (this.valorNegocio && this.percentualComissao) {
    this.valorComissao = (this.valorNegocio * this.percentualComissao) / 100;
  }
  next();
});

module.exports = mongoose.model('Indicacao', indicacaoSchema);

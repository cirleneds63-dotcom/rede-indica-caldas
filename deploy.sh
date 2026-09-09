#!/bin/bash

# Script de Deploy Automático para Vercel
# Use: bash deploy.sh

echo "🚀 Iniciando Deploy na Vercel..."

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
  echo "📦 Instalando Vercel CLI..."
  npm install -g vercel
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Fazer seed do banco
echo "🌱 Populando banco de dados..."
npm run seed

# Deploy
echo "🚀 Fazendo deploy na Vercel..."
vercel --prod

echo "✅ Deploy concluído!"
echo "📱 Copie o link acima e compartilhe no WhatsApp!"

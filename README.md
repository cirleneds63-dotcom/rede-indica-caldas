# Rede Indica Caldas

Sistema de indicações e comissões para profissionais e comércios em Caldas.

## Funcionalidades

### Público
- 🔍 Buscar profissionais por profissão e cidade
- 👤 Visualizar perfil completo de profissionais
- 📞 Entrar em contato via WhatsApp

### Profissional
- 📝 Cadastrar e gerenciar perfil profissional
- 💼 Indicar clientes para outros profissionais
- 📊 Acompanhar indicações realizadas
- 💰 Controlar comissões recebidas
- ⭐ Ofertar percentual de comissão

### Administrador
- ✅ Aprovar/rejeitar cadastros de profissionais
- 📈 Acompanhar todas as indicações
- 💵 Gerar relatórios de comissões
- 👥 Gerenciar profissionais

## Tecnologia

- **Backend:** Node.js + Express
- **Banco de Dados:** MongoDB
- **Frontend:** HTML5, CSS3, JavaScript Vanilla
- **Autenticação:** JWT
- **Segurança:** bcryptjs para hash de senhas

## Instalação

### Pré-requisitos
- Node.js (v14+)
- MongoDB

### Passos

1. Clone o repositório
```bash
git clone https://github.com/cirleneds63-dotcom/rede-indica-caldas.git
cd rede-indica-caldas
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Inicie o servidor
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## Estrutura do Projeto

```
rede-indica-caldas/
├── models/              # Modelos MongoDB
│   ├── User.js
│   ├── Profissional.js
│   └── Indicacao.js
├── routes/              # Rotas da API
│   ├── auth.js
│   ├── profissionais.js
│   ├── indicacoes.js
│   └── admin.js
├── public/              # Frontend
│   └── index.html
├── server.js            # Arquivo principal
├── package.json
└── README.md
```

## API Endpoints

### Autenticação
- `POST /api/auth/registro` - Registrar novo usuário
- `POST /api/auth/login` - Login

### Profissionais
- `GET /api/profissionais/buscar?profissao=X&cidade=Y` - Buscar profissionais
- `GET /api/profissionais/:id` - Obter perfil completo
- `POST /api/profissionais/criar` - Criar/atualizar perfil

### Indicações
- `POST /api/indicacoes/criar` - Registrar indicação
- `GET /api/indicacoes/profissional/:id` - Obter indicações
- `PATCH /api/indicacoes/:id` - Atualizar indicação

### Admin
- `GET /api/admin/pendentes` - Listar profissionais pendentes
- `PATCH /api/admin/profissional/:id/aprovar` - Aprovar profissional
- `PATCH /api/admin/profissional/:id/rejeitar` - Rejeitar profissional
- `GET /api/admin/relatorio/comissoes` - Relatório de comissões

## Contribuindo

Pull requests são bem-vindas!

## Licença

MIT

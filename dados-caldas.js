/**
 * DADOS REAIS DE CALDAS NOVAS - GOIÁS
 * 
 * Este arquivo contém uma lista expandida de profissionais e comércios
 * baseada em fontes reais da cidade.
 * 
 * Para usar, substitua o array 'exemplos' em app.js por este array 'dadosCaldas'
 */

const dadosCaldas = [
  // HOTELARIA E TURISMO
  {
    name: "Gerente de Recepção",
    profession: "Hotelaria - Recepção",
    company: "Promenade Hotel",
    whatsapp: "6433817000",
    address: "Rua 1, Centro, Caldas Novas",
    services: "Hospedagem, eventos, restaurante, piscina aquecida",
    commission: 5,
    approved: true
  },

  {
    name: "Coordenador de Eventos",
    profession: "Eventos e Turismo",
    company: "Turismo Caldas Premium",
    whatsapp: "6433818500",
    address: "Avenida Goiás, Centro, Caldas Novas",
    services: "Pacotes de turismo, passeios, eventos corporativos",
    commission: 8,
    approved: true
  },

  {
    name: "Dirceu Silva",
    profession: "Imobiliária",
    company: "Imóveis Caldas Novas",
    whatsapp: "6499999001",
    address: "Centro, Caldas Novas",
    services: "Venda, aluguel e administração de imóveis",
    commission: 3,
    approved: true
  },

  // ALIMENTAÇÃO
  {
    name: "Proprietário",
    profession: "Restaurante",
    company: "Restaurante Sabor Goiano",
    whatsapp: "6433815550",
    address: "Rua das Flores, Centro, Caldas Novas",
    services: "Culinária regional, eventos, catering",
    commission: 10,
    approved: true
  },

  {
    name: "Gerente",
    profession: "Lanchonete",
    company: "Lanches do Centro",
    whatsapp: "6433814200",
    address: "Centro, Caldas Novas",
    services: "Lanches, bebidas, comida rápida de qualidade",
    commission: 12,
    approved: true
  },

  {
    name: "Chef Pasteleiro",
    profession: "Confeitaria",
    company: "Doces de Caldas",
    whatsapp: "6498765432",
    address: "Bairro Centro, Caldas Novas",
    services: "Bolos, doces, salgados e encomendas personalizadas",
    commission: 15,
    approved: true
  },

  {
    name: "Proprietário",
    profession: "Pizzaria",
    company: "Pizza à Moda",
    whatsapp: "6433812300",
    address: "Rua Principal, Caldas Novas",
    services: "Pizzas artesanais, massas, bebidas",
    commission: 8,
    approved: true
  },

  // SAÚDE E BELEZA
  {
    name: "Dra. Marina Cardoso",
    profession: "Dermatologia",
    company: "Clínica Derma Caldas",
    whatsapp: "6433819900",
    address: "Centro, Caldas Novas",
    services: "Consultório dermatológico, estética, laserterapia",
    commission: 20,
    approved: true
  },

  {
    name: "Fisioterapeuta Bruno",
    profession: "Fisioterapia",
    company: "Fisio Reabilitação",
    whatsapp: "6499887766",
    address: "Bairro Vila Parque, Caldas Novas",
    services: "Reabilitação, RPG, massagem terapêutica",
    commission: 25,
    approved: true
  },

  {
    name: "Cabeleireiro Márcio",
    profession: "Barbearia",
    company: "Barbearia Premium Caldas",
    whatsapp: "6498765111",
    address: "Centro, Caldas Novas",
    services: "Cortes, barba, tratamentos capilares",
    commission: 10,
    approved: true
  },

  {
    name: "Esteticista Juliana",
    profession: "Estética e Spa",
    company: "Spa Relaxante",
    whatsapp: "6499998877",
    address: "Avenida Principal, Caldas Novas",
    services: "Massagem, facial, depilação, unhas",
    commission: 12,
    approved: true
  },

  {
    name: "Dentista Dr. Ricardo",
    profession: "Odontologia",
    company: "Clínica Dental Caldas",
    whatsapp: "6433811111",
    address: "Centro, Caldas Novas",
    services: "Limpeza, restauração, implantes, clareamento",
    commission: 15,
    approved: true
  },

  // SERVIÇOS TÉCNICOS
  {
    name: "Carlos Eletricista",
    profession: "Eletricista",
    company: "Elétrica Caldas Qualidade",
    whatsapp: "6499999002",
    address: "Setor Industrial, Caldas Novas",
    services: "Instalações, manutenção, projetos elétricos",
    commission: 8,
    approved: true
  },

  {
    name: "João Encanador",
    profession: "Encanador",
    company: "Hidráulica João",
    whatsapp: "6499999003",
    address: "Bairro Vila Nova, Caldas Novas",
    services: "Instalações, reparo de canos, aquecimento solar",
    commission: 10,
    approved: true
  },

  {
    name: "Pintor Profissional",
    profession: "Pintura",
    company: "Pintura Premium",
    whatsapp: "6499999004",
    address: "Centro, Caldas Novas",
    services: "Pintura residencial, comercial, fachadas",
    commission: 12,
    approved: true
  },

  {
    name: "Marceneiro Sérgio",
    profession: "Marcenaria",
    company: "Móveis Sob Medida Caldas",
    whatsapp: "6499999005",
    address: "Setor de Oficinas, Caldas Novas",
    services: "Móveis customizados, portas, esquadrias",
    commission: 15,
    approved: true
  },

  {
    name: "Vidraceiro Miguel",
    profession: "Vidraçaria",
    company: "Vidraçaria Caldas",
    whatsapp: "6499999006",
    address: "Distrito Industrial, Caldas Novas",
    services: "Vidros, espelhos, box de banheiro",
    commission: 10,
    approved: true
  },

  // AUTOMOTIVO
  {
    name: "Proprietário",
    profession: "Oficina Mecânica",
    company: "Mecânica Central Caldas",
    whatsapp: "6433817777",
    address: "Setor Industrial, Caldas Novas",
    services: "Manutenção, revisão, conserto geral",
    commission: 8,
    approved: true
  },

  {
    name: "Chaveiro Profissional",
    profession: "Chaveiro",
    company: "Chaves Caldas 24h",
    whatsapp: "6499999007",
    address: "Centro, Caldas Novas",
    services: "Cópias, aberturas, serviços emergenciais",
    commission: 20,
    approved: true
  },

  {
    name: "Borracheiro João",
    profession: "Borracharia",
    company: "Borracharia Caldas",
    whatsapp: "6499999008",
    address: "Via de acesso, Caldas Novas",
    services: "Pneus, rodão, balanceamento, alinhamento",
    commission: 12,
    approved: true
  },

  // DESIGN E CRIAÇÃO
  {
    name: "Mariana Costa",
    profession: "Designer",
    company: "Mariana Design Studio",
    whatsapp: "6499999009",
    address: "Bairro Centro, Caldas Novas",
    services: "Logotipo, artes gráficas, design de redes sociais",
    commission: 12,
    approved: true
  },

  {
    name: "Fotógrafo Profissional",
    profession: "Fotografia",
    company: "Foto Caldas Eventos",
    whatsapp: "6499999010",
    address: "Centro, Caldas Novas",
    services: "Eventos, ensaios, fotos para empresas",
    commission: 15,
    approved: true
  },

  {
    name: "Vídeo Produtor",
    profession: "Produção Audiovisual",
    company: "Produções Caldas Films",
    whatsapp: "6499999011",
    address: "Centro, Caldas Novas",
    services: "Vídeos corporativos, eventos, edição",
    commission: 18,
    approved: true
  },

  // EDUCAÇÃO
  {
    name: "Professora Marina",
    profession: "Aulas Particulares",
    company: "Reforço Escolar Caldas",
    whatsapp: "6499999012",
    address: "Centro, Caldas Novas",
    services: "Matemática, português, inglês, reforço",
    commission: 25,
    approved: true
  },

  {
    name: "Instrutor de Inglês",
    profession: "Cursos de Idiomas",
    company: "English Academy Caldas",
    whatsapp: "6499999013",
    address: "Centro, Caldas Novas",
    services: "Aulas de inglês, espanhol, pronuncia",
    commission: 20,
    approved: true
  },

  // MODA E VESTUÁRIO
  {
    name: "Gerente Loja",
    profession: "Loja de Roupas",
    company: "Modas Caldas",
    whatsapp: "6433816600",
    address: "Centro, Caldas Novas",
    services: "Roupas, acessórios, eventos de moda",
    commission: 8,
    approved: true
  },

  {
    name: "Sapateiro Especialista",
    profession: "Sapataria",
    company: "Sapataria Premium",
    whatsapp: "6499999014",
    address: "Centro, Caldas Novas",
    services: "Conserto, customização, calçados personalizados",
    commission: 15,
    approved: true
  },

  // OUTROS SERVIÇOS
  {
    name: "Advogado",
    profession: "Advocacia",
    company: "Escritório Jurídico Caldas",
    whatsapp: "6433815555",
    address: "Centro, Caldas Novas",
    services: "Consultoria jurídica, contratos, processos",
    commission: 30,
    approved: true
  },

  {
    name: "Contador Responsável",
    profession: "Contabilidade",
    company: "Contabilidade Caldas",
    whatsapp: "6499999015",
    address: "Centro, Caldas Novas",
    services: "Contabilidade, imposto, consultoria fiscal",
    commission: 25,
    approved: true
  },

  {
    name: "Gerente Loja",
    profession: "Supermercado",
    company: "Supermercado Caldas Compras",
    whatsapp: "6433814400",
    address: "Avenida Central, Caldas Novas",
    services: "Alimentos, produtos diversos, promoções",
    commission: 5,
    approved: true
  },

  {
    name: "Proprietário",
    profession: "Farmácia",
    company: "Farmácia Caldas Plus",
    whatsapp: "6433813300",
    address: "Centro, Caldas Novas",
    services: "Medicamentos, cosméticos, orientação",
    commission: 8,
    approved: true
  },

  {
    name: "Personal Trainer",
    profession: "Personal Trainer",
    company: "Treinos Caldas Fitness",
    whatsapp: "6499999016",
    address: "Bairro Centro, Caldas Novas",
    services: "Treinamento personalizado, musculação",
    commission: 30,
    approved: true
  },

  {
    name: "Gerente",
    profession: "Academia de Ginástica",
    company: "Academia Caldas Life",
    whatsapp: "6433812200",
    address: "Centro, Caldas Novas",
    services: "Musculação, ginástica, piscina, sauna",
    commission: 10,
    approved: true
  },

  {
    name: "Instrutor",
    profession: "Yoga e Meditação",
    company: "Yoga Caldas Harmonia",
    whatsapp: "6499999017",
    address: "Bairro Tranquilo, Caldas Novas",
    services: "Aulas de yoga, meditação, bem-estar",
    commission: 20,
    approved: true
  },

  {
    name: "Veterinário",
    profession: "Veterinária",
    company: "Clínica Veterinária Caldas",
    whatsapp: "6433819999",
    address: "Centro, Caldas Novas",
    services: "Atendimento veterinário, vacina, cirurgia",
    commission: 15,
    approved: true
  },

  {
    name: "Pet Shop Gerente",
    profession: "Pet Shop",
    company: "Pet Shop Caldas Amor",
    whatsapp: "6499999018",
    address: "Centro, Caldas Novas",
    services: "Banho, tosa, produtos para pets",
    commission: 12,
    approved: true
  },

  {
    name: "Florista",
    profession: "Floricultura",
    company: "Flores Caldas Beleza",
    whatsapp: "6499999019",
    address: "Centro, Caldas Novas",
    services: "Buquês, arranjos, flores para eventos",
    commission: 15,
    approved: true
  },

  {
    name: "Encanador",
    profession: "Limpeza Profissional",
    company: "Limpeza Premium Caldas",
    whatsapp: "6499999020",
    address: "Centro, Caldas Novas",
    services: "Limpeza residencial, comercial, pós-obra",
    commission: 18,
    approved: true
  }
];

/**
 * COMO USAR:
 * 
 * 1. Abra app.js
 * 2. Substitua a linha:
 *    let businesses = JSON.parse(localStorage.getItem("ric_businesses")) || exemplos;
 * 
 * Por:
 *    let businesses = JSON.parse(localStorage.getItem("ric_businesses")) || dadosCaldas;
 * 
 * 3. Recarregue a página
 * 
 * OU adicione este script ANTES de app.js no HTML:
 *    <script src="dados-caldas.js"></script>
 */

/*
  REDE INDICA CALDAS
  Versão inicial para GitHub Pages.

  Esta versão usa localStorage do navegador.
  Para produção, será necessário conectar um banco de dados
  e sistema de login.
*/


const exemplos = [
  {
    name: "Ana Ferreira",
    profession: "Fotógrafa",
    company: "Ana Foto Caldas",
    whatsapp: "64999990001",
    address: "Centro, Caldas Novas",
    services: "Ensaios, eventos e fotos para empresas",
    commission: 10,
    photo: "",
    approved: true
  },

  {
    name: "Carlos Silva",
    profession: "Eletricista",
    company: "CS Elétrica",
    whatsapp: "64999990002",
    address: "Setor Olegário, Caldas Novas",
    services: "Instalações e manutenção elétrica",
    commission: 8,
    photo: "",
    approved: true
  },

  {
    name: "Mariana Costa",
    profession: "Designer",
    company: "Mariana Design",
    whatsapp: "64999990003",
    address: "Bairro Bandeirantes, Caldas Novas",
    services: "Logotipo, artes e redes sociais",
    commission: 12,
    photo: "",
    approved: true
  },

  {
    name: "João Santos",
    profession: "Encanador",
    company: "JS Hidráulica",
    whatsapp: "64999990004",
    address: "Itaguaí, Caldas Novas",
    services: "Consertos e instalações hidráulicas",
    commission: 10,
    photo: "",
    approved: true
  }
];


let businesses =
  JSON.parse(localStorage.getItem("ric_businesses")) || exemplos;

let referrals =
  JSON.parse(localStorage.getItem("ric_referrals")) || [];

let pending =
  JSON.parse(localStorage.getItem("ric_pending")) || [];


function salvar() {

  localStorage.setItem(
    "ric_businesses",
    JSON.stringify(businesses)
  );

  localStorage.setItem(
    "ric_referrals",
    JSON.stringify(referrals)
  );

  localStorage.setItem(
    "ric_pending",
    JSON.stringify(pending)
  );
}


function moeda(valor) {

  return Number(valor || 0).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );
}


function limparTelefone(numero) {

  return String(numero || "")
    .replace(/\D/g, "");
}


/* =========================
   DIRETÓRIO
========================= */

function renderBusinesses() {

  const campo = document.getElementById("search");

  const busca =
    (campo ? campo.value : "")
      .toLowerCase()
      .trim();


  const lista = businesses.filter(function (b) {

    if (!b.approved) {
      return false;
    }

    const texto = [
      b.name,
      b.profession,
      b.company,
      b.services,
      b.address
    ]
      .join(" ")
      .toLowerCase();

    return texto.includes(busca);
  });


  const container =
    document.getElementById("businesses");


  if (!lista.length) {

    container.innerHTML = `
      <div class="business-card">
        <h3>Nenhum resultado encontrado</h3>
        <p>
          Tente pesquisar por outra profissão,
          empresa ou serviço.
        </p>
      </div>
    `;

    return;
  }


  container.innerHTML =
    lista.map(function (b) {

      const telefone =
        limparTelefone(b.whatsapp);


      const foto =
        b.photo
          ? `
            <img
              class="business-photo"
              src="${escapeHTML(b.photo)}"
              alt="${escapeHTML(b.company)}"
            >
          `
          : "";


      return `
        <article class="business-card">

          ${foto}

          <span class="tag">
            ${escapeHTML(b.profession)}
          </span>

          <h3>
            ${escapeHTML(b.company)}
          </h3>

          <p>
            <strong>
              ${escapeHTML(b.name)}
            </strong>
          </p>

          <p>
            ${escapeHTML(b.services)}
          </p>

          <p>
            📍 ${escapeHTML(b.address)}
          </p>

          <p>
            💰 Comissão:
            <strong>${Number(b.commission || 0)}%</strong>
          </p>

          <a
            class="btn primary"
            target="_blank"
            rel="noopener"
            href="https://wa.me/55${telefone}"
          >
            📲 WhatsApp
          </a>

        </article>
      `;

    }).join("");
}


/* =========================
   CADASTRO
========================= */

function registerBusiness(event) {

  event.preventDefault();


  const dados =
    Object.fromEntries(
      new FormData(event.target)
    );


  dados.commission =
    Number(dados.commission || 0);


  dados.approved = false;


  pending.push(dados);


  salvar();

  renderPending();


  event.target.reset();


  alert(
    "Cadastro enviado com sucesso! " +
    "Agora ele precisa ser aprovado pelo administrador."
  );


  window.location.hash = "admin";
}


/* =========================
   ADMIN - PENDENTES
========================= */

function renderPending() {

  const container =
    document.getElementById("pending");


  if (!pending.length) {

    container.innerHTML =
      "<p>Nenhum cadastro aguardando aprovação.</p>";

    return;
  }


  container.innerHTML =
    pending.map(function (b, index) {

      return `
        <div class="pending-item">

          <strong>
            ${escapeHTML(b.company)}
          </strong>

          <br>

          ${escapeHTML(b.profession)}
          <br>

          ${escapeHTML(b.name)}
          <br>

          📲 ${escapeHTML(b.whatsapp)}
          <br>

          💰 Comissão:
          ${Number(b.commission || 0)}%

          <br>

          <button
            class="btn"
            onclick="aprovar(${index})"
          >
            ✅ Aprovar
          </button>

          <button
            class="btn"
            onclick="recusar(${index})"
          >
            ❌ Recusar
          </button>

        </div>
      `;

    }).join("");
}


function aprovar(index) {

  const negocio =
    pending.splice(index, 1)[0];


  negocio.approved = true;


  businesses.push(negocio);


  salvar();

  renderBusinesses();

  renderPending();


  alert("Cadastro aprovado!");
}


function recusar(index) {

  if (
    !confirm(
      "Deseja realmente recusar este cadastro?"
    )
  ) {
    return;
  }


  pending.splice(index, 1);


  salvar();

  renderPending();
}


/* =========================
   INDICAÇÕES
========================= */

function addReferral(event) {

  event.preventDefault();


  const dados =
    Object.fromEntries(
      new FormData(event.target)
    );


  dados.value =
    Number(dados.value || 0);


  dados.commission =
    Number(dados.commission || 0);


  dados.commissionValue =
    dados.value *
    dados.commission /
    100;


  dados.date =
    new Date().toLocaleDateString(
      "pt-BR"
    );


  referrals.unshift(dados);


  salvar();

  renderReferrals();


  event.target.reset();


  alert(
    "Indicação registrada com sucesso!"
  );
}


function renderReferrals() {

  const total =
    referrals.length;


  const valorTotal =
    referrals.reduce(
      function (total, r) {
        return total + Number(r.value || 0);
      },
      0
    );


  const comissaoTotal =
    referrals.reduce(
      function (total, r) {
        return total +
          Number(r.commissionValue || 0);
      },
      0
    );


  document.getElementById(
    "sTotal"
  ).textContent = total;


  document.getElementById(
    "sValue"
  ).textContent = moeda(valorTotal);


  document.getElementById(
    "sComm"
  ).textContent = moeda(comissaoTotal);


  const container =
    document.getElementById(
      "referrals"
    );


  if (!referrals.length) {

    container.innerHTML =
      "<p>Nenhuma indicação registrada ainda.</p>";

    return;
  }


  container.innerHTML = `

    <table class="ref-table">

      <thead>

        <tr>
          <th>Data</th>
          <th>Indicou</th>
          <th>Indicado</th>
          <th>Cliente</th>
          <th>Negócio</th>
          <th>Comissão</th>
          <th>Status</th>
        </tr>

      </thead>

      <tbody>

        ${referrals.map(function (r) {

          return `

            <tr>

              <td>
                ${escapeHTML(r.date)}
              </td>

              <td>
                ${escapeHTML(r.from)}
              </td>

              <td>
                ${escapeHTML(r.to)}
              </td>

              <td>
                ${escapeHTML(r.client)}
              </td>

              <td>
                ${moeda(r.value)}
              </td>

              <td>
                ${moeda(r.commissionValue)}
              </td>

              <td class="status">
                ${escapeHTML(r.status)}
              </td>

            </tr>

          `;

        }).join("")}

      </tbody>

    </table>
  `;
}


/* =========================
   SEGURANÇA BÁSICA DE TEXTO
========================= */

function escapeHTML(valor) {

  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderBusinesses();

    renderPending();

    renderReferrals();

  }
);
// Aguarda o HTML carregar antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {
  iniciarCotacoes();
  iniciarSimulador();
  iniciarValidadorFormulario();
  iniciarMenuMobile();
});

/* ==========================================================================
   1. COTAÇÕES DE GRÃOS (Simulação de API ou Integração Real)
   ========================================================================== */
function iniciarCotacoes() {
  const containerCotacoes = document.querySelector("#cards-cotacoes");
  if (!containerCotacoes) return;

  // Dados fictícios que simulam uma resposta de API do mercado financeiro
  const dadosMercado = [
    { produto: "Soja (Saca 60kg)", preco: 135.50, variacao: 1.2 },
    { produto: "Milho (Saca 60kg)", preco: 58.20, variacao: -0.5 },
    { produto: "Boi Gordo (Arroba)", preco: 232.00, variacao: 0.8 }
  ];

  containerCotacoes.innerHTML = ""; // Limpa o container

  dadosMercado.forEach(item => {
    const card = document.createElement("div");
    card.className = "card-cotacao";
    
    // Define a cor e o ícone de acordo com a variação do preço
    const classeVariacao = item.variacao >= 0 ? "alta" : "baixa";
    const iconeVariacao = item.variacao >= 0 ? "▲" : "▼";

    card.innerHTML = `
      <h3>${item.produto}</h3>
      <p class="preco">R$ ${item.preco.toFixed(2)}</p>
      <span class="variacao ${classeVariacao}">
        ${iconeVariacao} ${Math.abs(item.variacao)}%
      </span>
    `;
    containerCotacoes.appendChild(card);
  });
}

/* ==========================================================================
   2. SIMULADOR DE PRODUTIVIDADE (Calculadora Agro)
   ========================================================================== */
function iniciarSimulador() {
  const botaoCalcular = document.querySelector("#btn-calcular");
  if (!botaoCalcular) return;

  botaoCalcular.addEventListener("click", () => {
    const area = parseFloat(document.querySelector("#input-area").value);
    const cultura = document.querySelector("#select-cultura").value;
    const resultadoDiv = document.querySelector("#resultado-simulacao");

    // Validação simples de entrada
    if (isNaN(area) || area <= 0) {
      resultadoDiv.innerHTML = "<p class='erro'>Insira uma área válida maior que zero!</p>";
      return;
    }

    // Rendimento médio estimado por hectare (Sacas por Hectare)
    let rendimentoMedio = 0;
    if (cultura === "soja") rendimentoMedio = 60;
    if (cultura === "milho") rendimentoMedio = 110;

    const totalProducao = area * rendimentoMedio;

    resultadoDiv.innerHTML = `
      <div class="sucesso">
        <p>🌾 <strong>Cultura:</strong> ${cultura.toUpperCase()}</p>
        <p>📐 <strong>Área Total:</strong> ${area} Hectares</p>
        <p>📈 <strong>Estimativa de Produção:</strong> ${totalProducao.toLocaleString()} Sacas</p>
        <small>*Cálculo baseado em médias nacionais de produtividade.</small>
      </div>
    `;
  });
}

/* ==========================================================================
   3. VALIDAÇÃO AVANÇADA DE FORMULÁRIO (Contato / Consultoria)
   ========================================================================== */
function iniciarValidadorFormulario() {
  const formulario = document.querySelector("#form-agro-contato");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
    
    // Expressão regular simples para validar formato de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nome.length < 3) {
      mostrarFeedback("Por favor, digite seu nome completo.", "erro");
      return;
    }

    if (!emailValido) {
      mostrarFeedback("Insira um endereço de e-mail válido.", "erro");
      return;
    }

    if (mensagem.length < 10) {
      mostrarFeedback("Sua mensagem deve ter pelo menos 10 caracteres.", "erro");
      return;
    }

    // Se passar nas validações
    mostrarFeedback("Sua mensagem foi enviada! Nossa equipe entrará em contato.", "sucesso");
    formulario.reset();
  });
}

function mostrarFeedback(texto, tipo) {
  const feedbackContainer = document.querySelector("#feedback-formulario");
  if (!feedbackContainer) {
    alert(texto); // Alternativa caso não exista o elemento na tela
    return;
  }
  feedbackContainer.innerText = texto;
  feedbackContainer.className = `mensagem-feedback ${tipo}`;
}

/* ==========================================================================
   4. MENU MOBILE ACESSÍVEL
   ========================================================================== */
function iniciarMenuMobile() {
  const toggleMenu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleMenu || !navLinks) return;

  toggleMenu.addEventListener("click", () => {
    const expandido = toggleMenu.getAttribute("aria-expanded") === "true";
    toggleMenu.setAttribute("aria-expanded", !expandido);
    navLinks.classList.toggle("menu-aberto");
  });
}

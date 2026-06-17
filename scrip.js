// Aguarda o HTML carregar antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {
  iniciarCotacoes();
  iniciarSimuladorCompleto();
  iniciarFiltroProdutos();
  iniciarCarrossel();
  iniciarPrevisaoTempo();
  iniciarValidadorFormulario();
  iniciarMenuMobile();
});

/* ==========================================================================
   1. COTAÇÕES DE GRÃOS
   ========================================================================== */
function iniciarCotacoes() {
  const containerCotacoes = document.querySelector("#cards-cotacoes");
  if (!containerCotacoes) return;

  const dadosMercado = [
    { produto: "Soja (Saca 60kg)", preco: 135.50, variacao: 1.2 },
    { produto: "Milho (Saca 60kg)", preco: 58.20, variacao: -0.5 },
    { produto: "Boi Gordo (Arroba)", preco: 232.00, variacao: 0.8 }
  ];

  containerCotacoes.innerHTML = "";

  dadosMercado.forEach(item => {
    const card = document.createElement("div");
    card.className = "card-cotacao";
    
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
   2. SIMULADOR AGRO COMPLETO (Produção, Custo e Lucro)
   ========================================================================== */
function iniciarSimuladorCompleto() {
  const botaoCalcular = document.querySelector("#btn-calcular");
  if (!botaoCalcular) return;

  botaoCalcular.addEventListener("click", () => {
    const area = parseFloat(document.querySelector("#input-area").value);
    const cultura = document.querySelector("#select-cultura").value;
    const resultadoDiv = document.querySelector("#resultado-simulacao");

    if (isNaN(area) || area <= 0) {
      resultadoDiv.innerHTML = "<p class='erro'>Insira uma área válida maior que zero!</p>";
      return;
    }

    // Configurações: [Rendimento saca/ha, Preço saca, Custo produção/ha]
    const configs = {
      soja: { rendimento: 60, precoSaca: 135.50, custoHa: 4500 },
      milho: { rendimento: 110, precoSaca: 58.20, custoHa: 3800 }
    };

    const dados = configs[cultura];
    const totalSacas = area * dados.rendimento;
    const faturamentoBruto = totalSacas * dados.precoSaca;
    const custoTotal = area * dados.custoHa;
    const lucroLiquido = faturamentoBruto - custoTotal;

    const classeLucro = lucroLiquido >= 0 ? "lucro-positivo" : "lucro-negativo";

    resultadoDiv.innerHTML = `
      <div class="sucesso">
        <p>🌾 <strong>Cultura:</strong> ${cultura.toUpperCase()}</p>
        <p>📐 <strong>Área Total:</strong> ${area} Hectares</p>
        <p>📈 <strong>Produção Estimada:</strong> ${totalSacas.toLocaleString()} Sacas</p>
        <p>💰 <strong>Custo de Produção:</strong> R$ ${custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        <p class="${classeLucro}">💵 <strong>Lucro Líquido Estimado:</strong> R$ ${lucroLiquido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
      </div>
    `;
  });
}

/* ==========================================================================
   3. FILTRO DE PRODUTOS E MÁQUINAS
   ========================================================================== */
function iniciarFiltroProdutos() {
  const botoesFiltro = document.querySelectorAll(".btn-filtro");
  const produtos = document.querySelectorAll(".item-produto");

  if (!botoesFiltro || !produtos) return;

  botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
      // Remove classe ativa de todos e adiciona no clicado
      botoesFiltro.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      const categoriaDefinida = botao.getAttribute("data-categoria");

      produtos.forEach(produto => {
        const categoriaProduto = produto.getAttribute("data-categoria");
        
        if (categoriaDefinida === "todos" || categoriaDefinida === categoriaProduto) {
          produto.style.display = "block"; // Mostra o item
        } else {
          produto.style.display = "none";  // Esconde o item
        }
      });
    });
  });
}

/* ==========================================================================
   4. CARROSSEL DE IMAGENS (Destaques/Notícias do Agro)
   ========================================================================== */
function iniciarCarrossel() {
  const slides = document.querySelectorAll(".carrossel-slide");
  const btnAnt = document.querySelector("#btn-anterior");
  const btnProx = document.querySelector("#btn-proximo");
  
  if (!slides.length || !btnAnt || !btnProx) return;

  let slideAtual = 0;

  function mostrarSlide(indice) {
    slides.forEach(slide => slide.classList.remove("visivel"));
    
    // Trata os limites do carrossel
    if (indice >= slides.length) slideAtual = 0;
    if (indice < 0) slideAtual = slides.length - 1;

    slides[slideAtual].classList.add("visivel");
  }

  btnProx.addEventListener("click", () => {
    slideAtual++;
    mostrarSlide(slideAtual);
  });

  btnAnt.addEventListener("click", () => {
    slideAtual--;
    mostrarSlide(slideAtual);
  });

  // Passa o slide automaticamente a cada 5 segundos
  setInterval(() => {
    slideAtual++;
    mostrarSlide(slideAtual);
  }, 5000);
}

/* ==========================================================================
   5. PREVISÃO DO TEMPO AGRO
   ========================================================================== */
function iniciarPrevisaoTempo() {
  const btnTempo = document.querySelector("#btn-buscar-tempo");
  const resultadoTempo = document.querySelector("#container-tempo");

  if (!btnTempo || !resultadoTempo) return;

  btnTempo.addEventListener("click", () => {
    const cidade = document.querySelector("#input-cidade").value.trim();

    if (cidade === "") {
      resultadoTempo.innerHTML = "<p class='erro'>Digite o nome de uma cidade!</p>";
      return;
    }

    // Simulação de dados de clima ideais para o produtor rural
    resultadoTempo.innerHTML = `
      <div class="bloco-tempo">
        <h4>Clima em ${cidade}</h4>
        <p class="temp">🌡️ 26°C</p>
        <p>☀️ Céu Limpo / Ensolarado</p>
        <p>💧 Umidade do Ar: 65%</p>
        <p>💨 Vento: 12 km/h (Ideal para pulverização)</p>
        <p>🌧️ Chance de Chuva: 10%</p>
      </div>
    `;
  });
}

/* ==========================================================================
   6. VALIDAÇÃO AVANÇADA DE FORMULÁRIO
   ========================================================================== */
function iniciarValidadorFormulario() {
  const formulario = document.querySelector("#form-agro-contato");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();
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

    mostrarFeedback("Sua mensagem foi enviada! Nossa equipe entrará em contato.", "sucesso");
    formulario.reset();
  });
}

function mostrarFeedback(texto, tipo) {
  const feedbackContainer = document.querySelector("#feedback-formulario");
  if (!feedbackContainer) {
    alert(texto);
    return;
  }
  feedbackContainer.innerText = texto;
  feedbackContainer.className = `mensagem-feedback ${tipo}`;
}

/* ==========================================================================
   7. MENU MOBILE ACESSÍVEL
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

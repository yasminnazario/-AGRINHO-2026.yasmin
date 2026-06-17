document.addEventListener("DOMContentLoaded", () => {
  iniciarCotacoes();
  iniciarSimuladorCompleto();
  iniciarFiltroProdutos();
  iniciarCarrossel();
  iniciarPrevisaoTempo();
  iniciarValidadorFormulario();
});

// COTAÇÕES
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
      <span class="variacao ${classeVariacao}">${iconeVariacao} ${Math.abs(item.variacao)}%</span>
    `;
    containerCotacoes.appendChild(card);
  });
}

// SIMULADOR
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
      <div class="${classeLucro}">
        <p>🌾 <strong>Cultura:</strong> ${cultura.toUpperCase()}</p>
        <p>📈 <strong>Produção Estimada:</strong> ${totalSacas.toLocaleString()} Sacas</p>
        <p>💵 <strong>Lucro Líquido Estimado:</strong> R$ ${lucroLiquido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
      </div>
    `;
  });
}

// FILTRO
function iniciarFiltroProdutos() {
  const botoesFiltro = document.querySelectorAll(".btn-filtro");
  const produtos = document.querySelectorAll(".item-produto");

  botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
      botoesFiltro.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      const categoriaDefinida = botao.getAttribute("data-categoria");

      produtos.forEach(produto => {
        const categoriaProduto = produto.getAttribute("data-categoria");
        produto.style.display = (categoriaDefinida === "todos" || categoriaDefinida === categoriaProduto) ? "block" : "none";
      });
    });
  });
}

// CARROSSEL
function iniciarCarrossel() {
  const slides = document.querySelectorAll(".carrossel-slide");
  const btnAnt = document.querySelector("#btn-anterior");
  const btnProx = document.querySelector("#btn-proximo");
  if (!slides.length) return;

  let slideAtual = 0;
  function mostrarSlide(indice) {
    if (indice >= slides.length) slideAtual = 0;
    if (indice < 0) slideAtual = slides.length - 1;
    slides.forEach(s => s.classList.remove("visivel"));
    slides[slideAtual].classList.add("visivel");
  }

  btnProx.addEventListener("click", () => { slideAtual++; mostrarSlide(slideAtual); });
  btnAnt.addEventListener("click", () => { slideAtual--; mostrarSlide(slideAtual); });
  setInterval(() => { slideAtual++; mostrarSlide(slideAtual); }, 5000);
}

// CLIMA
function iniciarPrevisaoTempo() {
  const btnTempo = document.querySelector("#btn-buscar-tempo");
  const resultadoTempo = document.querySelector("#container-tempo");

  if (!btnTempo) return;
  btnTempo.addEventListener("click", () => {
    const cidade = document.querySelector("#input-cidade").value.trim();
    if (!cidade) {
      resultadoTempo.innerHTML = "<p class='erro'>Digite o nome de uma cidade!</p>";
      return;
    }
    resultadoTempo.innerHTML = `
      <div class="sucesso">
        <h4>Clima em ${cidade}</h4>
        <p class="temp">🌡️ 26°C - Céu Ensolarado</p>
        <p>💨 Vento: 12 km/h (Perfeito para pulverizar)</p>
      </div>
    `;
  });
}

// CONTATO
function iniciarValidadorFormulario() {
  const formulario = document.querySelector("#form-agro-contato");
  const feedback = document.querySelector("#feedback-formulario");
  if (!formulario) return;

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    if (nome.length < 3) {
      feedback.className = "erro";
      feedback.innerText = "Insira seu nome completo.";
      return;
    }
    feedback.className = "sucesso";
    feedback.innerText = "Mensagem enviada com sucesso!";
    formulario.reset();
  });
}

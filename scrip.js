// Aguarda a página carregar totalmente
document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
  inicializarFormulario();
  inicializarAnimacoes();
});

// --- INTERATIVIDADE DO MENU ---
function inicializarMenu() {
  const botaoMenu = document.querySelector(".btn-menu");
  const menuNav = document.querySelector(".menu-navegacao");

  if (botaoMenu && menuNav) {
    botaoMenu.addEventListener("click", () => {
      menuNav.classList.toggle("menu-ativo");
      console.log("Menu do agro alternado!");
    });
  }
}

// --- VALIDAÇÃO DE FORMULÁRIO DE CONTATO ---
function inicializarFormulario() {
  const formulario = document.querySelector("#form-contato");

  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault(); // Impede a página de recarregar

      const nome = document.querySelector("#input-nome").value;
      const email = document.querySelector("#input-email").value;

      if (nome === "" || email === "") {
        alert("Por favor, preencha todos os campos da sua solicitação.");
        return;
      }

      alert(`Obrigado, ${nome}! Nossa equipe do agro entrará em contato.`);
      formulario.reset(); // Limpa os campos do formulário
    });
  }
}

// --- ANIMAÇÃO AO ROLAR A PÁGINA ---
function inicializarAnimacoes() {
  const itensAnimados = document.querySelectorAll(".animar-item");

  window.addEventListener("scroll", () => {
    itensAnimados.forEach((item) => {
      const posicaoItem = item.getBoundingClientRect().top;
      const alturaTela = window.innerHeight;

      // Ativa a animação quando o item aparece na tela
      if (posicaoItem < alturaTela - 100) {
        item.classList.add("item-visivel");
      }
    });
  });
}

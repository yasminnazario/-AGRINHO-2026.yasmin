
  // ===== MENU MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav ul');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ANIMAÇÃO DOS NÚMEROS =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    update();
};

// Observer para ativar a animação quando visível
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

// ===== QUIZ INTERATIVO =====
const quizData = [
    {
        pergunta: "Qual é o principal produto agrícola exportado pelo Brasil?",
        opcoes: ["Arroz", "Soja", "Trigo", "Café"],
        correta: 1
    },
    {
        pergunta: "Qual região do Brasil é conhecida como o 'celeiro do mundo' pela produção de grãos?",
        opcoes: ["Nordeste", "Sul", "Centro-Oeste", "Norte"],
        correta: 2
    },
    {
        pergunta: "O que é agricultura de precisão?",
        opcoes: [
            "Plantio sem uso de tecnologia",
            "Uso de tecnologia para otimizar a produção",
            "Agricultura apenas em estufas",
            "Cultivo em pequena escala"
        ],
        correta: 1
    },
    {
        pergunta: "Qual porcentagem aproximada do PIB brasileiro vem do agronegócio?",
        opcoes: ["5%", "10%", "25%", "50%"],
        correta: 2
    },
    {
        pergunta: "Qual é o período ideal para o plantio da soja no Centro-Oeste?",
        opcoes: ["Janeiro a Março", "Abril a Junho", "Setembro a Novembro", "Julho a Agosto"],
        correta: 2
    },
    {
        pergunta: "O Brasil é o maior produtor mundial de qual destes produtos?",
        opcoes: ["Trigo", "Café", "Batata", "Cevada"],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const quizStart = document.getElementById('quiz-start');
const quizQuestion = document.getElementById('quiz-question');
const quizResult = document.getElementById('quiz-result');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const progressFill = document.getElementById('progressFill');
const currentQ = document.getElementById('currentQ');
const totalQ = document.getElementById('totalQ');
const scoreValue = document.getElementById('scoreValue');
const scoreTotal = document.getElementById('scoreTotal');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');

totalQ.textContent = quizData.length;
scoreTotal.textContent = quizData.length;

document.getElementById('startQuizBtn').addEventListener('click', iniciarQuiz);
document.getElementById('restartBtn').addEventListener('click', iniciarQuiz);

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    quizStart.classList.remove('active');
    quizResult.classList.remove('active');
    quizQuestion.classList.add('active');
    mostrarPergunta();
}

function mostrarPergunta() {
    const dados = quizData[perguntaAtual];
    questionText.textContent = dados.pergunta;
    optionsContainer.innerHTML = '';
    currentQ.textContent = perguntaAtual + 1;
    progressFill.style.width = ((perguntaAtual) / quizData.length * 100) + '%';

    dados.opcoes.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opcao;
        btn.addEventListener('click', () => selecionarResposta(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function selecionarResposta(index, btn) {
    const dados = quizData[perguntaAtual];
    const botoes = document.querySelectorAll('.option-btn');

    botoes.forEach(b => b.disabled = true);

    if (index === dados.correta) {
        btn.classList.add('correct');
        pontuacao++;
    } else {
        btn.classList.add('wrong');
        botoes[dados.correta].classList.add('correct');
    }

    setTimeout(() => {
        perguntaAtual++;
        if (perguntaAtual < quizData.length) {
            mostrarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1200);
}

function mostrarResultado() {
    quizQuestion.classList.remove('active');
    quizResult.classList.add('active');
    progressFill.style.width = '100%';
    scoreValue.textContent = pontuacao;

    const porcentagem = (pontuacao / quizData.length) * 100;

    if (porcentagem === 100) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Perfeito! Você é um expert!';
        resultText.textContent = 'Incrível! Você acertou todas as perguntas. O agro pode contar com você!';
    } else if (porcentagem >= 70) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Muito bem!';
        resultText.textContent = 'Ótimo desempenho! Você conhece bastante sobre o agronegócio.';
    } else if (porcentagem >= 40) {
        resultIcon.textContent = '🌱';
        resultTitle.textContent = 'Bom começo!';
        resultText.textContent = 'Você está no caminho certo. Continue aprendendo sobre o agro!';
    } else {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Vamos estudar mais!';
        resultText.textContent = 'Que tal aprender mais sobre o agronegócio brasileiro?';
    }
}

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. 🌾\nEm breve entraremos em contato.`);
    contactForm.reset();
});

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .galeria-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    scrollObserver.observe(el);
});

const avanca = document.querySelectorAll('.btn-proximo');
const btnRestart = document.querySelectorAll('.btn-restart');
const progressBar = document.querySelector('.progress');

// Calcular progresso máximo baseado no número de passos
const totalPassos = 13; // passo-0 até passo-12
let passoAtual = 0;

function atualizarProgresso(passo) {
    const progresso = (passo / (totalPassos - 1)) * 100;
    progressBar.style.width = `${progresso}%`;
}

function mostrarPasso(passoId) {
    const atual = document.querySelector('.passo.ativo');
    if (atual) {
        atual.classList.remove('ativo');
    }
    
    const proximoPasso = document.getElementById(`passo-${passoId}`);
    if (proximoPasso) {
        proximoPasso.classList.add('ativo');
        passoAtual = passoId;
        atualizarProgresso(passoAtual);
        
        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Event listeners para botões de próximo
avanca.forEach(button => {
    button.addEventListener('click', function() {
        const proximoPasso = this.getAttribute('data-proximo');
        mostrarPasso(proximoPasso);
    });
});

// Event listeners para botões de reinício
btnRestart.forEach(button => {
    button.addEventListener('click', function() {
        mostrarPasso(0);
    });
});

// Inicializar progresso
atualizarProgresso(0);

// Efeitos sonoros opcionais (adicionar se desejar)
function playClickSound() {
    // Implementar som de clique se desejar
}

// Adicionar efeito de digitação para textos longos
function typeWriter(element, speed = 30) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efeito de digitação nos passos ativos
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const passo = mutation.target;
            if (passo.classList.contains('ativo')) {
                const storyText = passo.querySelector('.story-text');
                if (storyText) {
                    // Remover e reaplicar o texto para o efeito de digitação
                    const originalText = storyText.textContent;
                    storyText.textContent = '';
                    setTimeout(() => {
                        storyText.textContent = originalText;
                        // typeWriter(storyText); // Descomente se quiser o efeito de digitação
                    }, 300);
                }
            }
        }
    });
});

// Observar mudanças nos passos
document.querySelectorAll('.passo').forEach(passo => {
    observer.observe(passo, { attributes: true });
});

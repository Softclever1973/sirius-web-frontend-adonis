// =====================================================
// SIRIUS WEB - Tela Inicial (carrossel de promos)
// =====================================================

/* ============================================================
   CONFIGURAÇÃO
   ============================================================ */

const TODAS_AS_TELAS = [
    'promo-comandas.html',
    'promo-delivery.html',
    'promo-nfce.html',
    'promo-nfe.html',
    'promo-compras.html',
    'promo-financeiro.html',
    'promo-xml.html',
    'promo-estoque.html',
    'promo-controle-de-caixa.html',
    'promo-comissoes.html'
];

const QTDE_TELAS    = 4;
const DURACAO_MS    = 3000;
const FADE_MS       = 350;
const DESTINO_FINAL = 'login.html';
const SITE_URL      = 'https://www.softclever.com.br';

/* ============================================================
   SORTEAR TELAS SEM REPETIÇÃO
   ============================================================ */
function sortearTelas(pool, qtde) {
    const copia    = [...pool];
    const sorteadas = [];
    for (let i = 0; i < qtde && copia.length > 0; i++) {
        const idx = Math.floor(Math.random() * copia.length);
        sorteadas.push(copia.splice(idx, 1)[0]);
    }
    return sorteadas;
}

/* ============================================================
   CRIAR BOLINHAS INDICADORAS
   ============================================================ */
function criarIndicadores(qtde) {
    const container = document.getElementById('indicadores');
    container.innerHTML = '';
    for (let i = 0; i < qtde; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.id        = `dot-${i}`;
        container.appendChild(dot);
    }
}

function atualizarIndicadores(passo) {
    for (let i = 0; i < QTDE_TELAS; i++) {
        const dot = document.getElementById(`dot-${i}`);
        dot.className = 'dot';
        if (i < passo)   dot.classList.add('concluido');
        if (i === passo) dot.classList.add('ativo');
    }
}

/* ============================================================
   BARRA DE PROGRESSO
   ============================================================ */
function animarBarra(passoAtual, totalPassos, duracaoMs) {
    const barra = document.getElementById('barra-progresso');
    const ini   = (passoAtual / totalPassos) * 100;
    const fim   = ((passoAtual + 1) / totalPassos) * 100;

    barra.style.transition = 'none';
    barra.style.width      = ini + '%';
    barra.getBoundingClientRect(); // forçar reflow
    barra.style.transition = `width ${duracaoMs}ms linear`;
    barra.style.width      = fim + '%';
}

/* ============================================================
   ORQUESTRADOR PRINCIPAL
   ============================================================ */
const telasSorteadas = sortearTelas(TODAS_AS_TELAS, QTDE_TELAS);
const frame          = document.getElementById('frame-promo');
const overlayFinal   = document.getElementById('overlay-final');

let passoAtual      = 0;
let timeoutFade     = null;
let timeoutAvancar  = null;
let timeoutFallback = null;

criarIndicadores(QTDE_TELAS);

function cancelarTimers() {
    clearTimeout(timeoutFade);
    clearTimeout(timeoutAvancar);
    clearTimeout(timeoutFallback);
    frame.onload = null;
}

function exibirTela(indice) {
    cancelarTimers();

    if (indice >= telasSorteadas.length) {
        encerrar();
        return;
    }

    const arquivo = telasSorteadas[indice];
    frame.classList.remove('visivel');

    timeoutFade = setTimeout(() => {
        frame.src = arquivo;

        atualizarIndicadores(indice);
        animarBarra(indice, QTDE_TELAS, DURACAO_MS);

        let carregou = false;

        function aoCarregar() {
            if (carregou) return;
            carregou = true;
            clearTimeout(timeoutFallback);
            frame.classList.add('visivel');
            timeoutAvancar = setTimeout(() => {
                passoAtual++;
                exibirTela(passoAtual);
            }, DURACAO_MS);
        }

        frame.onload = aoCarregar;

        // Fallback: se onload demorar mais de 500ms
        timeoutFallback = setTimeout(aoCarregar, 500);

    }, FADE_MS);
}

function encerrar() {
    cancelarTimers();
    frame.classList.remove('visivel');
    overlayFinal.classList.add('ativo');
    setTimeout(() => { window.location.href = DESTINO_FINAL; }, 550);
}

// Iniciar
setTimeout(() => { exibirTela(0); }, 100);

/* ============================================================
   ZONA "FALE CONOSCO"
   ============================================================ */
document.getElementById('zona-fale').addEventListener('click', function(e) {
    e.stopPropagation();
    window.open(SITE_URL, '_blank');
});

/* ============================================================
   CLIQUE GERAL — avança para o próximo slide
   ============================================================ */
document.addEventListener('click', () => {
    passoAtual++;
    exibirTela(passoAtual);
});

/* ============================================================
   ATALHOS DE TECLADO
   ============================================================ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
        encerrar();
    }
});

// =====================================================
// SIRIUS WEB - Manual do Usuário
// Depende de: marked.js (CDN)
// =====================================================

// Bloqueia scroll horizontal somente nesta página
document.documentElement.style.overflowX = 'hidden';

// ── Autenticação ──────────────────────────────────────────
(function verificarAutenticacao() {
    const token = localStorage.getItem('sirius_token');
    if (!token) { window.location.href = 'index.html'; return; }
    try {
        const usuario = JSON.parse(localStorage.getItem('sirius_usuario') || '{}');
        const el = document.getElementById('userName');
        if (el) el.textContent = usuario.nome || '';
    } catch(e) {}
})();

// ── Configurar marked ────────────────────────────────────
marked.setOptions({
    breaks: true,
    gfm: true,
});

// ── Carregar e renderizar o .md ──────────────────────────
async function carregarManual() {
    try {
        const res = await fetch('manual.md');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const texto = await res.text();

        document.getElementById('conteudo').innerHTML = marked.parse(texto);

        // Envolve tabelas em wrapper com scroll horizontal
        document.querySelectorAll('#conteudo table').forEach(table => {
            const wrap = document.createElement('div');
            wrap.className = 'table-scroll-wrap';
            table.parentNode.insertBefore(wrap, table);
            wrap.appendChild(table);
        });

        gerarSidebar();
        ativarScrollSpy();

    } catch (e) {
        document.getElementById('conteudo').innerHTML =
            `<p style="color:var(--vermelho)"><span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;">warning</span> Erro ao carregar o manual: ${e.message}</p>`;
        console.error('Erro manual:', e);
    }
}

// ── Gerar índice lateral a partir dos H2 do .md ─────────
const ICONES = ['home', 'group', 'settings', 'gps_fixed', 'lightbulb', 'help', 'menu_book'];

function gerarSidebar() {
    const titulos = document.querySelectorAll('#conteudo h2');
    const nav     = document.getElementById('sidebar-nav');

    let html = '';
    titulos.forEach((h, i) => {
        const id = `secao-${i}`;
        h.id = id;
        const texto = h.textContent.replace(/[\u{1F000}-\u{1FFFF}]|[\u2600-\u27BF]/gu, '').trim();
        html += `
            <a href="#${id}" class="manual-nav-item" data-secao="${id}">
                <span class="material-symbols-outlined nav-icon">${ICONES[i] || 'description'}</span>
                ${texto}
            </a>`;
    });

    nav.innerHTML = html || '<p style="padding:12px;color:var(--cinza-5)">Nenhuma seção encontrada.</p>';

    const primeiro = nav.querySelector('.manual-nav-item');
    if (primeiro) primeiro.classList.add('active');
}

// ── ScrollSpy: destacar item do índice conforme scroll ───
function ativarScrollSpy() {
    const secoes = document.querySelectorAll('#conteudo h2');
    if (!secoes.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.manual-nav-item').forEach(a => a.classList.remove('active'));
                const link = document.querySelector(`.manual-nav-item[data-secao="${entry.target.id}"]`);
                if (link) {
                    link.classList.add('active');
                    // Scroll apenas dentro do nav, sem mover a página
                    const nav = document.getElementById('sidebar-nav');
                    if (nav) nav.scrollTop = link.offsetTop - nav.clientHeight / 2;
                }
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    secoes.forEach(s => observer.observe(s));
}

// ── Toggle sidebar no mobile ──────────────────────────────
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('aberta');
}

carregarManual();

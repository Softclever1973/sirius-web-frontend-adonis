// =====================================================
// SIRIUS WEB - Manual do Usuário
// Depende de: marked.js (CDN)
// =====================================================

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

        gerarSidebar();
        ativarScrollSpy();

    } catch (e) {
        document.getElementById('conteudo').innerHTML =
            `<p style="color:var(--vermelho)">⚠️ Erro ao carregar o manual: ${e.message}</p>`;
        console.error('Erro manual:', e);
    }
}

// ── Gerar índice lateral a partir dos H2 do .md ─────────
const ICONES = ['🏠','👥','⚙️','🎯','💡','❓','📖'];

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
                <span class="nav-icon">${ICONES[i] || '📄'}</span>
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
                    link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    secoes.forEach(s => observer.observe(s));
}

carregarManual();

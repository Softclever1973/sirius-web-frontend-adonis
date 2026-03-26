// =====================================================
// SIRIUS WEB - Alterar Senha
// Depende de: js/libs/api.js, js/libs/ui.js, js/auth.js
// =====================================================

// =====================================================
// AJUDA — Manual e Vídeo
// =====================================================
const VIDEO_URL_ALTERAR_SENHA = 'https://www.youtube.com/embed/pcuLXSN8P6s?si=QtRt0o_yoFisHspA'; // Cole aqui: https://drive.google.com/file/d/SEU_ID/preview

function abrirVideoAjuda() {
    if (!VIDEO_URL_ALTERAR_SENHA) { alert('Nenhum vídeo cadastrado ainda.'); return; }
    document.getElementById('videoIframe').src = VIDEO_URL_ALTERAR_SENHA;
    document.getElementById('modalVideo').classList.add('visivel');
}

function fecharVideoAjuda() {
    document.getElementById('videoIframe').src = '';
    document.getElementById('modalVideo').classList.remove('visivel');
}

/* ============================================================
   PARTÍCULAS
   ============================================================ */
(function () {
    const canvas = document.getElementById('particulas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    const cores = ['37,99,235', '96,165,250', '16,185,129', '14,165,233', '99,102,241'];
    const ps = Array.from({ length: 35 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.08),
        a: Math.random() * 0.35 + 0.08,
        cor: cores[Math.floor(Math.random() * cores.length)]
    }));
    function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ps.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.cor},${p.a})`; ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
})();

/* ============================================================
   RELÓGIO
   ============================================================ */
(function () {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    function tick() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('relogioHora').textContent = `${h}:${m}:${s}`;
        document.getElementById('relogioData').textContent =
            `${diasSemana[now.getDay()]} · ${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
    }
    tick(); setInterval(tick, 1000);
})();

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();
    carregarUsuario();
    configurarFormulario();
    ocultarLoadingOverlay();
});

function carregarUsuario() {
    try {
        const usuario = JSON.parse(localStorage.getItem('sirius_usuario') || '{}');
        const nome = `${usuario.nome || ''} ${usuario.sobrenome || ''}`.trim() || 'Usuário';
        const email = usuario.email || '';

        const elAvatar = document.getElementById('userAvatar');
        const elNome   = document.getElementById('userNome');
        const elNomeCard  = document.getElementById('nomeUsuario');
        const elEmailCard = document.getElementById('emailUsuario');

        if (elAvatar) {
            elAvatar.textContent = nome.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?';
        }
        if (elNome)      elNome.textContent    = nome;
        if (elNomeCard)  elNomeCard.textContent = nome;
        if (elEmailCard) elEmailCard.textContent = email;
    } catch (e) {
        console.error('Erro ao carregar usuário:', e);
    }
}

function ocultarLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

/* ============================================================
   FORMULÁRIO
   ============================================================ */
function configurarFormulario() {
    const form = document.getElementById('formAlterarSenha');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await salvarSenha();
    });
}

async function salvarSenha() {
    const senhaAtual    = document.getElementById('senhaAtual').value;
    const novaSenha     = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        mostrarMensagem('Preencha todos os campos.', 'error');
        return;
    }

    if (novaSenha.length < 6) {
        mostrarMensagem('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        mostrarMensagem('A confirmação de senha não confere com a nova senha.', 'error');
        return;
    }

    const btn = document.getElementById('btnSalvar');
    btn.disabled = true;
    btn.textContent = 'Salvando...';

    try {
        const response = await apiFetch('/auth/change-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha_atual: senhaAtual, nova_senha: novaSenha })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            mostrarMensagem('Senha alterada com sucesso!', 'success');
            limparFormulario();
        } else {
            mostrarMensagem(data.message || 'Erro ao alterar a senha.', 'error');
        }
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        mostrarMensagem('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Salvar Nova Senha';
    }
}

function limparFormulario() {
    document.getElementById('senhaAtual').value     = '';
    document.getElementById('novaSenha').value      = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('senhaAtual').focus();
}

/* ============================================================
   TOGGLE VISIBILIDADE DA SENHA
   ============================================================ */
function toggleSenha(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<span class="material-symbols-outlined">visibility_off</span>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<span class="material-symbols-outlined">visibility</span>';
    }
}

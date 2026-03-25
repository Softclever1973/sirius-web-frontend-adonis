// =====================================================
// SIRIUS WEB - UI Compartilhada (módulo compartilhado)
// Depende de: nada
// =====================================================

// ─────────────────────────────────────────────────────
// MENSAGEM DE FEEDBACK
// ─────────────────────────────────────────────────────

/**
 * Exibe uma mensagem de feedback no elemento #mensagem.
 * @param {string} texto
 * @param {string} tipo - classe CSS a aplicar (ex: 'success', 'error', 'sucesso', 'erro')
 */
function mostrarMensagem(texto, tipo) {
    const div = document.getElementById('mensagem');
    if (!div) return;
    div.textContent = texto;
    div.className = `mensagem ${tipo}`;
    div.style.display = 'block';
    setTimeout(() => { div.style.display = 'none'; }, 5000);
}

// ─────────────────────────────────────────────────────
// LOADING
// ─────────────────────────────────────────────────────

/**
 * Exibe/oculta o indicador de loading.
 * Se #tabelaContainer existir, é ocultado junto com o loading.
 * @param {boolean} show
 */
function mostrarLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = show ? 'block' : 'none';

    const tabela = document.getElementById('tabelaContainer');
    if (tabela) tabela.style.display = show ? 'none' : 'block';
}

// ─────────────────────────────────────────────────────
// ABAS (TAB NAVIGATION)
// ─────────────────────────────────────────────────────

/**
 * Ativa a aba indicada por `aba`.
 * Espera: botões com [data-tab="aba"] e painéis com id="tab-{aba}".
 * @param {string} aba
 */
function mudarAba(aba) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c   => c.classList.remove('active'));

    const btn   = document.querySelector(`[data-tab="${aba}"]`);
    const painel = document.getElementById(`tab-${aba}`);
    if (btn)    btn.classList.add('active');
    if (painel) painel.classList.add('active');
}

// ─────────────────────────────────────────────────────
// DROPDOWNS FLUTUANTES DA SIDEBAR
// ─────────────────────────────────────────────────────

/**
 * Fecha todos os dropdowns flutuantes presentes na página.
 */
function fecharDropdowns() {
    document.querySelectorAll('.dropdown-flutuante').forEach(d => d.classList.remove('visivel'));
}

/**
 * Abre/fecha um dropdown flutuante posicionando-o ao lado do botão.
 * @param {string}      idDrop - id do elemento dropdown
 * @param {HTMLElement} btnEl  - botão que acionou
 * @param {number}      [margemInferior=180] - espaço mínimo para baixo
 */
function toggleDrop(idDrop, btnEl, margemInferior = 180) {
    const drop = document.getElementById(idDrop);
    if (!drop) return;
    const aberto = drop.classList.contains('visivel');
    fecharDropdowns();
    if (aberto) return;
    const rect = btnEl.getBoundingClientRect();

    // Mobile: botão na barra inferior — abre para cima colado na barra
    if (rect.top > window.innerHeight * 0.6) {
        drop.style.top    = 'auto';
        drop.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
        const dropW = 220;
        let left = Math.max(4, rect.left);
        if (left + dropW > window.innerWidth - 4) left = window.innerWidth - dropW - 4;
        drop.style.left = left + 'px';
    } else {
        drop.style.bottom = 'auto';
        drop.style.top  = Math.min(rect.top, window.innerHeight - margemInferior) + 'px';
        drop.style.left = '';
    }

    drop.classList.add('visivel');
}

// ─────────────────────────────────────────────────────
// MODAL DE ALERTA (alertSirius)
// ─────────────────────────────────────────────────────

/**
 * Exibe um alerta modal estilizado (substituto de alert()).
 * @param {string} mensagem
 * @param {string} [titulo='Sirius Web informa:']
 */
function alertSirius(mensagem, titulo = 'Sirius Web informa:') {
    const existente = document.getElementById('alertSirius');
    if (existente) existente.remove();

    const overlay = document.createElement('div');
    overlay.id = 'alertSirius';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 99999;
        display: flex; align-items: center; justify-content: center;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: white; padding: 30px; border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        max-width: 500px; width: 90%;
    `;

    box.innerHTML = `
        <h3 style="color:#667eea;margin:0 0 20px 0;font-size:1.5em;">${titulo}</h3>
        <p style="color:#333;font-size:1.1em;margin:0 0 25px 0;line-height:1.5;">${mensagem}</p>
        <button onclick="document.getElementById('alertSirius').remove()"
                style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                       color:white;border:none;padding:12px 30px;border-radius:8px;
                       cursor:pointer;font-size:16px;font-weight:bold;width:100%;">
            OK
        </button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
}

// ─────────────────────────────────────────────────────
// MODAL DE INPUT (siriusPrompt)
// ─────────────────────────────────────────────────────

/**
 * Exibe um prompt modal estilizado (substituto de prompt()).
 * @param {string} mensagem
 * @param {string} [valorPadrao='']
 * @param {string} [titulo='Digite:']
 * @returns {Promise<string|null>}
 */
function siriusPrompt(mensagem, valorPadrao = '', titulo = 'Digite:') {
    return new Promise((resolve) => {
        const existente = document.getElementById('alertSirius');
        if (existente) existente.remove();

        const overlay = document.createElement('div');
        overlay.id = 'alertSirius';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 99999;
            display: flex; align-items: center; justify-content: center;
        `;

        const box = document.createElement('div');
        box.style.cssText = `
            background: white; padding: 30px; border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-width: 500px; width: 90%;
        `;

        const inputId = 'siriusPromptInput_' + Date.now();

        box.innerHTML = `
            <h3 style="color:#667eea;margin:0 0 10px 0;font-size:1.3em;display:flex;align-items:center;gap:6px;"><span class="material-symbols-outlined" style="font-size:1em;vertical-align:middle;">search</span> ${titulo}</h3>
            <p style="color:#666;margin:0 0 15px 0;">${mensagem}</p>
            <input type="text" id="${inputId}" value="${valorPadrao}"
                   style="width:100%;padding:12px;border:2px solid #ddd;border-radius:8px;
                          font-size:16px;margin-bottom:20px;">
            <div style="display:flex;gap:10px;">
                <button id="btnCancelar"
                        style="background:#6c757d;color:white;border:none;padding:12px 30px;
                               border-radius:8px;cursor:pointer;font-size:16px;font-weight:bold;flex:1;">
                    Cancelar
                </button>
                <button id="btnOk"
                        style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                               color:white;border:none;padding:12px 30px;border-radius:8px;
                               cursor:pointer;font-size:16px;font-weight:bold;flex:1;">
                    OK
                </button>
            </div>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        const input      = document.getElementById(inputId);
        const btnOk      = document.getElementById('btnOk');
        const btnCancelar = document.getElementById('btnCancelar');

        setTimeout(() => { input.focus(); input.select(); }, 100);

        const confirmar = () => { const v = input.value.trim(); overlay.remove(); resolve(v || null); };
        const cancelar  = () => { overlay.remove(); resolve(null); };

        btnOk.onclick        = confirmar;
        btnCancelar.onclick  = cancelar;
        input.onkeypress     = e => { if (e.key === 'Enter')  confirmar(); };
        overlay.onkeydown    = e => { if (e.key === 'Escape') cancelar();  };
    });
}

// ─────────────────────────────────────────────────────
// MODAL DE ALERTA COM PROMISE (siriusAlert)
// ─────────────────────────────────────────────────────

/**
 * Exibe um alerta modal que retorna uma Promise resolvida ao fechar.
 * @param {string} mensagem
 * @param {string} [titulo='Atenção']
 * @returns {Promise<void>}
 */
function siriusAlert(mensagem, titulo = 'Atenção') {
    return new Promise((resolve) => {
        const existente = document.getElementById('siriusAlert');
        if (existente) existente.remove();

        const overlay = document.createElement('div');
        overlay.id = 'siriusAlert';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 99999;
            display: flex; align-items: center; justify-content: center;
        `;

        const box = document.createElement('div');
        box.style.cssText = `
            background: white; padding: 30px; border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-width: 500px; width: 90%;
        `;

        box.innerHTML = `
            <h3 style="color:#2563eb;margin:0 0 20px 0;font-size:1.5em;">${titulo}</h3>
            <p style="color:#333;font-size:1.1em;margin:0 0 25px 0;line-height:1.5;">${mensagem}</p>
            <button style="background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%);
                           color:white;border:none;padding:12px 30px;border-radius:8px;
                           cursor:pointer;font-size:16px;font-weight:bold;width:100%;">
                OK
            </button>
        `;

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        const fechar = () => { overlay.remove(); resolve(); };
        overlay.addEventListener('click', e => { if (e.target === overlay) fechar(); });
        box.querySelector('button').addEventListener('click', fechar);
    });
}

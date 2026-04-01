// =====================================================
// SIRIUS WEB - Log de Auditoria (Super Admin)
// Mostra logs da empresa atual — acesso restrito
// =====================================================

let paginaAtual = 1;
const LIMIT = 30;

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('sirius_token');
    if (!token) {
        alert('Você precisa fazer login primeiro!');
        window.location.href = 'index.html';
        return;
    }

    const usuario = JSON.parse(localStorage.getItem('sirius_usuario') || '{}');
    if (usuario.nome) {
        const nome = usuario.nome;
        const elNome   = document.getElementById('userName');
        const elAvatar = document.getElementById('userAvatar');
        if (elNome)   elNome.textContent   = nome;
        if (elAvatar) elAvatar.textContent = nome.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?';
    }

    // Verifica super admin via API (retorna 403 se não for)
    await verificarSuperAdmin();
    await carregarLogs();
});

// =====================================================
// VERIFICAÇÃO DE SUPER ADMIN
// =====================================================
async function verificarSuperAdmin() {
    try {
        const response = await apiFetch('/parametros/superadmin/empresas');
        if (response.status === 403) {
            alert('Acesso negado! Apenas Super Admins podem acessar esta página.');
            window.location.href = 'menu-principal.html';
        }
    } catch (error) {
        console.error('Erro ao verificar super admin:', error);
    }
}

// =====================================================
// CARREGAR LOGS
// =====================================================
async function carregarLogs(pagina = 1) {
    paginaAtual = pagina;
    mostrarMensagem('');

    const params = new URLSearchParams({ page: pagina, limit: LIMIT });

    const modulo  = document.getElementById('filtroModulo').value;
    const acao    = document.getElementById('filtroAcao').value;
    const usuario = document.getElementById('filtroUsuario').value.trim();
    const de      = document.getElementById('filtroDe').value;
    const ate     = document.getElementById('filtroAte').value;

    if (modulo)  params.append('modulo', modulo);
    if (acao)    params.append('acao', acao);
    if (usuario) params.append('usuario', usuario);
    if (de)      params.append('de', de);
    if (ate)     params.append('ate', ate);

    const tbody = document.getElementById('tabelaLogs');
    tbody.innerHTML = `<tr><td colspan="6" class="td-vazio">Carregando...</td></tr>`;

    try {
        const response = await apiFetch(`/superadmin/logs?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                alert('Acesso negado!');
                window.location.href = 'menu-principal.html';
                return;
            }
            mostrarMensagem('Erro: ' + (data.message || 'Falha ao carregar logs'), 'erro');
            tbody.innerHTML = `<tr><td colspan="6" class="td-vazio">Nenhum registro encontrado.</td></tr>`;
            return;
        }

        renderizarTabela(data.data || []);
        renderizarPaginacao(data.pagination);

    } catch (error) {
        console.error('Erro ao carregar logs:', error);
        mostrarMensagem('Erro de conexão ao carregar logs.', 'erro');
        tbody.innerHTML = `<tr><td colspan="6" class="td-vazio">Erro ao carregar.</td></tr>`;
    }
}

// =====================================================
// RENDERIZAR TABELA
// =====================================================
function renderizarTabela(logs) {
    const tbody = document.getElementById('tabelaLogs');

    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="td-vazio">Nenhum registro encontrado.</td></tr>`;
        return;
    }

    tbody.innerHTML = logs.map(log => {
        const dataHora  = formatarDataHora(log.created_at);
        const badgeClass = `badge-acao badge-${log.acao}`;
        const descricao  = escapeHtml(log.descricao || '—');
        const usuario    = escapeHtml(log.nome_usuario || '—');
        const ip         = escapeHtml(log.ip_address || '—');

        return `
        <tr>
            <td class="td-data">${dataHora}</td>
            <td>${usuario}</td>
            <td><span class="${badgeClass}">${log.acao}</span></td>
            <td>${escapeHtml(log.modulo || '—')}</td>
            <td class="td-descricao" title="${descricao}">${descricao}</td>
            <td class="td-ip">${ip}</td>
        </tr>`;
    }).join('');
}

// =====================================================
// RENDERIZAR PAGINAÇÃO
// =====================================================
function renderizarPaginacao(pag) {
    const div = document.getElementById('paginacao-audit');
    if (!pag || pag.totalPages <= 1) {
        div.style.display = 'none';
        return;
    }

    div.style.display = 'grid';

    // Esquerda: Anterior (sempre visível, desabilitado na 1ª página)
    const btnAnterior = `<button class="btn-pag" onclick="carregarLogs(${pag.page - 1})"
        ${!pag.hasPrev ? 'disabled' : ''}>‹ Anterior</button>`;

    // Centro: números de página em cima, info embaixo
    const inicio = Math.max(1, pag.page - 2);
    const fim    = Math.min(pag.totalPages, pag.page + 2);
    let numeros  = '';
    for (let i = inicio; i <= fim; i++) {
        const ativo = i === pag.page ? 'btn-pag-ativo' : '';
        numeros += `<button class="btn-pag ${ativo}" onclick="carregarLogs(${i})">${i}</button>`;
    }
    const centro = `<div class="pag-centro">
        <div class="pag-numeros">${numeros}</div>
        <span class="pag-info">Página ${pag.page} de ${pag.totalPages} — ${pag.total} registro(s)</span>
    </div>`;

    // Direita: Próximo (sempre visível, desabilitado na última página)
    const btnProximo = `<button class="btn-pag" onclick="carregarLogs(${pag.page + 1})"
        ${!pag.hasNext ? 'disabled' : ''}>Próximo ›</button>`;

    div.innerHTML = btnAnterior + centro + btnProximo;
}

// =====================================================
// FILTROS
// =====================================================
function aplicarFiltros() {
    carregarLogs(1);
}

function limparFiltros() {
    document.getElementById('filtroModulo').value  = '';
    document.getElementById('filtroAcao').value    = '';
    document.getElementById('filtroUsuario').value = '';
    document.getElementById('filtroDe').value      = '';
    document.getElementById('filtroAte').value     = '';
    carregarLogs(1);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputUsuario = document.getElementById('filtroUsuario');
    if (inputUsuario) {
        inputUsuario.addEventListener('keydown', e => {
            if (e.key === 'Enter') aplicarFiltros();
        });
    }
});

// =====================================================
// UTILITÁRIOS
// =====================================================
function formatarDataHora(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    const data = d.toLocaleDateString('pt-BR');
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${data} ${hora}`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function mostrarMensagem(texto, tipo = 'info') {
    const el = document.getElementById('mensagem-audit');
    if (!texto) { el.style.display = 'none'; return; }
    el.textContent = texto;
    el.className = `mensagem mensagem-${tipo}`;
    el.style.display = 'block';
}

// =====================================================
// VÍDEO
// =====================================================
const VIDEO_ID_AUDIT = 'wdsgAlz3Ea0'; // ← substitua pelo ID do YouTube

function abrirVideoAjuda() {
    const iframe = document.getElementById('videoIframe');
    if (iframe) iframe.src = `https://www.youtube.com/embed/${VIDEO_ID_AUDIT}?autoplay=1`;
    document.getElementById('modalVideo').style.display = 'flex';
}

function fecharVideoAjuda() {
    const iframe = document.getElementById('videoIframe');
    if (iframe) iframe.src = '';
    document.getElementById('modalVideo').style.display = 'none';
}

// =====================================================
// RELATÓRIO
// =====================================================
function abrirModalRelatorio() {
    document.getElementById('qtdPaginasRelatorio').value = '1';
    document.getElementById('modalRelatorio').style.display = 'flex';
}

function fecharModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

async function gerarRelatorioLogs() {
    const qtdPaginas = Math.max(1, Math.min(50, parseInt(document.getElementById('qtdPaginasRelatorio').value) || 1));
    fecharModal('modalRelatorio');

    mostrarMensagem('Gerando relatório, aguarde...', 'info');

    const modulo  = document.getElementById('filtroModulo').value;
    const acao    = document.getElementById('filtroAcao').value;
    const usuario = document.getElementById('filtroUsuario').value.trim();
    const de      = document.getElementById('filtroDe').value;
    const ate     = document.getElementById('filtroAte').value;

    const registros = [];

    try {
        for (let pagina = 1; pagina <= qtdPaginas; pagina++) {
            const params = new URLSearchParams({ page: pagina, limit: LIMIT });
            if (modulo)  params.append('modulo', modulo);
            if (acao)    params.append('acao', acao);
            if (usuario) params.append('usuario', usuario);
            if (de)      params.append('de', de);
            if (ate)     params.append('ate', ate);

            const response = await apiFetch(`/superadmin/logs?${params.toString()}`);
            if (!response.ok) throw new Error('Erro ao buscar dados para o relatório');

            const data = await response.json();
            if (!data.success || data.data.length === 0) break;
            registros.push(...data.data);

            // Se não há próxima página, para
            if (!data.pagination.hasNext) break;
        }

        if (registros.length === 0) {
            mostrarMensagem('Nenhum registro encontrado para o relatório.', 'erro');
            return;
        }

        mostrarMensagem('');
        imprimirRelatorioLogs(registros, { modulo, acao, usuario, de, ate });

    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        mostrarMensagem('Erro ao gerar relatório: ' + error.message, 'erro');
    }
}

function imprimirRelatorioLogs(logs, filtros) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const filtrosTexto = [
        filtros.modulo  ? `Módulo: ${filtros.modulo}`   : null,
        filtros.acao    ? `Ação: ${filtros.acao}`        : null,
        filtros.usuario ? `Usuário: ${filtros.usuario}`  : null,
        filtros.de      ? `De: ${filtros.de}`            : null,
        filtros.ate     ? `Até: ${filtros.ate}`          : null,
    ].filter(Boolean).join(' | ') || 'Nenhum filtro aplicado';

    const cabecalhoTabela = `
        <thead>
            <tr>
                <th>Data / Hora</th>
                <th>Usuário</th>
                <th>Ação</th>
                <th>Módulo</th>
                <th>Descrição</th>
                <th>IP</th>
            </tr>
        </thead>`;

    // Divide os registros em grupos de LIMIT (30) — cada grupo vira uma página de impressão
    const paginas = [];
    for (let i = 0; i < logs.length; i += LIMIT) {
        paginas.push(logs.slice(i, i + LIMIT));
    }

    const blocosPagina = paginas.map((grupo, idx) => {
        const linhas = grupo.map(log => {
            const dataHora = formatarDataHora(log.created_at);
            const acaoTxt  = log.acao || '—';
            return `
            <tr>
                <td>${dataHora}</td>
                <td>${escapeHtml(log.nome_usuario || '—')}</td>
                <td class="acao-${acaoTxt}">${acaoTxt}</td>
                <td>${escapeHtml(log.modulo || '—')}</td>
                <td>${escapeHtml(log.descricao || '—')}</td>
                <td>${escapeHtml(log.ip_address || '—')}</td>
            </tr>`;
        }).join('');

        const ultimaPagina = idx === paginas.length - 1;
        return `
        <div class="pagina${ultimaPagina ? '' : ' quebra'}">
            <table>${cabecalhoTabela}<tbody>${linhas}</tbody></table>
        </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Log de Auditoria</title>
    <style>
        @page { margin: 1cm; }
        body { font-family: Arial, sans-serif; font-size: 9pt; color: #1e293b; margin: 0; padding: 16px; }
        .toolbar { display: flex; justify-content: center; margin-bottom: 16px; }
        .btn-imprimir {
            display: flex; align-items: center; gap: 6px;
            background: #1e293b; color: #fff; border: none;
            padding: 9px 22px; border-radius: 8px; font-size: 11pt;
            font-weight: 600; cursor: pointer; letter-spacing: 0.3px;
        }
        .btn-imprimir:hover { background: #334155; }
        @media print { .toolbar { display: none; } }
        h1 { text-align: center; font-size: 15pt; margin-bottom: 4px; }
        h2 { text-align: center; font-size: 11pt; margin-top: 0; color: #64748b; }
        .info { text-align: center; margin-bottom: 16px; font-size: 8pt; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 0; }
        th { background: #1e293b; color: #fff; padding: 6px 8px; text-align: left; font-size: 8pt; }
        td { border-bottom: 1px solid #e2e8f0; padding: 5px 8px; font-size: 8pt; }
        tr:nth-child(even) td { background: #f8fafc; }
        .acao-CRIOU   { color: #166534; font-weight: 700; }
        .acao-ALTEROU { color: #1e40af; font-weight: 700; }
        .acao-EXCLUIU { color: #991b1b; font-weight: 700; }
        .pagina { margin-bottom: 24px; }
        .quebra { page-break-after: always; }
        .footer { margin-top: 20px; text-align: center; font-size: 7pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; }
    </style>
</head>
<body>
    <div class="toolbar">
        <button class="btn-imprimir" onclick="window.print()">
            &#128438; Imprimir / Salvar PDF
        </button>
    </div>
    <h1>LOG DE AUDITORIA</h1>
    <h2>SIRIUS WEB ERP</h2>
    <div class="info">
        Emitido em: ${dataAtual} &nbsp;|&nbsp; Filtros: ${filtrosTexto}
    </div>
    ${blocosPagina}
    <div class="footer">
        Relatório gerado pelo SIRIUS WEB ERP &nbsp;·&nbsp; ${logs.length} registro(s)
    </div>
</body>
</html>`;

    abrirJanelaImpressao(html);
}

function abrirJanelaImpressao(html) {
    const blob   = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url    = URL.createObjectURL(blob);
    const janela = window.open(url, '_blank');

    if (!janela) {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-auditoria.html';
        link.click();
        mostrarMensagem('Popup bloqueado. O relatório foi baixado como arquivo HTML — abra-o no navegador e imprima.', 'erro');
    }
}

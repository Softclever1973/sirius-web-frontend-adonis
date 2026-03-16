// =====================================================
// SIRIUS WEB - Regimes Tributários
// =====================================================

// PÁGINA BLOQUEADA — redireciona qualquer acesso
window.location.replace('menu-principal.html');

// isDev e API_URL fornecidos por js/libs/api.js

// Estado da aplicação
let regimesTributarios = [];
let regimesTributariosFiltrados = [];
let regimeTributarioEditando = null;
let paginaAtual = 1;
const itensPorPagina = 10;
let filtroAtivo = null;
let ordenacaoAtiva = 'nome';

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();
    carregarRegimesTributarios();

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.sidebar-icones') &&
            !e.target.closest('.dropdown-flutuante')) {
            fecharDropdowns();
        }
    });

    // Fechar modal de aviso ao clicar fora
    document.getElementById('modalAviso').addEventListener('click', function (e) {
        if (e.target === this) closeMessage();
    });

    console.log('✅ Regimes Tributários | Sidebar ícones compacta | SIRIUS WEB');
});

function verificarAutenticacao() {
    const token = localStorage.getItem('sirius_token');
    if (!token) {
        window.location.href = 'index.html';
    }
}

// =====================================================
// DROPDOWNS FLUTUANTES (sidebar)
// =====================================================

const IDS_DROPS = ['dropFiltros', 'dropOrdenacao', 'dropRelatorios'];

// fecharDropdowns() e toggleDrop() fornecidos por js/libs/ui.js

// =====================================================
// MODAL DE AVISO
// =====================================================

function showMessage(msg) {
    document.getElementById('mensagemAviso').textContent = msg;
    document.getElementById('modalAviso').classList.add('visivel');
}

function closeMessage() {
    document.getElementById('modalAviso').classList.remove('visivel');
}

// =====================================================
// CARREGAR REGIMES TRIBUTÁRIOS
// =====================================================

async function carregarRegimesTributarios() {
    const token = localStorage.getItem('sirius_token');
    const loading = document.getElementById('loading');
    const tbody = document.getElementById('tbody');

    loading.style.display = 'block';
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px;">⏳ Carregando...</td></tr>';

    try {
        const response = await fetch(`${API_URL}/regimes-tributarios`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            regimesTributarios = data.data;
            regimesTributariosFiltrados = [...regimesTributarios];
            aplicarOrdenacao(ordenacaoAtiva);
            renderizarTabela();
        } else {
            mostrarMensagem(data.message || 'Erro ao carregar regimes tributários', 'erro');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao conectar com o servidor', 'erro');
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px; color: #ef4444;">❌ Erro ao carregar dados</td></tr>';
    } finally {
        loading.style.display = 'none';
    }
}

// =====================================================
// RENDERIZAR TABELA
// =====================================================

function renderizarTabela() {
    const tbody = document.getElementById('tbody');
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = regimesTributariosFiltrados.slice(inicio, fim);

    if (itensPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px;">Nenhum regime tributário encontrado</td></tr>';
        atualizarPaginacao();
        return;
    }

    tbody.innerHTML = itensPagina.map(rt => `
        <tr>
            <td>${rt.id_rt}</td>
            <td><strong>${rt.nome}</strong></td>
            <td>${rt.descricao || '-'}</td>
            <td>
                <button class="btn-small btn-view"   onclick="visualizarRegimeTributario(${rt.id_rt})">👁️</button>
                <button class="btn-small btn-edit"   onclick="editarRegimeTributario(${rt.id_rt})">✏️</button>
                <button class="btn-small btn-delete" onclick="confirmarExclusao(${rt.id_rt})">🗑️</button>
            </td>
        </tr>
    `).join('');

    atualizarPaginacao();
}

// =====================================================
// PAGINAÇÃO
// =====================================================

function atualizarPaginacao() {
    const totalPaginas = Math.ceil(regimesTributariosFiltrados.length / itensPorPagina);
    document.getElementById('btnPrev').disabled = paginaAtual === 1;
    document.getElementById('btnNext').disabled = paginaAtual >= totalPaginas;
    document.getElementById('pageInfo').textContent = `Página ${paginaAtual} de ${totalPaginas || 1}`;
}

function mudarPagina(direcao) {
    const totalPaginas = Math.ceil(regimesTributariosFiltrados.length / itensPorPagina);
    paginaAtual = Math.max(1, Math.min(paginaAtual + direcao, totalPaginas));
    renderizarTabela();
}

// =====================================================
// FILTROS E ORDENAÇÃO
// =====================================================

async function aplicarFiltro(tipo) {
    const label = tipo === 'nome' ? 'Digite o nome para filtrar:' : 'Digite o ID para filtrar:';
    const termo = await mostrarPromptPersonalizado(label);
    if (!termo) return;

    filtroAtivo = { tipo, termo };

    regimesTributariosFiltrados = regimesTributarios.filter(rt => {
        if (tipo === 'nome') return rt.nome.toLowerCase().includes(termo.toLowerCase());
        if (tipo === 'id')   return rt.id_rt.toString() === termo;
        return true;
    });

    paginaAtual = 1;
    renderizarTabela();
    mostrarFiltroAtivo(tipo, termo);
}

function limparFiltro() {
    filtroAtivo = null;
    regimesTributariosFiltrados = [...regimesTributarios];
    aplicarOrdenacao(ordenacaoAtiva);
    paginaAtual = 1;
    renderizarTabela();
    document.getElementById('filtroAtivo').style.display = 'none';
}

function mostrarFiltroAtivo(tipo, termo) {
    const tipoTexto = tipo === 'nome' ? 'Nome' : 'ID';
    document.getElementById('textoFiltro').textContent = `${tipoTexto}: "${termo}"`;
    document.getElementById('filtroAtivo').style.display = 'flex';
}

function aplicarOrdenacao(tipo) {
    ordenacaoAtiva = tipo;

    regimesTributariosFiltrados.sort((a, b) => {
        if (tipo === 'nome')         return a.nome.localeCompare(b.nome);
        if (tipo === 'data_criacao') return new Date(a.created_at) - new Date(b.created_at);
        if (tipo === 'ultimos')      return new Date(b.created_at) - new Date(a.created_at);
        return 0;
    });

    paginaAtual = 1;
    renderizarTabela();
}

// =====================================================
// MODAL CADASTRO / EDIÇÃO
// =====================================================

function abrirModal() {
    regimeTributarioEditando = null;
    document.getElementById('modalTitle').textContent = 'Novo Regime Tributário';
    document.getElementById('regimeTributarioForm').reset();
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

async function salvarRegimeTributario(event) {
    event.preventDefault();
    const token = localStorage.getItem('sirius_token');

    const dados = {
        nome:      document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim()
    };

    try {
        const url    = regimeTributarioEditando
            ? `${API_URL}/regimes-tributarios/${regimeTributarioEditando}`
            : `${API_URL}/regimes-tributarios`;
        const method = regimeTributarioEditando ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (data.success) {
            mostrarMensagem(data.message, 'sucesso');
            fecharModal();
            carregarRegimesTributarios();
        } else {
            mostrarMensagem(data.message || 'Erro ao salvar regime tributário', 'erro');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao conectar com o servidor', 'erro');
    }
}

// =====================================================
// EDITAR REGIME TRIBUTÁRIO
// =====================================================

async function editarRegimeTributario(id) {
    const token = localStorage.getItem('sirius_token');

    try {
        const response = await fetch(`${API_URL}/regimes-tributarios/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            const rt = data.data;
            regimeTributarioEditando = id;

            document.getElementById('modalTitle').textContent = 'Editar Regime Tributário';
            document.getElementById('nome').value      = rt.nome;
            document.getElementById('descricao').value = rt.descricao || '';

            document.getElementById('modal').style.display = 'flex';
        } else {
            mostrarMensagem(data.message || 'Erro ao buscar regime tributário', 'erro');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao conectar com o servidor', 'erro');
    }
}

// =====================================================
// VISUALIZAR REGIME TRIBUTÁRIO
// =====================================================

async function visualizarRegimeTributario(id) {
    const token = localStorage.getItem('sirius_token');

    try {
        const response = await fetch(`${API_URL}/regimes-tributarios/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            const rt = data.data;

            document.getElementById('detalhesConteudo').innerHTML = `
                <div class="detalhes-grid">
                    <div class="detalhe-item">
                        <strong>ID:</strong>
                        <span>${rt.id_rt}</span>
                    </div>
                    <div class="detalhe-item">
                        <strong>Nome:</strong>
                        <span>${rt.nome}</span>
                    </div>
                    <div class="detalhe-item" style="grid-column: 1 / -1;">
                        <strong>Descrição:</strong>
                        <span>${rt.descricao || 'Não informada'}</span>
                    </div>
                    <div class="detalhe-item">
                        <strong>Criado em:</strong>
                        <span>${new Date(rt.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                </div>
            `;
            document.getElementById('modalDetalhes').style.display = 'flex';
        } else {
            mostrarMensagem(data.message || 'Erro ao buscar regime tributário', 'erro');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao conectar com o servidor', 'erro');
    }
}

function fecharModalDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function imprimirDetalhes() {
    window.print();
}

// =====================================================
// EXCLUIR REGIME TRIBUTÁRIO
// =====================================================

let idRegimeTributarioExcluir = null;

function confirmarExclusao(id) {
    idRegimeTributarioExcluir = id;
    const rt = regimesTributarios.find(r => r.id_rt === id);
    mostrarModalConfirmacao(
        `Deseja realmente excluir o regime tributário "${rt.nome}"?`,
        excluirRegimeTributario
    );
}

async function excluirRegimeTributario() {
    const token = localStorage.getItem('sirius_token');

    try {
        const response = await fetch(`${API_URL}/regimes-tributarios/${idRegimeTributarioExcluir}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            mostrarMensagem(data.message, 'sucesso');
            fecharModalConfirmacao();
            carregarRegimesTributarios();
        } else {
            mostrarMensagem(data.message || 'Erro ao excluir regime tributário', 'erro');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao conectar com o servidor', 'erro');
    }
}

// =====================================================
// MODAL DE CONFIRMAÇÃO PERSONALIZADO
// =====================================================

function mostrarModalConfirmacao(mensagem, callback) {
    document.getElementById('mensagemConfirmacao').textContent = mensagem;
    document.getElementById('modalConfirmacao').style.display = 'flex';
    document.getElementById('btnConfirmar').onclick = callback;
}

function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}

// =====================================================
// MODAL DE INPUT PERSONALIZADO
// =====================================================

function mostrarPromptPersonalizado(mensagem) {
    return new Promise((resolve) => {
        document.getElementById('mensagemInput').textContent = mensagem;
        document.getElementById('inputValor').value = '';
        document.getElementById('modalInput').style.display = 'flex';

        setTimeout(() => document.getElementById('inputValor').focus(), 100);

        const btnConfirmar = document.getElementById('btnConfirmarInput');
        const inputValor   = document.getElementById('inputValor');

        // Recriar botão para remover listeners antigos
        const novoBtn = btnConfirmar.cloneNode(true);
        btnConfirmar.parentNode.replaceChild(novoBtn, btnConfirmar);

        const confirmar = () => {
            const valor = inputValor.value.trim();
            fecharModalInput();
            resolve(valor || null);
        };

        novoBtn.onclick = confirmar;
        inputValor.onkeypress = (e) => { if (e.key === 'Enter') confirmar(); };
    });
}

function fecharModalInput() {
    document.getElementById('modalInput').style.display = 'none';
}

// =====================================================
// MENSAGENS
// =====================================================

// mostrarMensagem() fornecido por js/libs/ui.js

// =====================================================
// RELATÓRIO
// =====================================================

function gerarRelatorio() {
    window.print();
}

// =====================================================
// FECHAR MODAIS AO CLICAR FORA
// =====================================================

window.onclick = function (event) {
    if (event.target === document.getElementById('modal'))             fecharModal();
    if (event.target === document.getElementById('modalDetalhes'))     fecharModalDetalhes();
    if (event.target === document.getElementById('modalConfirmacao'))  fecharModalConfirmacao();
};
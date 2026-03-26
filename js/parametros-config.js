// =====================================================
// SIRIUS WEB - Configuração de Parâmetros (Super Admin)
// =====================================================

const VIDEO_URL_PARAMETROS_CONFIG = 'https://www.youtube.com/embed/FIj2oEv0G5M?si=DjM_lYZW1xn_NEGV'; // Cole aqui: https://www.youtube.com/embed/SEU_ID

function abrirVideoAjuda() {
    if (!VIDEO_URL_PARAMETROS_CONFIG) { alert('Nenhum vídeo cadastrado ainda.'); return; }
    document.getElementById('videoIframe').src = VIDEO_URL_PARAMETROS_CONFIG;
    document.getElementById('modalVideo').style.display = 'flex';
}

function fecharVideoAjuda() {
    document.getElementById('modalVideo').style.display = 'none';
    document.getElementById('videoIframe').src = '';
}

// Configuração da API (usando isDev e API_URL do auth.js)


// Estado
let empresaAtual = null;
let parametrosOriginais = [];
let parametrosModificados = new Map(); // id_parametro => novo valor

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', async () => {
    verificarSuperAdmin();
    
    const usuario = JSON.parse(localStorage.getItem('sirius_usuario'));
    if (usuario) {
        document.getElementById('userNome').textContent = usuario.nome;
    }
    
    await carregarEmpresaAtual();
});

// =====================================================
// AUTENTICAÇÃO
// =====================================================
function verificarSuperAdmin() {
    const token = localStorage.getItem('sirius_token');
    if (!token) {
        alert('Você precisa fazer login primeiro!');
        window.location.href = 'index.html';
        return;
    }
    
    // Verificar se usuário é super admin será feito pela API
    // Se não for, a API retornará 403
}

function logout() {
    localStorage.removeItem('sirius_token');
    localStorage.removeItem('sirius_usuario');
    localStorage.removeItem('sirius_empresas');
    window.location.href = 'index.html';
}

// =====================================================
// CARREGAR EMPRESA ATUAL DO USUÁRIO
// =====================================================
async function carregarEmpresaAtual() {
    try {
        const token = localStorage.getItem('sirius_token');
        
        const response = await fetch(`${API_URL}/parametros/superadmin/empresas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 403) {
                alert('Acesso negado! Apenas Super Administradores podem acessar esta página.');
                window.location.href = 'dashboard.html';
                return;
            }
            throw new Error(data.message || 'Erro ao carregar empresa');
        }
        
        if (data.success && data.data.length > 0) {
            // Pegar a primeira empresa (ou única) relacionada ao usuário
            const empresa = data.data[0];
            empresaAtual = empresa;
            
            // Mostrar informações da empresa
            document.getElementById('empresaRazao').textContent = empresa.razao_social;
            document.getElementById('empresaCnpj').textContent = empresa.cnpj;
            document.getElementById('empresaPlano').textContent = empresa.plano;
            
            // Carregar parâmetros desta empresa
            await carregarParametrosEmpresa(empresa.id_empresa);
        } else {
            // Usuário não tem empresas associadas
            document.getElementById('empresaInfo').style.display = 'none';
            document.getElementById('parametrosContainer').style.display = 'none';
            document.getElementById('emptyState').style.display = 'block';
            document.getElementById('emptyState').innerHTML = `
                <div class="empty-icon"><span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">block</span></div>
                <h3>Empresa Não Encontrada</h3>
                <p>Você não possui empresas associadas para configurar parâmetros.</p>
            `;
        }
        
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao carregar empresa: ' + error.message, 'error');
    }
}

// =====================================================
// CARREGAR PARÂMETROS DA EMPRESA
// =====================================================
async function carregarParametrosEmpresa(empresaId) {
    if (!empresaId) {
        // Limpar tela
        document.getElementById('parametrosContainer').style.display = 'none';
        document.getElementById('emptyState').style.display = 'block';
        parametrosModificados.clear();
        return;
    }
    
    // Carregar parâmetros
    document.getElementById('loading').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('parametrosContainer').style.display = 'none';
    
    try {
        const token = localStorage.getItem('sirius_token');
        
        const response = await fetch(`${API_URL}/parametros/superadmin/empresa/${empresaId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            parametrosOriginais = data.data;
            parametrosModificados.clear();
            renderizarParametros(data.porModulo);
            document.getElementById('parametrosContainer').style.display = 'block';
        } else {
            throw new Error(data.message);
        }
        
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao carregar parâmetros: ' + error.message, 'error');
        document.getElementById('emptyState').style.display = 'block';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// =====================================================
// RENDERIZAR PARÂMETROS
// =====================================================
function renderizarParametros(porModulo) {
    const grid = document.getElementById('parametrosGrid');
    grid.innerHTML = '';
    
    const icones = {
        'PDV': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">shopping_cart</span>',
        'NFCe': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">receipt_long</span>',
        'Estoque': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">inventory_2</span>',
        'Financeiro': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">payments</span>',
        'Vendas': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">work</span>',
        'Geral': '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">settings</span>'
    };
    
    Object.keys(porModulo).forEach(modulo => {
        const section = document.createElement('div');
        section.className = 'modulo-section';
        
        section.innerHTML = `
            <div class="modulo-header">
                <span class="modulo-icon">${icones[modulo] || '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">settings</span>'}</span>
                <h3 class="modulo-title">${modulo}</h3>
            </div>
            <div class="parametros-list" id="modulo-${modulo}"></div>
        `;
        
        grid.appendChild(section);
        
        const lista = section.querySelector('.parametros-list');
        
        porModulo[modulo].forEach(param => {
            const item = criarItemParametro(param);
            lista.appendChild(item);
        });
    });
}

function criarItemParametro(param) {
    const div = document.createElement('div');
    div.className = 'parametro-item';
    div.dataset.idParametro = param.id_parametro;
    
    const opcoes = param.opcoes || [];
    const opcoesHtml = opcoes.map(op => 
        `<option value="${op}" ${op === param.valor_atual ? 'selected' : ''}>${op}</option>`
    ).join('');
    
    const badgeClass = param.tem_valor_customizado ? 'badge-customizado' : 'badge-padrao';
    const badgeText = param.tem_valor_customizado ? 'CUSTOMIZADO' : 'PADRÃO';
    
    div.innerHTML = `
        <div class="parametro-header">
            <div class="parametro-info">
                <div class="parametro-codigo">${param.codigo}</div>
                <div class="parametro-descricao">${param.descricao}</div>
                ${param.descricao_complementar ? `<div class="parametro-complementar">${param.descricao_complementar}</div>` : ''}
            </div>
            <div class="parametro-control">
                <span class="badge ${badgeClass}">${badgeText}</span>
                <div class="parametro-valor">
                    <select class="valor-select" 
                            data-id="${param.id_parametro}" 
                            data-valor-original="${param.valor_atual}"
                            onchange="marcarComoModificado(${param.id_parametro}, this.value)">
                        ${opcoesHtml}
                    </select>
                    ${param.tem_valor_customizado ? `
                        <button class="btn-reset"
                                onclick="resetarValor(${param.id_parametro})"
                                title="Resetar para padrão (${param.valor_padrao})">
                            <span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">sync</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    return div;
}

// =====================================================
// MARCAR COMO MODIFICADO
// =====================================================
function marcarComoModificado(idParametro, novoValor) {
    const select = document.querySelector(`select[data-id="${idParametro}"]`);
    const valorOriginal = select.dataset.valorOriginal;
    
    if (novoValor !== valorOriginal) {
        select.classList.add('modificado');
        parametrosModificados.set(idParametro, novoValor);
    } else {
        select.classList.remove('modificado');
        parametrosModificados.delete(idParametro);
    }
    
    atualizarContadorModificacoes();
}

function atualizarContadorModificacoes() {
    const total = parametrosModificados.size;
    const btnSalvar = document.querySelector('.btn-success');
    
    if (total > 0) {
        btnSalvar.textContent = `Salvar ${total} Alteraç${total > 1 ? 'ões' : 'ão'}`;
        btnSalvar.style.animation = 'pulse 1s infinite';
    } else {
        btnSalvar.textContent = 'Salvar Todas Alterações';
        btnSalvar.style.animation = 'none';
    }
}

// =====================================================
// SALVAR ALTERAÇÕES
// =====================================================
async function salvarTodasAlteracoes() {
    const btnSalvar = document.querySelector('.btn-success');
    if (parametrosModificados.size === 0) {
        mostrarMensagem('Nenhuma alteração para salvar', 'info');
        return;
    }
    
    if (!confirm(`Salvar ${parametrosModificados.size} alteração(ões) para ${empresaAtual.razao_social}?`)) {
        return;
    }
    
    const token = localStorage.getItem('sirius_token');
    let sucessos = 0;
    let erros = 0;
    
    for (const [idParametro, valor] of parametrosModificados) {
        try {
            const response = await fetch(`${API_URL}/parametros/superadmin/valor`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_empresa: empresaAtual.id_empresa,
                    id_parametro: parseInt(idParametro),
                    valor: valor
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                sucessos++;
            } else {
                erros++;
                console.error('Erro ao salvar:', data.message);
            }
            
        } catch (error) {
            erros++;
            console.error('Erro:', error);
        }
    }
    
    if (erros === 0) {
        mostrarMensagem(`${sucessos} parâmetro(s) salvo(s) com sucesso!`, 'success');
        parametrosModificados.clear();
        await carregarEmpresaAtual(); // Recarregar empresa e parâmetros
    } else {
        mostrarMensagem(`${sucessos} salvo(s), ${erros} erro(s)`, 'error');
    }
    btnSalvar.textContent = `Salvar Alterações`;
}

// =====================================================
// RESETAR VALOR
// =====================================================
async function resetarValor(idParametro) {
    const param = parametrosOriginais.find(p => p.id_parametro === idParametro);
    
    if (!confirm(`Resetar "${param.descricao}" para o valor padrão (${param.valor_padrao})?`)) {
        return;
    }
    
    try {
        const token = localStorage.getItem('sirius_token');
        
        const response = await fetch(
            `${API_URL}/parametros/superadmin/valor/${empresaAtual.id_empresa}/${idParametro}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensagem('Valor resetado para o padrão!', 'success');
            await carregarEmpresaAtual();
        } else {
            throw new Error(data.message);
        }
        
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao resetar: ' + error.message, 'error');
    }
}

// =====================================================
// RESETAR TODOS
// =====================================================
async function resetarTodosValores() {
    const customizados = parametrosOriginais.filter(p => p.tem_valor_customizado);
    
    if (customizados.length === 0) {
        mostrarMensagem('Nenhum parâmetro customizado para resetar', 'info');
        return;
    }
    
    if (!confirm(`Resetar TODOS os ${customizados.length} parâmetros customizados de ${empresaAtual.razao_social} para os valores padrão?`)) {
        return;
    }
    
    const token = localStorage.getItem('sirius_token');
    let sucessos = 0;
    
    for (const param of customizados) {
        try {
            const response = await fetch(
                `${API_URL}/parametros/superadmin/valor/${empresaAtual.id_empresa}/${param.id_parametro}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (response.ok) {
                sucessos++;
            }
            
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    
    mostrarMensagem(`${sucessos} parâmetro(s) resetado(s)!`, 'success');
    await carregarEmpresaAtual();
}

// =====================================================
// MENSAGENS
// =====================================================
// mostrarMensagem() fornecido por js/libs/ui.js

// ─────────────────────────────────────────────────────
// PARTÍCULAS
// ─────────────────────────────────────────────────────

(function() {
    const canvas = document.getElementById('particulas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    const cores = ['37,99,235','96,165,250','16,185,129','14,165,233','99,102,241'];
    const ps = Array.from({length: 35}, () => ({
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

// ─────────────────────────────────────────────────────
// RELÓGIO
// ─────────────────────────────────────────────────────

(function() {
    const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    function tick() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        const s = String(now.getSeconds()).padStart(2,'0');
        const elHora = document.getElementById('relogioHora');
        const elData = document.getElementById('relogioData');
        if (elHora) elHora.textContent = `${h}:${m}:${s}`;
        if (elData) elData.textContent =
            `${diasSemana[now.getDay()]} · ${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
    }
    tick(); setInterval(tick, 1000);
})();

// ─────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usr = JSON.parse(localStorage.getItem('sirius_usuario') || '{}');
        if (usr.nome) {
            const elNome   = document.getElementById('userNome');
            const elAvatar = document.getElementById('userAvatar');
            if (elNome)   elNome.textContent   = usr.nome;
            if (elAvatar) elAvatar.textContent = usr.nome.charAt(0).toUpperCase();
        }
    } catch(e) {}

    ocultarLoading();
});

function ocultarLoading() {
    setTimeout(() => {
        const el = document.getElementById('loadingOverlay');
        if (el) el.classList.add('oculto');
    }, 600);
}

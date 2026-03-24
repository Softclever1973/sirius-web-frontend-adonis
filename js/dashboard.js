// =====================================================
// SIRIUS WEB - Dashboard
// Depende de: js/libs/api.js, js/auth.js
// =====================================================

/* ============================================================
   PARTÍCULAS
   ============================================================ */
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

/* ============================================================
   RELÓGIO
   ============================================================ */
(function() {
    const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    function tick() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        const s = String(now.getSeconds()).padStart(2,'0');
        document.getElementById('relogioHora').textContent = `${h}:${m}:${s}`;
        document.getElementById('relogioData').textContent =
            `${diasSemana[now.getDay()]} · ${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
    }
    tick(); setInterval(tick, 1000);
})();

/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let diasPeriodo = 0; // 0 = hoje, 6 = 7 dias, 29 = 30 dias
let dadosCache  = {};
let dataInicialSelecionada = '';
let dataFinalSelecionada = '';

/* logout() vem do auth.js */

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticação e permissão de admin/super admin
    const token = localStorage.getItem('sirius_token');
    if (!token) { window.location.href = 'index.html'; return; }

    const empresas = JSON.parse(localStorage.getItem('sirius_empresas') || '[]');
    const empresaId = empresas[0]?.id;
    const permResp = await fetch(`${API_URL}/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}`, 'X-Empresa-Id': empresaId }
    });
    if (!permResp.ok) {
        if (permResp.status === 403) {
            alert('Acesso negado! Apenas administradores podem acessar o dashboard.');
        }
        window.location.href='menu-principal.html'
        return;
    }

    // Usuário
    try {
        const usr = JSON.parse(localStorage.getItem('sirius_usuario') || '{}');
        if (usr.nome) {
            document.getElementById('userNome').textContent = usr.nome;
            document.getElementById('userAvatar').textContent = usr.nome.charAt(0).toUpperCase();
            const cargo = usr.tipo || usr.perfil || usr.cargo || usr.role || 'Usuário';
            document.getElementById('userCargo').textContent = cargo;
        }
    } catch(e) {}

    // Redesenha gráfico ao redimensionar janela
    window.addEventListener('resize', () => {
        const periodo = document.querySelector('.periodo-btn.ativo');
        if (periodo) periodo.click();
    });

    // Empresa
    try {
        const emps = JSON.parse(localStorage.getItem('sirius_empresas') || '[]');
        if (emps.length > 0) {
            document.getElementById('nomeEmpresa').textContent = emps[0].nome_fantasia || emps[0].razao_social;
        }
    } catch(e) {}

    await carregarDados();
    ocultarLoading();
});

/* ============================================================
   OCULTAR LOADING
   ============================================================ */
function ocultarLoading() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('oculto');
    }, 600);
}

/* ============================================================
   SELETOR DE PERÍODO
   ============================================================ */
function selecionarPeriodo(dias, btn) {
    diasPeriodo = dias;
    const inputInicial = document.getElementById('dataInicial');
    const inputFinal = document.getElementById('dataFinal');
    const confirmBtn = document.getElementById('intervaloConfirm');
    if ((diasPeriodo == 'X')){
        if (inputInicial) {
            inputInicial.style.display = 'inline-block';
            inputInicial.value = '2026-02-17';
        }
        if (inputFinal) {
            inputFinal.style.display = 'inline-block';
            inputFinal.value = '2026-02-28';
        }
        if (confirmBtn) confirmBtn.style.display = 'inline-block';
    } else {
        if (inputInicial) {
            inputInicial.style.display = 'none';
            inputInicial.value = '';
        }
        if (inputFinal) {
            inputFinal.style.display = 'none';
            inputFinal.value = '';
        }

        if (confirmBtn) confirmBtn.style.display = 'none';
        dataInicialSelecionada = '';
        dataFinalSelecionada = '';

        const labels = { 0: 'Hoje', 6: 'Últimos 7 dias', 29: 'Últimos 30 dias' };
        document.getElementById('grafSubtitulo').textContent = labels[dias] || '';
        carregarDados();
    }
    if (btn != 'na'){
        document.querySelectorAll('.periodo-btn').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
    }
}

function confirmarIntervalo() {
    const inputInicial = document.getElementById('dataInicial');
    const inputFinal = document.getElementById('dataFinal');
    if (!inputInicial || !inputFinal) return;
    const dataInicial = inputInicial.value;
    const dataFinal = inputFinal.value;
    if (!dataInicial || !dataFinal) {
        alert('Por favor, selecione ambas as datas.');
        return;
    }
    if (new Date(dataInicial) > new Date(dataFinal)) {
        alert('A data inicial não pode ser posterior à data final.');
        return;
    }
    diasPeriodo = 'datas';
    dataInicialSelecionada = dataInicial;
    dataFinalSelecionada = dataFinal;
    document.getElementById('grafSubtitulo').textContent = `De ${dataInicial} até ${dataFinal}`;
    carregarDados();
}

/* ============================================================
   CARREGAR DADOS DA API
   ============================================================ */
async function carregarDados() {
    const empresaId = obterEmpresaId();
    const token     = obterToken();

    if (!empresaId || !token) {
        usarDadosMock();
        return;
    }

    try {
        const params = new URLSearchParams({ page: 1, limit: 200 });

        if (diasPeriodo === 0) {
            params.append('hoje', 'true');
        } else if (diasPeriodo === 'datas') {
            params.append('data_inicial', dataInicialSelecionada);
            params.append('data_final', dataFinalSelecionada);
        } else {
            const dataInicio = new Date();
            dataInicio.setDate(dataInicio.getDate() - diasPeriodo);
            params.append('data_inicial', dataInicio.toISOString().split('T')[0]);
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'X-Empresa-Id': empresaId
        };

        const [respPedidos, respFormas, respFormasAtivas] = await Promise.all([
            fetch(`${API_URL}/pdv/pedidos?${params}`, { headers }),
            fetch(`${API_URL}/pdv/pedidos/totais-formas?${params}`, { headers }),
            fetch(`${API_URL}/pdv/formas-pagamento`, { headers })
        ]);

        if (!respPedidos.ok) throw new Error('API indisponível');

        const result          = await respPedidos.json();
        const resultFormas    = respFormas.ok        ? await respFormas.json()       : { data: [] };
        const resultFormasAtivas = respFormasAtivas.ok ? await respFormasAtivas.json() : { data: [] };

        if (!result.success) throw new Error('Dados inválidos');

        // Merge: todas as formas ativas, com o total real (ou 0)
        const totaisMap = Object.fromEntries((resultFormas.data || []).map(f => [f.id_forma_pagamento, f]));
        const totaisMerged = (resultFormasAtivas.data || []).map(f => ({
            id_forma_pagamento: f.id,
            descricao: f.descricao,
            total: parseFloat(totaisMap[f.id]?.total || 0)
        })).sort((a, b) => b.total - a.total);

        processarDados(result.data || [], totaisMerged);

    } catch(err) {
        console.warn('Usando dados de demonstração:', err.message);
        usarDadosMock();
    }
}

/* ============================================================
   PROCESSAR DADOS REAIS
   ============================================================ */
function processarDados(pedidos, totaisFormas = []) {
    const total     = pedidos.length;
    const faturado  = pedidos.reduce((s, p) => s + parseFloat(p.valor_liquido || 0), 0);
    const ticket    = total > 0 ? faturado / total : 0;
    const finalizados = pedidos.filter(p => p.status === 'F').length;
    const abertos     = pedidos.filter(p => p.status === 'A').length;
    const cancelados  = pedidos.filter(p => p.status === 'C').length;

    animarNumero('kpiPedidos', total, '', false);
    animarNumero('kpiFaturado', faturado, 'R$ ', true);
    animarNumero('kpiTicket', ticket, 'R$ ', true);
    animarNumero('kpiFinalizados', finalizados, '', false);

    const taxaFin = total > 0 ? Math.round((finalizados / total) * 100) : 0;
    document.getElementById('kpiPedidosDelta').textContent    = `${total} registros`;
    document.getElementById('kpiFaturadoDelta').textContent   = `Ticket médio R$ ${fmt(ticket)}`;
    document.getElementById('kpiTicketDelta').textContent     = `${total} pedidos`;
    document.getElementById('kpiFinalizadosDelta').textContent = `${taxaFin}% de conclusão`;
    definirClasseDelta('kpiFinalizadosDelta', taxaFin >= 70 ? 'pos' : taxaFin >= 40 ? 'neu' : 'neg');

    let diasParaGrafico = 6;
    if (diasPeriodo === 0) {
        diasParaGrafico = 0;
    } else if (diasPeriodo === 'datas') {
        if (dataInicialSelecionada && dataFinalSelecionada) {
            const d1 = new Date(dataInicialSelecionada);
            const d2 = new Date(dataFinalSelecionada);
            diasParaGrafico = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        }
    } else if (typeof diasPeriodo === 'number' && diasPeriodo > 0) {
        diasParaGrafico = diasPeriodo;
    }

    const dadosLinha = gerarSeriesTemporais(pedidos, diasParaGrafico);
    desenharGraficoLinha(dadosLinha.labels, dadosLinha.valores, dadosLinha.qtds);

    desenharDonut([finalizados, abertos, cancelados]);
    renderizarUltimosPedidos(pedidos.slice(0, 8));
    renderizarFormasPgto(totaisFormas);
}

/* ============================================================
   GERAR SÉRIES TEMPORAIS DOS PEDIDOS
   ============================================================ */
function gerarSeriesTemporais(pedidos, dias) {
    const numPontos = dias === 0 ? 12 : Math.max(dias + 1, 2);
    const labels = [];
    const valores = [];
    const qtds   = [];

    const agora = new Date();
    let dataRef = agora;

    if (diasPeriodo === 'datas' && dataFinalSelecionada) {
        const dataParts = dataFinalSelecionada.split('-');
        dataRef = new Date(dataParts[0], dataParts[1] - 1, dataParts[2]);
    }

    for (let i = numPontos - 1; i >= 0; i--) {
        if (dias === 0) {
            const h = dataRef.getHours() - (i * 2);
            labels.push(`${Math.max(0, h)}h`);
            const slice = pedidos.filter(p => {
                const ph = new Date(p.created_at).getHours();
                return ph >= Math.max(0, h) && ph < Math.max(0, h) + 2;
            });
            valores.push(slice.reduce((s, p) => s + parseFloat(p.valor_liquido || 0), 0));
            qtds.push(slice.length);
        } else {
            const d = new Date(dataRef);
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            const dStr = d.toISOString().split('T')[0];
            const slice = pedidos.filter(p => (p.created_at || '').startsWith(dStr));
            valores.push(slice.reduce((s, p) => s + parseFloat(p.valor_liquido || 0), 0));
            qtds.push(slice.length);
        }
    }
    return { labels, valores, qtds };
}

/* ============================================================
   DADOS MOCK (fallback elegante)
   ============================================================ */
function usarDadosMock() {
    let diasLabel = '';
    let fator = 1;

    if (diasPeriodo === 0) {
        diasLabel = 'Hoje';
        fator = 1;
    } else if (diasPeriodo === 'datas' && dataInicialSelecionada && dataFinalSelecionada) {
        const d1 = new Date(dataInicialSelecionada);
        const d2 = new Date(dataFinalSelecionada);
        const dias = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        diasLabel = `${dias} dias`;
        fator = dias / 7;
    } else if (diasPeriodo === 6) {
        diasLabel = '7 dias';
        fator = 7;
    } else if (diasPeriodo === 29) {
        diasLabel = '30 dias';
        fator = 30;
    }

    const total  = Math.round(12 * fator);
    const fat    = 3480.50 * fator;
    const ticket = fat / total;
    const fin    = Math.round(total * 0.75);

    animarNumero('kpiPedidos', total, '', false);
    animarNumero('kpiFaturado', fat, 'R$ ', true);
    animarNumero('kpiTicket', ticket, 'R$ ', true);
    animarNumero('kpiFinalizados', fin, '', false);

    document.getElementById('kpiPedidosDelta').textContent     = `${total} registros`;
    document.getElementById('kpiFaturadoDelta').textContent    = `Ticket R$ ${fmt(ticket)}`;
    document.getElementById('kpiTicketDelta').textContent      = `${total} pedidos`;
    document.getElementById('kpiFinalizadosDelta').textContent = '75% de conclusão';
    definirClasseDelta('kpiFinalizadosDelta', 'pos');

    let nPts = 7;
    if (diasPeriodo === 0) {
        nPts = 12;
    } else if (diasPeriodo === 'datas' && dataInicialSelecionada && dataFinalSelecionada) {
        const d1 = new Date(dataInicialSelecionada);
        const d2 = new Date(dataFinalSelecionada);
        nPts = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    } else if (diasPeriodo === 29) {
        nPts = 15;
    }

    const labels = diasPeriodo === 0
        ? Array.from({length:nPts}, (_,i) => `${i*2}h`)
        : Array.from({length:nPts}, (_,i) => {
            const d = new Date();
            if (diasPeriodo === 'datas' && dataFinalSelecionada) {
                const dataParts = dataFinalSelecionada.split('-');
                d.setFullYear(dataParts[0], dataParts[1] - 1, dataParts[2]);
            }
            d.setDate(d.getDate() - (nPts-1-i));
            return d.toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'});
          });
    const vals = labels.map(() => Math.random() * 1800 + 200);
    const qts  = labels.map(() => Math.floor(Math.random() * 8 + 2));
    desenharGraficoLinha(labels, vals, qts);

    desenharDonut([fin, Math.round(total * 0.18), Math.round(total * 0.07)]);

    const pedidosMock = Array.from({length: 8}, (_, i) => ({
        numero: 1050 - i,
        nome_cliente: ['Supermercado do João','Maria Silva','Tech Solutions Ltda','Ana Oliveira','Pedro Costa','Comercial ABC','Fernanda Lima','Roberto Dias'][i],
        valor_liquido: (Math.random() * 800 + 50).toFixed(2),
        status: ['F','F','A','F','C','F','A','F'][i],
        created_at: new Date(Date.now() - i * 3600000 * 2).toISOString()
    }));
    renderizarUltimosPedidos(pedidosMock);
    renderizarFormasPgto([
        { descricao: 'Dinheiro',       total: fat * 0.35 },
        { descricao: 'Cartão Débito',  total: fat * 0.28 },
        { descricao: 'Cartão Crédito', total: fat * 0.22 },
        { descricao: 'PIX',            total: fat * 0.15 },
    ]);
}

/* ============================================================
   RENDERIZAR TABELA DE ÚLTIMOS PEDIDOS
   ============================================================ */
function renderizarUltimosPedidos(pedidos) {
    const tbody = document.getElementById('tabelaUltimosPedidos');
    if (!pedidos || pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#475569;padding:20px;">Nenhum pedido encontrado</td></tr>';
        return;
    }
    const stTxt = { F: 'Finalizado', A: 'Aberto', C: 'Cancelado' };
    tbody.innerHTML = pedidos.map(p => {
        const data = new Date(p.created_at).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });
        return `
        <tr>
            <td><span class="pedido-num">#${p.numero}</span></td>
            <td><span class="pedido-cliente">${(p.nome_cliente || 'Consumidor Final').substring(0, 22)}</span></td>
            <td><span class="pedido-valor">R$ ${fmt(p.valor_liquido)}</span></td>
            <td><span class="status-pill st-${p.status}">${stTxt[p.status] || p.status}</span></td>
            <td style="color:var(--texto-3);font-size:12px;">${data}</td>
        </tr>`;
    }).join('');
}

/* ============================================================
   RENDERIZAR FORMAS DE PAGAMENTO
   ============================================================ */

// Mapeamento visual por palavras-chave na descrição
const FORMAS_VISUAL = [
    { chave: ['pix'],                    icone: '<img src="pix.svg" style="width:18px;height:18px;vertical-align:middle;filter:brightness(0) invert(1);">', bg: 'rgba(14,165,233,0.15)',  cor: '#0ea5e9' },
    { chave: ['débito', 'debito'],       icone: '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">credit_card</span>',  bg: 'rgba(37,99,235,0.15)',   cor: '#2563eb' },
    { chave: ['crédito', 'credito'],     icone: '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">contactless</span>',  bg: 'rgba(139,92,246,0.15)', cor: '#8b5cf6' },
    { chave: ['dinheiro', 'espécie', 'especie', 'cash'], icone: '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">local_atm</span>', bg: 'rgba(16,185,129,0.15)', cor: '#10b981' },
];
const FORMA_PADRAO = { icone: '<span class="material-symbols-outlined" style="font-size:18px;vertical-align:middle;">payments</span>', bg: 'rgba(255,255,255,0.08)', cor: '#94a3b8' };

function visualForma(descricao) {
    const d = (descricao || '').toLowerCase();
    return FORMAS_VISUAL.find(f => f.chave.some(c => d.includes(c))) || FORMA_PADRAO;
}

function renderizarFormasPgto(totaisFormas) {
    const el = document.getElementById('listaFormasPgto');

    if (!totaisFormas || totaisFormas.length === 0) return;

    const somaTotal = totaisFormas.reduce((s, f) => s + parseFloat(f.total || 0), 0) || 1;

    el.innerHTML = totaisFormas.map(f => {
        const val     = parseFloat(f.total || 0);
        const largura = Math.round((val / somaTotal) * 100);
        const visual  = visualForma(f.descricao);
        return `
        <div class="pgto-item">
            <div class="pgto-left">
                <div class="pgto-icone" style="background:${visual.bg};">${visual.icone}</div>
                <div>
                    <div class="pgto-nome">${f.descricao}</div>
                    <div class="pgto-barra-wrap" style="width:100px;">
                        <div class="pgto-barra" style="width:${largura}%;background:${visual.cor};"></div>
                    </div>
                </div>
            </div>
            <div class="pgto-valor">R$ ${fmt(val)}</div>
        </div>`;
    }).join('');
}

/* ============================================================
   GRÁFICO DE LINHA — FATURAMENTO
   ============================================================ */
function desenharGraficoLinha(labels, valores, qtds) {
    const canvas = document.getElementById('canvasLinha');
    const parent = canvas.parentElement;
    const availW  = parent.clientWidth - 44;
    canvas.width  = availW;
    canvas.height = Math.max(120, Math.min(180, Math.round(availW * 0.35)));
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width, H = canvas.height;
    const padL = 52, padR = 16, padT = 16, padB = 32;
    const gW = W - padL - padR;
    const gH = H - padT - padB;

    const maxVal = Math.max(...valores, 1);
    const maxQtd = Math.max(...qtds, 1);

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padT + (gH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();

        const val = maxVal * (1 - i / 4);
        ctx.fillStyle = 'rgba(148,163,184,0.5)';
        ctx.font = '9px Barlow, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val >= 1000 ? `${(val/1000).toFixed(1)}k` : val.toFixed(0), padL - 6, y + 3);
    }

    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = '9px Barlow, sans-serif';
    ctx.textAlign = 'center';
    const step = Math.max(1, Math.floor(labels.length / 7));
    labels.forEach((l, i) => {
        if (i % step === 0 || i === labels.length - 1) {
            const x = padL + (i / (labels.length - 1)) * gW;
            ctx.fillText(l, x, H - padB + 14);
        }
    });

    if (qtds.some(q => q > 0)) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(16,185,129,0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        qtds.forEach((q, i) => {
            const x = padL + (i / (labels.length - 1)) * gW;
            const y = padT + gH - (q / maxQtd) * gH;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
    }

    const gradArea = ctx.createLinearGradient(0, padT, 0, padT + gH);
    gradArea.addColorStop(0, 'rgba(37,99,235,0.25)');
    gradArea.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.beginPath();
    valores.forEach((v, i) => {
        const x = padL + (i / (labels.length - 1)) * gW;
        const y = padT + gH - (v / maxVal) * gH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    const lastX = padL + gW, firstX = padL;
    ctx.lineTo(lastX, padT + gH);
    ctx.lineTo(firstX, padT + gH);
    ctx.closePath();
    ctx.fillStyle = gradArea;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    valores.forEach((v, i) => {
        const x = padL + (i / (labels.length - 1)) * gW;
        const y = padT + gH - (v / maxVal) * gH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    valores.forEach((v, i) => {
        const x = padL + (i / (labels.length - 1)) * gW;
        const y = padT + gH - (v / maxVal) * gH;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
        ctx.strokeStyle = 'rgba(147,197,253,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });
}

/* ============================================================
   GRÁFICO DONUT — STATUS
   ============================================================ */
function desenharDonut(valores) {
    const canvas = document.getElementById('canvasDonut');
    const ctx    = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cores  = ['#2563eb', '#10b981', '#ef4444'];
    const labels = ['Finalizados', 'Abertos', 'Cancelados'];
    const totalReal = valores.reduce((a, b) => a + b, 0);
    const total = totalReal || 1; // evita divisão por zero nos cálculos de %

    const cx = W / 2, cy = H / 2 - 4;
    const r  = Math.min(W, H) / 2 - 16;
    const ri = r * 0.6;

    let angulo = -Math.PI / 2;
    valores.forEach((v, i) => {
        const frac = v / total;
        const fim  = angulo + frac * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, angulo, fim);
        ctx.closePath();
        ctx.fillStyle = cores[i];
        ctx.globalAlpha = 0.9;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, angulo, fim);
        ctx.closePath();
        ctx.strokeStyle = '#040f22';
        ctx.lineWidth = 2;
        ctx.stroke();

        angulo = fim;
    });

    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(cx, cy, ri, 0, Math.PI * 2);
    ctx.fillStyle = '#071530';
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold 22px "Barlow Condensed", sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(totalReal, cx, cy - 6);
    ctx.fillStyle = '#475569';
    ctx.font = `10px Barlow, sans-serif`;
    ctx.fillText('PEDIDOS', cx, cy + 12);

    const leg = document.getElementById('donutLegenda');
    leg.innerHTML = valores.map((v, i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:10px;height:10px;border-radius:3px;background:${cores[i]};flex-shrink:0;"></div>
                <span style="font-size:12px;color:var(--texto-2);">${labels[i]}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:13px;font-weight:700;color:var(--texto);font-family:'Barlow Condensed',sans-serif;">${v}</span>
                <span style="font-size:10px;color:var(--texto-3);width:34px;text-align:right;">${totalReal > 0 ? Math.round(v/total*100) : 0}%</span>
            </div>
        </div>
    `).join('');
}

/* ============================================================
   ANIMAÇÃO DE NÚMEROS
   ============================================================ */
function animarNumero(id, valorFinal, prefixo, decimal) {
    const el = document.getElementById(id);
    const inicio = 0;
    const duracao = 900;
    const inicioTs = performance.now();
    el.classList.add('animando');
    function frame(ts) {
        const prog = Math.min((ts - inicioTs) / duracao, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        const val  = inicio + (valorFinal - inicio) * ease;
        el.textContent = prefixo + (decimal ? fmt(val) : Math.round(val).toLocaleString('pt-BR'));
        if (prog < 1) requestAnimationFrame(frame);
        else el.classList.remove('animando');
    }
    requestAnimationFrame(frame);
}

/* ============================================================
   UTILITÁRIOS
   ============================================================ */
function fmt(v) {
    return parseFloat(v || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2
    });
}
function definirClasseDelta(id, cls) {
    const el = document.getElementById(id);
    el.className = `kpi-delta ${cls}`;
}

//setInterval(carregarDados, 120000);

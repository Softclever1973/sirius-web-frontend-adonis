// =====================================================
// SIRIUS WEB - Outros Módulos
// =====================================================

/* ============================================================
   DADOS DOS MÓDULOS
   ============================================================ */
const DADOS_SECOES = {
    varejo: {
        chips: [
            { icone:'📋', titulo:'Pré Vendas',         cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Pedidos e orçamentos de vendas. Fácil e ágil. Integra o pedido de venda com o caixa (emissão de cupom fiscal).' },
            { icone:'💰', titulo:'Controle de Caixa',  cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Permite ao usuário acompanhamento diário das movimentações do caixa. Rotinas de abertura e fechamento do caixa, reforços e sangrias e muito mais.' },
            { icone:'📦', titulo:'Controle de Estoque',cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Rotinas simplificadas que facilitam o controle de entrada e saída de produtos. Totalmente integrado com o pedido de compras, pré-vendas e cupom fiscal.' },
            { icone:'🛵', titulo:'Delivery',           cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Localize rapidamente o cadastro do cliente. Emissão de comandas e controle simplificado dos pedidos para a entrega. Permite finalizar a venda através da emissão do cupom fiscal.' },
            { icone:'📝', titulo:'Comandas',           cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Atende comércios que necessitem controlar mesas e/ou comandas. Fácil inclusão e alteração de produtos além de ser possível finalizar a venda através da emissão do cupom fiscal.' },
            { icone:'📱', titulo:'App Pré Vendas',     cor:'rgba(16,185,129,0.1)',  borda:'rgba(16,185,129,0.3)', texto:'#a7f3d0', desc:'Aplicativo desenvolvido para celulares Android. Permite a geração de pré-vendas e comandas facilitando e agilizando as vendas para emissão do cupom fiscal.' },
            { icone:'💳', titulo:'Financeiro',         cor:'rgba(16,185,129,0.1)',  borda:'rgba(16,185,129,0.3)', texto:'#a7f3d0', desc:'Integrado com compras e vendas, permite ao usuário controle detalhado das contas a pagar e a receber, além de diversas opções de filtros e relatórios facilitando a gestão financeira.' },
            { icone:'📊', titulo:'Relatórios',         cor:'rgba(16,185,129,0.1)',  borda:'rgba(16,185,129,0.3)', texto:'#a7f3d0', desc:'Relatórios com totais de vendas e totais de comissões por vendedores e muito mais. Facilita a gestão das vendas realizadas e auxilia no pagamento de comissões.' },
            { icone:'🍔', titulo:'Integração iFood',   cor:'rgba(16,185,129,0.1)',  borda:'rgba(16,185,129,0.3)', texto:'#a7f3d0', desc:'Captura os pedidos do iFood, monta o pedido de venda e executa o despacho de forma rápida e fácil.' },
            { icone:'🛒', titulo:'Pedidos de Compras', cor:'rgba(16,185,129,0.1)',  borda:'rgba(16,185,129,0.3)', texto:'#a7f3d0', desc:'Totalmente integrado com o estoque e financeiro a pagar. Permite ao usuário gerar pedidos de compras para os fornecedores, facilitando o controle de estoque e a gestão financeira.' },
            { icone:'🧾', titulo:'NFC-e',              cor:'rgba(16,185,129,0.15)', borda:'rgba(16,185,129,0.4)', texto:'#6ee7b7', desc:'Emissão de cupom fiscal eletrônico rápido e fácil.' }
        ]
    },
    atacado: {
        chips: [
            { icone:'📊', titulo:'Orçamentos',              cor:'rgba(124,58,237,0.15)', borda:'rgba(124,58,237,0.4)', texto:'#c4b5fd', desc:'Digitação e controle completo dos orçamentos. Permite ao usuário envio parcial dos produtos para os pedidos de vendas. Controle de saldos, curva ABC, relatórios comparativos (Orçado x Faturado x Saldo), status Pendente e Realizado, Follow-Up e impressão de orçamentos.' },
            { icone:'💼', titulo:'Força de Vendas',          cor:'rgba(124,58,237,0.15)', borda:'rgba(124,58,237,0.4)', texto:'#c4b5fd', desc:'Plataforma WEB para pedidos de venda integrada ao Sírius, ideal para vendedores externos, oferecendo rapidez nas vendas, controle de estoque em tempo real e emissão ágil de NF-e.' },
            { icone:'📈', titulo:'Relatórios Gerenciais/DRE',cor:'rgba(124,58,237,0.15)', borda:'rgba(124,58,237,0.4)', texto:'#c4b5fd', desc:'Essenciais para o controle completo e gestão financeira da empresa. Permite ao usuário diversas opções de filtros e relatórios com totais de vendas por período, Curva ABC de Clientes, Produtos, Vendedores e Fornecedores, e mapas de vendas.' },
            { icone:'🛒', titulo:'Compras',                  cor:'rgba(124,58,237,0.1)',  borda:'rgba(124,58,237,0.3)', texto:'#ddd6fe', desc:'Totalmente integrado com o estoque e financeiro. Permite ao usuário gerar pedidos de compras para serviços ou produtos. Também é possível importar arquivos XMLs enviado pelos fornecedores.' },
            { icone:'📋', titulo:'Pedidos de Vendas',        cor:'rgba(124,58,237,0.1)',  borda:'rgba(124,58,237,0.3)', texto:'#ddd6fe', desc:'Sistema de gestão integrado com estoque e financeiro, que permite a emissão rápida ou detalhada de pedidos de vendas. Oferece geração de orçamentos, controle de entregas parciais, criação de ordem de produção, gestão de trocas e devoluções, expedição de pedidos e impressão de documentos.' },
            { icone:'💳', titulo:'Financeiro',               cor:'rgba(124,58,237,0.1)',  borda:'rgba(124,58,237,0.3)', texto:'#ddd6fe', desc:'Sistema integrado com compras e vendas que realiza o controle detalhado das contas a pagar e a receber. Inclui controle de contas contábeis, centro de custos, conciliação bancária, emissão de boletos, integração via SISPAG, controle de fluxo de caixa e metas orçamentárias.' },
            { icone:'📄', titulo:'Nota Fiscal de Produtos',  cor:'rgba(124,58,237,0.15)', borda:'rgba(124,58,237,0.4)', texto:'#c4b5fd', desc:'Totalmente integrado com o estoque e financeiro, NF-e com envio e autorização junto à SEFAZ. Rotinas de cancelamento, carta de correção, envio automático de e-mail com XML e PDF, cálculo automático de impostos, pré-visualização e impressão do DANFE.' }
        ]
    },
    distribuicao: {
        chips: [
            { icone:'🚛', titulo:'CT-e',                      cor:'rgba(14,165,233,0.15)', borda:'rgba(14,165,233,0.4)', texto:'#7dd3fc', desc:'Emissão de Conhecimento de Transporte Eletrônico (CT-e) com envio e autorização junto à SEFAZ. Diversos processos automatizados. Filtros e relatórios gerenciais. Cadastros de emitente, remetente, consignatário, redespacho, tomador, expedidor, recebedor e destinatário.' },
            { icone:'📋', titulo:'MDF-e',                      cor:'rgba(14,165,233,0.15)', borda:'rgba(14,165,233,0.4)', texto:'#7dd3fc', desc:'Emissão de Manifestação de Documentos Fiscais com a finalidade de atender empresas prestadoras de serviço cujo transporte seja realizado em veículos próprios, arrendados, ou mediante transportador autônomo de cargas. Agiliza o registro em lote de documentos fiscais em trânsito.' },
            { icone:'📦', titulo:'Controle de Estoque',        cor:'rgba(14,165,233,0.1)',  borda:'rgba(14,165,233,0.3)', texto:'#bae6fd', desc:'Rotinas simplificadas que facilitam o controle de entrada e saída de produtos. Totalmente integrado com o pedido de compras, pré-vendas e cupom fiscal.' },
            { icone:'📊', titulo:'Relatórios de Distribuição', cor:'rgba(14,165,233,0.1)',  borda:'rgba(14,165,233,0.3)', texto:'#bae6fd', desc:'Controle completo de movimentações logísticas. Relatórios de entregas, rotas, volumes e fretes com diversas opções de filtros por período, destinatário e região.' },
            { icone:'💼', titulo:'Força de Vendas',            cor:'rgba(14,165,233,0.1)',  borda:'rgba(14,165,233,0.3)', texto:'#bae6fd', desc:'Plataforma WEB para pedidos de venda integrada ao Sírius, ideal para vendedores externos, oferecendo rapidez nas vendas, controle de estoque em tempo real e emissão ágil de NF-e.' }
        ]
    },
    industria: {
        chips: [
            { icone:'🏗️', titulo:'Ordem de Produção',  cor:'rgba(249,115,22,0.15)', borda:'rgba(249,115,22,0.4)', texto:'#fdba74', desc:'Controle completo das ordens de produção, integradas com estoque de insumos e produtos acabados. Permite acompanhamento detalhado de cada etapa do processo produtivo.' },
            { icone:'🔷', titulo:'Bloco K',            cor:'rgba(249,115,22,0.15)', borda:'rgba(249,115,22,0.4)', texto:'#fdba74', desc:'Totalmente integrado com as compras, estoque e produção. O Bloco K atua como um componente do Sped Fiscal para controle detalhado dos saldos de entrada e saída de produtos e insumos. Geração mensal do arquivo para envio à SEFAZ. Controla estoque próprio e em poder de terceiros.' },
            { icone:'📦', titulo:'Estoque de Insumos', cor:'rgba(249,115,22,0.1)',  borda:'rgba(249,115,22,0.3)', texto:'#fed7aa', desc:'Controle preciso do estoque de matérias-primas e insumos, integrado com as ordens de produção. Permite gestão eficiente do consumo e reposição automática conforme necessidade produtiva.' },
            { icone:'📊', titulo:'Relatórios',         cor:'rgba(249,115,22,0.1)',  borda:'rgba(249,115,22,0.3)', texto:'#fed7aa', desc:'Relatórios gerenciais de produção, consumo de insumos, produtos acabados e análise de custos. Fornece informações detalhadas para tomada de decisão e planejamento da produção.' },
            { icone:'📄', titulo:'NF-e de Saída',      cor:'rgba(249,115,22,0.15)', borda:'rgba(249,115,22,0.4)', texto:'#fdba74', desc:'Emissão de NF-e totalmente integrada com o estoque e financeiro. Autorização junto à SEFAZ, cálculo automático de impostos, envio automático de XML e DANFE por e-mail.' }
        ]
    },
    fiscal: {
        chips: [
            { icone:'📂', titulo:'SPED Fiscal',   cor:'rgba(245,158,11,0.15)', borda:'rgba(245,158,11,0.4)', texto:'#fcd34d', desc:'Totalmente integrado com compras e vendas. Cálculo de impostos de entrada e saída. Atribuição automática das CFOPs e CSTs de ICMS, IPI, PIS e COFINS. Geração mensal do arquivo Sped para envio à SEFAZ e contabilidade. Pode ser contratado separadamente de nosso ERP.' },
            { icone:'🔷', titulo:'Bloco K',       cor:'rgba(245,158,11,0.15)', borda:'rgba(245,158,11,0.4)', texto:'#fcd34d', desc:'Totalmente integrado com as compras, estoque e produção. Componente do Sped Fiscal para controle detalhado dos saldos de entrada e saída de produtos e insumos. Controla estoque próprio e em poder de terceiros.' },
            { icone:'📄', titulo:'NF-e',          cor:'rgba(245,158,11,0.1)',  borda:'rgba(245,158,11,0.3)', texto:'#fde68a', desc:'Emissão de NF-e com envio e autorização junto à SEFAZ. Rotinas de cancelamento e inutilização por faixa numérica, carta de correção, envio automático de e-mail com XML e PDF, cálculo automático de impostos, pré-visualização e impressão do DANFE.' },
            { icone:'🚛', titulo:'CT-e',          cor:'rgba(245,158,11,0.1)',  borda:'rgba(245,158,11,0.3)', texto:'#fde68a', desc:'Emissão de Conhecimento de Transporte Eletrônico (CT-e) com envio e autorização junto à SEFAZ. Diversos processos automatizados. Filtros e relatórios gerenciais.' },
            { icone:'📋', titulo:'MDF-e',         cor:'rgba(245,158,11,0.1)',  borda:'rgba(245,158,11,0.3)', texto:'#fde68a', desc:'Emissão de Manifestação de Documentos Fiscais. A finalidade do MDF-e é agilizar o registro em lote de documentos fiscais em trânsito e identificar a unidade de carga utilizada e demais características do transporte.' },
            { icone:'🏛️', titulo:'NFS-e',        cor:'rgba(245,158,11,0.15)', borda:'rgba(245,158,11,0.4)', texto:'#fcd34d', desc:'Nota Fiscal de Serviços Eletrônica (NFS-e), com envio rápido e em lote para o sistema da prefeitura. Gerada a partir do pedido de venda e integrada com o financeiro. Envio automático de PDF por email.' }
        ]
    },
    financeiro: {
        chips: [
            { icone:'💳', titulo:'Gestão Financeira',    cor:'rgba(22,163,74,0.15)', borda:'rgba(22,163,74,0.4)', texto:'#86efac', desc:'Sistema integrado com compras e vendas que realiza o controle detalhado das contas a pagar e a receber, oferecendo diversas opções de filtros e relatórios. Inclui funcionalidades como controle de contas contábeis, centro de custos, conciliação bancária, emissão de boletos, integração com pagamentos bancários via SISPAG, lançamento de despesas, projeção de novas despesas, registro de pagamentos, controle de fluxo de caixa, metas orçamentárias e gerenciamento de saldos e transferências entre contas.' },
            { icone:'🏦', titulo:'Conciliação Bancária', cor:'rgba(22,163,74,0.1)',  borda:'rgba(22,163,74,0.3)', texto:'#bbf7d0', desc:'Rotinas completas de conciliação bancária permitindo ao usuário confrontar os extratos bancários com os lançamentos do sistema, garantindo precisão nas informações financeiras.' },
            { icone:'📊', titulo:'Fluxo de Caixa',       cor:'rgba(22,163,74,0.1)',  borda:'rgba(22,163,74,0.3)', texto:'#bbf7d0', desc:'Controle detalhado do fluxo de caixa com projeções de recebimentos e pagamentos. Facilita a gestão financeira e o planejamento de recursos da empresa.' },
            { icone:'💰', titulo:'Centro de Custos',     cor:'rgba(22,163,74,0.1)',  borda:'rgba(22,163,74,0.3)', texto:'#bbf7d0', desc:'Permite a classificação e controle de despesas por centro de custo, facilitando a análise de rentabilidade por departamento, projeto ou unidade de negócio.' },
            { icone:'📄', titulo:'Emissão de Boletos',   cor:'rgba(22,163,74,0.15)', borda:'rgba(22,163,74,0.4)', texto:'#86efac', desc:'Geração e controle de boletos bancários integrados com as contas a receber. Permite o envio automático por e-mail e o registro bancário conforme as regras de cada banco.' }
        ]
    },
    compras: {
        chips: [
            { icone:'🛒', titulo:'Gestão de Compras',    cor:'rgba(139,92,246,0.15)', borda:'rgba(139,92,246,0.4)', texto:'#c4b5fd', desc:'Totalmente integrado com o estoque e financeiro. Permite ao usuário gerar pedidos de compras para serviços ou produtos. Também é possível importar arquivos XMLs enviado pelos fornecedores. Impressão de diversos modelos de pedidos de compra e diversas opções de filtros e relatórios.' },
            { icone:'📄', titulo:'Importação de XML',    cor:'rgba(139,92,246,0.15)', borda:'rgba(139,92,246,0.4)', texto:'#c4b5fd', desc:'Importação automática dos arquivos XML enviados pelos fornecedores. O sistema identifica os produtos, quantidades e valores, agilizando o processo de entrada de notas fiscais e atualizando automaticamente o estoque.' },
            { icone:'📦', titulo:'Integração c/ Estoque',cor:'rgba(139,92,246,0.1)',  borda:'rgba(139,92,246,0.3)', texto:'#ede9fe', desc:'Ao confirmar um pedido de compra, o estoque é atualizado automaticamente com os produtos recebidos, mantendo sempre as informações de saldo corretas e em tempo real.' },
            { icone:'💳', titulo:'Integração Financeira',cor:'rgba(139,92,246,0.1)',  borda:'rgba(139,92,246,0.3)', texto:'#ede9fe', desc:'As compras realizadas geram automaticamente os títulos a pagar no módulo financeiro, garantindo controle completo das obrigações da empresa com seus fornecedores.' },
            { icone:'📊', titulo:'Relatórios de Compras',cor:'rgba(139,92,246,0.1)',  borda:'rgba(139,92,246,0.3)', texto:'#ede9fe', desc:'Diversas opções de relatórios e filtros para análise das compras realizadas por período, fornecedor, produto e categoria, auxiliando nas decisões de reabastecimento e negociação.' }
        ]
    }
};

/* ============================================================
   GERAR CHIPS PARA CADA SEÇÃO
   ============================================================ */
function gerarChips() {
    Object.entries(DADOS_SECOES).forEach(([secao, dados]) => {
        const container = document.getElementById(`chips-${secao}`);
        if (!container) return;
        dados.chips.forEach(chip => {
            const el = document.createElement('button');
            el.className = 'chip-item';
            el.style.background = chip.cor;
            el.style.borderColor = chip.borda;
            el.style.color = chip.texto;
            el.textContent = `${chip.icone} ${chip.titulo}`;
            el.addEventListener('click', () => abrirChipDesc(chip));
            container.appendChild(el);
        });
    });
}

/* ============================================================
   MODAL DE CHIP
   ============================================================ */
function abrirChipDesc(chip) {
    document.getElementById('cdIcone').textContent = chip.icone;
    document.getElementById('cdTitulo').textContent = chip.titulo;
    document.getElementById('cdTexto').textContent = chip.desc;
    document.getElementById('chipDesc').classList.add('visivel');
}
function fecharChipDesc() { document.getElementById('chipDesc').classList.remove('visivel'); }
function fecharChipDescFora(e) { if (e.target === document.getElementById('chipDesc')) fecharChipDesc(); }

/* ============================================================
   NAVEGAÇÃO POR ABAS
   ============================================================ */
const ORDEM_ABAS = ['introducao','varejo','atacado','distribuicao','industria','fiscal','financeiro','compras'];
let abaAtual = 0;

function irParaAba(id) {
    const idx = ORDEM_ABAS.indexOf(id);
    if (idx === -1) return;

    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.querySelectorAll('.nav-aba').forEach(a => a.classList.remove('ativa'));

    document.getElementById(`sec-${id}`)?.classList.add('ativa');
    document.querySelector(`.nav-aba[data-secao="${id}"]`)?.classList.add('ativa');

    abaAtual = idx;
    atualizarBotoes();
}

function navegarAnterior() {
    if (abaAtual > 0) irParaAba(ORDEM_ABAS[abaAtual - 1]);
}
function navegarProxima() {
    if (abaAtual < ORDEM_ABAS.length - 1) irParaAba(ORDEM_ABAS[abaAtual + 1]);
}

function atualizarBotoes() {
    document.getElementById('btnAnterior').disabled = abaAtual === 0;
    document.getElementById('btnProxima').disabled  = abaAtual === ORDEM_ABAS.length - 1;
}

/* ============================================================
   PARTÍCULAS ANIMADAS
   ============================================================ */
(function() {
    const canvas = document.getElementById('particulas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    const cores = ['37,99,235','96,165,250','16,185,129','14,165,233'];
    const ps = Array.from({length: 40}, () => ({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        r:  Math.random() * 2 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.45 + 0.1),
        alpha: Math.random() * 0.4 + 0.1,
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
            ctx.fillStyle = `rgba(${p.cor},${p.alpha})`; ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
})();

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
gerarChips();
atualizarBotoes();

// Suporte a parâmetro na URL: outros-modulos.html?aba=varejo
const params = new URLSearchParams(window.location.search);
const abaParam = params.get('aba');
if (abaParam && ORDEM_ABAS.includes(abaParam)) {
    irParaAba(abaParam);
}

console.log('✅ Outros Módulos carregado');

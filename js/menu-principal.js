// =====================================================
// SIRIUS WEB - Menu Principal
// Depende de: js/libs/api.js
// =====================================================

const MODULOS = {
    varejo: {
        titulo: 'Varejo', icone: '<span class="material-symbols-outlined">shopping_cart</span>', corFundo: 'linear-gradient(135deg,#064e3b,#10b981)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">list_alt</span>', titulo:'Pré Vendas', desc:'Pedidos e orçamentos de vendas. Fácil e ágil. Integra o pedido de venda com o caixa (emissão de cupom fiscal).' },
            { icone:'<span class="material-symbols-outlined">payments</span>', titulo:'Controle de Caixa', desc:'Permite ao usuário acompanhamento diário das movimentações do caixa. Rotinas de abertura e fechamento do caixa, reforços e sangrias e muito mais.' },
            { icone:'<span class="material-symbols-outlined">inventory_2</span>', titulo:'Controle de Estoque', desc:'Rotinas simplificadas que facilitam o controle de entrada e saída de produtos. Totalmente integrado com o pedido de compras, pré-vendas e cupom fiscal.' },
            { icone:'<span class="material-symbols-outlined">local_shipping</span>', titulo:'Delivery', desc:'Localize rapidamente o cadastro do cliente. Emissão de comandas e controle simplificado dos pedidos para a entrega. Permite finalizar a venda através da emissão do cupom fiscal.' },
            { icone:'<span class="material-symbols-outlined">notes</span>', titulo:'Comandas', desc:'Atende comércios que necessitem controlar mesas e/ou comandas. Fácil inclusão e alteração de produtos além de ser possível finalizar a venda através da emissão do cupom fiscal.' },
            { icone:'<span class="material-symbols-outlined">smartphone</span>', titulo:'App Pré Vendas', desc:'Aplicativo desenvolvido para celulares Android. Permite a geração de pré-vendas e comandas facilitando e agilizando as vendas para emissão do cupom fiscal.' },
            { icone:'<span class="material-symbols-outlined">credit_card</span>', titulo:'Financeiro', desc:'Integrado com compras e vendas, permite ao usuário controle detalhado das contas a pagar e a receber, além de diversas opções de filtros e relatórios facilitando a gestão financeira.' },
            { icone:'<span class="material-symbols-outlined">bar_chart</span>', titulo:'Relatórios', desc:'Relatórios com totais de vendas e totais de comissões por vendedores e muito mais. Facilita a gestão das vendas realizadas e auxilia no pagamento de comissões.' },
            { icone:'<span class="material-symbols-outlined">restaurant</span>', titulo:'Integração iFood', desc:'Captura os pedidos do iFood, monta o pedido de venda e executa o despacho de forma rápida e fácil.' },
            { icone:'<span class="material-symbols-outlined">shopping_cart</span>', titulo:'Pedidos de Compras', desc:'Totalmente integrado com o estoque e financeiro a pagar. Permite ao usuário gerar pedidos de compras para os fornecedores, facilitando o controle de estoque e a gestão financeira.' },
            { icone:'<span class="material-symbols-outlined">receipt_long</span>', titulo:'NFC-e', desc:'Emissão de cupom fiscal eletrônico rápido e fácil.' }
        ]
    },
    atacado: {
        titulo: 'Atacado e Distribuição', icone: '<span class="material-symbols-outlined">factory</span>', corFundo: 'linear-gradient(135deg,#1e1b4b,#7c3aed)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">bar_chart</span>', titulo:'Orçamentos', desc:'Digitação e controle completo dos orçamentos. Permite ao usuário envio parcial dos produtos para os pedidos de vendas. Controle de saldos, curva ABC de orçamentos, opções de relatórios comparativos (Orçado x Faturado x Saldo), status Pendente e Realizado, Follow-Up e impressão de orçamentos.' },
            { icone:'<span class="material-symbols-outlined">work</span>', titulo:'Força de Vendas', desc:'Plataforma WEB para pedidos de venda integrada ao Sírius, ideal para vendedores externos, oferecendo rapidez nas vendas, controle de estoque em tempo real e emissão ágil de NF-e.' },
            { icone:'<span class="material-symbols-outlined">trending_up</span>', titulo:'Relatórios Gerenciais e DRE', desc:'Essenciais para o controle completo e gestão financeira da empresa. Permite ao usuário diversas opções de filtros e relatórios com totais de vendas por período, Curva ABC de Clientes, Produtos, Vendedores, Fornecedores e mapas de vendas.' },
            { icone:'<span class="material-symbols-outlined">shopping_cart</span>', titulo:'Compras', desc:'Totalmente integrado com o estoque e financeiro. Permite ao usuário gerar pedidos de compras para serviços ou produtos. Também é possível importar arquivos XMLs enviado pelos fornecedores.' },
            { icone:'<span class="material-symbols-outlined">list_alt</span>', titulo:'Pedidos de Vendas', desc:'Sistema de gestão integrado com estoque e financeiro, que permite a emissão rápida ou detalhada de pedidos de vendas. Oferece geração de orçamentos, controle de entregas parciais, criação de ordem de produção, gestão de trocas e devoluções, expedição de pedidos e impressão de documentos.' },
            { icone:'<span class="material-symbols-outlined">credit_card</span>', titulo:'Financeiro', desc:'Sistema integrado com compras e vendas que realiza o controle detalhado das contas a pagar e a receber. Inclui controle de contas contábeis, centro de custos, conciliação bancária, emissão de boletos, integração via SISPAG, controle de fluxo de caixa e metas orçamentárias.' },
            { icone:'<span class="material-symbols-outlined">description</span>', titulo:'Nota Fiscal de Produtos', desc:'Totalmente integrado com o estoque e financeiro, NF-e com envio e autorização junto à SEFAZ. Rotinas de cancelamento, carta de correção, envio automático de e-mail com XML e PDF, cálculo automático de impostos, pré-visualização e impressão do DANFE.' }
        ]
    },
    servicos: {
        titulo: 'Serviços', icone: '<span class="material-symbols-outlined">build</span>', corFundo: 'linear-gradient(135deg,#0c2340,#0ea5e9)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">handyman</span>', titulo:'Ordens de Serviços e Assistência Técnica', desc:'Totalmente integrado com as vendas, estoque e financeiro. Controle de entradas dos itens que serão consertados. Geração de orçamentos e ordens de serviços. Envio para pedido de vendas e geração de nota fiscal. Baixa automática das peças utilizadas, diversas opções de status, filtros, relatório e rotinas com exportação para Excel.' },
            { icone:'<span class="material-symbols-outlined">description</span>', titulo:'Nota Fiscal de Serviços', desc:'Nota Fiscal de Serviços Eletrônica (NFS-e), com envio rápido e em lote para o sistema da prefeitura. Gerada a partir do pedido de venda e integrada com o financeiro. Envio automático de PDF por email.' }
        ]
    },
    fiscal: {
        titulo: 'Fiscal', icone: '<span class="material-symbols-outlined">article</span>', corFundo: 'linear-gradient(135deg,#3b1f0a,#f97316)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">folder_open</span>', titulo:'SPED Fiscal', desc:'Totalmente integrado com compras e vendas. Cálculo de impostos de entrada e saída. Atribuição automática das CFOPs e CSTs de ICMS, IPI, PIS e COFINS. Geração mensal do arquivo Sped para envio à SEFAZ e contabilidade. Pode ser contratado separadamente de nosso ERP.' },
            { icone:'<span class="material-symbols-outlined">inventory_2</span>', titulo:'Bloco K', desc:'Totalmente integrado com as compras, estoque e produção. Componente do Sped Fiscal para controle detalhado dos saldos de entrada e saída de produtos e insumos. Controla estoque próprio e estoque em poder de terceiros. Pode ser contratado separadamente.' },
            { icone:'<span class="material-symbols-outlined">description</span>', titulo:'Nota Fiscal Eletrônica', desc:'Emissão de NF-e com envio e autorização junto à SEFAZ. Rotinas de cancelamento e inutilização por faixa numérica, carta de correção, envio automático de e-mail com XML e PDF, cálculo automático de impostos, pré-visualização e impressão do DANFE.' },
            { icone:'<span class="material-symbols-outlined">local_shipping</span>', titulo:'Conhecimento de Transporte Eletrônico', desc:'Emissão de CT-e com envio e autorização junto à SEFAZ. Diversos processos automatizados. Filtros e relatórios gerenciais. Cadastros de emitente, remetente, consignatário, redespacho, tomador, expedidor, recebedor e destinatário. Pré-visualização e impressão do Conhecimento de Transporte.' },
            { icone:'<span class="material-symbols-outlined">list_alt</span>', titulo:'Manifesto de Documentos Fiscais', desc:'Emissão de MDF-e para empresas prestadoras de serviço cujo transporte seja realizado em veículos próprios, arrendados ou mediante transportador autônomo. Agiliza o registro em lote de documentos fiscais em trânsito.' },
            { icone:'<span class="material-symbols-outlined">article</span>', titulo:'NFS-e', desc:'Nota Fiscal de Serviços Eletrônica (NFS-e), com envio rápido e em lote para o sistema da prefeitura. Gerada a partir do pedido de venda e integrada com o financeiro. Envio automático de PDF por email.' }
        ]
    },
    financeiro: {
        titulo: 'Financeiro', icone: '<span class="material-symbols-outlined">payments</span>', corFundo: 'linear-gradient(135deg,#0e2a1f,#16a34a)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">credit_card</span>', titulo:'Gestão Financeira', desc:'Sistema integrado com compras e vendas que realiza o controle detalhado das contas a pagar e a receber, oferecendo diversas opções de filtros e relatórios. Inclui funcionalidades como controle de contas contábeis, centro de custos, conciliação bancária, emissão de boletos, integração com pagamentos bancários via SISPAG, lançamento de despesas, projeção de novas despesas, registro de pagamentos, controle de fluxo de caixa, metas orçamentárias e gerenciamento de saldos e transferências entre contas.' }
        ]
    },
    compras: {
        titulo: 'Compras', icone: '<span class="material-symbols-outlined">shopping_bag</span>', corFundo: 'linear-gradient(135deg,#1c1338,#8b5cf6)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">shopping_cart</span>', titulo:'Gestão de Compras', desc:'Totalmente integrado com o estoque e financeiro. Permite ao usuário gerar pedidos de compras para serviços ou produtos. Também é possível importar arquivos XMLs enviado pelos fornecedores. Impressão de diversos modelos de pedidos de compra e diversas opções de filtros e relatórios.' }
        ]
    },
    diferenciais: {
        titulo: 'Nossos Diferenciais', icone: '<span class="material-symbols-outlined">bolt</span>', corFundo: 'linear-gradient(135deg,#1a1008,#d97706)',
        subItens: [
            { icone:'<span class="material-symbols-outlined">wifi</span>', titulo:'Livre da Internet', desc:'Tudo continua funcionando mesmo sem conexão com a internet. Sua operação nunca para.' },
            { icone:'<span class="material-symbols-outlined">keyboard</span>', titulo:'Livre do Mouse', desc:'Para maior agilidade, as rotinas de vendas podem ser operadas exclusivamente pelo teclado.' },
            { icone:'<span class="material-symbols-outlined">cloud</span>', titulo:'Modos de Uso', desc:'Local, Híbrido e Nuvem. Escolha o modelo que melhor se adapta à sua estrutura de TI e necessidades operacionais.' },
            { icone:'<span class="material-symbols-outlined">bolt</span>', titulo:'Máxima Velocidade', desc:'Maior velocidade em todas as telas e rotinas, garantindo produtividade no dia a dia.' }
        ]
    }
};

// Primeiro acesso após cadastro → redirecionar para o manual
if (localStorage.getItem('sirius_primeiro_acesso') === 'true') {
    localStorage.removeItem('sirius_primeiro_acesso');
    window.location.href = 'manual.html';
}

function abrirPainel(modulo) {
    const dados = MODULOS[modulo];
    if (!dados) return;
    const icone = document.getElementById('painelIcone');
    icone.innerHTML = dados.icone;
    icone.style.background = dados.corFundo;
    document.getElementById('painelTitulo').textContent = dados.titulo;
    const grid = document.getElementById('painelGrid');
    grid.innerHTML = '';
    dados.subItens.forEach(item => {
        const card = document.createElement('div');
        card.className = 'sub-card';
        card.innerHTML = `<div class="sub-card-icone" style="background:${dados.corFundo};">${item.icone}</div><div class="sub-card-texto"><div class="sub-card-titulo">${item.titulo}</div><div class="sub-card-hint">Clique para saber mais</div></div>`;
        card.addEventListener('click', () => abrirModalDesc(item, dados));
        grid.appendChild(card);
    });
    document.getElementById('painelOverlay').classList.add('visivel');
}

function fecharPainel() { document.getElementById('painelOverlay').classList.remove('visivel'); }
function fecharPainelFora(e) { if (e.target === document.getElementById('painelOverlay')) fecharPainel(); }

function abrirModalDesc(item, modDados) {
    document.getElementById('modalDescIcone').innerHTML = item.icone;
    document.getElementById('modalDescIcone').style.background = modDados.corFundo;
    document.getElementById('modalDescTitulo').textContent = item.titulo;
    document.getElementById('modalDescModulo').textContent = modDados.titulo;
    document.getElementById('modalDescTexto').textContent = item.desc;
    document.getElementById('modalDescricao').classList.add('visivel');
}

function fecharModalDesc() { document.getElementById('modalDescricao').classList.remove('visivel'); }
function fecharModalDescFora(e) { if (e.target === document.getElementById('modalDescricao')) fecharModalDesc(); }

function toggleSubmenuVendas() {
    const btn    = document.getElementById('btnVendas');
    const submenu = document.getElementById('submenuVendas');
    const aberto  = submenu.classList.contains('aberto');
    submenu.classList.toggle('aberto', !aberto);
    btn.classList.toggle('aberto', !aberto);
}

function toggleSubmenu() {
    const btn    = document.getElementById('btnConfiguracoes');
    const submenu = document.getElementById('submenuConfiguracoes');
    const estaAberto = submenu.classList.contains('aberto');
    if (estaAberto) { submenu.classList.remove('aberto'); btn.classList.remove('aberto'); }
    else            { submenu.classList.add('aberto');    btn.classList.add('aberto');    }
}

function showMessage(msg) {
    document.getElementById('mensagemAviso').textContent = msg;
    document.getElementById('modalAviso').classList.add('visivel');
}

function closeMessage() { document.getElementById('modalAviso').classList.remove('visivel'); }

function logout() {
    localStorage.removeItem('sirius_token');
    localStorage.removeItem('sirius_usuario');
    localStorage.removeItem('sirius_empresas');
    window.location.href = 'index.html';
}

function carregarUsuario() {
    const token = localStorage.getItem('sirius_token');
    if (!token) { window.location.href = 'index.html'; return; }
    try {
        const usuario  = JSON.parse(localStorage.getItem('sirius_usuario')  || '{}');
        const empresas = JSON.parse(localStorage.getItem('sirius_empresas') || '[]');
        const empresa  = Array.isArray(empresas) ? empresas[0] : empresas;
        const nome = usuario.nome || 'Usuário';
        document.getElementById('userName').textContent   = nome;
        document.getElementById('userAvatar').textContent = nome.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?';
        document.getElementById('userPlano').textContent  = empresa?.plano || 'Gratuito';
        if (empresa?.is_admin || usuario?.is_super_admin) {
            ['linkDashboard', 'linkVend', 'linkProduct'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'flex';
            });
        }
        if (usuario?.is_super_admin) {
            const el = document.getElementById('linkParametros');
            if (el) el.style.display = 'flex';
            const elLog = document.getElementById('linkAuditLog');
            if (elLog) elLog.style.display = 'flex';
        }
    } catch (e) { console.error('Erro ao carregar usuário:', e); }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuario();
    document.getElementById('modalAviso').addEventListener('click', function(e) {
        if (e.target === this) closeMessage();
    });
});

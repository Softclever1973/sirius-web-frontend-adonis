# <span class="material-symbols-outlined" style="vertical-align:middle;font-size:0.9em;">menu_book</span> SIRIUS WEB — Manual do Usuário

> **SIRIUS WEB** é um sistema ERP completo de gestão empresarial, desenvolvido pela **Soft Clever Informática** para atender pequenas e médias empresas com foco em PDV e gestão comercial.

---

## Introdução

O SIRIUS WEB opera em modelo **multi-tenant (SaaS)**, onde uma única instalação atende múltiplas empresas, cada uma com seus dados completamente isolados.

**Módulos disponíveis:**

| Módulo | Descrição |
|--------|-----------|
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">shopping_cart</span> PDV | Ponto de Venda — realização de vendas |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">group</span> Clientes | Cadastro e gestão de clientes |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">inventory_2</span> Produtos | Cadastro e controle de estoque |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">badge</span> Vendedores | Cadastro e gestão da equipe de vendas |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">bar_chart</span> Dashboard | Painel gerencial com indicadores e gráficos |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">manage_search</span> Log de Auditoria | Registro de todas as ações realizadas no sistema — exclusivo Super Admin |

> <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">warning</span> **Nota:** Na primeira vez que acessar o sistema após o cadastro, você será redirecionado para este manual para conhecer todas as funcionalidades antes de começar a usar.

---

## Hierarquia de Permissões

O sistema possui **3 níveis de acesso**, cada um com permissões específicas.

### <span class="material-symbols-outlined" style="vertical-align:middle;font-size:0.85em;">military_tech</span> Super Admin — Dono da Empresa

É criado automaticamente no momento do cadastro da empresa. Tem acesso total ao sistema.

**Pode fazer:**
- Tudo que os outros níveis podem
- Criar, editar e excluir vendedores
- Promover vendedores a Admin
- Cadastrar e editar produtos e clientes
- Acessar o Dashboard
- Ver registro de todas as vendas

---

### <span class="material-symbols-outlined" style="vertical-align:middle;font-size:0.85em;">badge</span> Admin

É um vendedor promovido pelo Super Admin. Tem as mesmas permissões de gestão, exceto promover outros admins.

**Pode fazer:**
- Criar, editar e excluir vendedores
- Cadastrar e editar produtos e clientes
- Usar o PDV
- Acessar o Dashboard
- Ver registro de vendas

**Não pode:**
- Promover outros vendedores a Admin (somente o Super Admin pode)

---

### <span class="material-symbols-outlined" style="vertical-align:middle;font-size:0.85em;">person</span> Vendedor

Funcionário operacional. Acesso restrito às tarefas do dia a dia.

**Pode fazer:**
- Usar o PDV para realizar vendas
- Consultar produtos e clientes
- Ver o registro de vendas

**Não pode:**
- Cadastrar, editar ou excluir produtos e clientes
- Cadastrar ou gerenciar outros vendedores
- Acessar o Dashboard

---

### Tabela Resumo de Permissões

| Ação | Super Admin | Admin | Vendedor |
|------|:-----------:|:-----:|:--------:|
| Usar PDV | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Consultar produtos e clientes | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Ver registro de vendas | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Cadastrar/editar produtos e clientes | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Criar/editar/excluir vendedores | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Acessar Dashboard | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Promover vendedor a Admin | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Acessar Log de Auditoria | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |

---

## PDV — Ponto de Venda

O PDV é o módulo principal para realização de vendas e foi pensado para ser usado com apenas o teclado. Siga o fluxo abaixo:

### Fluxo de uma Venda

**1. Tela Inicial**

Ao abrir o PDV você verá duas opções:
- **Novo Pedido** — inicia uma nova venda (ou pressione `Enter`)
- **Voltar** — retorna ao menu principal

---

**2. Selecionar Cliente**

Digite o nome, CPF ou CNPJ do cliente para buscá-lo. Caso não queira vincular um cliente, deixe em branco e o pedido será registrado como **Consumidor Final**.

---

**3. Buscar Produto**

Digite o nome do produto para buscá-lo. Após selecioná-lo:
- Se o parâmetro **PEDIDO_PERGUNTA_QUANTIDADE** estiver ativo (`S`), o sistema perguntará a quantidade desejada
- Se estiver desativado (`N`), o produto será adicionado automaticamente com quantidade 1

Repita o processo para adicionar quantos produtos quiser ao pedido.

---

**4. Pagamento**

Selecione a forma de pagamento e informe o valor. Formas disponíveis:

| Forma | Troco |
|-------|:-----:|
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">local_atm</span> Dinheiro | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:16px;">check_circle</span> Calcula troco automaticamente |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">credit_card</span> Cartão de Débito | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:16px;">cancel</span> |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">contactless</span> Cartão de Crédito (à vista) | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:16px;">cancel</span> |
| <img src="pix.svg" style="width:16px;height:16px;vertical-align:middle;"> PIX | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:16px;">cancel</span> |

É possível dividir o pagamento em **múltiplas formas** (ex: parte em dinheiro, parte no PIX). Você também pode adicionar **observações** ao pedido antes de finalizar.

---

**5. Finalizar**

Clique em **Confirmar**. O sistema irá:
1. Registrar a venda
2. Reduzir automaticamente o estoque dos produtos vendidos
3. Gerar um **recibo em PDF** e abrir a tela de impressão

Após isso, você pode iniciar uma nova venda ou voltar ao menu.

---

## Produtos

### Listagem

Ao entrar no módulo, a tabela de produtos é carregada automaticamente. Recursos disponíveis:

**Filtros:**
- Por Código
- Por Descrição
- Por EAN/Código de Barras
- Estoque Zero
- Abaixo do Mínimo

**Ordenação:**
- Por Código
- Por Descrição
- Ordem de Inserção
- Últimos Lançamentos

**Relatório:** Gera uma página web com todos os produtos da listagem atual, com botão de impressão.

---

### Cadastro de Produto

**Identificação**

| Campo | Obrigatório |
|-------|:-----------:|
| Código | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Código de Barras (EAN-13) | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Descrição | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Descrição Complementar | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Unidade de Medida | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Preço de Custo | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Preço de Venda | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |

Unidades disponíveis: `UN` · `CX` · `KG` · `MT` · `LT` · `PC` · `PR` · `PT`

---

**Estoque**

| Campo | Observação |
|-------|------------|
| Estoque Atual | Somente leitura — alterado via movimentações |
| Estoque Mínimo | Referência para o filtro "Abaixo do Mínimo" |
| Estoque Máximo | Referência para controle interno |

> <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">warning</span> O estoque é reduzido automaticamente ao finalizar uma venda no PDV.

---

**Dados Fiscais**

NCM, CEST, CFOP, Origem da Mercadoria, ICMS, PIS e COFINS com seus respectivos CSTs e alíquotas.

---

**Configurações**

- **Produto Ativo** — define se o produto aparece no sistema
- **Disponível no PDV** — define se o produto pode ser vendido no PDV

---

## Clientes

### Listagem

**Filtros:** Por Razão Social · Por CPF/CNPJ

**Ordenação:** Por Razão Social · Ordem de Digitação · Últimos Lançamentos

**Relatório:** Gera relatório geral dos clientes listados.

---

### Cadastro de Cliente

**Aba: Dados Básicos**

| Campo | Observação |
|-------|------------|
| Tipo de Pessoa | Física ou Jurídica |
| Razão Social / Nome | Obrigatório |
| Nome Fantasia | Opcional |
| CPF | Apenas Pessoa Física |
| CNPJ | Apenas Pessoa Jurídica |
| Telefone / WhatsApp | Opcional |
| Nome do Contato | Opcional |

**Aba: Dados Fiscais**

Indicador de IE, Inscrição Estadual, Inscrição Municipal e ID Estrangeiro (para clientes estrangeiros).

**Aba: Configurações**

- **Cliente Ativo** — define se o cliente está disponível para uso no sistema

---

## Vendedores

### Listagem

**Filtros:** Por Nome · Por ID

**Ordenação:** Por Nome · Ordem de Digitação · Últimos Lançamentos

**Relatório:** Gera relatório imprimível da listagem atual.

---

### Cadastro de Vendedor

**Aba: Dados Básicos**

| Campo | Obrigatório |
|-------|:-----------:|
| Nome Completo | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| CPF | <span class="material-symbols-outlined" style="color:#ef4444;vertical-align:middle;font-size:18px;">cancel</span> |
| Telefone | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| E-mail | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |
| Senha | <span class="material-symbols-outlined" style="color:#10b981;vertical-align:middle;font-size:18px;">check_circle</span> |

> O e-mail e a senha cadastrados aqui são as credenciais de acesso do vendedor ao sistema.

**Aba: Endereço**

CEP (com busca automática), Endereço, Complemento, Cidade e UF.

**Aba: Comercial**

| Campo | Descrição |
|-------|-----------|
| Comissão (%) | Percentual de comissão sobre vendas |
| Meta de Vendas (R$) | Meta mensal em reais |
| Observações | Anotações gerais |
| Vendedor Ativo | Define se o vendedor pode acessar o sistema |

---

## Dashboard

Painel gerencial disponível para **Super Admin e Admin**.

### Filtro de Período

Hoje · 7 dias · 30 dias · Intervalo de datas personalizado

### Indicadores (KPIs)

| KPI | Descrição |
|-----|-----------|
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">list_alt</span> Pedidos | Total de pedidos no período |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">payments</span> Faturado | Valor total faturado |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">gps_fixed</span> Ticket Médio | Valor médio por pedido |
| <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">check_circle</span> Finalizados | Quantidade de pedidos concluídos |

### Gráficos

- **Evolução do Faturamento** — gráfico de linha com valores e quantidade de pedidos por dia
- **Status dos Pedidos** — gráfico donut com distribuição entre Finalizados, Abertos e Cancelados

### Tabelas e Resumos

- **Últimos Pedidos** — lista os 8 pedidos mais recentes com número, cliente, valor, status e data
- **Formas de Pagamento** — resumo do valor recebido por cada método no período

---

## Log de Auditoria

> <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">lock</span> **Acesso restrito — exclusivo para Super Admin.**

O Log de Auditoria registra automaticamente **todas as ações realizadas no sistema**: criações, alterações e exclusões de produtos, clientes, vendedores, formas de pagamento, movimentações de estoque, vendas e parâmetros.

### Como Acessar

No **Menu Principal**, acesse **Configurações → Log de Auditoria**. O link só aparece para usuários Super Admin.

---

### Informações Exibidas

Cada registro na tabela contém:

| Coluna | Descrição |
|--------|-----------|
| **Data / Hora** | Momento exato em que a ação foi realizada |
| **Usuário** | Nome de quem executou a ação |
| **Ação** | <span class="badge-doc badge-CRIOU">CRIOU</span> / <span class="badge-doc badge-ALTEROU">ALTEROU</span> / <span class="badge-doc badge-EXCLUIU">EXCLUIU</span> |
| **Módulo** | Módulo do sistema onde a ação ocorreu |
| **Descrição** | Texto legível descrevendo o que foi feito |
| **IP** | Endereço IP do dispositivo que realizou a ação |

---

### Filtros Disponíveis

Use a barra de filtros no topo da tabela para refinar os resultados:

| Filtro | Descrição |
|--------|-----------|
| **Módulo** | Filtra por módulo (Produtos, Clientes, Vendedores, etc.) |
| **Ação** | Filtra por tipo de ação: CRIOU, ALTEROU ou EXCLUIU |
| **Usuário** | Busca pelo nome do usuário (parcial) |
| **De / Até** | Intervalo de datas para o período desejado |

Clique em **Filtrar** para aplicar ou **Limpar** para remover todos os filtros.

---

### Paginação

Os registros são exibidos em páginas de 30 itens. Use os botões de navegação na parte inferior:

- **‹ Anterior** — vai para a página anterior (desabilitado na primeira página)
- **Números** — navegação direta por página
- **Próximo ›** — vai para a próxima página (desabilitado na última página)

---

### Gerar Relatório

Clique no botão <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">description</span> **Relat.** na barra lateral e selecione **Logs sob Filtro Atual**.

Na janela que abrir, informe a **quantidade de páginas** a incluir no relatório:

> Cada página contém 30 registros. Ex: digitar `5` gera um relatório com até 150 registros.

O relatório é gerado respeitando os filtros ativos no momento e abre em uma nova aba do navegador. Clique em **Imprimir / Salvar PDF** para imprimir ou salvar como arquivo.

> <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">info</span> Quando o relatório tem mais de uma "página" (mais de 30 registros), a impressão insere uma **quebra de página automática** a cada 30 linhas, mantendo a leitura organizada.

---

## Perguntas Frequentes

**Como faço para cadastrar meu primeiro produto?**
Acesse o menu principal, clique em **Produtos** e depois no botão <span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">add</span> **Novo** na barra lateral. Preencha os campos obrigatórios (Código, Descrição, Unidade de Medida e Preço de Venda) e clique em Salvar.

---

**O vendedor esqueceu a senha, como redefinir?**
Acesse o módulo **Vendedores**, localize o vendedor na listagem, clique em editar (<span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">edit</span>) e informe uma nova senha na aba Dados Básicos. O vendedor deverá usar a nova senha no próximo acesso.

---

**Como cancelo uma venda já finalizada?**
Está versão gratuita não possui rotinas de cancelamento de pedidos. Entre em contato com a Soft Clever para conhecer todos os recursos disponíveis nas versões pagas.

---

**Por que o sistema bloqueou uma venda por falta de estoque?**
O parâmetro **PERMITE_SALDO_NEGATIVO** da sua empresa está configurado como N, impedindo vendas sem estoque disponível. É possível alterar esse parâmetro em Configurações / Parâmetros.
Observar que somente quem está com a senha de SuperAdmin pode alterar os parâmetros.
Também é possível contornar a limitação do saldo negativo realizando uma entrada em estoque para esse produto.

---

**Como promovo um vendedor a Admin?**
Acesse o módulo **Vendedores**, localize o vendedor desejado, clique em editar (<span class="material-symbols-outlined" style="vertical-align:middle;font-size:16px;">edit</span>) e ative a permissão de Admin. Apenas o **Super Admin** pode realizar esta ação.

---

**O que é Consumidor Final no PDV?**
Quando nenhum cliente é selecionado na etapa de identificação do PDV, a venda é registrada como **Consumidor Final** — um cliente genérico usado para vendas avulsas onde não é necessário identificar o comprador.

---

**Como acesso o Log de Auditoria?**
Acesse **Configurações → Log de Auditoria** no menu principal. O link só é exibido para usuários **Super Admin**. Caso não apareça, seu usuário não tem essa permissão.

---

**Como vejo o histórico de todas as vendas?**
Acesse o **Dashboard** para uma visão resumida por período, ou acesse o módulo de **Pedidos** para ver o histórico completo com detalhes de cada venda.

---

**Posso usar o sistema sem internet?**
O SIRIUS WEB, versão gratuita é um sistema web e requer conexão com a internet para funcionar. Para uso offline, consulte a Soft Clever sobre as opções dos modelos **Local ou Híbrido** disponíveis nos planos pagos.

---

## Glossário

**Super Admin** — Usuário criado no cadastro da empresa. Tem acesso total ao sistema.

**Admin** — Vendedor com permissões ampliadas, promovido pelo Super Admin.

**Vendedor** — Usuário operacional com acesso restrito ao PDV e consultas.

**Consumidor Final** — Cliente genérico usado quando o comprador não é identificado na venda.

**Multi-Tenant** — Arquitetura onde um único sistema atende múltiplas empresas com dados isolados.

**SaaS** — Software como Serviço. Sistema acessado pela internet mediante assinatura.

**ERP** — Enterprise Resource Planning. Sistema integrado de gestão empresarial.

**PDV** — Ponto de Venda. Módulo para realização de vendas ao consumidor.

**KPI** — Key Performance Indicator. Indicador de desempenho exibido no Dashboard.

**Ticket Médio** — Valor médio por pedido. Faturamento total dividido pela quantidade de pedidos.

**EAN-13** — Padrão de código de barras usado em produtos comerciais.

**NCM** — Nomenclatura Comum do Mercosul. Código fiscal que classifica mercadorias.

**CFOP** — Código Fiscal de Operações e Prestações. Identifica a natureza da operação fiscal.

---

*© 2026 Soft Clever Informática Ltda — Todos os direitos reservados*
*SIRIUS WEB v1.0 — Manual do Usuário*

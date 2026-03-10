# 📚 SIRIUS WEB — Manual do Usuário

> **SIRIUS WEB** é um sistema ERP completo de gestão empresarial, desenvolvido pela **Soft Clever Informática** para atender pequenas e médias empresas com foco em PDV e gestão comercial.

---

## 🏠 Introdução

O SIRIUS WEB opera em modelo **multi-tenant (SaaS)**, onde uma única instalação atende múltiplas empresas, cada uma com seus dados completamente isolados.

**Módulos disponíveis:**

| Módulo | Descrição |
|--------|-----------|
| 🛒 PDV | Ponto de Venda — realização de vendas |
| 👥 Clientes | Cadastro e gestão de clientes |
| 📦 Produtos | Cadastro e controle de estoque |
| 👨‍💼 Vendedores | Cadastro e gestão da equipe de vendas |
| 📊 Dashboard | Painel gerencial com indicadores e gráficos |

> ⚠️ **Nota:** Na primeira vez que acessar o sistema após o cadastro, você será redirecionado para este manual para conhecer todas as funcionalidades antes de começar a usar.

---

## 👥 Hierarquia de Permissões

O sistema possui **3 níveis de acesso**, cada um com permissões específicas.

### 👑 Super Admin — Dono da Empresa

É criado automaticamente no momento do cadastro da empresa. Tem acesso total ao sistema.

**Pode fazer:**
- Tudo que os outros níveis podem
- Criar, editar e excluir vendedores
- Promover vendedores a Admin
- Cadastrar e editar produtos e clientes
- Acessar o Dashboard
- Ver registro de todas as vendas

---

### 👨‍💼 Admin

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

### 👤 Vendedor

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
| Usar PDV | ✅ | ✅ | ✅ |
| Consultar produtos e clientes | ✅ | ✅ | ✅ |
| Ver registro de vendas | ✅ | ✅ | ✅ |
| Cadastrar/editar produtos e clientes | ✅ | ✅ | ❌ |
| Criar/editar/excluir vendedores | ✅ | ✅ | ❌ |
| Acessar Dashboard | ✅ | ✅ | ❌ |
| Promover vendedor a Admin | ✅ | ❌ | ❌ |

---

## 🛒 PDV — Ponto de Venda

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
| 💵 Dinheiro | ✅ Calcula troco automaticamente |
| 💳 Cartão de Débito | ❌ |
| 💳 Cartão de Crédito (à vista) | ❌ |
| 💸 PIX | ❌ |

É possível dividir o pagamento em **múltiplas formas** (ex: parte em dinheiro, parte no PIX). Você também pode adicionar **observações** ao pedido antes de finalizar.

---

**5. Finalizar**

Clique em **Confirmar**. O sistema irá:
1. Registrar a venda
2. Reduzir automaticamente o estoque dos produtos vendidos
3. Gerar um **recibo em PDF** e abrir a tela de impressão

Após isso, você pode iniciar uma nova venda ou voltar ao menu.

---

## 📦 Produtos

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
| Código | ✅ |
| Código de Barras (EAN-13) | ❌ |
| Descrição | ✅ |
| Descrição Complementar | ❌ |
| Unidade de Medida | ✅ |
| Preço de Custo | ❌ |
| Preço de Venda | ✅ |

Unidades disponíveis: `UN` · `CX` · `KG` · `MT` · `LT` · `PC` · `PR` · `PT`

---

**Estoque**

| Campo | Observação |
|-------|------------|
| Estoque Atual | Somente leitura — alterado via movimentações |
| Estoque Mínimo | Referência para o filtro "Abaixo do Mínimo" |
| Estoque Máximo | Referência para controle interno |

> ⚠️ O estoque é reduzido automaticamente ao finalizar uma venda no PDV.

---

**Dados Fiscais**

NCM, CEST, CFOP, Origem da Mercadoria, ICMS, PIS e COFINS com seus respectivos CSTs e alíquotas.

---

**Configurações**

- **Produto Ativo** — define se o produto aparece no sistema
- **Disponível no PDV** — define se o produto pode ser vendido no PDV

---

## 👥 Clientes

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

## 👨‍💼 Vendedores

### Listagem

**Filtros:** Por Nome · Por ID

**Ordenação:** Por Nome · Ordem de Digitação · Últimos Lançamentos

**Relatório:** Gera relatório imprimível da listagem atual.

---

### Cadastro de Vendedor

**Aba: Dados Básicos**

| Campo | Obrigatório |
|-------|:-----------:|
| Nome Completo | ✅ |
| CPF | ❌ |
| Telefone | ✅ |
| E-mail | ✅ |
| Senha | ✅ |

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

## 📊 Dashboard

Painel gerencial disponível para **Super Admin e Admin**.

### Filtro de Período

Hoje · 7 dias · 30 dias · Intervalo de datas personalizado

### Indicadores (KPIs)

| KPI | Descrição |
|-----|-----------|
| 📋 Pedidos | Total de pedidos no período |
| 💰 Faturado | Valor total faturado |
| 🎯 Ticket Médio | Valor médio por pedido |
| ✅ Finalizados | Quantidade de pedidos concluídos |

### Gráficos

- **Evolução do Faturamento** — gráfico de linha com valores e quantidade de pedidos por dia
- **Status dos Pedidos** — gráfico donut com distribuição entre Finalizados, Abertos e Cancelados

### Tabelas e Resumos

- **Últimos Pedidos** — lista os 8 pedidos mais recentes com número, cliente, valor, status e data
- **Formas de Pagamento** — resumo do valor recebido por cada método no período

---

## ❓ Perguntas Frequentes

**Como faço para cadastrar meu primeiro produto?**
Acesse o menu principal, clique em **Produtos** e depois no botão **➕ Novo** na barra lateral. Preencha os campos obrigatórios (Código, Descrição, Unidade de Medida e Preço de Venda) e clique em Salvar.

---

**O vendedor esqueceu a senha, como redefinir?**
Acesse o módulo **Vendedores**, localize o vendedor na listagem, clique em editar (✏️) e informe uma nova senha na aba Dados Básicos. O vendedor deverá usar a nova senha no próximo acesso.

---

**Como cancelo uma venda já finalizada?**
No momento, vendas finalizadas não podem ser canceladas diretamente pelo sistema. Entre em contato com o suporte da Soft Clever para tratativas específicas.

---

**Por que o sistema bloqueou uma venda por falta de estoque?**
O parâmetro **PERMITE_SALDO_NEGATIVO** da sua empresa está configurado como `N`, impedindo vendas sem estoque disponível. Para liberar, solicite ao suporte o ajuste deste parâmetro ou realize uma entrada de estoque para o produto.

---

**Como promovo um vendedor a Admin?**
Acesse o módulo **Vendedores**, localize o vendedor desejado, clique em editar (✏️) e ative a permissão de Admin. Apenas o **Super Admin** pode realizar esta ação.

---

**O que é Consumidor Final no PDV?**
Quando nenhum cliente é selecionado na etapa de identificação do PDV, a venda é registrada como **Consumidor Final** — um cliente genérico usado para vendas avulsas onde não é necessário identificar o comprador.

---

**Como vejo o histórico de todas as vendas?**
Acesse o **Dashboard** para uma visão resumida por período, ou acesse o módulo de **Pedidos** para ver o histórico completo com detalhes de cada venda.

---

**Posso usar o sistema sem internet?**
O SIRIUS WEB é um sistema web e requer conexão com a internet para funcionar. Para uso offline, consulte a Soft Clever sobre as opções dos modelos **Local ou Híbrido** disponíveis nos planos do sistema.

---

## 📖 Glossário

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
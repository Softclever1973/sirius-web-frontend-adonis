// =====================================================
// SIRIUS WEB - Cadastro
// =====================================================

// isDev e API_URL fornecidos por js/libs/api.js

// Elementos
const cadastroForm = document.getElementById('cadastroForm');
const btnCadastrar = document.getElementById('btnConfirmarCadastro');
const messageEl = document.getElementById('message');

// Step atual
let currentStep = 1;

// =====================================================
// NAVEGAÇÃO ENTRE STEPS
// =====================================================

function nextStep(step) {
    // Validar step atual antes de avançar
    if (!validateStep(currentStep)) {
        return;
    }
    
    goToStep(step);
}

function prevStep(step) {
    goToStep(step);
}

function goToStep(step) {
    // Ocultar step atual
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Marcar como completado
    if (step > currentStep) {
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    }
    
    // Mostrar novo step
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    
    currentStep = step;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================
// VALIDAÇÕES
// =====================================================

function validateStep(step) {
    const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = stepEl.querySelectorAll('input[required], select[required]');
    
    for (let input of inputs) {
        if (!input.value.trim()) {
            showMessage(`Por favor, preencha o campo: ${input.previousElementSibling.textContent}`, 'error');
            input.focus();
            return false;
        }
        
        // Validação de email
        if (input.type === 'email' && !input.value.includes('@')) {
            showMessage('E-mail inválido!', 'error');
            input.focus();
            return false;
        }
        
        // Validação de senha (mínimo 6 caracteres)
        if (input.name === 'senha' && input.value.length < 6) {
            showMessage('A senha deve ter no mínimo 6 caracteres!', 'error');
            input.focus();
            return false;
        }
    }
    
    return true;
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.length === 14;
}

// =====================================================
// MÁSCARAS
// =====================================================

// Máscara de Celular: (00) 00000-0000
document.getElementById('celular').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
        value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }
    
    e.target.value = value;
});

// Máscara de CNPJ: 00.000.000/0000-00
document.getElementById('cnpj').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);
    
    if (value.length > 12) {
        value = `${value.slice(0,2)}.${value.slice(2,5)}.${value.slice(5,8)}/${value.slice(8,12)}-${value.slice(12)}`;
    } else if (value.length > 8) {
        value = `${value.slice(0,2)}.${value.slice(2,5)}.${value.slice(5,8)}/${value.slice(8)}`;
    } else if (value.length > 5) {
        value = `${value.slice(0,2)}.${value.slice(2,5)}.${value.slice(5)}`;
    } else if (value.length > 2) {
        value = `${value.slice(0,2)}.${value.slice(2)}`;
    }
    
    e.target.value = value;
});

// Máscara de Telefone: (00) 0000-0000
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    if (value.length > 6) {
        value = `(${value.slice(0,2)}) ${value.slice(2,6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }
    
    e.target.value = value;
});

// Máscara de CEP: 00000-000
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length > 5) {
        value = `${value.slice(0,5)}-${value.slice(5)}`;
    }
    
    e.target.value = value;
});

// UF em maiúsculas
document.getElementById('uf').addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
});

// =====================================================
// BUSCA CEP (ViaCEP)
// =====================================================

document.getElementById('cep').addEventListener('blur', async function(e) {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                // Preencher campos automaticamente
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('municipio').value = data.localidade || '';
                document.getElementById('uf').value = data.uf || '';
                
                // Focar no número
                document.getElementById('numero').focus();
                
                showMessage('CEP encontrado!', 'success');
            } else {
                showMessage('CEP não encontrado!', 'error');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    }
});

// =====================================================
// MENSAGENS
// =====================================================

function showMessage(text, type = 'error') {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
}

function setLoading(loading) {
    btnCadastrar.disabled = loading;
}

// =====================================================
// MODAL DE TERMOS
// =====================================================

function mdParaHtml(md) {
    return md
        .replace(/^# (.+)$/gm,   '<h2>$1</h2>')
        .replace(/^## (.+)$/gm,  '<h3>$1</h3>')
        .replace(/^### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^(.+)$/gm, (linha) => {
            if (linha.startsWith('<h')) return linha;
            if (linha.trim() === '') return '';
            return `<p>${linha}</p>`;
        });
}

async function abrirModalTermos() {
    if (!validateStep(currentStep)) return;

    // Resetar estado do modal
    document.getElementById('termosModal').checked = false;
    btnCadastrar.disabled = true;

    // Carregar termos do .md (apenas uma vez)
    const conteudo = document.getElementById('termosConteudo');
    if (conteudo.dataset.carregado !== 'true') {
        try {
            const resp = await fetch('termos-de-uso.md');
            const texto = await resp.text();
            conteudo.innerHTML = mdParaHtml(texto);
            conteudo.dataset.carregado = 'true';
        } catch {
            conteudo.innerHTML = '<p>Não foi possível carregar os termos. Tente novamente.</p>';
        }
    }

    document.getElementById('modalTermos').classList.remove('hidden');
}

function fecharModalTermos() {
    document.getElementById('modalTermos').classList.add('hidden');
}

function toggleBtnConfirmar() {
    btnCadastrar.disabled = !document.getElementById('termosModal').checked;
}

function confirmarCadastro() {
    fecharModalTermos();
    submeterCadastro();
}

// =====================================================
// CADASTRO
// =====================================================

async function cadastrar(dados) {
    setLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Sucesso!
            mostrarSucesso(data.data);
        } else {
            showMessage(data.message || 'Erro ao criar conta. Tente novamente.');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
        setLoading(false);
    }
}

function mostrarSucesso(data) {
    // Ocultar formulário
    document.getElementById('cadastroForm').style.display = 'none';
    document.querySelector('.steps').style.display = 'none';
    
    // Mostrar mensagem de sucesso
    const container = document.querySelector('.cadastro-box');
    container.innerHTML = `
        <div class="success-check">
            <div class="icon">✓</div>
            <h2>Conta criada com sucesso!</h2>
            <p>Bem-vindo ao SIRIUS WEB, ${data.usuario.nome}!</p>
            <p>Sua empresa <strong>${data.empresa.nome_fantasia}</strong> foi cadastrada no plano FREE.</p>
            <p>Você será redirecionado para o login em 3 segundos...</p>
        </div>
    `;
    
    // Sinalizar que é o primeiro acesso (será consumido no dashboard)
    localStorage.setItem('sirius_primeiro_acesso', 'true');

    // Redirecionar após 3 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

// =====================================================
// SUBMIT DO FORMULÁRIO
// =====================================================

async function submeterCadastro() {
    const dados = {
        // Pessoais
        nome: document.getElementById('nome').value.trim(),
        sobrenome: document.getElementById('sobrenome').value.trim(),
        email: document.getElementById('email').value.trim(),
        celular: document.getElementById('celular').value.replace(/\D/g, ''),
        senha: document.getElementById('senha').value,

        // Empresa
        razao_social: document.getElementById('razao_social').value.trim(),
        nome_fantasia: document.getElementById('nome_fantasia').value.trim(),
        cnpj: document.getElementById('cnpj').value.replace(/\D/g, ''),
        telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
        email_empresa: document.getElementById('email_empresa').value.trim(),

        // Endereço
        cep: document.getElementById('cep').value.replace(/\D/g, ''),
        logradouro_tipo: document.getElementById('logradouro_tipo').value,
        logradouro: document.getElementById('logradouro').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        complemento: document.getElementById('complemento').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        municipio: document.getElementById('municipio').value.trim(),
        uf: document.getElementById('uf').value.trim()
    };
    
    // Validar CNPJ
    if (!validateCNPJ(dados.cnpj)) {
        showMessage('CNPJ inválido! Deve ter 14 dígitos.', 'error');
        goToStep(2);
        document.getElementById('cnpj').focus();
        return;
    }
    
    // Cadastrar
    await cadastrar(dados);
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================

console.log('🚀 Cadastro SIRIUS WEB iniciado');
console.log('📡 API:', API_URL);

// Focar no primeiro campo
document.getElementById('nome').focus();

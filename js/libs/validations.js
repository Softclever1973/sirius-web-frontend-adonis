// =====================================================
// SIRIUS WEB - Validações (módulo compartilhado)
// Depende de: nada
// =====================================================

/**
 * Valida CPF.
 * @returns {{ valido: boolean, mensagem: string }}
 */
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return { valido: false, mensagem: 'CPF deve conter 11 dígitos.' };
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return { valido: false, mensagem: 'CPF inválido.' };
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    if (digito1 !== parseInt(cpf.charAt(9))) {
        return { valido: false, mensagem: 'CPF inválido! Primeiro dígito verificador incorreto.' };
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    if (digito2 !== parseInt(cpf.charAt(10))) {
        return { valido: false, mensagem: 'CPF inválido! Segundo dígito verificador incorreto.' };
    }

    return { valido: true, mensagem: 'CPF válido!' };
}

/**
 * Valida CNPJ.
 * @returns {{ valido: boolean, mensagem: string }}
 */
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        return { valido: false, mensagem: 'CNPJ deve conter 14 dígitos.' };
    }

    if (/^(\d)\1{13}$/.test(cnpj)) {
        return { valido: false, mensagem: 'CNPJ inválido.' };
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
        return { valido: false, mensagem: 'CNPJ inválido! Dígito verificador incorreto.' };
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) {
        return { valido: false, mensagem: 'CNPJ inválido! Dígito verificador incorreto.' };
    }

    return { valido: true, mensagem: 'CNPJ válido!' };
}

/**
 * Valida código de barras EAN-13.
 * @returns {{ valido: boolean, mensagem: string }}
 */
function validarEAN13(codigoBarras) {
    const ean = codigoBarras.replace(/[\s-]/g, '');

    if (!/^\d{13}$/.test(ean)) {
        return { valido: false, mensagem: 'O código EAN-13 deve conter exatamente 13 dígitos numéricos.' };
    }

    const digitos = ean.split('').map(Number);
    const digitoVerificador = digitos[12];

    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += digitos[i] * (i % 2 === 0 ? 1 : 3);
    }

    const resto = soma % 10;
    const digitoCalculado = resto === 0 ? 0 : 10 - resto;

    if (digitoCalculado !== digitoVerificador) {
        return {
            valido: false,
            mensagem: `Código EAN-13 inválido! O dígito verificador correto deveria ser ${digitoCalculado}, mas foi informado ${digitoVerificador}.`
        };
    }

    return { valido: true, mensagem: 'Código EAN-13 válido!' };
}

/**
 * Consulta endereço na API ViaCEP e preenche os campos do formulário.
 * Espera os IDs: cep, endereco, complemento, cidade, uf.
 * @param {Function} [onMensagem] - callback(texto, tipo) para exibir feedback; usa mostrarMensagem se omitido.
 */
async function buscarCEP(onMensagem) {
    const fn = onMensagem || (typeof mostrarMensagem === 'function' ? mostrarMensagem : console.log);
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        fn('CEP deve ter 8 dígitos', 'error');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            fn('CEP não encontrado', 'error');
            return;
        }

        document.getElementById('endereco').value    = data.logradouro  || '';
        document.getElementById('complemento').value = data.complemento || '';
        document.getElementById('cidade').value      = data.localidade  || '';
        document.getElementById('uf').value          = data.uf          || '';

        fn('CEP encontrado!', 'success');
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        fn('Erro ao buscar CEP', 'error');
    }
}

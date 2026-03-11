// =====================================================
// SIRIUS WEB - Máscaras de Input (módulo compartilhado)
// Depende de: nada
// =====================================================

function mascaraCPF(valor) {
    valor = valor.replace(/\D/g, '').substring(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor;
}

function mascaraCNPJ(valor) {
    valor = valor.replace(/\D/g, '').substring(0, 14);
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor;
}

/** Aceita celular (11 dígitos) e telefone fixo (10 dígitos). */
function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, '').substring(0, 11);
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return valor;
}

function mascaraCEP(valor) {
    valor = valor.replace(/\D/g, '').substring(0, 8);
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    return valor;
}

/**
 * Aplica uma máscara a um elemento input de forma reativa.
 * @param {HTMLElement} input
 * @param {Function}    funcaoMascara
 */
function aplicarMascara(input, funcaoMascara) {
    if (!input) return;
    input.addEventListener('input', (e) => {
        e.target.value = funcaoMascara(e.target.value);
    });
}

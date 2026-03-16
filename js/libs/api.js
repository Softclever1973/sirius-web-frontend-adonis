// =====================================================
// SIRIUS WEB - API Client (módulo compartilhado)
// Centraliza a detecção de ambiente e a URL da API.
// Deve ser carregado antes de qualquer outro script.
// =====================================================

const isDev = window.location.hostname === 'localhost'
           || window.location.hostname === '127.0.0.1'
           || window.location.hostname === ''
           || window.location.protocol === 'file:';

const API_URL = isDev
    ? 'http://localhost:3000'
    : 'https://sirius-web-api-adonis-pearl.vercel.app';

/**
 * Fetch autenticado com os headers padrão da empresa.
 * Lê token e empresaId automaticamente do localStorage.
 *
 * @param {string} url     - Caminho relativo (ex: '/clientes') ou URL completa
 * @param {object} options - Opções do fetch (method, body, headers extras…)
 * @returns {Promise<Response>}
 */
async function apiFetch(url, options = {}) {
    const token    = localStorage.getItem('sirius_token');
    const empresas = JSON.parse(localStorage.getItem('sirius_empresas') || '[]');
    const empresaId = empresas[0]?.id;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'X-Empresa-Id': empresaId,
        ...(options.headers || {})
    };

    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

    return fetch(fullUrl, { ...options, headers });
}

async function isSuperAdmin() {
    try{
        const token = localStorage.getItem('sirius_token');
        const response = await fetch(`${API_URL}/parametros/superadmin/empresas`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok){
            if (response.status === 403){
                alert('Acesso Negado! Apenas Super Admins podem acessar está página!');
                window.location.href='menu-principal.html'
                return;
            }
            throw new Error(data.message || 'Erro ao carregar empresa');
        }
    }
    catch(error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro' + error.message)
    }
}
async function isSuperAdmin() {
    try{
        const token = localStorage.getItem('sirius_token');
        const response = await fetch(`${API_URL}/parametros/superadmin/empresas`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok){
            if (response.status === 403){
                alert('Acesso Negado! Apenas Super Admins podem acessar está página!');
                window.location.href='menu-principal.html'
                return;
            }
            throw new Error(data.message || 'Erro ao carregar empresa');
        }
    }
    catch(error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro' + error.message)
    }
}

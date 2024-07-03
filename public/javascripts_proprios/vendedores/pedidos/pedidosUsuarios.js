
const url = "http://localhost:200/vendedor/clienteVendedor"
const inputFuncao = document.getElementById('Funcao_input');
const inputUsuario = document.getElementById('Usuario_input');
const idDoVendedor = document.getElementById('idDoVendedor').value;



function adquirirListsUsers() {
    const funcaoUsuario = inputFuncao.value;

    axios.get(`${url}?idVendedor=${idDoVendedor}&funcao=${funcaoUsuario}`)
        .then(resp => {
            console.log(resp.data);
            inputUsuario.innerHTML = ''; // Limpar as opções existentes
            resp.data.forEach(user => {
                inputUsuario.innerHTML += `<option value="${user.id_usuario}">${user.nome}</option>`;
            });
        })
        .catch(err => {
            console.log(err);
        });
}



// Adicionar listener para o evento 'change'
inputFuncao.addEventListener('change', () => {
    adquirirListsUsers();
});


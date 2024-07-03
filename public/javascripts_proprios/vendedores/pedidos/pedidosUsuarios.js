const url = "http://localhost:3030/vendedores/clienteVendedor"
const inputFuncao = document.getElementById('Funcao_input');
const inputUsuario = document.getElementById('Usuario_input');
const idDoVendedor = document.getElementById('idDoVendedor').value;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

inputUsuario.addEventListener('click', alerta);
inputUsuario.addEventListener('click', totalDeDesconto);

inputFuncao.addEventListener('input', () => {
    inputUsuario.removeEventListener('click', alerta);
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(`${url}?idVendedor=${idDoVendedor}`)
        .then(resp => {            
            console.log(resp.data)
            resp.data.forEach(user => {
                inputUsuario.innerHTML += `<option value="${user.id_usuario}">${user.nome}</option>`;
            });
        })
        .catch(err => {
            console.log(err);
        });
}


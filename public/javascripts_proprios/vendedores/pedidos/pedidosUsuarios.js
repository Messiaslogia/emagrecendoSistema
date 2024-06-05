const url = "http://localhost:3030/vendedores/usuarioPedidos"
const inputUsuario = document.getElementById('Usuario_input');
const idDoVendedor = document.getElementById('idDoVendedor').value;

document.addEventListener('DOMContentLoaded', () => {
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


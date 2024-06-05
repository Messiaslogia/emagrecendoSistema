const url = "http://localhost:3030/distribuidor/usuarioPedidos"
const inputUsuario = document.getElementById('Usuario_input');
const inputDistribuidor = document.getElementById('idDistribuidor');

const idDistribuidor = inputDistribuidor.value;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(`${url}?idDistribuidor=${idDistribuidor}`)
        .then(resp => {
            console.log(resp.data)
            resp.data.forEach(user => {
                inputUsuario.innerHTML += `
                <option value="${user.id_usuario}">${user.nome}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}


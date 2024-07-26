const url = "http://localhost:3030/distribuidor/usuarioPedidos"
const inputUsuario = document.getElementById('Usuario_input');
const idDistribuidor = document.getElementById('idDistribuidor').value;


document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(`${url}?idDistribuidor=${idDistribuidor}`)
        .then(resp => {
            resp.data.forEach(user => {
                inputUsuario.innerHTML = `
                    <option select value="${user.id_usuario}">${user.nome}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}


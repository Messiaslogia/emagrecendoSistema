const urlUsuarios = "http://localhost:3030/api/todosUsuariosPedido";
const inputUsuario = document.getElementById('Usuario_input');

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(urlUsuarios)
        .then(resp => {
            // Use diretamente os dados da resposta sem chamar resp.json()
            resp.data.forEach(user => {
                inputUsuario.innerHTML += `
                <option registro="${user.funcao}" value="${user.id_usuario}">${user.nome}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}
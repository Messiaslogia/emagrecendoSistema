const urlUsuarios = "http://localhost:3000/api/todosUsuariosPedido";
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
                <option value="${user.nome}">${user.nome}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}
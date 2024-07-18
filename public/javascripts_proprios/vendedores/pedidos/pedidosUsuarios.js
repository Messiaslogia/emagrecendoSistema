
const url = "http://localhost:200/vendedor/clienteVendedor"
const inputFuncao = document.getElementById('Funcao_input');
const inputUsuario = document.getElementById('Usuario_input');

const idDoVendedor = document.getElementById('idDoVendedor').value;

function alerta() {
    alert('Selecione uma função antes!!')
};


function adquirirListsUsers() {
    const funcaoUsuario = inputFuncao.value;

    axios.get(`${url}?idVendedor=${idDoVendedor}&funcao=${funcaoUsuario}`)
        .then(resp => {
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

inputUsuario.addEventListener('click', (e) => {
    if (inputFuncao.value === "") {
        e.preventDefault();
        alerta();
    }
});


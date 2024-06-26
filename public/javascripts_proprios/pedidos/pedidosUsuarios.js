
const urlUsuarios = "http://localhost:200/users/allUsersPedidosAdmin";
const urlAllDesconto = "http://localhost:200/desconto/";
const inputDesconto = document.querySelector('#Desconto_input');
const inputFuncao = document.getElementById('Funcao_input');
const div_produto = document.getElementById('Produto_input');
const div_valorProduto = document.getElementById('Valor_Produto');
const inputUsuario = document.getElementById('Usuario_input');
const checkboxes = document.getElementsByName('escolher_usar');

function alerta(){
    alert('Selecione uma função antes!!')
};

function totalDeDesconto(){
    inputDesconto.value = '';
    // Quantidade de desconto
    axios.post(`${urlAllDesconto}quantidadeDeDescont`, { id: inputUsuario.value })
        .then((result) => {
            inputDesconto.value = `R$ ${result.data[0].desconto_usuario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    })
};

inputUsuario.addEventListener('click', alerta);
inputUsuario.addEventListener('click', totalDeDesconto);

inputFuncao.addEventListener('input', () => {
    inputUsuario.removeEventListener('click', alerta);
    adquirirListsUsers();
});


function adquirirListsUsers() {
    const inputValue = inputFuncao.value;

    axios.post(urlUsuarios, {
        funcao: inputValue
    })
        .then(resp => {
            inputUsuario.innerHTML = ''
            inputUsuario.innerHTML += `<option >Selecione um usuário</option>`
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
};

function escolherUserDesconto(checkbox){
    checkboxes.forEach((item) => {
        item.disabled = checkbox.checked;
        if (item !== checkbox) {
            item.value = checkbox.value
            item.checked = false;
            item.disabled = checkbox.checked; // Desativa o outro checkbox se o atual estiver selecionado
        }
    });
};





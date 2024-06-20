const urlUsuarios = "http://localhost:3030/api/usuariosPedidos";
const inputFuncao = document.getElementById('Funcao_input');
const div_produto = document.getElementById('Produto_input');
const div_valorProduto = document.getElementById('Valor_Produto');
const inputUsuario = document.getElementById('Usuario_input');

document.addEventListener('DOMContentLoaded', () => {
    inputFuncao.addEventListener('change', () => {
        div_produtos.value = '';
        div_valorProdutos.value = '';
        inputUsuario.value = '';

        const valorSelecionado = inputFuncao.value;
        console.log(valorSelecionado)


        axios.get(`${urlUsuarios}/${valorSelecionado}`)
            .then(resp => {
               console.log(resp.data);
                // inputFuncao.innerHTML = '<option disabled selected value="">Selecione o Usuário</option>';


                resp.data.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id_usuario;
                    option.textContent = user.nome;
                    inputUsuario.appendChild(option);
                });
            })
            .catch(err => {
                console.log(err);
            })
            })

    });


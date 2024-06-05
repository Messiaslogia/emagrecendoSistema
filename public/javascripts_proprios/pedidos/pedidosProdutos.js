
const url = "http://localhost:3030/apiProdutos/todosProdutosForm";
const div_produtos = document.getElementById('Produto_input');
const div_valorProdutos = document.getElementById('Valor_Produto');
// const div_valorDistribuidor = document.getElementById('Valor_Distribuidor');
// const div_valorRevenda = document.getElementById('Valor_Revenda');
const input_select = document.querySelector('#Usuario_input');
let funcao_usuario;


document.addEventListener('DOMContentLoaded', () => {
    listaNomesProdutos();
});



function listaNomesProdutos(){
    axios.get(url)
        .then( resp => {
            resp.data.forEach( produto => {
                div_produtos.innerHTML += `
                <option value="${produto.id_produto}">${produto.nome}</option>
                `
            })
        })
        .catch( err => {
            console.log(err)
        })
}

input_select.addEventListener('change', () => {
    div_produtos.value = '';
    div_valorProdutos.value = '';
    let selectOption = input_select.options[input_select.selectedIndex]
    funcao_usuario = selectOption.getAttribute('registro')
    console.log(funcao_usuario)
})

div_produtos.addEventListener('change', function () {
    var valor = div_produtos.value
    axios.get(`http://localhost:3030/apiProdutos/consultProduto/${valor}`)
        .then((result) => {
            switch (funcao_usuario) {
                case 'Gerente':
                    div_valorProdutos.value = `R$ ${result.data[0].preco}`;
                    break;

                case 'Distribuidor':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor}`;
                    break;

                case 'Vendedor':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_revenda}`;
                    break;

                case 'Afiliado':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor}`;
                    break;

                case 'Representante':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor}`;
                    break;

                case 'Cliente':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_revenda}`;
                    break;
            
                default:
                    alert('Selecione um usuário primeiro.')
                    div_produtos.value = ''
                    break;
            }            
        }).catch((err) =>{
            console.log(err)
        })
})
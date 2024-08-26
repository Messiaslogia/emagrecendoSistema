
const url = "https://sistemaemagrecendo.com/apiProdutos/todosProdutosForm";
const div_produtos = document.getElementById('Produto_input');
const div_valorProdutos = document.getElementById('Valor_Produto');
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
    let selectOption = input_select.options[input_select.selectedIndex];
    funcao_usuario = selectOption.getAttribute('registro');
})

div_produtos.addEventListener('change', function () {
    var valor = div_produtos.value;

    axios.get(`https://sistemaemagrecendo.com/apiProdutos/consultProduto/${valor}`)
        .then((result) => {
            switch (funcao_usuario) {
                case '1':
                    div_valorProdutos.value = `R$ ${result.data[0].preco}`;
                    break;

                case '2':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    break;

                case '3':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_revenda}`;
                    break;

                case '7':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor}`;
                    break;

                case '6':
                    div_valorProdutos.value = `R$ ${result.data[0].preco_distribuidor}`;
                    break;

                case '4':
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
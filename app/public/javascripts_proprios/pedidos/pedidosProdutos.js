const url = "http://localhost:3000/apiProdutos/todosProdutos";
const div_produtos = document.getElementById('Produto_input')


document.addEventListener('DOMContentLoaded', () => {
    listaNomesProdutos();
});

function listaNomesProdutos(){
    axios.get(url)
        .then( resp => {
            resp.data.forEach( produto => {
                div_produtos.innerHTML += `
                <option value="${produto.nome}">${produto.nome}</option>
                `
            })
        })
        .catch( err => {
            console.log(err)
        })
}
const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiProdutos/todosProdutos";
const div_produtos = document.querySelector('#Tabela_de_produtos')

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
});

function adquirirListProdutos(){
    fetch(url)
        .then( resp => resp.json())
        .then( data => {
            data.forEach( produto => {
                div_produtos.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex px-2 py-1">
                                <div>
                                    <img src="${produto.imagem}"
                                        class="avatar avatar-sm me-3 border-radius-lg" alt="user">
                                </div>
                                <div class="d-flex flex-colum justify-content-center">
                                    <h6 class="mb-0 text-sm">${produto.nome}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0">${produto.preço}</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">${produto.quantidade}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${produto.data_adicao}</span>
                        </td>
                        <td class="align-middle">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiProdutos/dellProduto/${produto.id_produto}"><i
                                class="material-icons text-sm me-2">delete</i>Deletar</a>
                            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a>
                        </td>
                    </tr>
                `
            })
        })
        .catch( err => {
            console.log(err)
        })
}
const container_users = document.querySelector('#Container_Users');
const url = "https://sistemaemagrecendo.com/apiProdutos/todosProdutos";
const div_produtos = document.querySelector('#Tabela_de_produtos');
let itensPorPagina = 5;
let listProduto;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
    setTimeout(() => {
        displayItens(1);
    }, [300]);
});

function adquirirListProdutos(){
    axios.get(`${url}`)
        .then(resp => {
            listProduto = resp.data;
        })
        .catch(err => {
            console.log(err);
        }) 
};

function paginas(page){
    const pageCont = Math.ceil(listProduto.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = ''

    for( i = 1; i <= pageCont; i++){
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link    ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`
    }
};

function displayItens( page ){
    
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let reversePedidos = listProduto.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);
    // Exibindo os itens
   div_produtos.innerHTML = '';

    pageItens.map(produto => {
        let valor = produto.preco.toFixed(2);
        if(produto.quantidade < 10){
            alert(`O produto: ${produto.nome} está com baixo estoque`);
            div_produtos.innerHTML += `
                                 <tr>
                                      <td>
                                          <div class="d-flex px-2 py-1">
                                              
                                              <div class="d-flex flex-colum justify-content-center">
                                                  <h6 class="mb-0 text-sm">${produto.nome}</h6>
                                              </div>
                                          </div>
                                      </td>
                                      <td>
                                          <p class="text-xs font-weight-bold mb-0">R$ ${valor}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span id="quantidade_span" class="badge badge-sm bg-gradient-danger">${produto.quantidade}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${produto.data_adicao}</span>
                                      </td>
                                      <td class="align-middle">
                                          <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiProdutos/dellProduto/${produto.id_produto}"><i
                                              class="material-icons text-sm me-2">delete</i>Deletar</a>
                                          <a class="btn btn-link text-dark px-3 mb-0" href="/apiProdutos/editarProduto/${produto.id_produto}"><i class="material-icons text-sm me-2">edit</i>Editar</a>
                                      </td>
                                 </tr>
                         `
        }
        else{
            div_produtos.innerHTML += `
                                 <tr>
                                      <td>
                                          <div class="d-flex px-2 py-1">
                                              
                                              <div class="d-flex flex-colum justify-content-center">
                                                  <h6 class="mb-0 text-sm">${produto.nome}</h6>
                                              </div>
                                          </div>
                                      </td>
                                      <td>
                                          <p class="text-xs font-weight-bold mb-0">R$ ${valor}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span id="quantidade_span" class="badge badge-sm bg-gradient-success">${produto.quantidade}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${produto.data_adicao}</span>
                                      </td>
                                      <td class="align-middle">
                                          <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiProdutos/dellProduto/${produto.id_produto}"><i
                                              class="material-icons text-sm me-2">delete</i>Deletar</a>
                                          <a class="btn btn-link text-dark px-3 mb-0" href="/apiProdutos/editarProduto/${produto.id_produto}"><i class="material-icons text-sm me-2">edit</i>Editar</a>
                                      </td>
                                 </tr>
                         `
        }


            
    })
    paginas(page);
};
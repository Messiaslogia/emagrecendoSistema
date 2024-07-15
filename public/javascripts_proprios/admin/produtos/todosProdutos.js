const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3030/apiProdutos/todosProdutos";
const div_produtos = document.querySelector('#Tabela_de_produtos');
const Id_User = document.querySelector('#Id_user').value;

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

function paginas(page) {
    const pageCont = Math.ceil(listProduto.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = '';

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont}, ${array})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1, ${array})">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1, ${array})">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont}, ${array})">${pageCont}</a></li>`;
        }
    }
}

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
                                        <img class="rounded" src="/${produto.imagem}" alt="Imagem do Produto" width="100">
                                      </td>
                                      <td>
                                          <div class="d-flex px-2 py-1">
                                                  <h6 class="mb-0 text-sm">${produto.nome}</h6>
                                          </div>
                                      </td>
                                      <td>
                                          <p class="text-xs font-weight-bold mb-0">${produto.descricao.substring(0, 30) + "..." }</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                        <span id="quantidade_span" class="badge badge-sm bg-gradient-success">${produto.quantidade}</span>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${valor}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_distribuidor}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_revenda}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_vendedor}</p>
                                      </td class="align-middle text-center text-sm">

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">${produto.categoria === 1 ? 'Produto' : produto.categoria === 2 ? 'Material' : 'Brinde'}</p>
                                      </td class="align-middle text-center text-sm">
                                     
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${new Date(produto.data_adicao).toISOString().split('T')[0] }</span>
                                      </td>
                                      
                                      <td class="align-middle">
                                          <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiProdutos/dellProduto/${produto.id_produto}?user=${Id_User}"><i
                                              class="material-icons text-sm me-2">delete</i></a>
                                          <a class="btn btn-link text-dark px-3 mb-0" href="/apiProdutos/editarProduto/${produto.id_produto}?user=${Id_User}"><i class="material-icons text-sm me-2">edit</i></a>
                                      </td>
                                 </tr>
                         `
        }
        else{
            div_produtos.innerHTML += `
                                 <tr>
                                      <td>
                                        <img class="rounded" src="/${produto.imagem}" alt="Imagem do Produto" width="100">
                                      </td>
                                      <td>
                                          <div class="d-flex px-2 py-1">
                                                  <h6 class="mb-0 text-sm">${produto.nome}</h6>
                                          </div>
                                      </td>
                                      <td>
                                          <p class="text-xs font-weight-bold mb-0">${produto.descricao.substring(0, 30) + "..." }</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                        <span id="quantidade_span" class="badge badge-sm bg-gradient-success">${produto.quantidade}</span>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${valor}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_distribuidor}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_revenda}</p>
                                      </td>

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${produto.preco_vendedor}</p>
                                      </td class="align-middle text-center text-sm">

                                      <td class="align-middle text-center text-sm">
                                          <p class="text-xs font-weight-bold mb-0">${produto.categoria === 1 ? 'Produto' : produto.categoria === 2 ? 'Material' : 'Brinde'}</p>
                                      </td class="align-middle text-center text-sm">
                                     
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${new Date(produto.data_adicao).toISOString().split('T')[0] }</span>
                                      </td>
                                      
                                      <td class="align-middle">
                                          <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiProdutos/dellProduto/${produto.id_produto}?user=${Id_User}"><i
                                              class="material-icons text-sm me-2">delete</i></a>
                                          <a class="btn btn-link text-dark px-3 mb-0" href="/apiProdutos/editarProduto/${produto.id_produto}?user=${Id_User}"><i class="material-icons text-sm me-2">edit</i></a>
                                      </td>
                                 </tr>
                         `
        }


            
    })
    paginas(page);
};
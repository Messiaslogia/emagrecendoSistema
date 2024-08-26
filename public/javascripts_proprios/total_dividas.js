const url = "https://sistemaemagrecendo.com/apiDividas/todasDividas/";
const div_dividas = document.querySelector('#Tabela_de_dividas');
let id;
let itensPorPagina = 5;
let listProduto;
let caseDividas;

document.addEventListener('DOMContentLoaded', () => {
    id = document.querySelector('#Id_User').value
    console.log(id);
    adquirirListProdutos();
    caseDividas = document.querySelector('#Total_Dividas');
    setTimeout(() => {
        displayItens(1);
    }, [300]);
});

function adquirirListProdutos(){
    let valor = 0

    axios.get(`${url}?user=${id}`)
        .then(resp => {
            listProduto = resp.data;
            listProduto.forEach(element => {
                valor = valor + element.valor
            });
            caseDividas.innerHTML = `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont})">${pageCont}</a></li>`;
        }
    }
}

function displayItens(page) {
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let reversePedidos = listProduto.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);

    div_dividas.innerHTML = '';

    pageItens.map(divida => {
        div_dividas.innerHTML += `
                                 <tr>
                                      <td>
                                          <div class="d-flex px-2 py-1">
                                             
                                              <div class="d-flex flex-colum justify-content-center">
                                                  <h6 class="mb-0 text-sm">${divida.nome}</h6>
                                              </div>
                                          </div>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${divida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">${divida.data}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${divida.hora}</span>
                                      </td>
                                      <td class="align-middle">
                                          <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiDividas/deletarDivida/${divida.id_divida}"><i
                                              class="material-icons text-sm me-2">delete</i>Deletar</a>
                                          <a class="btn btn-link text-dark px-3 mb-0" href="/apiDividas/editarDividaForm/${divida.id_divida}"><i class="material-icons text-sm me-2">edit</i>Editar</a>
                                      </td>
                                 </tr>
                         `
    });

    paginas(page); // Chama a função de paginação passando a página atual após renderizar os itens
}




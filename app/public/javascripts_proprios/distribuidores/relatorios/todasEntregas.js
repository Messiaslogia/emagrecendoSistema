const url = "http://localhost:200/distribuidores/todasEntregas";
const div_entregas = document.querySelector('#Tabela_de_entregas');
const id_user = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let listProduto;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
    setTimeout(() => {
        displayItens(1);
    }, [300]);
});

function adquirirListProdutos() {
    axios.get(`${url}?idDistribuidor=${id_user}`)
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
    containerPagination.innerHTML = ''

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link  ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
    }
};

function displayItens(page) {

    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let reversePedidos = listProduto.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);
    // Exibindo os itens
    div_entregas.innerHTML = '';
    pageItens.map(divida => {
        div_entregas.innerHTML += `
                                 <tr>
                                      <td class="text-center">                                          
                                        <h6 class="mb-0 text-sm">${divida.numero_do_pedido}</h6>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${divida.codigo_rastreio}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">${divida.valor_da_entrega}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${divida.empresa}</span>
                                      </td>
                                       <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${divida.data}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${divida.hora}</span>
                                      </td>
                                 </tr>
                         `
    })
    paginas(page);
};




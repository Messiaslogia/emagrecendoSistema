const url = "http://localhost:200/vendedor/todasVendas";
const div_entregas = document.querySelector('#Tabela_de_vendas');
const id_user = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let listProduto;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
    setTimeout(() => {
        displayItens(1);
    }, [800]);
});

function adquirirListProdutos() {
    axios.get(`${url}?idVendedor=${id_user}`)
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

    pageItens.map(venda => {
        div_entregas.innerHTML += `
                                 <tr>
                                      <td class="text-center">                                          
                                        <h6 class="mb-0 text-sm">${venda.numero_do_pedido}</h6>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${venda.codigo_rastreio}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">${venda.valor_da_entrega}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${venda.empresa}</span>
                                      </td>
                                       <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${venda.data}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${venda.hora}</span>
                                      </td>
                                 </tr>
                         `
    }).join();
    paginas(page);
};




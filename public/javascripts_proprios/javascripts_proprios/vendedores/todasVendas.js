const url = "https://apiemagrecendo.com/vendedor/todasVendas";
const div_entregas = document.querySelector('#Tabela_de_vendas');
const id_user = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let listUser = [];
let listProduto;

let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');


document.addEventListener('DOMContentLoaded', () => {
    adquirirListVendas();
    setTimeout(() => {
        displayItens(1);
    }, [800]);
});

function adquirirListVendas() {
    axios.get(`${url}?idVendedor=${id_user}`)
        .then(resp => {
            listProduto = resp.data;
            filtroUsers();
        })
        .catch(err => {
            console.log(err);
        })
};

async function filtroUsers(){
   await listProduto.forEach((venda, index) => {
        axios.post('https://apiemagrecendo.com/users/usuarioInfo?vendas=true', {
            id: venda.id_cliente_FK
        })
            .then(resp => {
                listUser[venda.id_venda] = (resp.data);
                console.log(listUser)
            })
    })
}

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
                                      <td class="d-flex flex-row text-center justify-content-center">                                          
                                        <i id="Info_pedidos" id_daVenda="${venda.id_venda}" class="material-icons cursor-pointer me-2">info</i><h6 class="mb-0 text-sm">${listUser[venda.id_venda][0].nome}</h6>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">R$ ${venda.valor_total}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">${venda.quantidade_total}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">R$ ${venda.valor_unitario}</span>
                                      </td>
                                       <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${venda.data}</span>
                                      </td>
                                      
                                 </tr>
                         `
    }).join();

    setTimeout(() => {
        let bt_produtos = document.querySelectorAll('#Info_pedidos');
    
        bt_produtos.forEach(info => {
            info.addEventListener('click', (e) => {
                let numero_da_venda = e.target.getAttribute('id_daVenda');
                criarModal(numero_da_venda);
            })
        })
    }, [300])

    paginas(page);
};

function criarModal(numeração){
    let bt_modal = document.querySelector('#Bt_modal');
    let pedido_number = document.querySelector('#Text_modal');

    pedido_number.innerHTML = '';
    tabela_pedidos.innerHTML = '';
    
    axios.post('https://apiemagrecendo.com/vendedor/consultVenda', {
        idVenda: numeração
    })
        .then(resp => {
            console.log(resp)

            tabela_pedidos.innerHTML += `
            <tr>
                <td>
                    <p class="text-xs font-weight-bold mb-0">${resp.data[1].nome}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">R$ ${resp.data[0].valor_unitario.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">R$ ${resp.data[0].valor_total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${resp.data[0].quantidade_total}</span>
                </td>
            </tr>`;

            infoUser(resp.data[2])
        })
    bt_modal.click();

};


function infoUser(info){
    let text_user = document.querySelector('#Text_user');
    let text_end = document.querySelector('#Text_Endereco');

    text_user.innerHTML = '';
    text_end.innerHTML = '';


    text_user.innerHTML = `Vendido para: ${info.nome}`;
    text_end.innerHTML = `Endereço: ${info.endereco}`;
};




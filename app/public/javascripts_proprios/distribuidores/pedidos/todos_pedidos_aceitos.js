const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/pedidosAprovadosDistribuidor";
const idDistribuidor = document.getElementById('idDistribuidor').value;
console.log(idDistribuidor);

// Div globais para funções de render e status
const div_pedidos = document.querySelector('#Tabela_de_pedidoPagos');
const itensPorPagina = 5;
let allPedidos;
let status_pedido;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();

    setTimeout(() => {
        displayItens( 1, 0 );
        dellFunction();
    }, [300])
});

function adquirirListProdutos(){
    fetch(`${url}?idDistribuidor=${idDistribuidor}`)
        .then( response => {
            return response.json()
        })
        .then( data => {
            allPedidos = data;
        })
        .catch( err => {
            console.log(err)
        })
}


function filtro(status){
    switch (status){
        case "Pago":
            displayItens(1, 1);
            dellFunction();
            break
        case "Aprovado":
            displayItens(1, 0);
            dellFunction();
            break
        case "Devendo":
            displayItens(1, 2);
            dellFunction();
            break
        default:
            console.log("Erro");
            break        
    }
};

// Paginação
function paginas(page, arrayindex) {
    const pageCont = Math.ceil(allPedidos[arrayindex].length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const isActivePage = (i === page);
        const pageClass = isActivePage ? 'bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${pageClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
    }
}







function displayItens(page, arrayindex){
    
   let startIndex = (page - 1) * itensPorPagina;
   let endIndex = startIndex + itensPorPagina;
   let arrayPedidos = allPedidos[arrayindex];
   let reversePedidos = arrayPedidos.slice().reverse();
   let pageItens = reversePedidos.slice(startIndex, endIndex);

   // Exibindo os itens
   div_pedidos.innerHTML = '';

   if(arrayindex == 1){
        pageItens.map(pedido => {
            div_pedidos.innerHTML += `
                <tr>
                    <td >
                        <div class="d-flex px-2 py-1 justify-content-center text-center">
                            <div class="cursor-pointer">
                                <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                            </div>
                            <div class="d-flex flex-colum justify-content-center text-center">
                                <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.status}</p>
                    </td>

                    <td class="align-middle text-center text-sm text-center">
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.valor}</p>
                    </td>
                    
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold text-center">${pedido.data}</span>
                    </td> 
                </tr>
            `
    })
    statusAlt()
   }else{
        pageItens.map(pedido => {
            div_pedidos.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex px-2 py-1 justify-content-center text-center">
                            <div class="cursor-pointer">
                                <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                            </div>
                            <div class="d-flex flex-colum justify-content-center text-center">
                                <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.status}</p>
                    </td>

                    <td class="align-middle text-center text-sm text-center">
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.valor}</p>
                    </td>
                    
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold text-center">${pedido.data}</span>
                    </td> 
                </tr>
            `
        })
        statusAlt()
   }

    paginas(page, arrayindex);
}


// Função de alterar o estado dos pedidos
function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');
    let status_pagamento = document.querySelectorAll('#Pagamento_input')

        status_pedido.forEach((pedido, index) => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');
                let metodoDPagamento = status_pagamento[index].value;

                axios.post('http://localhost:3000/apiPedidos/novoStatus', {
                    status: pedido.value,
                    pedido: numeroDPedido,
                    pagamento: metodoDPagamento
                })
                    .then(resp => {
                        location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })  
};

function dellFunction(){
    let botoes_deletar_pedido = document.querySelectorAll('#Button_Deletar_Pedido');
    

    botoes_deletar_pedido.forEach(botao => {
        botao.addEventListener('click', (e) => {
            let idPedido = e.target.getAttribute('idAtributo');

            axios.get(`/apiPedidos/dellPedidos/${idPedido}`)
                .then(resp => {
                    location.reload()
                })
                .catch(err => {
                    console.log(err);
                })
        })
    })
}

const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/todosOsPedidosDistribuidor";
const urlQUantidade = "http://localhost:200/pedidos/quantidadeTotalDosPedidos";
const idDistribuidor = document.getElementById('idDistribuidor').value
const div_pedidos = document.querySelector('#Tabela_de_pedidos')
let itensPorPagina = 5;
let status_pedido;
let listPedidos;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListPedidos();

    setTimeout(() => {
        displayItens(1, 0);
        dellFunction();
    }, [300])
});

function filtro(status) {
    switch (status) {
        case "Desaprovados":
            displayItens(1, 0);
            dellFunction();
            break
        case "Recusados":
            displayItens(1, 1);
            dellFunction();
            break
        default:
            console.log("Erro");
            break
    }
};

function adquirirListPedidos() {
    fetch(`${url}?idDistribuidor=${idDistribuidor}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            listPedidos = data;
            
        })
        .catch(err => {
            console.log(err);
        })
};

// Paginação
function paginas(page, arrayindex) {
    const pageCont = Math.ceil(listPedidos[arrayindex].length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link  ${activeClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
    }
}

function displayItens(page, arrayindex) {

    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listPedidos[arrayindex].slice().reverse();
    let pageItens = arrayPedidos.slice(startIndex, endIndex);

    // Exibindo os itens
    div_pedidos.innerHTML = '';

    if (arrayindex == 1) {
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
                     <p class="text-xs font-weight-bold mb-0">${pedido.status}</p>
                 </td>
                 <td class="align-middle text-center text-sm">
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
             </tr>
         `
        })
        statusAlt()
    } else {
        pageItens.map(pedido => {


            div_pedidos.innerHTML += `
             <tr>
                 <td>
                     <div class="d-flex px-2 py-1 justify-content-center text-center">
                         <div class="cursor-pointer ">
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
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
             </tr>
         `
        })
        statusAlt();
    }

    paginas(page, arrayindex);
};

function statusAlt() {
    let status_pedido = document.querySelectorAll('#Pedido_input');


    status_pedido.forEach(pedido => {
        pedido.addEventListener('change', (e) => {
            let numeroDPedido = e.target.getAttribute('number_pedido');

            axios.post('http://localhost:3000/apiPedidos/novoStatus', {
                status: pedido.value,
                pedido: numeroDPedido
            })
                .then(resp => {
                    window.location.href = 'http://localhost:3000/admin/aprovarPedido'
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
}

function dellFunction() {
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

{/* <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a> */ }

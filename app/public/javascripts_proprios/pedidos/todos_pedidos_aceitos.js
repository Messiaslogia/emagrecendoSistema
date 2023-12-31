const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3000/apiPedidos/todosPedidosAceitos";

// Div globais para funções de render e status
const div_pedidos = document.querySelector('#Tabela_de_pedidoPagos');
const itensPorPagina = 5;
let allPedidos;
let status_pedido;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();

    setTimeout(() => {
        displayItens( 1, 0 );
    }, [300])
});

function adquirirListProdutos(){
    fetch(url)
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
            displayItens(1, 1)
            break
        case "Aprovado":
            displayItens(1, 0)
            break
        case "Devendo":
            displayItens(1, 2)
            break
        default:
            console.log("Erro");
            break        
    }
};

// Paginação
function paginas(page, array){
    const pageCont = Math.ceil(allPedidos[array].length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = ''

    for( i = 1; i <= pageCont; i++){
        containerPagination.innerHTML += `<li class="page-item"><a class="page-link" onclick="displayItens(${i}, ${array})">${i}</a></li>`
    }
}


{/*  Posso precisar para páginação
                <li class="page-item disabled">
                    <a class="page-link" href="javascript:;" tabindex="-1">
                        <span class="material-icons">
                            keyboard_arrow_left
                        </span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="javascript:;">1</a></li>
                <li class="page-item"><a class="page-link" href="javascript:;">2</a></li>
                <li class="page-item"><a class="page-link" href="javascript:;">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="javascript:;">
                        <span class="material-icons">
                            keyboard_arrow_right
                        </span>
                        <span class="sr-only">Next</span>
                    </a>
                </li> */}



function displayItens(page, arrayindex){
    
   let startIndex = (page - 1) * itensPorPagina;
   let endIndex = startIndex + itensPorPagina;
   let arrayPedidos = allPedidos[arrayindex];
   let pageItens = arrayPedidos.slice(startIndex, endIndex);

   // Exibindo os itens
   div_pedidos.innerHTML = '';

   if(arrayindex == 1){
        pageItens.map(pedido => {
            div_pedidos.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="cursor-pointer">
                                <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                            </div>
                            <div class="d-flex flex-colum justify-content-center">
                                <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0">${pedido.status}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <select class="badge badge-sm bg-gradient-success">
                            <option class="text-info" select value="Crédito">Crédito</option>
                            <option class="text-info" value="Débito">Débito</option>
                            <option class="text-info" value="Pix">Pix</option>
                        </select>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                    </td>
                    <td class="align-middle text-center" >
                        <a class="btn btn-link text-info text-gradient mb-0" href="/apiPedidos/statusEntregas/${pedido.numero_do_pedido}">
                        Enviar</a>
                    </td>

                    <td class="align-middle ">
                        <a class="btn btn-link text-danger text-gradient mb-0" href="/apiPedidos/dellPedidos/${pedido.numero_do_pedido}">
                            <i class="material-icons text-sm me-2">delete</i>
                        Deletar</a>
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
                        <div class="d-flex px-2 py-1">
                            <div class="cursor-pointer">
                                <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                            </div>
                            <div class="d-flex flex-colum justify-content-center">
                                <h6 class="mb-0 text-sm" style="margin-left: 1rem">${pedido.numero_do_pedido}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0">${pedido.status}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <select class="badge badge-sm bg-gradient-success">
                            <option class="text-info" select value="Crédito">Crédito</option>
                            <option class="text-info" value="Débito">Débito</option>
                            <option class="text-info" value="Pix">Pix</option>
                        </select>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                    </td>
                    <td class="align-middle text-center">
                        <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control">
                            <option selected value="Em análise">Em análise</option>
                            <option value="Devendo">Não Pago</option>
                            <option value="Pago!">Pago</option>
                        </select>
                    </td>
                    <td class="align-middle " >
                        <a class="btn btn-link text-danger text-gradient mb-0" href="/apiPedidos/dellPedidos/${pedido.numero_do_pedido}">
                            <i class="material-icons text-sm me-2">delete</i>
                        Deletar</a>
                    </td>
                </tr>
            `
        })
        statusAlt()
   }

   paginas(0, arrayindex);
}


// Função de alterar o estado dos pedidos
function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');
        status_pedido.forEach(pedido => {

            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');
                let pai = e.target.parentNode;
                let avo = pai.parentNode;
                let allTd = avo.querySelectorAll('td');
                let infoPagamento = allTd[2].querySelector('select').value


                axios.post('http://localhost:3000/apiPedidos/novoStatus', {
                    status: pedido.value,
                    pedido: numeroDPedido,
                    pagamento: infoPagamento
                })
                    .then(resp => {
                        window.location.href = 'http://localhost:3000/admin/aprovarPedido'
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })  
};

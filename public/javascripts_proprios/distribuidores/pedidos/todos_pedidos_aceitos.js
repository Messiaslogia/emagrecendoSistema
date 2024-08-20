const url = "/apiPedidos/pedidosAprovadosDistribuidor";
const container_users = document.querySelector('#Container_Users');
const idDistribuidor = document.getElementById('idDistribuidor').value;
console.log(idDistribuidor);

// Div globais para funções de render e status
const div_pedidos = document.querySelector('#Tabela_de_pedidoPagos');
const itensPorPagina = 5;
let allPedidos;
let status_pedido;

// Modal Variaveis
let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');

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

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont}, ${arrayindex})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1, ${arrayindex})">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1, ${arrayindex})">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${arrayindex})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont}, ${arrayindex})">${pageCont}</a></li>`;
        }
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
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                        <p class="text-xs font-weight-bold mb-0 text-center">${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </td>
                    
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold text-center">${pedido.data}</span>
                    </td> 
                </tr>
            `
        })
        statusAlt()
   }

   setTimeout(() => {
    let bt_produtos = document.querySelectorAll('#Info_pedidos');

    bt_produtos.forEach(info => {
        info.addEventListener('click', (e) => {
            let number_pedido = e.target.getAttribute('number_pedido');
            criarModal(number_pedido);
        })
    })
}, [300])

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

                axios.post('/apiPedidos/novoStatus', {
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

// Modal Function
// filtroButton.forEach(dropdown => {
//     dropdown.addEventListener('click', () =>{
//         setTimeout(() => {
//             let paginasButton = document.querySelectorAll('.page-item');

//             paginasButton.forEach(pagina => {
//                 pagina.addEventListener('click', () => {
//                     let bt_produtos = document.querySelectorAll('#Info_pedidos');
        
//                     bt_produtos.forEach(info => {
//                         info.addEventListener('click', (e) => {
//                             let number_pedido = e.target.getAttribute('number_pedido');
//                             criarModal(number_pedido);
//                         })
//                     })
//                 })
//             });


//             let bt_produtos = document.querySelectorAll('#Info_pedidos');
//                 bt_produtos.forEach(info => {
//                     info.addEventListener('click', (e) => {
//                         let number_pedido = e.target.getAttribute('number_pedido');
//                         criarModal(number_pedido);
//                     })
//             })
//         }, [1500]);
//     });
// });

function criarModal(numeração){
    let bt_modal = document.querySelector('#Bt_modal');
    let pedido_number = document.querySelector('#Text_modal');

    pedido_number.innerHTML = '';
    tabela_pedidos.innerHTML = '';
    
    axios.post('http://localhost:200/pedidos/consultPedido', {
        numero: numeração
    })
        .then(resp => {

            infoUser(resp.data[0].id_usuario_FK);

            resp.data.forEach(pedido => {
                pedido_number.innerHTML = numeração;
                valorTotalInfo.push(pedido.valor);
                quantidadeTotalInfo.push(pedido.quantidade);


                axios.post('http://localhost:200/produtos/consultarProdutos', {
                    id: pedido.id_produto_FK
                })
                    .then(produto => {
                        let valorTotal = pedido.valorIndividual * pedido.quantidade
                        tabela_pedidos.innerHTML += `
                        <tr>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${produto.data[0].nome}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">R$ ${valorTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${pedido.quantidade}</span>
                            </td>
                        </tr>`;
     
                    })
                    .catch(erroProduto => {
                        console.log('Erro fetch produtos: ', erroProduto);
                    })
            })

            let quantidade = 0;
            let valor = 0;

            quantidadeTotalInfo.forEach((total, index) => {
                quantidade = quantidade + total;
                valor = valorTotalInfo[0];
            });

            tabela_pedidos.innerHTML += `
            <tr>
                <td>
                    <p class="text-xs font-weight-bold mb-0">Total</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">R$ ${valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${quantidade}</span>
                </td>
            </tr>`;

            quantidadeTotalInfo = [];
            valorTotalInfo = []
            bt_modal.click();
        })
        .catch(err => {
            console.log(err)
        })
};


function infoUser(id){
    let text_user = document.querySelector('#Text_user');
    let text_end = document.querySelector('#Text_Endereco');

    text_user.innerHTML = '';
    text_end.innerHTML = ''
    axios.post('http://localhost:200/users/usuarioInfo', {
        id: id
    })
        .then(resp => {
            console.log(resp.data)
            text_user.innerHTML = `Pedido feito por: ${resp.data[0].nome}`;
            text_end.innerHTML = `Endereço: ${resp.data[0].endereco}`
        })
        .catch(err => {
            console.log('erro ao consultar o usuário: ', err)
        })
};
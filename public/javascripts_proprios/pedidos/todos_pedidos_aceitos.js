const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3030/apiPedidos/todosPedidosAceitos";
const Id_User = document.querySelector('#Id_User').value;

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
        case "2":
            displayItens(1, 1);
            dellFunction();
            break
        case "6":
            displayItens(1, 0);
            dellFunction();
            break
        case "5":
            displayItens(1, 2);
            dellFunction();
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
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, ${array})">${i}</a></li>`
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
   let reversePedidos = arrayPedidos.slice().reverse();
   let pageItens = reversePedidos.slice(startIndex, endIndex);

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
                        <select class="badge badge-sm bg-gradient-secondary" disabled>
                            <option class="text-info" selected value="${pedido.pago_com}">${pedido.pago_com}</option>
                        </select>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <select class="badge badge-sm bg-gradient-secondary" disabled>
                            <option class="text-info" selected value="${pedido.banco}">${pedido.banco}</option>
                        </select>
                    </td>   
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                    </td>
                    <td class="align-middle text-center" >
                        <a class="btn btn-link text-info text-gradient mb-0" href="/apiPedidos/statusEntregas/${pedido.numero_do_pedido}/${pedido.id_pedido}?idUsuario=${pedido.id_usuario_FK}&user=${Id_User}">
                        Enviar</a>
                    </td>

                    <td class="align-middle ">
                        <a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
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
                        <select id="Pagamento_input" class="badge badge-sm bg-gradient-success">
                            <option class="text-info" value="Crédito">Crédito</option>
                            <option class="text-info" value="Débito">Débito</option>
                            <option class="text-info" value="Pix">Pix</option>
                        </select>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <select id="Banco_input" class="badge badge-sm bg-gradient-success">
                            <option class="text-info" value="C6">C6</option>
                            <option class="text-info" value="Nubanck">Nubanck</option>
                            <option class="text-info" value="PicPay">PicPay</option>
                            <option class="text-info" value="Pan">Pan</option>
                            <option class="text-info" value="Santander">Santander</option>
                            <option class="text-info" value="Caixa">Caixa</option>
                            <option class="text-info" value="Bradesco">Bradesco</option>
                            <option class="text-info" value="Itau">Itaú</option>
                            <option class="text-info" value="Bradesco">Bradesco</option>
                            <option class="text-info" value="Bradesco">Bradesco</option>
                        </select>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                    </td>
                    <td class="align-middle text-center">
                        <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control ">
                            <option selected disabled value="Em análise">--</option>
                            <option value="2">Pago</option>
                            <option value="5">Não Pago</option>
                        </select>
                    </td>

                    
                    <td class="align-middle " >
                        <a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
                            <i class="material-icons text-sm me-2">delete</i>
                        Deletar</a>
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
    let status_pagamento = document.querySelectorAll('#Pagamento_input');
    let status_banco = document.querySelector('#Banco_input');

        status_pedido.forEach((pedido, index) => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');
                let metodoDPagamento = status_pagamento[index].value;
                let bancoDPagamento = status_banco.value;

                axios.post('http://localhost:3030/apiPedidos/novoStatus', {
                    status: pedido.value,
                    pedido: numeroDPedido,
                    pagamento: metodoDPagamento,
                    banco: bancoDPagamento
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
            
            text_user.innerHTML = `Pedido feito por: ${resp.data[0].nome}`;
            text_end.innerHTML = `Endereço: ${resp.data[0].endereco}`
        })
        .catch(err => {
            console.log('erro ao consultar o usuário: ', err)
        })
};

const container_users = document.querySelector('#Container_Users');
const url = "https://sistemaemagrecendo.com/apiPedidos/todosPedidos";
const urlQUantidade = "https://apiemagrecendo.com/pedidos/quantidadeTotalDosPedidos"
const div_pedidos = document.querySelector('#Tabela_de_pedidos');
const Id_User = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let status_pedido;
let listPedidos;

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

function filtro(status){
    switch (status){
        case "1":
            displayItens(1, 0);
            dellFunction();
            break
        case "7":
            displayItens(1, 1);
            dellFunction();
            break
        default:
            console.log("Erro");
            break        
    }
};

function adquirirListProdutos(){
    fetch(url)
        .then( response => {
            return response.json();
        })
        .then( data => {
            listPedidos = data;
            console.log(listPedidos)
        })
        .catch( err => {
            console.log(err);
        })
};

// Paginação
function paginas(page, array) {
    const pageCont = Math.ceil(listPedidos[array].length / itensPorPagina);
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

function displayItens(page, arrayindex){
    
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listPedidos[arrayindex].slice().reverse();
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
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
                 <td class="align-middle">
                     <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control">
                        <option selected disabled value="Desaprovado">--</option>
                        
                        <option value="6">Aprovado</option>
                        <option value="7">Recusado</option>
                     </select>
                     
                 </td>

                 <td><a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0"">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a></td>
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
                     <span class="badge badge-sm bg-gradient-success">${pedido.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${pedido.data}</span>
                 </td>
                 <td class="align-middle">
                     <select id="Pedido_input" number_pedido="${pedido.numero_do_pedido}" name="produto" class="form-control" >
                        <option selected disabled value="Desaprovado">--</option>
                        
                        <option value="6">Aprovado</option>
                        <option value="7">Recusado</option>
                     </select>
                    
                    
                 </td>

                 <td class="align-middle" ">
                     <a idAtributo="${pedido.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a>
                 </td>
             </tr>
         `
         })
         statusAlt();
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
 };

function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');


        status_pedido.forEach(pedido => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');

                axios.post(`https://apiemagrecendo.com/pedidos/consultPedidoEstoque`, {
                    numero_do_pedido: numeroDPedido
                })
                    .then(resp => {
                        if(resp.data == true){
                            axios.post(`https://sistemaemagrecendo.com/apiPedidos/novoStatus?user=${Id_User}`, {
                                status: pedido.value,
                                pedido: numeroDPedido
                            })
                                .then(resp => {
                                    window.location.href = `https://sistemaemagrecendo.com/admin/aprovarPedido?user=${Id_User}`
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }else{
                            e.target.value = "1"
                            alert(`O produto ${resp.data[0].nome} não possui quantidade suficiente`)
                            console.log(resp.data)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                
            })
        })  
}

function dellFunction(){
    let botoes_deletar_pedido = document.querySelectorAll('#Button_Deletar_Pedido');
    

    botoes_deletar_pedido.forEach(botao => {
        botao.addEventListener('click', (e) => {
            let idPedido = e.target.getAttribute('idAtributo');

            axios.get(`/apiPedidos/dellPedidos/${idPedido}?user=${Id_User}`)
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
    
    axios.post('https://apiemagrecendo.com/pedidos/consultPedido', {
        numero: numeração
    })
        .then(resp => {
            infoUser(resp.data[0].id_usuario_FK);

            resp.data.forEach(pedido => {
                pedido_number.innerHTML = numeração;
                valorTotalInfo.push(pedido.valor);
                quantidadeTotalInfo.push(pedido.quantidade);


                axios.post('https://apiemagrecendo.com/produtos/consultarProdutos', {
                    id: pedido.id_produto_FK
                })
                    .then(produto => {
                        let valorTotalProduto = pedido.valorIndividual * pedido.quantidade
                        // let valorTotal = valorTotalProduto * pedido.quantidade


                        let precoProduto = pedido.valorIndividual
                        tabela_pedidos.innerHTML += `
                        <tr>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${produto.data[0].nome}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">R$ ${precoProduto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${pedido.quantidade}</span>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">R$ ${valorTotalProduto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
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
    axios.post('https://apiemagrecendo.com/users/usuarioInfo', {
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

{/* <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="material-icons text-sm me-2">edit</i>Editar</a> */}

const url = "https://apiemagrecendo.com/distribuidores/todasEntregas";
const div_entregas = document.querySelector('#Tabela_de_entregas');
const id_user = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let listProduto;

// Modal Variaveis
let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');

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
    pageItens.map(pedido => {
        div_entregas.innerHTML += `
                                 <tr>
                                      <td class="d-flex flex-row text-center justify-content-center ">
                                        <i id="Info_pedidos" number_pedido="${pedido.numero_do_pedido}" class="material-icons cursor-pointer me-2">info</i><h6 class="mb-0 text-sm">${pedido.numero_do_pedido}</h6>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${pedido.codigo_rastreio}</p>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${pedido.endereco}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">R$ ${pedido.valor_da_entrega.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${pedido.empresa}</span>
                                      </td>
                                       <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${new Date(pedido.data).toLocaleDateString('pt-BR')}</span>
                                      </td>
                                 </tr>
                         `
    });

    setTimeout(() => {
        let bt_produtos = document.querySelectorAll('#Info_pedidos');
    
        bt_produtos.forEach(info => {
            info.addEventListener('click', (e) => {
                let number_pedido = e.target.getAttribute('number_pedido');
                criarModal(number_pedido);
            })
        })
    }, [300])

    paginas(page);
};



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
            infoUser(resp.data[0]);

            resp.data.forEach(pedido => {
                pedido_number.innerHTML = numeração;
                valorTotalInfo.push(pedido.valor);
                quantidadeTotalInfo.push(pedido.quantidade);


                axios.post('https://apiemagrecendo.com/produtos/consultarProdutos', {
                    id: pedido.id_produto_FK
                })
                    .then(produto => {
                        let valorTotal = produto.data[0].preco_distribuidor * pedido.quantidade
                        tabela_pedidos.innerHTML += `
                        <tr>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${produto.data[0].nome}</p>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${pedido.status == 8 ? "A Caminho!" : pedido.status == 4 ? "Enntregue" : "Nâo Entregue"}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                valor = valor + valorTotalInfo[index];
            });

            tabela_pedidos.innerHTML += `
            <tr>
                <td>
                    <p class="text-xs font-weight-bold mb-0">Total</p>
                </td>
                <td>
                    <p class="text-xs font-weight-bold mb-0"></p>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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


function infoUser(pedido){
    let text_user = document.querySelector('#Text_user');
    // let text_end = document.querySelector('#Text_Endereco');
    let text_desconto = document.querySelector('#Text_Desconto');
    let text_brinde = document.querySelector('#Text_Brinde');

    text_user.innerHTML = '';
    // text_end.innerHTML = '';
    text_desconto.innerHTML = '';
    text_brinde.innerHTML = '';

    axios.post('https://apiemagrecendo.com/users/usuarioInfo', {
        id: pedido.id_usuario_FK
    })
        .then(resp => {
            text_user.innerHTML = `Pedido feito por: ${resp.data[0].nome}`;
            text_end.innerHTML = `Endereço: ${resp.data[0].endereco}`
            text_desconto.innerHTML = `Desconto R$ ${pedido.valor_desconto == null ? "0,00" : pedido.valor_desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        })
        .catch(err => {
            console.log('erro ao consultar o usuário: ', err)
        })

    axios.get(`https://apiemagrecendo.com/pedidos/consultBrinde?brinde=${pedido.id_brinde_FK}`)
        .then(brinde => { 
            text_brinde.innerHTML = `Brinde: ${brinde.data[0].nome || "Sem Brinde"}`;
        });
};
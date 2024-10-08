const url = "https://apiemagrecendo.com/vendedor/todasEntregas";
const div_entregas = document.querySelector('#Tabela_de_entregas');
const id_user = document.querySelector('#Id_User').value;
let itensPorPagina = 5;
let listProduto;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
    setTimeout(() => {
        displayItens(1);
    }, [800]);
});

// Modal Variaveis
let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');

function adquirirListProdutos() {
    axios.get(`${url}?idVendedor=${id_user}`)
        .then(resp => {
            listProduto = resp.data;
            console.log(listProduto)
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
                                      <td class="text-center d-flex px-2 py-1 justify-content-center text-center">
                                        <i id="Info_pedidos" number_pedido="${divida.numero_do_pedido}" class="material-icons cursor-pointer me-2">info</i>                                          
                                        <h6 class="mb-0 text-sm">${divida.numero_do_pedido}</h6>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${divida.endereco}</p>
                                      </td>
                                      <td class="text-center">
                                          <p class="text-xs font-weight-bold mb-0">${divida.codigo_rastreio}</p>
                                      </td>
                                      <td class="align-middle text-center text-sm">
                                          <span class="">R$ ${divida.valor_da_entrega.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                      </td>
                                      <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${divida.empresa}</span>
                                      </td>
                                       <td class="align-middle text-center">
                                          <span class="text-secondary text-xs font-weight-bold">${new Date(divida.data).toLocaleDateString('pt-BR')}</span>
                                      </td>
                                 </tr>
                         `
    }).join();
    statusAlt()

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

// Função de alterar o estado dos pedidos
function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');
    let status_pagamento = document.querySelectorAll('#Pagamento_input')

        status_pedido.forEach((pedido, index) => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');
                let metodoDPagamento = status_pagamento[index].value;

                axios.post('https://sistemaemagrecendo.com/apiPedidos/novoStatus', {
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
filtroButton.forEach(dropdown => {
    dropdown.addEventListener('click', () =>{
        setTimeout(() => {
            let paginasButton = document.querySelectorAll('.page-item');

            paginasButton.forEach(pagina => {
                pagina.addEventListener('click', () => {
                    let bt_produtos = document.querySelectorAll('#Info_pedidos');
        
                    bt_produtos.forEach(info => {
                        info.addEventListener('click', (e) => {
                            let number_pedido = e.target.getAttribute('number_pedido');
                            criarModal(number_pedido);
                        })
                    })
                })
            });

        }, [1500]);
    });
});

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
                        let valorTotal = pedido.valorIndividual * pedido.quantidade
                        tabela_pedidos.innerHTML += `
                        <tr>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${produto.data[0].nome}</p>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">${pedido.status == 8 ? "A Caminho!" : pedido.status == 4 ? "Enntregue" : "Nâo Entregue"}</p>
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
                valor =  valorTotalInfo[0];
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


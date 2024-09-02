const container_users = document.querySelector('#Container_Users');
const id = document.querySelector('#Id_User').value
const url = `https://apiemagrecendo.com/vendedor/todosDevedores?idVendedor=${id}`;
let itensPorPagina = 5;
var devedores;

const div_Devedores = document.querySelector('#Tabela_de_Devedores');

// Modal Variaveis
let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');


document.addEventListener('DOMContentLoaded', () => {
    RequisitandoDevedores();
    setTimeout(() => {
        todosOsVendedores(1)
    }, 300);
})
function RequisitandoDevedores(){
    axios.get(`${url}`)
        .then(resp => {
            devedores = resp.data
            console.log(devedores)
        })
        .catch(err => {
            console.log(err)
        })
}

function paginas(page) {
    const pageCont = Math.ceil(devedores.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(${pageCont})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(${pageCont})">${pageCont}</a></li>`;
        }
    }
}

function todosOsVendedores(page){
    let inicio = (page - 1) * itensPorPagina;
    let final = inicio + itensPorPagina;
    let ordemDosDevedores = devedores.slice().reverse();
    let pageDevedor = ordemDosDevedores.slice(inicio, final)

    div_Devedores.innerHTML = '';
    pageDevedor.map(devedor => {
        div_Devedores.innerHTML += `
            <tr>
                 <td>
                     <div class="d-flex px-2 py-1 align-items-center text-center align-middle justify-content-center">
                         <div class="cursor-pointer">
                             <i id="Info_pedidos" number_pedido="${devedor.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                         </div>
                         <div class="d-flex flex-colum justify-content-center">
                             <h6 class="mb-0 text-sm" style="margin-left: 1rem">${devedor.numero_do_pedido}</h6>
                         </div>
                     </div>
                 </td>
                 <td>
                     <p class="text-xs font-weight-bold mb-0 text-center">Devendo</p>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">R$ ${devedor.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                 </td>
                 <td class="align-middle text-center text-sm">
                     <span class="badge badge-sm bg-gradient-success">${devedor.quantidadeTotal}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${devedor.data_criacao.split('T')[0].split('-').reverse().join('/')}</span>
                 </td>
             </tr>
         `                  
    })
    statusAlt();
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
}

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
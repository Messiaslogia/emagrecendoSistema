const container_users = document.querySelector('#Container_Users');
const url = "http://localhost:3030/apiFinanceiro/todosDevedores";
let itensPorPagina = 5;
var devedores;

// Modal Devedores
let valorTotalInfo = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');

const div_Devedores = document.querySelector('#Tabela_de_Devedores');


document.addEventListener('DOMContentLoaded', () => {
    RequisitandoDevedores();

    setTimeout(() => {
        todosOsVendedores(1);
        statusAlt()
    }, 300);
    
});


function RequisitandoDevedores(){
    axios.get(`${url}`)
        .then(resp => {
            devedores = resp.data
            
        })
        .catch(err => {
            console.log(err)
        })
}

function paginas(page) {
    const pageCont = Math.ceil(devedores.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer "><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
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
                     <div class="d-flex px-2 py-1">
                         <div class="cursor-pointer">
                             <i id="Info_pedidos" number_pedido="${devedor.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                         </div>
                         <div class="d-flex flex-colum justify-content-center">
                             <h6 class="mb-0 text-sm" style="margin-left: 1rem">${devedor.numero_do_pedido}</h6>
                         </div>
                     </div>
                 </td>
                 <td>
                     <p class="text-xs font-weight-bold mb-0">${devedor.status}</p>
                 </td>
                 <td class="align-middle text-center text-sm">
                     <span class="badge badge-sm bg-gradient-success">${devedor.quantidade}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${devedor.data}</span>
                 </td>
                 

                 <td class="align-middle text-center">
                        <select id="Pedido_input" number_pedido="${devedor.numero_do_pedido}" name="produto" class="form-control bg-">
                            <option selected disabled value="Em análise">--</option>
                            <option value="Pago!">Pago</option>
                            <option value="Devendo">Não Pago</option>
                        </select>
                    </td>

                 <td class="align-middle" ">
                     <a idAtributo="${devedor.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a>
                 </td>
             </tr>
         `
                         
    })

    setTimeout(() => {
        let bt_produtos = document.querySelectorAll('#Info_pedidos');

        bt_produtos.forEach(info => {
            info.addEventListener('click', (e) => {
                let number_pedido = e.target.getAttribute('number_pedido');
                criarModal(number_pedido);
            })
        })
    }, [300])
    statusAlt()
    paginas(page);
};

// Função de alterar o estado dos pedidos
function statusAlt(){
    let status_pedido = document.querySelectorAll('#Pedido_input');

        status_pedido.forEach(pedido => {
            pedido.addEventListener('change', (e) => {
                let numeroDPedido = e.target.getAttribute('number_pedido');

                axios.post('http://localhost:3030/apiPedidos/novoStatus', {
                    status: pedido.value,
                    pedido: numeroDPedido
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




// Modall
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
                        let valorTotal = produto.data[0].preco * pedido.quantidade
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
}


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
}
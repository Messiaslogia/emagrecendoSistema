const urlDistri = "http://localhost:200/distribuidores";
const div_entregas = document.querySelector('#Tabela_de_dividas_representantes');

const id_user = document.querySelector('#Id_User').value;
const idCriptedUser = document.querySelector('#idUser').value;

let itensPorPaginaRepre = 5;
let listProdutoRepre;

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
    axios.get(`${urlDistri}/todasEntregasRepresentantes?idDistribuidor=${id_user}`)
        .then(resp => {
            listProdutoRepre = resp.data;
            // Certifique-se de que os dados são armazenados na variável correta
        })
        .catch(err => {
            console.log(err);
        })
};

function paginas(page) {
    const pageCont = Math.ceil(listProdutoRepre.length / itensPorPaginaRepre);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = ''

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link  ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
    }
};


function displayItens(page) {
    let startIndex = (page - 1) * itensPorPaginaRepre;
    let endIndex = startIndex + itensPorPaginaRepre;
    let reversePedidos = listProdutoRepre.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);

    // Exibindo os itens na tabela
    div_entregas.innerHTML = '';
    pageItens.forEach(entrega => {
        div_entregas.innerHTML += `
            <tr>
                <td class="align-middle text-center">
                    <p class="text-xs font-weight-bold mb-0">${entrega.nome_representante}</p>
                </td>
                <td class="align-middle text-center">
                    <p class="text-xs font-weight-bold mb-0">${entrega.numero_pedido}</p>
                </td>
                <td class="align-middle text-center">
                    <p class="text-xs font-weight-bold mb-0">${entrega.nome_empresa}</p>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">R$ ${entrega.valor_entrega.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</span>
                </td>
                <td class="align-middle text-center">
                    <span class="badge badge-sm bg-gradient-success">${entrega.status}</span>
                </td>
                <td class="class="align-middle text-center">
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/distribuidor/editarEntrega/?user=${idCriptedUser}&entrega=${entrega.id}">
                        <i class="material-icons text-sm me-2">edit</i>Edit
                    </a>
                </td>
                <td class="class="align-middle text-center">
                    <a idEntrega="${entrega.id}" id="Button_Deletar_Entrega" class="btn btn-link text-danger text-gradient mb-0"">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a>
                </td>
            </tr>
        `;
    });

    setTimeout(() => {
        let bt_produtos = document.querySelectorAll('#Info_pedidos');

        bt_produtos.forEach(info => {
            info.addEventListener('click', (e) => {
                let number_pedido = e.target.getAttribute('number_pedido');
                criarModal(number_pedido);
            });
        });
    }, [300]);
    deleteEntregas();
    paginas(page);
}

function deleteEntregas(){
    const todosBotoesDeleteEntrega = document.querySelectorAll('#Button_Deletar_Entrega');
    todosBotoesDeleteEntrega.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const idEntrega = e.target.getAttribute('idEntrega');
            axios.get(`${urlDistri}/deletarEntregaDistribuidor?idEntrega=${idEntrega}`)
                .then((result) => {
                    window.location.reload();
                }).catch((err) => {
                    console.log(err);
                });
        })
    })
}



function criarModal(numeração) {
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
                        let valorTotal = produto.data[0].preco_distribuidor * pedido.quantidade
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

function infoUser(id) {
    let text_user = document.querySelector('#Text_user');
    // let text_end = document.querySelector('#Text_Endereco');

    text_user.innerHTML = '';
    // text_end.innerHTML = ''
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
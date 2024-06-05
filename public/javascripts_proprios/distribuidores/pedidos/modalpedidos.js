let valorTotalInfo22 = [];
let quantidadeTotalInfo = [];
let tabela_pedidos = document.querySelector('#Tabela_modal');
let filtroButton = document.querySelectorAll('#dropdownMenuButton');


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        let bt_produtos = document.querySelectorAll('#Info_pedidos');

        bt_produtos.forEach(info => {
            info.addEventListener('click', (e) => {
                let number_pedido = e.target.getAttribute('number_pedido');
                criarModal(number_pedido);
            })
        })
    }, [300])
});

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


            let bt_produtos = document.querySelectorAll('#Info_pedidos');
                bt_produtos.forEach(info => {
                    info.addEventListener('click', (e) => {
                        let number_pedido = e.target.getAttribute('number_pedido');
                        criarModal(number_pedido);
                    })
            })
        }, [1500]);
    });
})

function criarModal(numeracao){
    let bt_modal = document.getElementById('Bt_modal');
    let pedido_number = document.getElementById('Text_modal');

    pedido_number.innerHTML = '';
    tabela_pedidos.innerHTML = '';
    
    axios.post('http://localhost:200/pedidos/consultPedido', {
        numero: numeracao
    })
        .then(resp => {
            infoUser(resp.data[0].id_usuario_FK);

            resp.data.forEach(pedido => {
                pedido_number.innerHTML = numeracao;
                valorTotalInfo22.push(pedido.valor);
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
                valor = valor + valorTotalInfo22[index];
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
            valorTotalInfo22 = []
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
            console.log(resp.data)
            text_user.innerHTML = `Pedido feito por: ${resp.data[0].nome}`;
            text_end.innerHTML = `Endereço: ${resp.data[0].endereco}`
        })
        .catch(err => {
            console.log('erro ao consultar o usuário: ', err)
        })
}
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
})

function criarModal(numeração){
    let bt_modal = document.querySelector('#Bt_modal');
    let pedido_number = document.querySelector('#Text_modal');
    let tabela_pedidos = document.querySelector('#Tabela_modal');

    pedido_number.innerHTML = '';
    tabela_pedidos.innerHTML = '';
    
    axios.post('http://localhost:200/pedidos/consultPedido', {
        numero: numeração
    })
        .then(resp => {
            resp.data.forEach(pedido => {
                pedido_number.innerHTML = numeração;
                infoUser(pedido.id_usuario_FK);

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
                                <span class="badge badge-sm bg-gradient-success">R$ ${valorTotal}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${pedido.quantidade}</span>
                            </td>
                        </tr>
                        `;

                            bt_modal.click();
                    })
                    .catch(erroProduto => {
                        console.log('Erro fetch produtos: ', erroProduto)
                    })
            })
        })
        .catch(err => {
            console.log(err)
        })
}
function infoUser(id){
    let text_user = document.querySelector('#Text_user');

    text_user.innerHTML = '';

    axios.post('http://localhost:200/users/usuarioInfo', {
        id: id
    })
        .then(resp => {
            text_user.innerHTML = `Pedido feito por: ${resp.data[0].nome}`
        })
        .catch(err => {
            console.log('erro ao consultar o usuário: ', err)
        })
}
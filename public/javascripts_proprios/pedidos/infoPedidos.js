const urlPedidosTotal = "http://localhost:3030/apiPedidos/"

document.addEventListener('DOMContentLoaded', () => {
    const valorTotal = document.querySelector('#Valor_pedidos');
    const quantidadeTotal = document.querySelector('#Quantidade_pedidos');

    axios.get(`${urlPedidosTotal}valorTotalPedido`)
        .then(valor => {
            valorTotal.innerHTML = `R$ ${valor.data}`
        })
        .catch(err => {
            console.log(err);
        })


    axios.get(`${urlPedidosTotal}quantidadeTotal`)
        .then(quantidade => {
            quantidadeTotal.innerHTML = quantidade.data
        })
        .catch(err => {
            console.log(err);
        })
})
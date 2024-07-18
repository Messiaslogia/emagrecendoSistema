const urlPedidosTotal = "http://localhost:200/vendedor/casesDesaprovadosVendedor"
const idVendedor = document.querySelector('#idDoVendedor').value;

document.addEventListener('DOMContentLoaded', () => {
    const valorTotal = document.querySelector('#Valor_pedidos');
    const quantidadeTotal = document.querySelector('#Quantidade_pedidos');

    axios.get(`${urlPedidosTotal}?idVendedor=${idVendedor}`)
        .then(valor => {
            valorTotal.innerHTML = `R$ ${valor.data[0]}`;
            quantidadeTotal.innerHTML = valor.data[1];
        })
        .catch(err => {
            console.log(err);
        })
})
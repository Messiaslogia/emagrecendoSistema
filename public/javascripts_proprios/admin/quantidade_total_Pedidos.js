const h2_Estoque = document.querySelector('#Total_Pedidos');
const urlQuantidadePedidos = "http://localhost:3030/apiPedidos/quantidadePedidos";


console.log(h2_Estoque)

document.addEventListener('DOMContentLoaded', () => {
    axios.get(urlQuantidadePedidos)
    .then(quantidadePedidos => {
        const data = quantidadePedidos.data
        h2_Estoque.innerHTML = `${data.quantidadeTotal}`;
    })
    .catch(err => {
        console.error(err);
    })
})
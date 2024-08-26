const h2_Estoque = document.querySelector('#Total_Pedidos');
const urlQuantidadePedidos = "https://sistemaemagrecendo.com/apiPedidos/quantidadePedidos";


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
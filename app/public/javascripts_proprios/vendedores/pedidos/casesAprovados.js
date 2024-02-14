let urlCases = "http://localhost:200/distribuidores/casesAprovadosDistribuidor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${urlCases}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0]}`;
            document.querySelector('#Vendido_pedidos').innerHTML = `R$ ${resp.data[1]}`;
            document.querySelector('#Debito_pedido').innerHTML = `R$ ${resp.data[2]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
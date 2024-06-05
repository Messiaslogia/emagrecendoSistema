let urlCases = "http://localhost:200/vendedor/casesAprovadosVendedores"

document.addEventListener('DOMContentLoaded', () => {
let id_vendedor = document.querySelector('#Id_User').value;
    
    axios.get(`${urlCases}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#Vendido_pedidos').innerHTML = `R$ ${resp.data[1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#Debito_pedido').innerHTML = `R$ ${resp.data[2].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
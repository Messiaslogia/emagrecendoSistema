let urlCasesVendas = "http://localhost:200/vendedor/casesAprovadosDistribuidor";
let urlDividas = "http://localhost:200/vendedor/casesDevedoresDistribuidor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${urlCasesVendas}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0]}`;
            document.querySelector('#Vendido_pedidos').innerHTML = `R$ ${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })

    axios.get(`${urlDividas}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#Valor_d_Divida').innerHTML = `R$ ${resp.data[0]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
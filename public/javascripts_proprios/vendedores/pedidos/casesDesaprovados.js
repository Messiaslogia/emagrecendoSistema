let urlCases = "http://localhost:200/vendedor/casesDesaprovadosDistribuidores"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${urlCases}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0]}`;
            document.querySelector('#Quantidade_pedidos').innerHTML = `${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
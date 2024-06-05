let urlCases = "http://localhost:200/distribuidores/casesDesaprovadosDistribuidores"
let id_distribuidor = document.querySelector('#idDistribuidor').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${urlCases}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#Quantidade_pedidos').innerHTML = `${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
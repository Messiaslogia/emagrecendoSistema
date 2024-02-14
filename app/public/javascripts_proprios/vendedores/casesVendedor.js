let url = "http://localhost:200/distribuidores/casesDistribuidores"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${url}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#VendasTotaisvendedor').innerHTML = `R$ ${resp.data[0]}`;
            document.querySelector('#DividasTotaisvendedor').innerHTML = `R$ ${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
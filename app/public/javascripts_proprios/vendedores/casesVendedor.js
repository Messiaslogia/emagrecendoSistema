let url = "http://localhost:200/vendedor/casesVendedor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${url}?idVendedor=${id_vendedor}`)
        .then(resp => {
            console.log(resp)
            document.querySelector('#VendasTotaisvendedor').innerHTML = `R$ ${resp.data[1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#DividasTotaisvendedor').innerHTML = `R$ ${resp.data[2].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#Vendasvendedor').innerHTML = `R$ ${resp.data[4].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
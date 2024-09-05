let url = "https://apiemagrecendo.com/vendedor/casesVendedor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    
    axios.get(`${url}?idVendedor=${id_vendedor}`)
        .then(resp => {
            console.log(resp)
            document.querySelector('#VendasTotaisvendedor').innerHTML = `R$ ${resp.data[1]}`;
            document.querySelector('#DividasTotaisvendedor').innerHTML = `R$ ${resp.data[2]}`;
            document.querySelector('#Vendasvendedor').innerHTML = `R$ ${resp.data[4]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
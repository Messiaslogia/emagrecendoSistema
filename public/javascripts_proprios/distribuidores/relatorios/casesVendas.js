let urlCases = "http://localhost:200/distribuidores/casesVendasDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {

    axios.get(`${urlCases}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#VendasTotaisdistribuidor').innerHTML = `R$ ${resp.data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            // document.querySelector('#DividasTotaisdistribuidor').innerHTML = `R$ ${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
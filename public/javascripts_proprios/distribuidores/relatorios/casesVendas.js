let urlCases = "http://localhost:200/distribuidores/casesVendasDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {

    axios.get(`${urlCases}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#VendasTotaisdistribuidor').innerHTML = `R$ ${resp.data.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            // document.querySelector('#DividasTotaisdistribuidor').innerHTML = `R$ ${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
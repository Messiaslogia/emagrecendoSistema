let url = "http://localhost:200/distribuidores/casesDistribuidores"
let id_distribuidor = document.querySelector('#idDistribuidor').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${url}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#VendasTotaisDistribuidor').innerHTML = `R$ ${resp.data[0].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#DividasTotaisDistribuidor').innerHTML = `R$ ${resp.data[1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            document.querySelector('#VendasRealTotaisDistribuidor').innerHTML = `R$ ${resp.data[2].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
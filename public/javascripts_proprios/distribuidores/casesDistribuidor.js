let url = "http://localhost:200/distribuidores/casesDistribuidores"
let id_distribuidor = document.querySelector('#idDistribuidor').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${url}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#VendasTotaisDistribuidor').innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('#DividasTotaisDistribuidor').innerHTML = `R$ ${resp.data[1].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('#VendasRealTotaisDistribuidor').innerHTML = `R$ ${resp.data[2].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
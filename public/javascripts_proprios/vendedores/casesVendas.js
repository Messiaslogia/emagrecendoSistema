let urlCase = "https://apiemagrecendo.com/vendedor/casesVendasVendedor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${urlCase}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#VendasGerais').innerHTML = `R$ ${resp.data}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
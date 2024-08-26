let urlCases = "https://apiemagrecendo.com/vendedor/casesDevedoresVendedor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {

    axios.get(`${urlCases}?idVendedor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_d_Divida').innerHTML = `R$ ${resp.data[0]}`;
            document.querySelector('#Quantidade_D_Devedores').innerHTML = `${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
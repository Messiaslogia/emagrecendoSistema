let urlCase = "https://apiemagrecendo.com/vendedor/casesDividasGeraisVendedor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {

    axios.get(`${urlCase}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#DividasGerais').innerHTML = `R$ ${resp.data}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
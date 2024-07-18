let urlCase = "http://localhost:200/vendedor/casesDividasGeraisVendedor"
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
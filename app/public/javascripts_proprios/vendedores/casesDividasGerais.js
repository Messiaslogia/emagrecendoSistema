let urlCase = "http://localhost:200/vendedor/casesDividasGeraisVendedor"
let id_vendedor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_vendedor)
    axios.get(`${urlCase}?idVendedor=${id_vendedor}`)
        .then(resp => {
            document.querySelector('#DividasGerais').innerHTML = `R$ ${resp.data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
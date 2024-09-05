let urlCase = "https://apiemagrecendo.com/distribuidores/casesDividasGeraisDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${urlCase}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#DividasGerais').innerHTML = `R$ ${resp.data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
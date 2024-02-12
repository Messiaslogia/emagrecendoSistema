let urlCase = "http://localhost:200/distribuidores/casesDividasGeraisDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${urlCase}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#DividasGerais').innerHTML = `R$ ${resp.data}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
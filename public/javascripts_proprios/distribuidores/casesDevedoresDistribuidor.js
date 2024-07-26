let urlCases = "http://localhost:200/distribuidores/casesDevedoresDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {

    axios.get(`${urlCases}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_d_Divida').innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('#Quantidade_D_Devedores').innerHTML = `${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
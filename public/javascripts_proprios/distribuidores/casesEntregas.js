let urlCasesVendas = "http://localhost:200/distribuidores/casesAprovadosDistribuidor";
let urlDividas = "http://localhost:200/distribuidores/casesDevedoresDistribuidor"
let id_distribuidor = document.querySelector('#Id_User').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${urlCasesVendas}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('#Vendido_pedidos').innerHTML = `R$ ${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })

    axios.get(`${urlDividas}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_d_Divida').innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        })  
        .catch(err => {-
            console.log(err);
        })
})
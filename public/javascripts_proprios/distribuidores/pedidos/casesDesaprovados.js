let urlCases = "http://localhost:200/distribuidores/casesDesaprovadosDistribuidores"
let id_distribuidor = document.querySelector('#idDistribuidor').value;

document.addEventListener('DOMContentLoaded', () => {
    console.log(id_distribuidor)
    axios.get(`${urlCases}?idDistribuidor=${id_distribuidor}`)
        .then(resp => {
            document.querySelector('#Valor_pedidos').innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.querySelector('#Quantidade_pedidos').innerHTML = `${resp.data[1]}`;
        })  
        .catch(err => {
            console.log(err);
        })
})
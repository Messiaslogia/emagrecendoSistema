const divValorDevedores = document.querySelector('#Valor_Total_Devedores');
const divQuantidadeDevedores = document.querySelector('#Quantidade_d_devedores');
const urlInfo = 'http://localhost:200/financeiro/casesDevedores'


document.addEventListener('DOMContentLoaded', () => {
    getInfo();
});

function getInfo(){
    axios.get(urlInfo)
        .then(resp => {
            divValorDevedores.innerHTML = `R$ ${resp.data[0].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`;
            divQuantidadeDevedores.innerHTML = `${resp.data[1]}`
        })
}
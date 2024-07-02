const divValorDevedores = document.querySelector('#Valor_Total_Devedores');
const divQuantidadeDevedores = document.querySelector('#Quantidade_d_devedores');
const urlInfo = 'http://localhost:200/financeiro/casesDevedores'


document.addEventListener('DOMContentLoaded', () => {
    getInfo();
});

function getInfo(){
    axios.get(urlInfo)
        .then(resp => {
            divValorDevedores.innerHTML = `R$ ${resp.data[0].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            divQuantidadeDevedores.innerHTML = `${resp.data[1]}`
        })
}
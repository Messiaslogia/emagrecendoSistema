let caseDeEntregas = document.querySelector('#Case_De_Dividas');
let urlCases = "http://localhost:200/financeiro/casesDEntregas"


document.addEventListener('DOMContentLoaded', () => {
    getCases();
});

function getCases(){
    axios.get(urlCases)
        .then(resp => {
            caseDeEntregas.innerHTML = `R$ ${resp.data.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        })
        .catch(err => {
            console.log(err);
        })
}
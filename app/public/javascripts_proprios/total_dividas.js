const h2_Dividas = document.querySelector('#Total_Dividas');


document.addEventListener('DOMContentLoaded', () => {
    axios.get('/apiDividas/todasDividas')
        .then( resp => {
            h2_Dividas.innerHTML = `R$${resp.data}`
        })
        .catch(err => {
            console.log(err)
        })
})
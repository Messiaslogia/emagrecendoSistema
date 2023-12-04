const h2_Clientes= document.querySelector('#Total_Clientes');


document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api/clientesTotais')
        .then( resp => {
            h2_Clientes.innerHTML = `${resp.data}`
        })
        .catch(err => {
            console.log(err)
        })
})
const inputBrindes = document.querySelector('#Brinde_input')
const urlAllBrindes = "http://localhost:200/brindes/"

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${urlAllBrindes}todosBrindes`)
        .then((result) => {
            result.data.forEach(element => {
                inputBrindes.innerHTML += `
                        <option value="${element.id}">${element.nome}</option>
                `
        })
    })
})

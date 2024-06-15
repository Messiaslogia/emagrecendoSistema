const div_valor = document.querySelector('#Total_ValorEmEstoque');
const div_quantidade = document.querySelector('#Total_Estoque');
const url_valoresTotais = "http://localhost:200/brindes/"

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${url_valoresTotais}valoresTotaisBrindes`)
        .then((result) => {
            div_valor.innerHTML = `R$ ${result.data[1]}`;
            div_quantidade.innerHTML = `${result.data[0]}`;        
        })
});
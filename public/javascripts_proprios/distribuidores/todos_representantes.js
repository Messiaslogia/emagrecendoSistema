
const url = "http://localhost:3030/distribuidor/todosRepresentantes";
const div_produtos = document.getElementById('Representante_input');
const inputDistribuidor = document.getElementById('idDistribuidor');
const valorDistribuidor = inputDistribuidor.value;

document.addEventListener('DOMContentLoaded', () => {
    listaRepresentantes(valorDistribuidor);
});


function listaRepresentantes(valorDistribuidor) {
    axios.get(`${url}?idDistribuidor=${valorDistribuidor}`)
        .then(resp => {
            console.log(resp)
            resp.data.forEach(produto => {
                div_produtos.innerHTML += `
                <option value="${produto.id_usuario}">${produto.nome_usuario}</option>
                `;
            });
        })
        .catch(err => {
            console.log(err);
        });
}

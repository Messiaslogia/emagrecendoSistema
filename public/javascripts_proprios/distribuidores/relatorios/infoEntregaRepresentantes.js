const idEntrega = document.querySelector('#idEntrega').value;
const urlEntrega = "https://apiemagrecendo.com/distribuidores/infoEntrega";

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${urlEntrega}?entrega=${idEntrega}`)
        .then((result) => {
            console.log(result)
            document.querySelector('#Numero_pedido').value = result.data[0].numero_pedido;
            document.querySelector('#Nome_empresa').value = result.data[0].nome_empresa;
            document.querySelector('#Valor_entrega').value = result.data[0].valor_entrega;
            document.querySelector('#Status_entrega').value = result.data[0].status;
        }).catch((err) => {
           console.log(err); 
        });
})
let urlProdutoseClientes = "https://apiemagrecendo.com/vendedor/listaDeProdutosEClientes";
let idVendedor = document.querySelector('#Id_user').value;
let infoProduto;


axios.get(`${urlProdutoseClientes}?idVendedor=${idVendedor}`)
    .then(resp => {
        resp.data[0].forEach(cliente => {
            document.querySelector('#Usuario_input').innerHTML += `
                <option value="${cliente.id_usuario}">${cliente.nome}</option>
            `
        }) 

        resp.data[1].forEach((produtos, index) => {
            document.querySelector('#Produto_input').innerHTML += `
                <option id="optionProduto" indexvalue="${index}" value="${produtos.id_produto}">${produtos.nome}</option>
            `
        });
        infoProduto = resp.data[1];
    })
    .catch(err => { 
        console.log(err);
    })

let inputSelect = document.querySelector('#Produto_input');

inputSelect.addEventListener('change', (e) => {
    let valor = inputSelect.value;
    
    let inputsOption = document.querySelectorAll('#optionProduto');
    let htmlOptions = [...inputsOption]

    htmlOptions.forEach(produto => {
        if(valor == produto.value){
            let index = produto.getAttribute('indexvalue');
            document.querySelector('#ValorUnitário').value = `R$ ${infoProduto[index].preco_revenda}`
        }
    })
})
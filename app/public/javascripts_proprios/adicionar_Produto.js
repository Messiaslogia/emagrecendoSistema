
document.getElementById('Bt_submit').addEventListener('click', function (event) {
    event.preventDefault();

    const formulario = document.getElementById('productForm')
    const fileInput = document.getElementById('imageInput');
    const formData = new FormData(formulario);

    console.log(formData)

    formData.append('imagemProduto', fileInput.files[0]);

    axios.post('/apiProdutos/adicionarProduto', formData)
        .then(response => {
            alert('Imagem enviada com sucesso!');
        })
        .catch(err => {
            alert('Ocorreu um erro ao enviar a imagem.');
        });
});
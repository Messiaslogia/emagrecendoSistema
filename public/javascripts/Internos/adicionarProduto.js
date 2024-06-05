document.getElementById('Bt_submit').addEventListener('click', function (event) {
    event.preventDefault();

    const formulario = document.getElementById('productForm')
    const fileInput = document.getElementById('imageInput');
    const formData = new FormData(formulario);

    formData.append('imagemProduto', fileInput.files[0]);

    axios.post('/admin/adicionarNovoProduto', formData)
        .then(response => {
            alert('Imagem enviada com sucesso!');
            window.location.href = '/admin/produtos';
        })
        .catch(err => {
            alert('Ocorreu um erro ao enviar a imagem.');
        });
});
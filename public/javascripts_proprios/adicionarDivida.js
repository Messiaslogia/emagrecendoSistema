document.getElementById('DividaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formulario = document.getElementById('DividaForm');
    const formData = new FormData(formulario);
    // Adicione este console.log para depurar

    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    axios.post(`/apiDividas/adicionarNovaDivida`, formData)
        .then(response => {
            window.location.href = 'http://localhost:3030/admin/dividas'
        })
        .catch(err => {
            console.error(err);
        });
});

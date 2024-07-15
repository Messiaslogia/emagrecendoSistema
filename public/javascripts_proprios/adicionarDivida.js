document.getElementById('DividaForm').addEventListener('submit', function (event) {
    const Id_User = this.querySelector('#Id_User');
    event.preventDefault();

    const formulario = document.getElementById('DividaForm');
    const formData = new FormData(formulario);
    // Adicione este console.log para depurar

    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    axios.post(`/apiDividas/adicionarNovaDivida?user=${Id_User}`, formData)
        .then(response => {
            window.location.href = `http://localhost:3030/admin/dividas?user=${Id_User}`
        })
        .catch(err => {
            console.error(err);
        });
});

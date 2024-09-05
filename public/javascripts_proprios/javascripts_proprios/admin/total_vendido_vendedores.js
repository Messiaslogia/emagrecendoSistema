let total_vendedores = document.getElementById("Total_Vendas_Vendedor");
console.log(total_vendedores)

document.addEventListener('DOMContentLoaded', () => {
    axios.get("/api/totalVendidoVendedores")
        .then(resp => {
            // Obtém o total como número
            let total = parseFloat(resp.data.total);

            // Cria uma instância do NumberFormat para o formato brasileiro
            let formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Formata o total
            let totalFormatado = formatter.format(total);

            // Atualiza o conteúdo do elemento HTML com o valor formatado
            total_vendedores.innerHTML = totalFormatado;
        })
        .catch(error => {
            console.error("Erro ao obter dados:", error);
            total_vendedores.innerHTML = "Erro ao carregar dados";
        });
});

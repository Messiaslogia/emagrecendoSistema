document.addEventListener('DOMContentLoaded', function () {

    // GERA NUMEROS ALEATORIOS PARA OS PEDIDOS
    function gerarNumeroPedido() {
        const dataAtual = new Date().toISOString().replace(/[-T:]/g, '').slice(0, -5);
        const numeroAleatorio = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return `PEDIDO-${dataAtual}-${numeroAleatorio}`;

    }

    // COLETA OS DADOS DO FORMULARIO
    function coletaDadosForm() {
        let dadosAtuaisForm = {};
        const elementosForm = document.querySelectorAll('#formPedido input, #formPedido select');

        elementosForm.forEach(function (elemento) {
            if (elemento.name) {
                dadosAtuaisForm['pedido'] = numeroPedido;
                dadosAtuaisForm[elemento.name] = elemento.value;

            }
        })

        usuarioInput.disabled = true;
        dataInput.readOnly = true;
        horaInput.readOnly = true;
        produtoInput.value = '';
        quantidade.value = '';


        formDataArray.push(dadosAtuaisForm);
        return formDataArray;
    }


    const botaoAvancar = document.getElementById('Bt_avancar');
    const botaoEnviar = document.getElementById('Bt_Enviar');
    const usuarioInput = document.getElementById('Usuario_input');
    const dataInput = document.getElementById('Data_produto');
    const horaInput = document.getElementById('Hora_produto');
    const produtoInput = document.getElementById('Produto_input');
    const quantidade = document.getElementById('Quantidade_input');
    const numeroPedido = gerarNumeroPedido();

    let formDataArray = [];

    // EVENTO PARA COLETAR OS DADOS AO CLICAR NO AVANCAR
    botaoAvancar.addEventListener('click', () => {
        const formData = coletaDadosForm();
        console.log(formData)
    })

    // EVENTO PARA ENVIAR OS DADOS AO CLICAR NO ENVIAR
    botaoEnviar.addEventListener('click', () => {
        const formData = coletaDadosForm();
        console.log(formData)
    })
})
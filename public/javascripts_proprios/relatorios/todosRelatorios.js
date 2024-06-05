const urlAllFinanceiro = "http://localhost:3030/apiFinanceiro/todasVendas"
const div_relatorio = document.querySelector('#Tabela_de_Relatorios')
const itensPorPagina = 5;
let allRelatoriosFinanceiro;

document.addEventListener('DOMContentLoaded', () => {
    getAllRelatorios();
    gatilhoModal();
});

function getAllRelatorios(){
    axios.get(`${urlAllFinanceiro}`)
        .then(resp => {
            allRelatoriosFinanceiro = resp.data;
            showItens(1);
            paginas(1)
        })
        .catch(err => {
            console.log(err);
        })
};


// Paginação
function paginas(page){
    const pageCont = Math.ceil(allRelatoriosFinanceiro.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = ''

    for( i = 1; i <= pageCont; i++){
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item"><a class="page-link cursor-pointer ${activeClass}" onclick="showItens(${i})">${i}</a></li>`
    };
}

function showItens(page){
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let reversePedidos = allRelatoriosFinanceiro.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);


    div_relatorio.innerHTML = '';

    
    pageItens.map(relatorio => {
        div_relatorio.innerHTML += `
            <tr>
                <td>
                    <div class="d-flex px-2 py-1">
                        <div class="cursor-pointer">
                            <i id="Info_pedidos" number_pedido="${relatorio.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                        </div>
                        <div class="d-flex flex-colum justify-content-center">
                            <h6 class="mb-0 text-sm" style="margin-left: 1rem">${relatorio.numero_do_pedido}</h6>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs font-weight-bold mb-0">${relatorio.numero_do_pedido}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <p class="text-xs font-weight-bold mb-0">R$ ${relatorio.valor.toFixed(2)}</p>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${relatorio.data}</span>
                </td>
                <td class="align-middle text-center">
                    <p class="text-xs font-weight-bold mb-0">${relatorio.valor + relatorio.valor_d_entrega}</p>
                </td>
            </tr>
        `
    });

    setTimeout(() => {
        gatilhoModal();
    }, [800])
    paginas(page)
};

// let modal = document.querySelector('#');
function gatilhoModal(){
    setTimeout(() => {
        bt_modal = document.querySelectorAll('#Info_pedidos');
        bt_modal.forEach(bt => {
            bt.addEventListener('click', (e) => {
                let number_pedido = e.target.getAttribute('number_pedido');
                criarModal(number_pedido);
            })
        })
    }, [500]) 
}


function criarModal(numero){
    let bt_modal = document.querySelector('#Button_Modal');

    let div_pedidoNumber = document.querySelector('#Pedido_number');
    div_pedidoNumber.innerHTML = '';

    let div_InfoUser = document.querySelector('#Info_User');
    div_InfoUser.innerHTML = '';
    
    let div_Pedido = document.querySelector('#Info_Pedido');
    div_Pedido.innerHTML = '';

    let div_QuantidadeTotal = document.querySelector('#Info_Total');
    div_QuantidadeTotal.innerHTML = '';
    let div_ValorTotal = document.querySelector('#Info_Valor_Total');
    div_ValorTotal.innerHTML = ''


    axios.get(`http://localhost:3030/apiFinanceiro//consultarRelatorio/${numero}`)
        .then(resp => {
            let infoCortada = resp.data[0].info_usuario.split(',');

            infoCortada.forEach(info =>{
                div_InfoUser.innerHTML += `${info}<br>`
            });

            let infoPCortada = resp.data[0].info_produtos.split(',');

            infoPCortada.forEach(produto => {
                div_Pedido.innerHTML += `${produto}<br>`
            })

            div_pedidoNumber.innerHTML = resp.data[0].numero_do_pedido;
            div_Pedido.innerHTML = resp.data[0].info_produtos;
            div_QuantidadeTotal.innerHTML = `Quantidade: ${resp.data[0].quantidade_total}`;
            div_ValorTotal.innerHTML = `Total: R$ ${resp.data[0].valor}`
        })
        .catch(err => {
            console.log(err);
        })
        bt_modal.click();
}
const url = "http://localhost:3030/apiDividas/dividasAdmin/";
let itensPorPagina = 5;
let listProduto = [];

const id = document.getElementById('Id_User').value;
const caseDividas = document.querySelector('#Total_Dividas');
const div_dividas = document.querySelector('#Tabela_de_dividas');


document.addEventListener('DOMContentLoaded', () => {
    adquirirListProdutos();
    setTimeout(() => {
        displayItens(1, 'todos');
    }, 300);
});

function adquirirListProdutos() {
    let valor = 0;
    axios.get(`http://localhost:3030/apiDividas/dividasAdmin/?user=${id}`)
        .then(resp => {
            if (resp.data && resp.data.dividas) {
                listProduto = resp.data.dividas;
                listProduto.forEach(element => {
                    valor += parseFloat(element.valor_total || element.valor);  // Adicionei 'valor_total' para considerar as dívidas parceladas
                });
                caseDividas.innerHTML = `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                displayItens(1, 'todos'); // Exibir os itens após carregar os dados
            } else {
                div_dividas.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma dívida encontrada</td></tr>';
            }
        })
        .catch(err => {
            console.log(err);
            div_dividas.innerHTML = '<tr><td colspan="5" class="text-center">Erro ao carregar dívidas</td></tr>';
        });
};

function filtro(tipo){
    switch (tipo) {
        case 'parcelada':
            displayItens(1, 'parcelada');
            break;
        case 'fixa':
            displayItens(1, 'fixa');
            break; 
        case 'esporádica':
            displayItens(1, 'esporádica');
            break;
        default:
            displayItens(1, 'todos');
            break;
    }
};

function paginas(page, status) {
    let pageCont;

    if(status != 'todos'){
        let filtroLista = listProduto.filter(divida => divida.tipo == status);
        pageCont = Math.ceil(filtroLista.length / itensPorPagina);
    }else{
        pageCont = Math.ceil(listProduto.length / itensPorPagina);
    };

    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i}, '${status}')">${i}</a></li>`;
    }
}

function displayItens(page, status) {
    if (!Array.isArray(listProduto) || listProduto.length === 0) {
        div_dividas.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma dívida encontrada</td></tr>';
        return;
    }

    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let pageItens;

    if(status != 'todos'){
        let filtroPedidos = listProduto.filter(divida => divida.tipo == status);
        let reversePedidos = filtroPedidos.slice().reverse();
        pageItens = reversePedidos.slice(startIndex, endIndex);
    }else{
        let reversePedidos = listProduto.slice().reverse();
        pageItens = reversePedidos.slice(startIndex, endIndex);
    };

    div_dividas.innerHTML = '';
    pageItens.map(divida => {
        div_dividas.innerHTML += `
            <tr>
                <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${divida.nome || divida.id_divida_parcelada}</h6>  <!-- Ajustado para exibir nome ou id_divida_parcelada -->
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${divida.descricao ? divida.descricao : "Divida sem descritivo"}</h6>  <!-- Ajustado para exibir nome ou id_divida_parcelada -->
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <p class="text-xs font-weight-bold mb-0">R$ ${(divida.valor || divida.valor_total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>  <!-- Ajustado para exibir valor ou valor_total -->
                </td>
                <td class="text-center">
                    <p class="text-xs font-weight-bold mb-0">${(divida.tipo ? divida.tipo : `${divida.parcelas}x Parcelas`)}</p>  <!-- Ajustado para exibir valor ou valor_total -->
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="">${new Date(divida.data_inicio).toLocaleDateString('pt-BR')}</span>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${divida.status}</span>
                </td>
                <td class="align-middle text-center">
                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="/apiDividas/deletarDivida/${divida.id_divida}?user=${id}"><i class="material-icons text-sm me-2">delete</i>Deletar</a>
                    <a class="btn btn-link text-dark px-3 mb-0" href="/apiDividas/editarDividaForm/${divida.id_divida}?user=${id}"><i class="material-icons text-sm me-2">edit</i>Editar</a>
                </td>
            </tr>
        `;
    });
    paginas(page, status); // Chama a função de paginação passando a página atual após renderizar os itens
}
const container_users = document.querySelector('#Container_Users');
const url = "https://sistemaemagrecendo.com/apiFinanceiro/todosDevedores";
let itensPorPagina = 5;
var devedores;



const div_Devedores = document.querySelector('#Tabela_de_Devedores');

console.log(div_Devedores)

document.addEventListener('DOMContentLoaded', () => {
    RequisitandoDevedores();
    setTimeout(() => {
        todosOsVendedores(1)
    }, 300);
    
})
function RequisitandoDevedores(){
    axios.get(`${url}`)
        .then(resp => {
            devedores = resp.data 
        })
        .catch(err => {
            console.log(err)
        })
}

function paginas(page) {
    const pageCont = Math.ceil(devedores.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');
    containerPagination.innerHTML = '';

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(${pageCont})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="todosOsVendedores(${pageCont})">${pageCont}</a></li>`;
        }
    }
}

function todosOsVendedores(page){
    let inicio = (page - 1) * itensPorPagina;
    let final = inicio + itensPorPagina;
    let ordemDosDevedores = devedores.slice().reverse();
    let pageDevedor = ordemDosDevedores.slice(inicio, final)

    div_Devedores.innerHTML = '';
    pageDevedor.map(devedor => {
        div_Devedores.innerHTML += `
                                  <tr>
                 <td>
                     <div class="d-flex px-2 py-1">
                         <div class="cursor-pointer">
                             <i id="Info_pedidos" number_pedido="${devedor.numero_do_pedido}" class="material-icons cursor-pointer">info</i>
                         </div>
                         <div class="d-flex flex-colum justify-content-center">
                             <h6 class="mb-0 text-sm" style="margin-left: 1rem">${devedor.numero_do_pedido}</h6>
                         </div>
                     </div>
                 </td>
                 <td>
                     <p class="text-xs font-weight-bold mb-0">${devedor.status}</p>
                 </td>
                 <td class="align-middle text-center text-sm">
                     <span class="badge badge-sm bg-gradient-success">${devedor.quantidade}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${devedor.data}</span>
                 </td>
                 

                 <td class="align-middle text-center">
                        <select id="Pedido_input" number_pedido="${devedor.numero_do_pedido}" name="produto" class="form-control bg-">
                            <option selected disabled value="Em análise">--</option>
                            <option value="Aprovado">Em análise</option>
                            <option value="Pago!">Pago</option>
                            <option value="Devendo">Não Pago</option>
                        </select>
                    </td>

                 <td class="align-middle" ">
                     <a idAtributo="${devedor.numero_do_pedido}" id="Button_Deletar_Pedido" class="btn btn-link text-danger text-gradient mb-0">
                         <i class="material-icons text-sm me-2">delete</i>
                     Deletar</a>
                 </td>
             </tr>
         `
                         
    })
    paginas(page);
}
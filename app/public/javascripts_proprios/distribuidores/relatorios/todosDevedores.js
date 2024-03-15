const container_users = document.querySelector('#Container_Users');
const id = document.querySelector('#Id_User').value
const url = `http://localhost:200/distribuidores/todosDevedores?idDistribuidor=${id}`;
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

    for (let i = 1; i <= pageCont; i++) {
        const activeClass = (i === page) ? 'active bg-primary text-light' : '';
        containerPagination.innerHTML += `<li class="page-item cursor-pointer "><a class="page-link ${activeClass}" onclick="todosOsVendedores(${i})">${i}</a></li>`;
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
                         <div class="cursor-pointer text-center justify-content-center">
                             <i id="Info_pedidos" number_pedido="${devedor.numero_do_pedido}" class="material-icons cursor-pointer ms-5">info</i>
                         </div>
                         <div class="d-flex flex-colum justify-content-center">
                             <h6 class="mb-0 text-sm text-center" style="margin-left: 1rem">${devedor.numero_do_pedido}</h6>
                         </div>
                     </div>
                 </td>
                 <td>
                     <p class="text-xs text-center font-weight-bold mb-0">${devedor.status}</p>
                 </td>
                 <td class="align-middle text-center text-sm">
                     <span class="badge badge-sm bg-gradient-success">${devedor.quantidade}</span>
                 </td>
                 <td class="align-middle text-center">
                     <span class="text-secondary text-xs font-weight-bold">${devedor.data}</span>
                 </td>
                 
             </tr>
         `
                         
    })
    paginas(page);
}
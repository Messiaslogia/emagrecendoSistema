const container_users = document.querySelector('#Container_Users');
const inputsPages = document.querySelectorAll('#pageInput');
const id_user = document.querySelector('#Id_User').value

const urls = "https://sistemaemagrecendo.com/api/todosFuturosClientes";
let itensPorPagina = 5;
let listUsuarios;

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(urls)
        .then(data => {
            listUsuarios = data.data;
            console.log(listUsuarios);
            setTimeout(() => {
                displayItens(1)
            }, 300)
        })
        .catch(err => {
            console.log(err)
        })
};

function displayItens(page) {
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;
    let arrayPedidos = listUsuarios;
    let reversePedidos = arrayPedidos.slice().reverse();
    let pageItens = reversePedidos.slice(startIndex, endIndex);

    // Exibindo os itens
    container_users.innerHTML = '';

    pageItens.map(user => {
        container_users.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg mobile_userlist">
                <div class="d-flex flex-column">
                    <h5 class="fs-5">${user.nome}</h5>
                    <h6 class="mb-3 fs-6">${user.nome = 5 ? 'Futuro Cliente' : "null"}</h6>
                    <span class="mb-2 text-xs">E-mail: <span class="text-dark ms-sm-2 font-weight-bold">${user.email}</span></span>
                    <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">${user.telefone}</span></span>
                    <span class="text-xs">Bairro: <span class="text-dark ms-sm-2 font-weight-bold">${user.bairro}</span></span>
                    <span class="text-xs">Endereço: <span class="text-dark ms-sm-2 font-weight-bold">${user.endereco}</span></span>
                    <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${user.regiao}</span></span>
                </div>
                <div class="ms-auto text-end div_buttons">
                    <a id="Bt_dellUser" class="btn btn-link text-danger text-gradient px-3 mb-0" href="/api/dellUser/${user.id_usuario}?user=${id_user}"><i
                            class="material-icons text-sm me-2">delete</i>Delete</a>
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/api/editUser/${user.id_usuario}?user=${id_user}"><i
                            class="material-icons text-sm me-2">edit</i>Edit</a>
                </div>
                <hr>
            </li>
        `;
    })
    paginas(page);
};

function paginas(page) {
    const pageCont = Math.ceil(listUsuarios.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = '';

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayItens(${pageCont})">${pageCont}</a></li>`;
        }
    }
}

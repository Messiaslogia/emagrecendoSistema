const container_users = document.querySelector('#Container_Users');
const inputVendedores = document.querySelector('#idVendedor');
const tokenUser = document.querySelector('#idUser').value;

const url = "/vendedores/todosUsuariosVendedor";
const inputsPages = document.querySelectorAll('#pageInput');
let itensPorPagina = 5;
let listUsuarios = [];
let filteredUsuarios = [];

document.addEventListener('DOMContentLoaded', () => {
    adquirirListsUsers();
});

function adquirirListsUsers() {
    axios.get(`${url}?idVendedor=${tokenUser}`)
        .then(data => {
            listUsuarios = data.data;

            setTimeout(() => {
                displayItens(1);
            }, 300);
        })
        .catch(err => {
            console.log(err);
        });
}

function filtro(status) {
    switch (status) {
        case "Todos":
            displayItens(1);
            break;
        case "Futuros Clientes":
            // Filtrar apenas Futuros Clientes
            filteredUsuarios = listUsuarios.filter(user => user.funcao == '5');
            displayFilteredItens(1);
            break;
        case "Clientes":
            // Filtrar apenas Clientes
            filteredUsuarios = listUsuarios.filter(user => user.funcao == '4');
            displayFilteredItens(1);
            break;
        default:
            console.error(`Status '${status}' não reconhecido.`);
            break;
    }
}

function displayItens(page) {
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;

    // let reverseUsers = listUsuarios.reverse();
    let pageUsuarios = listUsuarios.slice(startIndex, endIndex);

    container_users.innerHTML = '';

    console.log(pageUsuarios);
    pageUsuarios.forEach(user => {
        let nome = user.nome || 'Nome não disponível';
        let funcao = user.funcao == '4' ? 'Cliente' : user.funcao == '5' ? 'Futuro Cliente' : user.funcao;
        let email = user.email || 'E-mail não disponível';
        let telefone = user.telefone || 'Telefone não disponível';
        let regiao = user.regiao || 'Região não disponível';

        container_users.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">${nome}</h6>
                    <span class="mb-2 text-xs">Função: <span class="text-dark font-weight-bold ms-sm-2">${funcao}</span></span>
                    <span class="mb-2 text-xs">E-mail: <span class="text-dark ms-sm-2 font-weight-bold">${email}</span></span>
                    <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">${telefone}</span></span>
                    <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${regiao}</span></span>
                </div>
                <div class="ms-auto text-end">
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/vendedores/editUser/${user.id_usuario}?user=${tokenUser}">
                        <i class="material-icons text-sm me-2">edit</i>Edit
                    </a>
                </div>
            </li>`;
    });
    paginas(page);
}

function displayFilteredItens(page) {
    let startIndex = (page - 1) * itensPorPagina;
    let endIndex = startIndex + itensPorPagina;

    // let reverseUsers = filteredUsuarios.reverse();
    let pageUsuarios = filteredUsuarios.slice(startIndex, endIndex);

    container_users.innerHTML = '';
    pageUsuarios.forEach(user => {
        let nome = user.nome || 'Nome não disponível';
        let funcao = user.funcao == '4' ? 'Cliente' : user.funcao == '5' ? 'Futuro Cliente' : user.funcao;
        let email = user.email || 'E-mail não disponível';
        let telefone = user.telefone || 'Telefone não disponível';
        let regiao = user.regiao || 'Região não disponível';

        container_users.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">${nome}</h6>
                    <span class="mb-2 text-xs">Função: <span class="text-dark font-weight-bold ms-sm-2">${funcao}</span></span>
                    <span class="mb-2 text-xs">E-mail: <span class="text-dark ms-sm-2 font-weight-bold">${email}</span></span>
                    <span class="text-xs">Contato: <span class="text-dark ms-sm-2 font-weight-bold">${telefone}</span></span>
                    <span class="mt-2 text-xs">Zona: <span class="text-dark font-weight-bold ms-sm-2">${regiao}</span></span>
                </div>
                <div class="ms-auto text-end">
                    <a id="Bt_editUser" class="btn btn-link text-dark px-3 mb-0" href="/vendedores/editUser/${user.id_usuario}?user=${tokenUser}">
                        <i class="material-icons text-sm me-2">edit</i>Edit
                    </a>
                </div>
            </li>`;
    });
    paginasFiltered(page);
}

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

function paginasFiltered(page) {
    const pageCont = Math.ceil(filteredUsuarios.length / itensPorPagina);
    const containerPagination = document.querySelector('#pag_navigation_input');

    containerPagination.innerHTML = '';

    const maxPagesToShow = 5;

    if (pageCont <= maxPagesToShow) {
        for (let i = 1; i <= pageCont; i++) {
            const activeClass = (i === page) ? 'active bg-primary text-light' : '';
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayFilteredItens(${i})">${i}</a></li>`;
        }
    } else {
        if (page <= maxPagesToShow - 1) {
            for (let i = 1; i <= maxPagesToShow; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayFilteredItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayFilteredItens(${pageCont})">${pageCont}</a></li>`;
        } else if (page >= pageCont - maxPagesToShow + 2) {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayFilteredItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = pageCont - maxPagesToShow + 1; i <= pageCont; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayFilteredItens(${i})">${i}</a></li>`;
            }
        } else {
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayFilteredItens(1)">1</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            for (let i = page - 1; i <= page + 1; i++) {
                const activeClass = (i === page) ? 'active bg-primary text-light' : '';
                containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link ${activeClass}" onclick="displayFilteredItens(${i})">${i}</a></li>`;
            }
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link">...</a></li>`;
            containerPagination.innerHTML += `<li class="page-item cursor-pointer"><a class="page-link" onclick="displayFilteredItens(${pageCont})">${pageCont}</a></li>`;
        }
    }
}

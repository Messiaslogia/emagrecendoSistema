const url_alertas_admin = "/alertas/alertasGeraisAdmin";
const id_user = document.querySelector('#Id_User').value;
const div_dos_alertas = document.querySelector('#DivAlertas')

axios.get(`${url_alertas_admin}?user=${id_user}`)
    .then((result) => {
           exibir_alertas(result);
    }).catch((err) => {
        
    });

function exibir_alertas(array){
    array.forEach(alerta => {
        switch (alerta.tema) {
            // Produtos
            case '1':
                div_dos_alertas.innerHTML += `
                    <li class="mb-2">
                        <a class="dropdown-item border-radius-md" href="javascript:;">
                            <div class="d-flex py-1">
                                <div class="my-auto">
                                    <span class="material-symbols-outlined">
                                        inventory_2
                                    </span>
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="text-sm font-weight-normal mb-1">
                                        <span class="font-weight-bold">O produto: </span> está com estoque baixo!
                                    </h6>
                                    <p class="text-xs text-secondary mb-0">
                                        <span class="material-symbols-outlined me-1">
                                            schedule
                                        </span>
                                        13 minutes ago
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    `
                break;

            // Pedidos
            case '2':
                
                break;

            // Usuários
            case '3':
                    
                break;

            // Entregas
            case '4':
                        
                break;

            // Dividas
            case '5':
                        
                break;

        
            default:
                break;
        }
    })
}


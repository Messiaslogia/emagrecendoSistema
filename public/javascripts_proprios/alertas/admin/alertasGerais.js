const url_alertas_admin = "/alertas/alertasGeraisAdmin";
const id_user = document.querySelector('#Id_User').value;
const div_dos_alertas = document.querySelector('#DivAlertas')

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${url_alertas_admin}?user=${id_user}`)
        .then((result) => {
            exibir_alertas(result.data);
        }).catch((err) => {
            console.log(err);
        });
})



function exibir_alertas(array){
    array.forEach(element => {
        if(element != null){
            document.querySelector('#TemNotificacao').style.display = "block";
            document.querySelector('#SemNotificacao').style.display = "none";
        }else{
            console.log(element);
        }
    })

    array[1].forEach(alerta => {
        div_dos_alertas.innerHTML += `
            <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                    <div class="d-flex py-1">
                        <div class="py-auto">
                            <div class="border border-5 border-danger rounded rounded-circle bg-danger">
                                <span class="material-symbols-outlined align-middle" style="margin-left: 1px; color: #000">
                                    inventory_2
                                </span>
                            </div>   
                        </div>
                        <div class="d-flex flex-column justify-content-center ms-3">
                            <h6 class="text-sm font-weight-normal mb-1">
                                <span class="font-weight-bold">${alerta.mensagem} ${alerta.nome_produto}</span>
                            </h6>
                            <p class="text-xs text-secondary mb-0">
                                <span class="material-symbols-outlined me-1 align-middle" style="font-size: 120%">
                                    schedule
                                </span>
                                13 minutes ago
                            </p>
                        </div>
                    </div>
                </a>
            </li>
        `
    });
}


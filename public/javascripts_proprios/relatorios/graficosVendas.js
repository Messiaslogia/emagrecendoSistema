const urlFinanceiro = "http://localhost:3030/apiFinanceiro/"
let infosMensais;
let infosSemanais;

document.addEventListener('DOMContentLoaded', () => {
    getInfos();
});


async function getInfos(){

   await axios.get(`${urlFinanceiro}relatorioMensal`)
        .then(resp => {
            infosMensais = resp.data;
        })
        .catch(err => {
            console.log(err);
        })

  await  axios.get(`${urlFinanceiro}relatorioSemanal`)
        .then( resp => {
            infosSemanais = resp.data;
        })
        .catch(err => {
            console.log(err)
        })

    criarGraficos()
    cases()
}


function criarGraficos(){

    // Grafico de Barras
    let ctx = document.getElementById("chart-bars").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["S", "T", "Q", "QUI", "SE", "SA", "D"],
                datasets: [{
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                    backgroundColor: "rgba(255, 255, 255, .8)",
                    data: [infosSemanais[1][1], infosSemanais[2][1], infosSemanais[3][1], infosSemanais[4][1], infosSemanais[5][1], infosSemanais[6][1], infosSemanais[0][1]],
                    maxBarThickness: 6
                },],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 500,
                            beginAtZero: true,
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                            color: "#fff"
                        },
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });



        // Linha
        let ctx2 = document.getElementById("chart-line").getContext("2d");
        
        new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                datasets: [{
                    label: "Mobile apps",
                    tension: 0,
                    borderWidth: 0,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(255, 255, 255, .8)",
                    pointBorderColor: "transparent",
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: true,
                    data: [infosMensais[1][0],  infosMensais[1][1],  infosMensais[1][2],  infosMensais[1][3],  infosMensais[1][4],  infosMensais[1][5],  infosMensais[1][6],  infosMensais[1][7],  infosMensais[1][8],  infosMensais[1][9],  infosMensais[1][10],  infosMensais[1][11]],
                    maxBarThickness: 12
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 1
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 1
                            },
                        }
                    },
                },
            },
        });
}


function cases(){
    let caseMes = document.querySelector('#Total_Venda_Mes');
    let caseDia = document.querySelector('#Total_Venda_Dia')

    let date = new Date();
    let mes = date.getMonth();
    let semana = date.getDay();
    let dia = date.getDate()


    caseMes.innerHTML = `R$ ${infosMensais[0][mes].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`
    caseDia.innerHTML = `R$ ${infosSemanais[semana][2].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`
}
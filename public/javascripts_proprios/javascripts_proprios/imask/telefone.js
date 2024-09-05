// Seleciona o elemento de input
const telefone_Input_Imask = document.getElementById('Telefone_input');

// Define as opções da máscara para o telefone
const maskOptions = {
  mask: '(00) 00000-0000'
};

// Inicializa a máscara
const mask_Telefone = IMask(telefone_Input_Imask, maskOptions);
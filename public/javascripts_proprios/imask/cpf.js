const cpfInput_imask = document.getElementById('CPF_input');

const maskOptions_cpf = {
    mask: '000.000.000-00'
};

const mask_cpf = IMask(cpfInput_imask, maskOptions_cpf);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#MyForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = document.querySelector('#Email_input').value;
        const cpfInput = document.querySelector('#CPF_input').value.replace(/[^0-9]/g, '');

        let confirm = 0;

        try {
            const respCpf = await axios.post('https://apiemagrecendo.com/users/verifyCPF', { cpfInput: cpfInput });
            if (respCpf.data === true) {
                confirm++;
            } else {
                alert(`O CPF ${cpfInput} já está cadastrado.`);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);  // Aguarda 1 segundo antes de recarregar a página
                return;
            }

            const respEmail = await axios.post('https://apiemagrecendo.com/users/verifyEmail', { emailInput: emailInput });
            if (respEmail.data === true) {
                confirm++;
            } else {
                alert(`O email ${emailInput} já está cadastrado.`);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);  // Aguarda 1 segundo antes de recarregar a página
                return;
            }

            if (confirm === 2) {
                form.submit();  // Submete o formulário manualmente
            }

        } catch (error) {
            console.error('Erro ao verificar CPF ou Email:', error);
            alert('Ocorreu um erro ao tentar verificar suas informações. Tente novamente mais tarde.');
            setTimeout(() => {
                window.location.reload();
            }, 1000);  // Aguarda 1 segundo antes de recarregar a página em caso de erro
        }
    });
});

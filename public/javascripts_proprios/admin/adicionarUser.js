document.addEventListener('DOMContentLoaded', () => {
    let submitBt = document.querySelector('#MyForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        let emailInput = document.querySelector('#Email_input').value;
        let cpfInput = document.querySelector('#CPF_input').value;
        let confirm = 0

       await axios.post('http://localhost:200/users/verifyCPF', {cpfInput})
            .then(respCpf => {
                if(respCpf.data == true){
                    confirm++
                }else{
                    alert(`O CPF ${cpfInput} já está cadastrado`);
                }
            })

        await axios.post('http://localhost:200/users/verifyEmail', {emailInput})
            .then(respEmail => {
                if(respEmail.data == true){
                    confirm++
                }else{
                    alert(`O email ${emailInput} já está cadastrado.`);
                }
            })
        
        if(confirm == 2){
            event.target.submit()
        }
    }); 
})
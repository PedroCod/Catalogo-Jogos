const sequelize = require("../../database");

function entrar(){
    let email = document.querySelector('#email');
    let emailLabel = document.querySelector('#emailLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');
    let msgError = document.querySelector('#msgError');
    let listaUser = [];


    let userValid = {
        nome: '',
        email: '',
        senha: '' 
    }

 listaUser = JSON.parse(sequelize.getItem('login'))
listaUser.forEach((item) => {
    if(email.value == item.nome && senha.value == item.senha){
        userValid = {
            nome: item.nome,
            email: item.email,
            senha: item.senha
        }
    }
});

if(email.value == userValid.email && senha.value == userValid.senha){
    emailLabel.setAttribute('style', 'color : red')

}else{
    emailLabel.setAttribute('style', 'color : red')
    email.setAttribute('style', 'border-color : red')
    senhaLabel.setAttribute('style', 'color : red')
    senhaLabel.setAttribute('style', 'color : red')
}

}
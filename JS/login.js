document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('login');
const mensagem = document.getElementById('mensagem');

// Usuário mock
const usuarioMock = {
    email: 'teste@exemplo.com',
    senha: '12345678'
};

// mostrar ocultar senha
function togglePassword(){
    const senha = document.getElementById('senha');
    const eye = document.getElementById('eye');

    if(senha.type === 'password') {
        senha.type = 'text';
        eye.textContent = 'O';
    } else {
        senha.type = 'password';
        eye.textContent = 'E';
    }
}

// validar login
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Expressão regular para validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Mostrar erro se NÃO for válido
    if(!emailRegex.test(email)){
        showMessage('Por favor inserir um e-mail válido', 'error');
        return;
    }
    if(senha.length < 8){
        showMessage('Por favor inserir uma senha com no mínimo 8 caracteres', 'error');
        return;
    }

    // Verificação do usuário mock
    if(email !== usuarioMock.email || senha !== usuarioMock.senha){
        showMessage('Usuário ou senha inválidos', 'error');
        return;
    }

    //Simulação de login bem-sucedido
    showMessage('Login realizado com sucesso! Redirecionando...','sucess');
    form.reset();

    //Simulação de redirecionamento
    setTimeout(() => {
        window.location.href = 'mainpage.html';
    }, 2000);
});


// Exibir mensagem
function showMessage(text, type){
    mensagem.textContent = text;
    mensagem.className = type;

    //Reset após 3 segundos
    setTimeout(() => {
        mensagem.textContent = '';
        mensagem.className = '';
    }, 3000);
}

 // Botão de mostrar/ocultar senha
    window.togglePassword = function() {
        const senhaInput = document.getElementById('senha');
        const eye = document.getElementById('eye');
        if (senhaInput.type === 'password') {
            senhaInput.type = 'text';
            eye.textContent = '🙈';
        } else {
            senhaInput.type = 'password';
            eye.textContent = '👁️';
        }
    }
});
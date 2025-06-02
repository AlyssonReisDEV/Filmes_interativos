document.addEventListener('DOMContentLoaded', function () {
    // 1. Seletores principais
    const form = document.getElementById('login');
    const mensagem = document.getElementById('mensagem');

    // 2. Dados simulados (usuário mock)
    const usuarioMock = {
        email: 'teste@exemplo.com',
        senha: '12345678'
    };

    // 3. Função para exibir mensagens
    function showMessage(text, type) {
        mensagem.textContent = text;
        mensagem.className = type;

        setTimeout(() => {
            mensagem.textContent = '';
            mensagem.className = '';
        }, 3000);
    }

    // 4. Função para mostrar/ocultar a senha
    window.togglePassword = function () {
        const senhaInput = document.getElementById('senha');
        const eyeIcon = document.getElementById('eye-icon');

        const isPassword = senhaInput.type === 'password';

        senhaInput.type = isPassword ? 'text' : 'password';
        eyeIcon.classList.toggle('fa-eye', !isPassword);
        eyeIcon.classList.toggle('fa-eye-slash', isPassword);
    };

    // 5. Validação e envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showMessage('Por favor inserir um e-mail válido', 'error');
            return;
        }

        if (senha.length < 8) {
            showMessage('Por favor inserir uma senha com no mínimo 8 caracteres', 'error');
            return;
        }

        if (email !== usuarioMock.email || senha !== usuarioMock.senha) {
            showMessage('Usuário ou senha inválidos', 'error');
            return;
        }

        showMessage('Login realizado com sucesso! Redirecionando...', 'sucess');
        form.reset();

        setTimeout(() => {
            window.location.href = 'mainpage.html';
        }, 1000);
    });
});

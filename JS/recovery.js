document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('recuperar-form');
      const mensagem = document.getElementById('mensagem');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          showMessage('Por favor, insira um e-mail válido.', 'error');
          return;
        }

        // Mostra o e-mail e senha mock
        showMessage(
        `Seu acesso de demonstração:<br><strong>E-mail:</strong> teste@exemplo.com<br><strong>Senha:</strong> 12345678`,
        'success'
        );
        form.reset();
      });

      function showMessage(text, type) {
        mensagem.innerHTML = text;
        mensagem.className = type;
        setTimeout(() => {
          mensagem.innerHTML = '';
          mensagem.className = '';
        }, 8000);
      }
    });
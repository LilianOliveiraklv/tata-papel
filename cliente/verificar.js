function confirmarCodigo() {
    const codigoSalvo = localStorage.getItem("codigo_verificacao");
    const codigoDigitado = document.getElementById("codigoDigitado").value.trim();

    // 🛑 valida campo vazio
    if (!codigoDigitado) {
        alert("Digite o código! 💗");
        return;
    }

    // 🛑 valida tamanho
    if (codigoDigitado.length !== 6) {
        alert("Código inválido! Ele deve ter 6 dígitos.");
        return;
    }

    // ✔ código correto
    if (codigoDigitado === codigoSalvo) {

        const nome = localStorage.getItem("nome_verificacao");
        const email = localStorage.getItem("email_verificacao");
        const senha = localStorage.getItem("senha_verificacao");

        if (!nome || !email || !senha) {
            alert("Erro inesperado! Refaça o cadastro. 😿");
            return;
        }

        // 🔍 recupera usuários já cadastrados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // 🛑 impede duplicidade
        if (usuarios.some(u => u.email === email)) {
            alert("Este e-mail já está cadastrado 😿");
            return;
        }

        // ➕ adiciona o novo usuário
        usuarios.push({ nome, email, senha });

        // 💾 salva tudo
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // 🧹 limpa temporários
        localStorage.removeItem("codigo_verificacao");
        localStorage.removeItem("nome_verificacao");
        localStorage.removeItem("email_verificacao");
        localStorage.removeItem("senha_verificacao");

        alert("Cadastro confirmado com sucesso! 🎉 Agora faça login.");
        window.location.href = "login.html";

    } else {
        alert("Código incorreto 😿");
    }
}

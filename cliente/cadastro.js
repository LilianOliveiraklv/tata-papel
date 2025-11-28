document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", function (e) { 
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

        // 🔍 validação básica
        if (!nome || !email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos 💗");
            return;
        }

        // 🔐 validar senha igual
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem! 😿");
            return;
        }

        // 🔑 código de verificação
        const codigo = Math.floor(100000 + Math.random() * 900000);

        // 💾 salvar info temporária
        localStorage.setItem("codigo_verificacao", codigo);
        localStorage.setItem("email_verificacao", email);
        localStorage.setItem("nome_verificacao", nome);
        localStorage.setItem("senha_verificacao", senha);

        // 📩 dados para o EmailJS
        const params = {
            to_name: nome,
            to_email: email,
            codigo: codigo
        };

        // ⚙️ VERIFICA SE O EMAILJS ESTÁ CONFIGURADO
        if (!emailjs || !emailjs.send) {
            alert("EmailJS não carregou. Verifique sua chave pública no index. 😿");
            return;
        }

        // 🚀 envio do e-mail
        emailjs.send("service_7etv0rb", "template_cq2iibv", params)
            .then(() => {
                alert("Enviamos um código para validar seu cadastro! 💌");
                window.location.href = "verificar.html";
            })
            .catch(err => {
                console.error("Erro ao enviar e-mail:", err);
                alert("Erro ao enviar o código. Tente novamente! 😿");
            });
    });
});

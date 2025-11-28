document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    if(!email || !senha){
        alert("Preencha todos os campos 💗");
        return;
    }

    // Envia o código
    enviarCodigo(email);

    // Exemplo simples (sem back-end ainda)
    if(email === "teste@teste.com" && senha === "123456"){
        alert("Login realizado com sucesso!");
        
        // VOLTA PARA A RAIZ
        window.location.href = "../index.html";

    } else {
        alert("E-mail ou senha incorretos 😿");
    }
});
function irParaLogin() {
    window.location.href = "cliente/login.html";
}
function enviarCodigo(email) {

    const codigo = Math.floor(100000 + Math.random() * 900000); // 6 dígitos

    // Salvar para validação depois
    localStorage.setItem("codigo_verificacao", codigo);
    localStorage.setItem("email_verificacao", email);

    const params = {
        to_email: email,
        to_name: "Cliente",
        codigo: codigo
    };

    emailjs.send("service_zhz4o6o", "template_cq2iibv", params)
        .then(() => {
            alert("Código enviado para o seu e-mail! 💌");
            window.location.href = "verificar.html";
        })
        .catch((error) => {
            console.error(error);
            alert("Erro ao enviar e-mail 😿");
        });
}

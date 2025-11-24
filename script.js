/* ==========================================
   Tata Papel - script.js
   Carrinho, WhatsApp e ações da loja
==========================================*/

/* ==== WhatsApp ==== */
const whatsappNumber = "5513971055579"; 

function openWhatsApp() {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
}

/* ============================================
   🌸 CARRINHO LATERAL – Tata Papel
   ============================================ */

// Seleções principais
const carrinhoLateral = document.getElementById("carrinho-lateral");
const carrinhoItens = document.getElementById("carrinho-itens");
const totalCarrinho = document.getElementById("total-carrinho");
const qtdItensTexto = document.getElementById("quantidade-itens");

// Botão fechar carrinho
document.getElementById("fechar-carrinho").addEventListener("click", () => {
    carrinhoLateral.classList.remove("aberto");
});

// Função abrir carrinho
function abrirCarrinho() {
    carrinhoLateral.classList.add("aberto");
}


/* ============================================
   🌸 ADICIONAR PRODUTO AO CARRINHO
   ============================================ */

document.querySelectorAll(".btn-quero").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".produto-card");

        const nome = card.getAttribute("data-nome");
        const preco = parseFloat(card.getAttribute("data-preco"));
        const img = card.querySelector("img").src;

        adicionarNoCarrinho(nome, preco, img);
    });
});


// Lista interna do carrinho
let listaCarrinho = [];

// Função adicionar item
function adicionarNoCarrinho(nome, preco, imagem) {

    // Verifica se o item já existe
    const existente = listaCarrinho.find(i => i.nome === nome);

    if (existente) {
        existente.qtd++;
    } else {
        listaCarrinho.push({
            nome,
            preco,
            imagem,
            qtd: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}


/* -------------------------------
   🌸 CARRINHO TATA PAPEL
-------------------------------- */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualiza número do carrinho no header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector(".cart-count").textContent = count;
}

// Adicionar produto ao carrinho
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Produto adicionado ao carrinho 💕");
}

// Botões "Comprar" usando ID
function buyProduct(id) {
    const products = {
        1: { id: 1, name: "Kit Floral - Digital", price: 9.90 },
        2: { id: 2, name: "Planner Montessori", price: 12.90 },
        3: { id: 3, name: "Convite Festa - Digital", price: 6.90 }
    };

    if (products[id]) {
        addToCart(products[id]);
    }
}

// Quando carregar a página → atualizar bolinha do carrinho
document.addEventListener("DOMContentLoaded", updateCartCount);


/* -------------------------------
   🌸 ABRIR WHATSAPP
-------------------------------- */
function openWhatsApp() {
    window.open("https://wa.me/5531971055579", "_blank");
}


/* -------------------------------
   🌸 BUSCADOR
-------------------------------- */
function searchProducts() {
    let value = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll(".product, .card");

    items.forEach(item => {
        let name = item.textContent.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
    });
}


/* ============================================
   🌸 BOTÃO "BUSCA"
   ============================================ */
function buscar() {
    const termo = document.getElementById("searchInput").value.toLowerCase();

    if (termo.trim() === "") {
        alert("Digite algo para buscar 💗");
        return;
    }

    // Lista de páginas + palavras-chave
    const bancoBusca = [
        { termo: "agenda", pagina: "agendamentos-2026.html" },
        { termo: "agendas", pagina: "agendamentos-2026.html" },
        { termo: "2026", pagina: "agendamentos-2026.html" },
        { termo: "encadernação", pagina: "agendamentos-2026.html" },
        { termo: "capas", pagina: "agendamentos-2026.html" },
        { termo: "planner", pagina: "#" }, // depois você cria
    ];

    let encontrado = bancoBusca.find(item => 
        termo.includes(item.termo)
    );

    if (encontrado) {
        window.location.href = encontrado.pagina;
    } else {
        alert("Nenhum resultado encontrado 😢");
    }
}
// Ícone e contador do carrinho
const cartIcon = document.querySelector(".cart");
const cartCount = document.querySelector(".cart-count");

let quantidadeCarrinho = 0;

// Função chamada quando clica em "Quero"
function adicionarAoCarrinho() {
  quantidadeCarrinho++;
  cartCount.textContent = quantidadeCarrinho;

  // animação fofa da sacolinha
  cartIcon.classList.add("balanca");
  setTimeout(() => cartIcon.classList.remove("balanca"), 400);
}




let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("subtotal");

  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="info">
        <h3>${item.name}</h3>
        <p>Qtd: ${item.quantity}</p>
        <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;

    container.appendChild(div);
  });

  subtotalEl.textContent = "R$ " + subtotal.toFixed(2);
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Sua sacola está vazia!");
    return;
  }

  const msg = encodeURIComponent(
    `Olá! Quero finalizar a compra desses itens:\n\n` +
    cart.map(i => `${i.quantity}x ${i.name} — R$ ${(i.price * i.quantity).toFixed(2)}`).join("\n")
  );

  window.open(`https://wa.me/5531971055579?text=${msg}`, "_blank");
});

loadCart();

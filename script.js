let carrinho = [];

// Substitua esse número pelo WhatsApp do delivery (DDD + número, sem espaços ou símbolos)
const numeroWhatsApp = "5584981953786";

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';

  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const mensagem = carrinho.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('%0A');

  const textoWhatsApp = 
    `Olá! Gostaria de fazer um pedido:%0A%0A${mensagem}%0A%0ATotal: R$ ${total.toFixed(2)}%0A%0AForma de pagamento: ____%0AEndereço: ____`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;

  // Redireciona para o WhatsApp Web/app
  window.open(url, "_blank");

  // Limpa o carrinho localmente
  carrinho = [];
  atualizarCarrinho();
}

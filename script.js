let carrinho = [];

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();  // Atualiza a visualização do carrinho
}

// Função para atualizar a visualização do carrinho
function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';  // Limpa a lista antes de re-adicionar os itens

  let total = 0;
  carrinho.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;  // Exibe o nome e preço de cada item
    lista.appendChild(li);
    total += item.preco;  // Atualiza o total do carrinho
  });

  totalSpan.textContent = `R$ ${total.toFixed(2)}`;  // Exibe o total formatado
}

// Função para finalizar o pedido e redirecionar para o WhatsApp
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');  // Verifica se o carrinho está vazio
    return;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);  // Calcula o total do pedido
  const mensagem = carrinho.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('%0A');  // Formata os itens para o WhatsApp

  // Cria o texto da mensagem que será enviada pelo WhatsApp
  const textoWhatsApp = 
    `Olá! Gostaria de fazer um pedido:%0A%0A${mensagem}%0A%0ATotal: R$ ${total.toFixed(2)}%0A%0AForma de pagamento: ____%0AEndereço: ____`;

  const numeroWhatsApp = '5584981953786';  // Substitua pelo número de WhatsApp da sua loja
  const url = `https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`;  // Monta a URL do WhatsApp

  // Redireciona para o WhatsApp Web/app
  window.open(url, "_blank");

  // Limpa o carrinho localmente após o pedido
  carrinho = [];
  atualizarCarrinho();  // Atualiza a interface do carrinho
}

// Função para finalizar a compra (pagamento)
function finalizarCompra(event) {
  event.preventDefault();  // Impede o comportamento padrão de envio do formulário

  const endereco = document.getElementById('endereco').value;  // Captura o endereço do formulário
  const formaPagamento = document.getElementById('forma-pagamento').value;  // Captura a forma de pagamento selecionada

  // Mostra uma mensagem de confirmação
  alert(`Pedido finalizado!\nEndereço: ${endereco}\nForma de pagamento: ${formaPagamento}`);

  // Limpa o carrinho após a compra
  carrinho = [];
  localStorage.removeItem('carrinho');  // Remove o carrinho do localStorage

  // Redireciona o usuário para a página inicial
  window.location.href = 'index.html';
}

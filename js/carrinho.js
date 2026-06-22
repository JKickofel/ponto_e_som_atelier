let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ADICIONAR ITEM
function adicionarCarrinho(nome, quantidade = 1) {

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            nome: nome,
            quantidade: quantidade
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarBadge();
    console.log("Item adicionado:", nome);
}

// ATUALIZAR BADGE
function atualizarBadge() {

    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    const badge = document.querySelector(".carrinho-badge");

    if (badge) {
        badge.textContent = total;
    }
}

// inicializa ao carregar
document.addEventListener("DOMContentLoaded", atualizarBadge);
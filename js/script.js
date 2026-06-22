/* =========================
   🔎 SEARCH TOGGLE
========================= */
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');

if (searchBox && searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchBox.classList.toggle('active');
    });
}


/* =========================
   🎠 SWIPER SLIDER
========================= */
const swiper = new Swiper(".meuSwiper", {

    loop: true,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

});


/* =========================
   🖼 LIGHTBOX
========================= */
const imagens = document.querySelectorAll(".lightbox-img");
const lightbox = document.getElementById("lightbox");
const imagemLightbox = document.getElementById("imagem-lightbox");
const fechar = document.getElementById("fechar-lightbox");

if (imagens && lightbox && imagemLightbox && fechar) {

    imagens.forEach((img) => {

        img.addEventListener("click", () => {
            imagemLightbox.src = img.src;
            lightbox.style.display = "flex";
        });

    });

    fechar.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* abrir / fechar */
function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("ativo");
}

/* adicionar item */
function adicionarCarrinho(nome, preco) {

    const item = carrinho.find(p => p.nome === nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            nome,
            preco,
            quantidade: 1
        });
    }

    salvar();
    render();
    abrirCarrinho();
}

/* remover */
function removerItem(nome) {
    carrinho = carrinho.filter(i => i.nome !== nome);
    salvar();
    render();
}

/* salvar */
function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* render */
function render() {

    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total");

    if (!lista || !totalEl) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">
                <p>${item.nome}</p>
                <p>Qtd: ${item.quantidade}</p>
                <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>

                <button onclick="removerItem('${item.nome}')">Remover</button>
            </div>
        `;
    });

    totalEl.innerText = total.toFixed(2);
}

/* iniciar */
render();

document.addEventListener("DOMContentLoaded", () => {

    const imagens = document.querySelectorAll(".lightbox-img");
    const lightbox = document.getElementById("lightbox");
    const imagemLightbox = document.getElementById("imagem-lightbox");
    const fechar = document.getElementById("fechar-lightbox");
    const anterior = document.getElementById("anterior");
    const proximo = document.getElementById("proximo");

    if (!lightbox || imagens.length === 0) return;

    let indiceAtual = 0;

    function abrirImagem(indice) {
        indiceAtual = indice;
        imagemLightbox.src = imagens[indiceAtual].src;
        lightbox.style.display = "flex";
    }

    imagens.forEach((img, indice) => {
        img.addEventListener("click", () => abrirImagem(indice));
    });

    proximo?.addEventListener("click", () => {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        abrirImagem(indiceAtual);
    });

    anterior?.addEventListener("click", () => {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
        abrirImagem(indiceAtual);
    });

    fechar?.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox?.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display !== "flex") return;

        if (e.key === "Escape") lightbox.style.display = "none";
        if (e.key === "ArrowRight") proximo?.click();
        if (e.key === "ArrowLeft") anterior?.click();
    });

});
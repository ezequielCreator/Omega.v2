document.addEventListener("DOMContentLoaded", () => {
    // --- SELETORES GLOBAIS ---
    const cartIcon = document.querySelector(".cart-icon"),
        cartSidebar = document.querySelector(".cart-sidebar"),
        cartOverlay = document.querySelector(".cart-overlay"),
        closeCartBtn = document.querySelector(".close-cart-btn"),
        cartBody = document.querySelector(".cart-body"),
        cartBadge = document.querySelector(".cart-badge");
    const deliveryToggleBtns = document.querySelectorAll(".delivery-btn");
    const deliveryForm = document.getElementById("delivery-form-container"),
        pickupForm = document.getElementById("pickup-form-container");
    const trocoContainer = document.getElementById("troco-container");
    const couponInput = document.getElementById("coupon-input"),
        applyCouponBtn = document.getElementById("apply-coupon-btn"),
        couponFeedback = document.getElementById("coupon-feedback");
    const subtotalElem = document.getElementById("cart-subtotal"),
        cartDiscountElem = document.getElementById("cart-discount"),
        discountLineElem = document.querySelector(".discount-line"),
        totalElem = document.getElementById("cart-total");
    const finishOrderBtn = document.getElementById("finish-order-btn");
    // Seletores da barra inferior
    const viewCartBanner = document.querySelector(".view-cart-banner");
    const bannerTotalElem = document.getElementById("banner-total");
    const viewCartBannerBtn = document.querySelector(".view-cart-banner-btn");

    // Seletores para o sistema de filtro
    const categoryBtns = document.querySelectorAll(".category-btn");
    const searchInput = document.querySelector(".search-input");

    // Seletores da busca mobile (painel suspenso) e do lightbox
    const searchToggleBtn = document.querySelector(".search-toggle-btn");
    const searchContainer = document.querySelector(".search-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
    const lightboxCloseBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;

    // --- EFEITOS 3D / SCROLL: verificações iniciais ---
    // Se o GSAP não carregar (CDN bloqueado, sem internet), a loja continua funcionando sem os efeitos.
    const hasGSAP = typeof window.gsap !== "undefined";
    const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // --- ESTADO DA APLICAÇÃO ---
    const produtos = [
        {
            id: 1,
            nome: "Bermuda Masculina",
            categoria: "bermudas",
            preco: 50.00,
            imagem:
                "./assets/bermuda1.jpeg",
            descricao: "Bermudas masculinas , com tecido de alta qualidade e design moderno.",

        },
        {
            id: 2,
            nome: "Bermuda Masculina",
            categoria: "Bermudas",
            preco: 50.00,
            imagem:
                "./assets/bermuda2.jpeg",
            descricao: "Bermuda Masculina , com tecido de alta qualidade e design moderno.",
        },
        {
            id: 3,
            nome: "Bermuda Masculina",
            categoria: "Bermudas",
            preco: 50.00,
            imagem:
                "./assets/bermuda3.jpeg",
            descricao: "Bermuda Masculina , com tecido de alta qualidade e design moderno.",
        },
        {
            id: 4,
            nome: "Bermuda Masculina",
            categoria: "Bermudas",
            preco: 50.00,
            imagem:
                "./assets/bermuda4.jpeg",
            descricao: "Bermuda Masculina , com tecido de alta qualidade e design moderno.",
        },

        {
            id: 5,
            nome: "Bermuda Masculina",
            categoria: "Bermudas",
            preco: 50.00,
            imagem:
                "./assets/bermuda5.jpeg",
            descricao: "Bermuda Masculina , com tecido de alta qualidade e design moderno.",
        },

        {
            id: 6,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas1.1.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 7,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas1.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 8,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas2.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 9,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas3.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 10,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas4.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 11,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas5.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 12,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas6.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 13,
            nome: "Camisas masculina Over Size",
            categoria: "blusas",
            preco: 65.99,
            imagem:
                "./assets/camisas7.jpeg",
            descricao: "Camisa Masculina Over Size , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 14,
            nome: "Regata Masculina",
            categoria: "Regatas",
            preco: 55.99,
            imagem:
                "./assets/regatas1.jpeg",
            descricao: "Regata Masculina , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 15,
            nome: "Regata Masculina",
            categoria: "Regatas",
            preco: 55.99,
            imagem:
                "./assets/regatas2.jpeg",
            descricao: "Regata Masculina , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 16,
            nome: "Regata Masculina",
            categoria: "Regatas",
            preco: 55.99,
            imagem:
                "./assets/regatas3.jpeg",
            descricao: "Regata Masculina , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 17,
            nome: "relogio Masculino",
            categoria: "acessórios",
            preco: 45.99,
            imagem:
                "./assets/relogio-masculino.jpeg",
            descricao: "Relógio Masculino , com tecido de alta qualidade e design moderno.",
        },
        {
             id: 18,
            nome: "Sapato Casual",
            categoria: "calçados",
            preco: 89.99,
            imagem:
                "./assets/sapato-masculino.jpeg",
            descricao: "Sapato Masculino Casual Castelli Marinho",
        },
        {
             id: 19,
            nome: "short Masculino",
            categoria: "shorts",
            preco: 45.99,
            imagem:
                "./assets/short-masculino.jpeg",
            descricao: "Short Masculino , com tecido de alta qualidade e design moderno.",
        }
    ];
    const validCoupons = [
        { code: "FRETEOMEGA", type: "percentage", value: 8 },
        { code: "OMEGA-br",type: "percentage", value: 10},
        { code: "OMEGAZO",type: "percentage", value: 15}
    ];
    let carrinho = [],
        tipoEntrega = "delivery",
        appliedCoupon = null;

    // Variáveis de estado para filtros
    let categoriaAtiva = "all";
    let termoBusca = "";

    const formatarMoeda = (v) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth;
    const lockScroll = () => {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.classList.add("no-scroll");
    };
    const unlockScroll = () => {
        document.body.style.paddingRight = "";
        document.body.classList.remove("no-scroll");
    };
    const abrirCarrinho = () => {
        cartSidebar.classList.add("show");
        cartOverlay.classList.add("show");
        lockScroll();
    };
    const fecharCarrinho = () => {
        cartSidebar.classList.remove("show");
        cartOverlay.classList.remove("show");
        unlockScroll();
    };

    const animacaoVoarParaCarrinho = (productCard) => {
        const productImg = productCard.querySelector(".product-img"),
            imgRect = productImg.getBoundingClientRect(),
            cartRect = cartIcon.getBoundingClientRect(),
            flyingImg = document.createElement("img");
        flyingImg.src = productImg.src;
        flyingImg.classList.add("product-image-fly");
        flyingImg.style.left = `${imgRect.left}px`;
        flyingImg.style.top = `${imgRect.top}px`;
        flyingImg.style.width = `${imgRect.width}px`;
        flyingImg.style.height = `${imgRect.height}px`;
        document.body.appendChild(flyingImg);
        requestAnimationFrame(() => {
            flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`;
            flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`;
            flyingImg.style.width = "0px";
            flyingImg.style.height = "0px";
            flyingImg.style.opacity = "0";
        });
        flyingImg.addEventListener("transitionend", () => flyingImg.remove());

        if (hasGSAP && !reduceMotion) {
            gsap.fromTo(
                cartIcon,
                { scale: 1.3, rotation: -14 },
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.55,
                    delay: 0.65,
                    ease: "back.out(3)",
                    immediateRender: false,
                    overwrite: true,
                },
            );
        }
    };

    // =========================================================
    // EFEITO — ENTRADA 3D DOS CARDS AO ROLAR A PÁGINA (GSAP + ScrollTrigger)
    // Cada card "se abre" girando em X, como se estivesse deitado e se
    // levantasse para a tela. É re-aplicado toda vez que a lista é
    // filtrada, já que os cards são recriados no DOM.
    // =========================================================
    let cardTriggers = [];
    const initCardReveal = () => {
        const cards = gsap.utils.toArray(".product-card");
        if (!cards.length) return;

        // remove os ScrollTriggers da renderização anterior
        cardTriggers.forEach((t) => t.kill());
        cardTriggers = [];

        if (!hasScrollTrigger || reduceMotion) {
            gsap.set(cards, { opacity: 1, clearProps: "transform" });
            return;
        }

        gsap.set(cards, {
            opacity: 0,
            rotateX: 40,
            y: 36,
            scale: 0.94,
            transformPerspective: 900,
            transformOrigin: "50% 100%",
        });

        const batch = ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: (batchCards) =>
                gsap.to(batchCards, {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.08,
                    overwrite: true,
                }),
        });
        cardTriggers = Array.isArray(batch) ? batch : [batch];
        ScrollTrigger.refresh();
    };

    // Função para filtrar e mostrar produtos
    const filtrarEMostrarProdutos = () => {
        let produtosFiltrados = produtos;

        // Filtro por categoria
        if (categoriaAtiva !== "all") {
            produtosFiltrados = produtosFiltrados.filter(
                (produto) => produto.categoria === categoriaAtiva,
            );
        }

        // Filtro por busca
        if (termoBusca.trim() !== "") {
            const termo = termoBusca.toLowerCase();
            produtosFiltrados = produtosFiltrados.filter(
                (produto) =>
                    produto.nome.toLowerCase().includes(termo) ||
                    produto.descricao.toLowerCase().includes(termo),
            );
        }

        // Renderizar produtos filtrados
        const container = document.querySelector(".products-container");
        if (produtosFiltrados.length === 0) {
            container.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #999;">
                            <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p style="font-size: 1.2rem; font-weight: 600;">Nenhum produto encontrado</p>
                        </div>
                    `;
        } else {
            // .product-card-inner concentra imagem + informações: é nela que
            // recai a inclinação 3D ao passar o mouse, separada do efeito de
            // entrada por scroll que atua no .product-card (evita que as duas
            // animações disputem a mesma propriedade "transform").
            container.innerHTML = produtosFiltrados
                .map(
                    (p) => `
                        <div class="product-card" data-id="${p.id}">
                            <div class="product-card-inner">
                                <img class="product-img" src="${p.imagem}" alt="${p.nome}" loading="lazy">
                                <div class="product-info">
                                    <h3 class="product-name">${p.nome}</h3>
                                    <p class="product-description">${p.descricao}</p>
                                    <p class="product-price">${formatarMoeda(p.preco)}</p>
                                    <button class="product-button">Comprar</button>
                                </div>
                            </div>
                        </div>
                    `,
                )
                .join("");
        }

        if (hasGSAP) initCardReveal();
    };

    const adicionarAoCarrinho = (produtoId, productCard) => {
        if (productCard) animacaoVoarParaCarrinho(productCard);
        const produto = produtos.find((p) => p.id === produtoId),
            itemNoCarrinho = carrinho.find((item) => item.id === produtoId);
        if (itemNoCarrinho) itemNoCarrinho.quantidade++;
        else carrinho.push({ ...produto, quantidade: 1 });
        atualizarCarrinho();
    };

    const alterarQuantidade = (produtoId, acao) => {
        const item = carrinho.find((i) => i.id === produtoId);
        if (!item) return;
        if (acao === "aumentar") item.quantidade++;
        else if (acao === "diminuir") {
            item.quantidade--;
            if (item.quantidade <= 0)
                carrinho = carrinho.filter((i) => i.id !== produtoId);
        }
        atualizarCarrinho();
    };

    const atualizarCarrinho = () => {
        if (carrinho.length === 0) {
            cartBody.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-box-open"></i><p>Seu carrinho está vazio.</p></div>`;
        } else {
            cartBody.innerHTML = carrinho
                .map(
                    (item) =>
                        `<div class="cart-item" data-id="${item.id}"><img src="${item.imagem}" alt="${item.nome}" class="cart-item-img"><div class="cart-item-info"><h4 class="cart-item-name">${item.nome}</h4><p class="cart-item-price">${formatarMoeda(item.preco)}</p><div class="cart-item-controls"><button class="quantity-btn" data-action="diminuir">-</button><span class="quantity">${item.quantidade}</span><button class="quantity-btn" data-action="aumentar">+</button></div></div><button class="remove-item-btn">&times;</button></div>`,
                )
                .join("");
        }
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0,
        );
        let discountAmount = 0;
        if (appliedCoupon && appliedCoupon.type === "percentage")
            discountAmount = subtotal * (appliedCoupon.value / 100);
        const total = subtotal - discountAmount;
        subtotalElem.textContent = formatarMoeda(subtotal);
        if (discountAmount > 0) {
            cartDiscountElem.textContent = `- ${formatarMoeda(discountAmount)}`;
            discountLineElem.style.display = "flex";
        } else {
            discountLineElem.style.display = "none";
        }
        totalElem.textContent = formatarMoeda(total);
        cartBadge.textContent = carrinho.reduce(
            (acc, item) => acc + item.quantidade,
            0,
        );
        finishOrderBtn.disabled = carrinho.length === 0;

        if (carrinho.length > 0 && window.innerWidth <= 768) {
            bannerTotalElem.textContent = formatarMoeda(total);
            viewCartBanner.classList.add("show");
        } else {
            viewCartBanner.classList.remove("show");
        }
    };

    const applyCoupon = () => {
        const code = couponInput.value.trim().toUpperCase(),
            foundCoupon = validCoupons.find((c) => c.code === code);
        couponFeedback.classList.remove("success", "error");
        if (foundCoupon) {
            appliedCoupon = foundCoupon;
            couponFeedback.textContent = "Cupom aplicado!";
            couponFeedback.classList.add("success");
        } else {
            appliedCoupon = null;
            couponFeedback.textContent = "Cupom inválido.";
            couponFeedback.classList.add("error");
        }
        atualizarCarrinho();
    };

    const finalizarPedido = () => {
        let valid = true;
        let fieldsToValidate = [];

        if (tipoEntrega === "delivery") {
            fieldsToValidate = [
                "delivery-name",
                "delivery-phone",
                "delivery-cep",
                "delivery-address",
            ];
        } else {
            fieldsToValidate = ["pickup-name", "pickup-date", "pickup-time"];
        }

        fieldsToValidate.forEach((id) => {
            const el = document.getElementById(id);
            let isFieldValid = el.value.trim() !== "";

            if (id.includes("name") && isFieldValid) {
                if (
                    el.value
                        .trim()
                        .split(" ")
                        .filter((word) => word).length < 2
                ) {
                    isFieldValid = false;
                }
            }

            if (!isFieldValid) {
                el.classList.add("error");
                valid = false;
            } else {
                el.classList.remove("error");
            }
        });

        if (!valid) {
            alert(
                "Por favor, preencha todos os campos obrigatórios marcados em vermelho.",
            );
            return;
        }

        const numeroWhatsApp = "554788196625";
        const itensPedido = carrinho
            .map((item) => `  - ${item.quantidade}x ${item.nome}`)
            .join("\n");
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0,
        );
        let discountAmount = 0,
            cupomInfo = "";
        if (appliedCoupon) {
            discountAmount = subtotal * (appliedCoupon.value / 100);
            cupomInfo = `\n*Cupom Aplicado:* ${appliedCoupon.code} (${formatarMoeda(discountAmount)})`;
        }
        const total = subtotal - discountAmount;
        let mensagem = `*-- NOVO PEDIDO DE OMEGA MODA MASCULINA --*\n\n*Itens:*\n${itensPedido}\n\n*Subtotal:* ${formatarMoeda(subtotal)}${cupomInfo}\n*Total:* ${formatarMoeda(total)}\n\n-------------------------\n\n`;

        if (tipoEntrega === "delivery") {
            const nome = document.getElementById("delivery-name").value;
            const phone = document.getElementById("delivery-phone").value;
            const address = document.getElementById("delivery-address").value;

            const paymentMethod = document.querySelector(
                'input[name="payment"]:checked',
            ).value;
            let paymentInfo = `*Forma de Pagamento:* ${paymentMethod}`;
            if (paymentMethod === "Dinheiro") {
                const troco = document.getElementById("troco-para").value;
                paymentInfo += troco
                    ? ` (Troco para R$ ${troco})`
                    : " (Não precisa de troco)";
            }
            mensagem += `*Tipo de Pedido:* Entrega\n\n*Nome:* ${nome}\n*Telefone:* ${phone}\n*Endereço:* ${address}\n\n${paymentInfo}`;
        } else {
            const nome = document.getElementById("pickup-name").value;
            const dataInput = document.getElementById("pickup-date").value;
            const hora = document.getElementById("pickup-time").value;
            const [year, month, day] = dataInput.split("-");
            const dataFormatada = `${day}/${month}/${year}`;

            mensagem += `*Tipo de Pedido:* Retirada\n\n*Nome para Retirada:* ${nome}\n*Data Agendada:* ${dataFormatada}\n*Hora Agendada:* ${hora}`;
        }

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    };

    // =========================================================
    // EFEITO — HERO 3D: ícones flutuantes reagem ao mouse e ao scroll
    // =========================================================
    const initHero = () => {
        const hero = document.querySelector(".hero-section");
        const scene = hero && hero.querySelector(".hero-scene");
        if (!hasGSAP || !scene) return;

        // Entrada única ao carregar a página
        if (!reduceMotion) {
            gsap.from(".hero-content > *", {
                y: 24,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
            });
            gsap.from(".hero-float", { opacity: 0, duration: 1, stagger: 0.12, delay: 0.3 });
        }

        // Paralaxe ao rolar: cada ícone se desloca numa velocidade diferente
        if (hasScrollTrigger && !reduceMotion) {
            gsap.utils.toArray(".hero-float").forEach((el, i) => {
                gsap.to(el, {
                    yPercent: -26 - i * 7,
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });
        }

        // Inclinação do cenário 3D seguindo o mouse (só em telas com mouse)
        if (!reduceMotion && canHover) {
            const rotX = gsap.quickTo(scene, "rotationX", { duration: 0.8, ease: "power3" });
            const rotY = gsap.quickTo(scene, "rotationY", { duration: 0.8, ease: "power3" });
            hero.addEventListener("pointermove", (e) => {
                const r = hero.getBoundingClientRect();
                const nx = (e.clientX - r.left) / r.width - 0.5;
                const ny = (e.clientY - r.top) / r.height - 0.5;
                rotY(nx * 16);
                rotX(-ny * 12);
            });
            hero.addEventListener("pointerleave", () => {
                rotX(0);
                rotY(0);
            });
        }
    };

    // =========================================================
    // EFEITO — TARJETAS DE PRODUTO: inclinação 3D com o mouse
    // (delegação de eventos: funciona mesmo quando os cards são
    // recriados ao filtrar/buscar)
    // =========================================================
    const initCardTilt = () => {
        if (reduceMotion || !canHover) return;
        const container = document.querySelector(".products-container");

        container.addEventListener("pointermove", (e) => {
            if (e.pointerType !== "mouse") return;
            const inner = e.target.closest(".product-card-inner");
            if (!inner) return;
            const r = inner.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            inner.classList.add("is-tilting");
            inner.style.setProperty("--ry", `${((px - 0.5) * 12).toFixed(2)}deg`);
            inner.style.setProperty("--rx", `${((0.5 - py) * 10).toFixed(2)}deg`);
            inner.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
            inner.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        });

        container.addEventListener("pointerout", (e) => {
            const inner = e.target.closest(".product-card-inner");
            if (!inner || inner.contains(e.relatedTarget)) return;
            inner.classList.remove("is-tilting");
            inner.style.removeProperty("--rx");
            inner.style.removeProperty("--ry");
        });
    };

    // =========================================================
    // LIGHTBOX — abrir a imagem do produto em tamanho grande ao tocar nela
    // =========================================================
    let lastFocusedBeforeLightbox = null;

    const openLightbox = (imgEl) => {
        if (!lightbox || !lightboxImg) return;
        lastFocusedBeforeLightbox = document.activeElement;
        const rect = imgEl.getBoundingClientRect();

        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt;
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        lockScroll();
        lightboxCloseBtn && lightboxCloseBtn.focus();

        if (hasGSAP && !reduceMotion) {
            // Anima a imagem "saindo" da posição onde estava no card até o centro
            const targetMaxWidth = Math.min(window.innerWidth * 0.92, 900);
            const startScale = Math.min(1, rect.width / targetMaxWidth) || 0.3;
            gsap.fromTo(
                lightboxImg,
                {
                    x: rect.left + rect.width / 2 - window.innerWidth / 2,
                    y: rect.top + rect.height / 2 - window.innerHeight / 2,
                    scale: startScale,
                    opacity: 0,
                },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true },
            );
        }
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove("show");
        lightbox.setAttribute("aria-hidden", "true");
        unlockScroll();
        if (lastFocusedBeforeLightbox) lastFocusedBeforeLightbox.focus();
    };

    // --- EVENT LISTENERS ---
    cartIcon.addEventListener("click", abrirCarrinho);
    cartIcon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrirCarrinho();
        }
    });
    closeCartBtn.addEventListener("click", fecharCarrinho);
    cartOverlay.addEventListener("click", fecharCarrinho);
    applyCouponBtn.addEventListener("click", applyCoupon);
    finishOrderBtn.addEventListener("click", finalizarPedido);
    viewCartBannerBtn.addEventListener("click", abrirCarrinho);

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (lightbox && lightbox.classList.contains("show")) {
            closeLightbox();
        } else if (cartSidebar.classList.contains("show")) {
            fecharCarrinho();
        } else if (searchContainer && searchContainer.classList.contains("active")) {
            searchContainer.classList.remove("active");
            searchToggleBtn && searchToggleBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Busca em mobile: o campo fica escondido num painel que abre/fecha
    if (searchToggleBtn && searchContainer) {
        searchToggleBtn.addEventListener("click", () => {
            const isActive = searchContainer.classList.toggle("active");
            searchToggleBtn.setAttribute("aria-expanded", String(isActive));
            if (isActive) searchInput.focus();
        });
        document.addEventListener("click", (e) => {
            if (window.innerWidth >= 600) return;
            if (!searchContainer.classList.contains("active")) return;
            if (searchContainer.contains(e.target) || searchToggleBtn.contains(e.target)) return;
            searchContainer.classList.remove("active");
            searchToggleBtn.setAttribute("aria-expanded", "false");
        });
    }

    // Event listener para botões de categoria
    categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove classe active de todos os botões
            categoryBtns.forEach((b) => b.classList.remove("active"));
            // Adiciona classe active no botão clicado
            btn.classList.add("active");
            // Atualiza categoria ativa
            categoriaAtiva = btn.dataset.category;
            // Filtra e mostra produtos
            filtrarEMostrarProdutos();
        });
    });

    // Event listener para campo de busca
    searchInput.addEventListener("input", (e) => {
        termoBusca = e.target.value;
        filtrarEMostrarProdutos();
    });

    document
        .querySelector(".products-container")
        .addEventListener("click", (e) => {
            if (e.target.matches(".product-button")) {
                const productCard = e.target.closest(".product-card");
                adicionarAoCarrinho(
                    Number.parseInt(productCard.dataset.id),
                    productCard,
                );
                return;
            }
            // Toque/clique na imagem do produto: abre em tamanho grande
            if (e.target.matches(".product-img")) {
                openLightbox(e.target);
            }
        });
    cartBody.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item");
        if (cartItem) {
            const produtoId = Number.parseInt(cartItem.dataset.id);
            if (e.target.matches(".quantity-btn"))
                alterarQuantidade(produtoId, e.target.dataset.action);
            if (e.target.matches(".remove-item-btn")) {
                carrinho = carrinho.filter((i) => i.id !== produtoId);
                atualizarCarrinho();
            }
        }
    });

    deliveryToggleBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            deliveryToggleBtns.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
            tipoEntrega = btn.dataset.option;
            if (tipoEntrega === "delivery") {
                deliveryForm.style.display = "block";
                pickupForm.style.display = "none";
            } else {
                deliveryForm.style.display = "none";
                pickupForm.style.display = "block";
            }
        }),
    );

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
        radio.addEventListener("change", (e) => {
            trocoContainer.style.display =
                e.target.value === "Dinheiro" ? "block" : "none";
            document
                .querySelectorAll(".payment-option")
                .forEach((label) => label.classList.remove("selected"));
            e.target.closest(".payment-option").classList.add("selected");
        });
    });

    // Remove o erro ao digitar
    document
        .querySelectorAll(
            "#delivery-form-container input[required], #pickup-form-container input[required], #pickup-form-container select[required]",
        )
        .forEach((input) => {
            input.addEventListener("input", () => {
                if (input.value.trim() !== "") input.classList.remove("error");
            });
        });

    // --- INICIALIZAÇÃO ---
    filtrarEMostrarProdutos();
    atualizarCarrinho();
    initHero();
    initCardTilt();
});

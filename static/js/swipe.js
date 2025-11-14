// static/js/swipe.js

document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]')?.value;
    const processSwipeUrl = document.getElementById('processSwipeUrl').value; 
    const cardStack = document.getElementById('cardStack');
    const endMessage = document.getElementById('endMessage');
    let cards = Array.from(document.querySelectorAll('.pet-card'));
    const swipeButtons = document.getElementById('swipeButtons');
    const swipeContainer = document.getElementById('swipeContainer');
    
    // ... resto do código ...
    
    // ----------------------------------------------------
    // FUNÇÕES DE AÇÃO
    // ----------------------------------------------------

    // Envia a ação de like/pass para o backend Django
    function sendSwipeAction(petId, liked) {
        fetch(processSwipeUrl, {  // <-- ALTERE ESTA LINHA
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'X-CSRFToken': csrfToken 
            },
            body: JSON.stringify({ 
                'swiped_pet_id': petId, 
                'liked': liked 
            })
         })
        .then(response => response.ok ? response.json() : Promise.reject(response.status))
        .then(data => {
            console.log('Swipe registrado:', liked ? 'Match' : 'Pass');
            if (data.match) {
                alert('Você tem um novo match! 💕');
            }
        })
        .catch(error => console.error('Erro:', error));
    }
    
    // Função para remover card com animação
    function removeCard(card, liked) {
        const petId = card.dataset.petId;
        
        if (petId) {
            sendSwipeAction(petId, liked);
        }
        
        card.classList.add('animating');
        const direction = liked ? 1 : -1;
        card.style.transform = `translateX(${direction * 150}%) rotate(${direction * 30}deg)`;
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.remove();
            cards = cards.filter(c => c !== card);
            
            if (cards.length === 0) {
                if (swipeContainer) swipeContainer.style.display = 'none';
                
                endMessage.style.display = 'block';
                if (swipeButtons) swipeButtons.style.display = 'none'; 
                
            } else {
                // Prepara o próximo card para "arrastar"
                setupHammer(cards[0]); 
            }
        }, 500);
    }

    // Função de 'arrastar' (Hammer.js)
    function setupHammer(card) {
        if (typeof Hammer === 'undefined') {
            console.warn("Hammer.js não foi carregado. A funcionalidade de 'arrastar' está desabilitada.");
            return; 
        }

        if (!card) return; 
        
        const hammer = new Hammer(card);
        const likeOverlay = card.querySelector('.card-overlay.like');
        const nopeOverlay = card.querySelector('.card-overlay.nope');
        let isPanning = false;

        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });

        hammer.on('panstart', function() {
            isPanning = true;
            card.style.transition = 'none';
        });

        hammer.on('panmove', function(event) {
            if (!isPanning) return;
            const rotate = event.deltaX * 0.03 * 10;
            card.style.transform = `translateX(calc(-50% + ${event.deltaX}px)) translateY(${event.deltaY}px) rotate(${rotate}deg)`;
            
            const opacity = Math.abs(event.deltaX) / 100;
            if (event.deltaX > 0) {
                likeOverlay.style.opacity = Math.min(opacity, 1);
                nopeOverlay.style.opacity = 0;
            } else {
                nopeOverlay.style.opacity = Math.min(opacity, 1);
                likeOverlay.style.opacity = 0;
            }
        });

        hammer.on('panend', function(event) {
            if (!isPanning) return;
            isPanning = false;
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            const threshold = 120;
            if (event.deltaX > threshold) {
                removeCard(card, true);
            } else if (event.deltaX < -threshold) {
                removeCard(card, false);
            } else {
                card.style.transform = 'translateX(-50%)';
                likeOverlay.style.opacity = 0;
                nopeOverlay.style.opacity = 0;
            }
        });
    }

    // ----------------------------------------------------
    // INICIALIZAÇÃO
    // ----------------------------------------------------

    // Ativa os botões primeiro
    document.getElementById('btnLike')?.addEventListener('click', function() {
        const topCard = cards[0];
        if (topCard) {
            const likeOverlay = topCard.querySelector('.card-overlay.like');
            likeOverlay.style.opacity = 1;
            setTimeout(() => removeCard(topCard, true), 200);
        }
    });
    
    document.getElementById('btnNope')?.addEventListener('click', function() {
        const topCard = cards[0];
        if (topCard) {
            const nopeOverlay = topCard.querySelector('.card-overlay.nope');
            nopeOverlay.style.opacity = 1;
            setTimeout(() => removeCard(topCard, false), 200);
        }
    });

    // Tenta ativar o 'arrastar' (drag) no primeiro card
    setupHammer(cards[0]);

});
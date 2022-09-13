const prevBtn = document.getElementById('prev-icon');
const nextBtn = document.getElementById('next-icon');
let cards = Array.from(document.getElementsByClassName('profile-card'));
let i = 0;
let card = cards[i];
let cardsLength = cards.length;

nextBtn.addEventListener('click', () => {
    if (i < cardsLength - 1) {
        card.classList.add('hide');
        card = cards[i + 1];
        card.classList.remove('hide');
        i++;
    } else if (i === (cardsLength - 1)) {
        card.classList.add('hide');
        i = 0
        card = cards[i];
        card.classList.remove('hide');
    }
});

prevBtn.addEventListener('click', () => {
    if (i === 0) {
        card.classList.add('hide');
        i = cardsLength - 1;
        card = cards[i];
        card.classList.remove('hide');
    } else if (i < cardsLength - 1 && i !== 0) {
        card.classList.add('hide');
        card = cards[i - 1];
        card.classList.remove('hide');
        i--;
    } else if (i === (cardsLength - 1)) {
        card.classList.add('hide');
        i--;
        card = cards[i];
        card.classList.remove('hide');
    }

});
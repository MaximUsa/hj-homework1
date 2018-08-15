'use strict';


list.addEventListener('click', cartChek);

function cartChek() {
    if ((event.target.tagName === 'A') && (event.target.classList.contains('add-to-cart'))) {
        event.preventDefault();
        addToCart(event.target.dataset);
    };
}
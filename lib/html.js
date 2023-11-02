import { formatPrice } from './helpers.js';

function deleteLineFromCart(event) {
  event.preventDefault();
  // console.log('Eyða!', event.submitter)
  const lineToDelete = event.submitter.closest('tr')

  let cart = JSON.parse(localStorage.getItem('cart'));
  let cartIndex = cart.findIndex((x) => x.id === Number.parseInt(lineToDelete.dataset.productId));
  cart.splice(cartIndex, 1);

  // clear table
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  cartTableBodyElement.innerHTML = '';

  // rerender table with new data
  cart.forEach(element => {
    const cartLine = createCartLine(element, element.quantity);

    cartTableBodyElement.appendChild(cartLine);
  });

  updateTotalPrice(cart);

  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Búa til línu í cart töflu.
 * @param  {import('../main.js').Product} product
 * @param {number} quantity 
 * @returns HTMLElement
 */
export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:
 
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.quantity = quantity.toString();
  cartLineElement.dataset.price = product.price.toString();
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  quantityElement.classList.add('foo');
  // Kórrétt væri hér að bæta líka við <span class="price">
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.classList = "price";
  priceElement.textContent = formatPrice(product.price);
  // Kórrétt væri hér að bæta líka við <span class="price">
  cartLineElement.appendChild(priceElement);
  
  const totalElement = document.createElement('td');
  totalElement.textContent = formatPrice(product.price * quantity);
  cartLineElement.appendChild(totalElement);
  
  const formTdElement = document.createElement('td');

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);
  
  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Eyða';

  formElement.appendChild(buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement)


  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }
}

export function updateTotalPrice(cart) {

  if (cart === null){
    return;
  }

  const totalPriceElement = document.querySelector('.priceTotal');

  const totalSum = cart.reduce((sum, item) => sum + item.TotalPrice, 0);

  // updateað verð sem samtals talan
  totalPriceElement.textContent = `${totalSum} kr.-`;
}
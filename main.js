import { createCartLine, showCartContent, updateTotalPrice } from './lib/html.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

function renderCart(cart) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  // clear table
  cartTableBodyElement.innerHTML = '';

  // rerender table with new data
  cart.forEach(element => {
    const cartLine = createCartLine(element, element.quantity);

    cartTableBodyElement.appendChild(cartLine);
  });

  showCartContent(true);

  updateTotalPrice(cart);
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  const quantityInputElement = parent.querySelector('input');



  // á input
  const quantity = Number.parseInt(quantityInputElement.value);

  


  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);

  document.querySelector('.tableToggle').style.display = "block";
  document.querySelector('.empty-message').style.display = "none";
}

function addProductToCart(product, quantity) {

  let cart =  JSON.parse(localStorage.getItem("cart"));
  if(cart === null){
    cart = [];
  }

  let cartIndex = cart.findIndex((x) => x.id === product.id)

  if(cartIndex === -1) {
    cart.push({
      id: product.id,
      price: product.price,
      title: product.title,
      quantity: quantity,
      TotalPrice: product.price * quantity
    });
  } else {
    cart[cartIndex].quantity += quantity;
    cart[cartIndex].TotalPrice += product.price * quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart(cart);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

document.addEventListener("DOMContentLoaded", function() {

  
  let state = 'form';
  const toggleButton = document.getElementById("toggleButton");
  const formFields = document.querySelectorAll('.form-field');
  const receiptSection = document.querySelector('.receipt');


  toggleButton.addEventListener("click", function(event) {

    event.preventDefault();

    if (state === 'form') {

      formFields.forEach(function(field) {
        field.style.display = "block";
      });
      state = 'receipt';
    } else if (state === 'receipt') {

      receiptSection.style.display = "block";
      toggleButton.style.display = "none";
      formFields.forEach(function(field) {
        field.style.display = "none";
      });
    }
  });
});

// karfan að vera tóm í  hvert skiptið sem er refreshað síðunni
localStorage.clear();
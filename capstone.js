let slideIndexes = [0, 0, 0]; 
let slideClassNames = ["mySlides fade", "mySlides fade2", "mySlides fade3"]; // Class names of each slideshow

function showSlides() {
  for (let j = 0; j < slideClassNames.length; j++) {
    let i;
    let slides = document.getElementsByClassName(slideClassNames[j]);
    
   
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    
    
    slideIndexes[j]++;
    if (slideIndexes[j] > slides.length) {
      slideIndexes[j] = 1;
    }      
    
    slides[slideIndexes[j] - 1].style.display = "block";  
  }

  setTimeout(showSlides, 1500);
}

showSlides(); 


let cart = [];

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}


function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>'; // Message if cart is empty
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="product-card" >
                <img src="${item.image}" alt="${item.name}" style="width:auto; height:auto;">
                <p>${item.name} - $${item.price}</p>
                    <button onclick="removeFromCart(${index})" aria-label="Remove ${item.name} from Cart">Remove</button>
                </div>
            `;
        });
    }
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update the cart in localStorage and the UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    document.getElementById('checkout-button').disabled = cart.length === 0;
}


function addToCart(button) {
    const productCard = button.closest('.product-card');
    const product = {
        id: productCard.getAttribute('data-id'),
        name: productCard.getAttribute('data-name'),
        price: productCard.getAttribute('data-price'),
        image: productCard.querySelector('img').src.replace('data-image')    };
    cart.push(product);
    updateCart();
    alert(`${product.name} added to cart!`);
}
//http://127.0.0.1:5500/', './
// Load cart from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    renderCartItems();

   
    // Search button event listener
    document.getElementById('search-button').addEventListener('click', searchProducts);

    // Checkout button event listener
    document.getElementById('checkout-button').addEventListener('click', checkout);
});

// Toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    renderCartItems(); // Render items whenever cart is toggled
}


function checkout() {
    const checkoutModal = document.getElementById('infoForm');
    checkoutModal.style.display = 'block'; // Show modal

    // Handle form submission
    const checkoutForm = document.getElementById('payment-container');
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // After form is submitted, hide modal and show the alert
        checkoutModal.style.display = 'none';
        alert("Thank you for your purchase!");

        // Clear the cart after purchase
        cart = [];
        updateCart();
        renderCartItems();
    },{once: true});
}
function credit() {
    document.getElementById("credit-card-info").style.display = "block"  ;
}
function cancel() {
    document.getElementById("credit-card-info").style.display = "none";
}
function cancel2() {
    document.getElementById("infoForm").style.display = "none";
}
const creditForm = document.getElementById('credit-card-form');
creditForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        document.getElementById("credit-card-info").style.display = "none";
        alert("Thank you for your purchase!");

        // Clear the cart after purchase
        cart = [];
        updateCart();
        renderCartItems();
    },{once: true});





function openForm() {
    document.getElementById("myForm").style.display = "block";
}

// Close the login form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


// Handle user login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showLoggedInUser();
        closeForm(); // Close the form on successful login
    } else {
        alert('Invalid email or password.');
    }
}

// Open the login form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

// Close the login form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

const users = [
    { email: 'user1@example.com', password: 'password123', name: 'John Doe' },
    { email: 'user2@example.com', password: 'password456', name: 'Jane Smith' }
];

// Handle user login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showLoggedInUser();
        closeForm(); // Close the form on successful login
    } else {
        alert('Invalid email or password.');
    }
}

// Display logged-in user
function showLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('myForm').style.display = 'none';
        const accountButton = document.getElementById('account-button');
        accountButton.textContent = loggedInUser.name;
        document.getElementById('account-section').style.display = 'block';
    }
}

function checkLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        showLoggedInUser();
    }
}

  

// SEARCHING
function searchProducts() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const items = document.querySelectorAll('.product-card');
  const price = document. getElementById("clothes");

  items.forEach(item => {
      const itemName = item.getAttribute('data-name').toLowerCase();

      if (itemName.includes(searchValue)) {
          item.style.display = "block"; // Show item if it matches the search query
          
          item.style.width = "20rem";

      } else {
          item.style.display = "none"; // Hide item if it doesn't match
        //   cartItems.innerHTML = '<p>Your cart is empty.</p>'
      }
  });
}
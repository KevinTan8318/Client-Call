/* ============================================================
   FOOD TRUCK ORDER KIOSK   |   Spice level: MILD
   ============================================================
   The design is done. Your job is the brain.

   PLACES ON THE PAGE YOUR CODE CAN REACH (by id):
     truck-name      the big heading
     tagline         the line under the heading
     menu            the box that holds the menu cards
     customer-name   the name on the receipt
     receipt-lines   the list of items on the receipt
     order-total     the total on the receipt
     student-name    your name in the footer

   HTML FOR ONE MENU CARD (build this as a string for each item):
     <article class="menu-card"><div class="menu-emoji">🌮</div><h3>Item name</h3><p class="menu-category">Category</p><p class="menu-price">$0.00</p></article>
   Use class="menu-card special" to highlight a daily special.

   HTML FOR ONE RECEIPT LINE:
     <li><span>Item name</span><span>$0.00</span></li>

   TIP: someNumber.toFixed(2) turns 6.5 into "6.50"
   ============================================================ */

// STEP 1: Your regular menu. An array of object literals.
// Each item needs at least: name, price, category, emoji.
const addItem = document.getElementById("addItem");
const removeItem = document.getElementById("removeItem");
const finishOrder = document.getElementById("finishOrder");

// addItem.addEventListener("click", )
// removeItem.addEventListener("click", )
// finishOrder.addEventListener("click", )

let menu = [
  // The regular menu
  { name: "Burger", category: "Mains", emoji: "🍔", price: 5 },
  { name: "Taco", category: "Main", emoji: "🌮", price: 3.5 },
  { name: "Ice cream", category: "Deserts", emoji: "🍦", price: 2 },
  { name: "Donut", category: "Deserts", emoji: "🍩", price: 2.25 },
  { name: "Fries", category: "Sides", emoji: "🍟", price: 2.5 },
  { name: "Hotdog", category: "Main", emoji: "🌭", price: 1.75 },
  { name: "Burrito", category: "Main", emoji: "🌯", price: 6.5 },
  { name: "Custard", category: "Deserts", emoji: "🍮", price: 8.0 },
  { name: "Nuggets", category: "Sides", emoji: "🐤", price: 3.5 },
];

// STEP 2: Today's specials. A second, smaller array of objects.

let special = [
  // the special items
  { name: "Curry Rice", category: "Daily Special", emoji: "🍛", price: 8.0 },
  { name: "Sushi", category: "Daily Special", emoji: "🍣", price: 7.0 },
  { name: "Mystery Drink", category: "Daily Special", emoji: "🥤", price: 5.0 },
];

// STEP 3: Combine both arrays into one full menu with the spread operator.
let fullMenu = [...menu, ...special];

// STEP 4: Use a while loop to build the menu cards, then put them on the page.

function updateList() {
  const menuGrid = document.getElementById("menu"); // get the menu div
  menuGrid.innerHTML = ""; // clear the old list
  let i = 0;

  while (i < fullMenu.length) {
    let item = fullMenu[i]; // the item that its currently on
    let menuClass = "";

    if (item.category === "Daily Special") {
      // set the string to the required class
      menuClass = "menu-card special";
    } else {
      menuClass = "menu-card";
    }

    menuGrid.innerHTML += `<article class= "${menuClass}"> 
      <div class="menu-emoji">${item.emoji}</div> 
      <h3>${item.name}</h3> 
      <p class="menu-category">${item.category}</p> 
      <p class="menu-price">$${item.price.toFixed(2)}</p> 
    </article>`;

    i++;
  }
}

// STEP 5: An order object (customer name, total) and an empty cart array.
// Ask for the customer's name with window.prompt().
let cart = [];
let ordering = true;
let total = 0;

function updateName() {
  let customerName = window.prompt("What is your name?");
  let customerLabel = document.getElementById("customer-name");

  if (customerName.length > 0) {
    customerLabel.textContent = customerName;
  } else {
    updateName();
  }
}

// STEP 6: A do...while loop that keeps taking orders until the customer is done.
// Inside it: add items to the cart, let them remove an item, update the order total.
function orderFunction() {
  function addItem() {
    let requestedItem = window.prompt(
      "Type the item you would like to add to the cart"
    );

    for (let i = 0; i < fullMenu.length; i++) {
      if (fullMenu[i].name.toLowerCase() === requestedItem.toLowerCase()) {
        cart.push(fullMenu[i]); // add the item they selected IF its in the menu
      }
    }
  }

  function removeItem() {
    let removeItem = window.prompt("Type the item you would like to remove");

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name.toLowerCase() === removeItem.toLowerCase()) {
        // remove the item from the cart array IF its there
        cart.pop(cart[i]);
      }
    }
  }

  function stopOrder() {
    ordering = false;
    printReceipt();
  }

  do {
    let selectedNumber = window.prompt("1 = add, 2 = remove, 3 = finish");

    if (selectedNumber === "1") {
      addItem();
    } else if (selectedNumber === "2") {
      removeItem();
    } else if (selectedNumber === "3") {
      stopOrder();
    } else {
      alert("Please input a number from 1-3");
    }
  } while (ordering);
}

// do{

// } while (ordering)

// STEP 7: Copy the cart with the spread operator for the final receipt.
// Use a while loop to build the receipt lines, then show the receipt and total on the page.

function printReceipt() {
  let receiptList = document.getElementById("receipt-lines");
  let totalPrice = document.getElementById("order-total");

  let i = 0;

  while (i < cart.length) {
    total += cart[i].price;

    receiptList.innerHTML += `<li><span>${cart[i].name}</span><span>$${cart[
      i
    ].price.toFixed(2)}</span></li>`;
    i++;
  }

  totalPrice.textContent = "$" + total.toFixed(2);
}

function initialize() {
  updateList();

  const timer = setInterval(() => {
    // start a timer that runs every 2 seconds
    // let the website load by starting a 2 second timer then ending it
    clearInterval(timer); // clear it after one tick since the website is loaded
    // updateName();
    // orderFunction();
  }, 2000);
}

initialize();

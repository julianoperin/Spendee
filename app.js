const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const alert = document.getElementById("alert");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//  Add transactions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    //! DISPLAY ALERT
    const red = document.createElement("h2");
    red.innerText = "The fields cannot be blank!";
    red.classList.add("red");
    alert.appendChild(red);

    setTimeout(function () {
      alert.removeChild(red);
    }, 3000);
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value), // Or add a + sign in front of amount
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

//! GENERATE ID
function generateID() {
  return Math.floor(Math.random() * 1000000000000);
}

//! Add transactions to DOM list
function addTransactionDOM(transaction) {
  //! Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //! Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn"  onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  list.appendChild(item);
}

//! Update the balance
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `-$${expense}`;

  console.log(expense);
}

//! Remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//! Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);

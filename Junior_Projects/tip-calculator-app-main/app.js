// DOM
//input
const BillInput = document.getElementById("bill-input");
const CustomTipInput = document.getElementById("tip-input");
const NumberOfPeopleInput = document.getElementById("people-input");
const TipPercentBtns = document.querySelectorAll(".btn-tip-percent");

let bill = 0;
let tip = 0;
let people = 0;

// output
const TipPerPerson = document.getElementById("tip-amount");
const TotalPerPerson = document.getElementById("total-amount");

const ResetBtn = document.querySelector(".btn-reset");
const CalcBtn = document.querySelector(".btn-calculate");

// Global Functions
function clearInputDefaultValue(element) {
  element.addEventListener("focus", () => {
    element.defaultValue = "";
  });
}

function calcTipPerPerson(totalBill = 100, personQuantity = 2, tipPersent = 20) {
  let result = (totalBill / personQuantity) * (Number(tipPersent) / 100);
  return result.toFixed(2);
}

function calcTotalPerPerson(totalBill, personQuantity, tipPersent) {
  let result = ((totalBill / personQuantity) * (tipPersent / 100)) + (totalBill / personQuantity);
  return result.toFixed(2);
}

// Event handlers

// BillInput.addEventListener("kedown", () => {
// });

// CustomTipInput.addEventListener("kedown", () => {
// });

// NumberOfPeopleInput.addEventListener("kedown", () => {
// });


BillInput.addEventListener("focus", clearInputDefaultValue(BillInput));

NumberOfPeopleInput.addEventListener("focus", clearInputDefaultValue(NumberOfPeopleInput));

TipPercentBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", (el) => {
    console.log(el.target);
    console.log(parseInt(el.target.defaultValue, 10));
  });
});

ResetBtn.addEventListener("click", () => {
  BillInput.value = "";
  CustomTipInput.value = "";
  NumberOfPeopleInput.value = "";
  TipPerPerson.innerText = "0.00";
  TotalPerPerson.innerText = "0.00";
  TipPercentBtns.forEach((btn) => btn.classList.remove("selected-tip"));
});

CalcBtn.addEventListener('click', () => {
  bill = parseInt(BillInput.value, 10);
  tip = parseInt(CustomTipInput.value, 10);
  people = parseInt(NumberOfPeopleInput.value, 10);

  console.log(bill, tip, people);
  if (bill == NaN || tip == NaN || people == NaN) {
    TipPerPerson.innerText = '0.00'
  } else {
    TipPerPerson.innerText = calcTipPerPerson(bill, people, tip)
  }
})
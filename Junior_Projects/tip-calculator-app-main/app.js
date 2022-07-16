// DOM
const BillInput = document.getElementById("bill-input");
const CustomTipInput = document.getElementById("tip-input");
const NumberOfPeopleInput = document.getElementById("people-input");
const TipPercentBtns = document.querySelectorAll(".btn-tip-percent");

const TipPerPerson = document.getElementById("tip-amount");
const TotalPerPerson = document.getElementById("total-amount");

const ResetBtn = document.querySelector(".btn-reset");

// Global Functions
function clearInputDefaultValue(element) {
    element.addEventListener("focus", () => {
        element.defaultValue = "";
    });
}

function calculateTipPerPersonAmount(totalBill, personQuantity, tipPersent) {
    let result = (totalBill / personQuantity) * (tipPersent / 100);
    
    return result.toFixed(2);
}
function calculateTotoalPerPersonAmount() { }

// Event handlers
BillInput.addEventListener("keyup", () => {
    calculateTipPerPersonAmount(parseInt(BillInput.value, 10), parseInt(NumberOfPeopleInput.value, 10), parseInt(CustomTipInput.value, 10))
});

CustomTipInput.addEventListener("keyup", () => {
    calculateTipPerPersonAmount(parseInt(BillInput.value, 10), parseInt(NumberOfPeopleInput.value, 10), parseInt(CustomTipInput.value, 10))
});

NumberOfPeopleInput.addEventListener("keyup", () => {
    calculateTipPerPersonAmount(parseInt(BillInput.value, 10), parseInt(NumberOfPeopleInput.value, 10), parseInt(CustomTipInput.value, 10))
});

BillInput.addEventListener("focus", clearInputDefaultValue(BillInput));

NumberOfPeopleInput.addEventListener("focus", clearInputDefaultValue(NumberOfPeopleInput));

TipPercentBtns.forEach((tipBtn) => {
    tipBtn.addEventListener("click", (el) => {
        console.log(parseInt(el.target.defaultValue, 10));
    })
});

ResetBtn.addEventListener("click", () => {
    BillInput.value = "";
    CustomTipInput.value = "";
    NumberOfPeopleInput.value = "";
    TipPerPerson.innerText = "0.00";
    TotalPerPerson.innerText = "0.00";
});


// ==========================================================================================
const billPrice = document.querySelector('#price');
const peopleNumber = document.querySelector('#num-people');
const customTip = document.querySelector('#custom');
const tipPerPerson = document.querySelector('.tip-amount');
const totalPerPerson = document.querySelector('.total-amount');
const tips = document.querySelectorAll('.tip-button');
const errorText = document.querySelector('.error-text');
const resetBtn = document.querySelector('.reset');

let price, people, tipValue;

const getPrice = () => {
  price = parseFloat(billPrice.value);
  localStorage.setItem('price', price);
  calculateTip();
}

const getPeople = () => {
  people = parseInt(peopleNumber.value);
  localStorage.setItem('people', people);
  calculateTip();
}

const getCustomTip = () => {
  tipValue = parseFloat(customTip.value / 100);
  localStorage.setItem('customTip', customTip.value);
  localStorage.setItem('TipPercent', 'null');
  tips.forEach(function(val){
    val.classList.remove('selected');
  });
  calculateTip();
}

const resetValues = () => {
  //  Reset HTML
  billPrice.value = "";
  peopleNumber.value = "";
  customTip.value = "";
  tipPerPerson.innerHTML = `$0.00`;
  totalPerPerson.innerHTML = `$0.00`;
  
  //  Reset coded values
  price = 0;
  people = 1;
  tipValue = 0;
  
  //  Reset stored values
  localStorage.setItem('price', price);
  localStorage.setItem('people', people);
  localStorage.setItem('customTip', customTip.value);
  localStorage.setItem('TipPercent', tipValue);
  
  //  Unselect buttons
  tips.forEach(function(val){
    val.classList.remove('selected');
  });
}

const handleClick = (e) => {
  tips.forEach(function(val){
    val.classList.remove('selected');
    if (e.target.innerHTML == val.innerHTML) {
      val.classList.add('selected');
      // console.log("Target: ", e.target.innerHTML, val);
      tipValue = parseFloat(val.innerHTML) / 100;
      localStorage.setItem('TipPercent', val.innerHTML);
      customTip.value = "";
      localStorage.setItem('customTip', customTip.value);
    }
  });
  calculateTip();
}

billPrice.addEventListener('input', getPrice);
peopleNumber.addEventListener('input', getPeople);
customTip.addEventListener('input', getCustomTip);
resetBtn.addEventListener('click', resetValues);
tips.forEach(function(val) {
  val.addEventListener('click', handleClick);
});

const calculateTip = () => {
  if (people >= 1) {
    errorText.classList.add('hide');
    peopleNumber.classList.remove('error');
    let tipAmount = (price * tipValue) / people;
    let totalAmount = (price / people) + tipAmount;
    tipPerPerson.innerHTML = `$${ tipAmount.toFixed(2) }`;
    totalPerPerson.innerHTML = `$${ totalAmount.toFixed(2) }`;
  }
  else {
    // Display error if less than 1 person
    errorText.classList.remove('hide');
    peopleNumber.classList.add('error');
  }
}

const initializeInputs = () => {
  //  Get info from local storage
  const storagePrice = localStorage.getItem('price');
  const storagePeople = localStorage.getItem('people');
  const storageCustomTip = localStorage.getItem('customTip');
  const storageButtonTip = localStorage.getItem('TipPercent');

  // If there were values in localStorage, use them
  // otherwise initialize values to default
  billPrice.value =  storagePrice >= 0 ? storagePrice : 0;
  peopleNumber.value =  storagePeople >= 1 ? storagePeople : 1;
  customTip.value =  storageCustomTip >= 0 ? storageCustomTip : 0;
  if (customTip.value !== "") {
    // Custom value stored
    tipValue = customTip.value / 100;
  }
  else if (storageButtonTip != 0) {
    // Button stored
    tips.forEach(function(val){
      if (val.innerHTML == storageButtonTip) {
        val.classList.add('selected');
        tipValue = parseFloat(val.innerHTML) / 100;
      }
    });
  }
  else {
    // Default
    tipValue = 0;
  }

  price = billPrice.value;
  people = peopleNumber.value;
  tipValue = tipValue ? tipValue : 0;

  // Logs to confirm variables are there
  console.log("Price: ", price);
  console.log("People: ", people);
  console.log("TipValue", tipValue);

  calculateTip();
}

initializeInputs();
const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const interestRate = document.getElementById("rate");
const form = document.getElementById("form");

const SHOW_CLASS = "show";

mortgageAmount.addEventListener("input", (event) => {
  // Clear error indicator if any
  event.target.parentElement.parentElement
    .querySelector(".error")
    .classList.remove(SHOW_CLASS);

  // Remove any special char and alphabets expect digits
  let amount = event.target.value.replace(/[^0-9\.]/g, "");
  let formattedNumber = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  event.target.value = formattedNumber;
});

// Clear error indicator at focus if there is any
mortgageTerm.addEventListener("input", (event) => {
  event.target.parentElement.parentElement
    .querySelector(".error")
    .classList.remove(SHOW_CLASS);
});

// Clear error indicator at focus if there is any
interestRate.addEventListener("input", (event) => {
  event.target.parentElement.parentElement
    .querySelector(".error")
    .classList.remove(SHOW_CLASS);
});

function isValueValid(value, valueError) {
  let verified = true;

  if (isNaN(value) || value === "" || value <= 0) {
    isValid = false;
    valueError.classList.add(SHOW_CLASS);
    valueError.innerHTML = "This field is required";
  } else {
    valueError.classList.remove(SHOW_CLASS);
    valueError.innerHTML = "";
  }

  return verified;
}

function checkValidation() {
  const loanAmount = +mortgageAmount.value.replace(/,/g, "");
  const loanTerm = +mortgageTerm.value;
  const rate = +interestRate.value;

  const loanAmountError = document.getElementById("mortgage-amount");
  const loanTermError = document.getElementById("mortgage-term");
  const rateError = document.getElementById("mortgage-rate");

  let isValid =
    isValueValid(loanAmount, loanAmountError) &&
    isValueValid(loanTerm, loanTermError) &&
    isValueValid(rate, rateError);

  if (!isValid) {
    return;
  }

  return { loanAmount, loanTerm, rate };
}

function calculateMortgate(loanAmount, loanTerm, rate) {
  // convert interest rate to monthly
  const r = rate / 100 / 12;

  // calculate number of payments
  const n = loanTerm * 12;

  const mortgage =
    (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return mortgage.toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const validatedInputs = checkValidation();

  if (!validatedInputs) {
    return;
  }

  const { loanAmount, loanTerm, rate } = validatedInputs;
  const mortgage = calculateMortgate(loanAmount, loanTerm, rate);
  alert(mortgage);
});

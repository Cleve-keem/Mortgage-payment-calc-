const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const interestRate = document.getElementById("rate");
const form = document.getElementById("form");

mortgageAmount.addEventListener("input", (event) => {
    
  let amount = event.target.value.replace(/[^0-9\.]/g, "");
  let formattedNumber = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Remove alphabets
  event.target.value = formattedNumber;
});



function isValueValid(value, valueError) {
  let verified = true;

  if (isNaN(value) || value === "" || value <= 0) {
    isValid = false;
    valueError.classList.add("show");
    valueError.innerHTML = "This field is required";
  } else {
    valueError.classList.remove("show");
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

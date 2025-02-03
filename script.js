const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const interestRate = document.getElementById("rate");
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest-only");
const form = document.getElementById("form");
const rateError = document.getElementById("mortgage-rate");

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

  let value = parseInt(event.target.value, 10);

  if (isNaN(value) || value < 1) {
    event.target.value = ""; // Reset to minimum allowed value
  } else if (value > 100) {
    event.target.value = 100; // Reset to maximum allowed value
  }
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

  let isValid =
    isValueValid(loanAmount, loanAmountError) &&
    isValueValid(loanTerm, loanTermError) &&
    isValueValid(rate, rateError);

  if (!isValid) {
    return;
  }

  return { loanAmount, loanTerm, rate };
}

function calculateRepaymentMortgate(loanAmount, loanTerm, rate) {
  if (
    loanAmount === null ||
    loanAmount === undefined ||
    isNaN(loanAmount) ||
    loanAmount <= 0 ||
    loanTerm === null ||
    loanTerm === undefined ||
    isNaN(loanTerm) ||
    loanTerm <= 0 ||
    rate === null ||
    rate === undefined ||
    isNaN(rate) ||
    rate <= 0
  ) {
    console.error(
      "Invalid input: loanAmount, loanTerm, and rate are required."
    );
    return null; // Prevents further execution
  }
  // convert interest rate to monthly
  const r = rate / 100 / 12;

  // calculate number of payments
  const n = loanTerm * 12;

  const mortgage =
    (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return mortgage.toFixed(2);
}

function calculateInterestOnlyMortgage(loanAmount, loanTerm, rate) {
  // Calculate annual interest rate
  const r = rate / 100;
  const mortgage = loanAmount * r * loanTerm;
  return mortgage.toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const validatedInputs = checkValidation();
  let mortgage;

  if (!validatedInputs) {
    return;
  }

  const isRepayment = repayment.checked;
  const isInterestOnly = interestOnly.checked;
  const { loanAmount, loanTerm, rate } = validatedInputs;

  if (isRepayment) {
    mortgage = calculateRepaymentMortgate(loanAmount, loanTerm, rate);
    if (mortgage === null || mortgage === undefined) return;
    resultsComponent(Number(mortgage).toLocaleString());
  } else if (isInterestOnly) {
    mortgage = calculateInterestOnlyMortgage(loanAmount, loanTerm, rate);
    if (mortgage === null || mortgage === undefined) return;
    resultsComponent(Number(mortgage).toLocaleString());
  } else {
    const mortgageTypeError = document.getElementById("mortgage-type");
    mortgageTypeError.classList.add(SHOW_CLASS);
    mortgageTypeError.innerHTML = "This field is required";
  }
});

function resultsComponent(mortgage) {
  const results = document.querySelector(".results");
  results.innerHTML = "";

  results.innerHTML = `
  <div class="completed-result">
    <h2>Your results</h2>
    <p class="result-desc">
      Your results are shown below based on the information you provided.
      To adjust the results, edit the form and click “calculate
      repayments” again.
    </p>
    <div class="result-details">
      <p>Your monthly repayments</p>
      <span class="mnthly-repay">&pound;${mortgage}</span>
      <span class="line"></span>
      <p>Total you'll repay over the term</p>
      <span class="total-repay">&pound;537,322.94</span>
    </div>
  </div>`;
}

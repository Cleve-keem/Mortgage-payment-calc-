const mortgageAmount = document.getElementById("amount");
const mortgageTerm = document.getElementById("term");
const interestRate = document.getElementById("rate");
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest-only");
const form = document.getElementById("form");
const rateError = document.getElementById("mortgage-rate");
const mortgageTypeError = document.getElementById("mortgage-type");
const results = document.querySelector(".results");

const SHOW_CLASS = "show";

function clearError(input) {
  const errorElement =
    input.parentElement.parentElement.querySelector(".error");
  if (errorElement) errorElement.classList.remove(SHOW_CLASS);
}

mortgageAmount.addEventListener("input", (event) => {
  // Remove error indicator on focus
  clearError(event.target);

  // Remove any special char and alphabets expect digits
  event.target.value = event.target.value
    .replace(/[^0-9\.]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// Remove error indicator on focus
mortgageTerm.addEventListener("input", (event) => {
  clearError(event.target);
});

// Remove error indicator on focus
interestRate.addEventListener("input", (event) => {
  clearError(event.target);

  // Interest rate validation: restrict to 1-100
  let value = parseFloat(event.target.value);
  if (isNaN(value) || value < 1) {
    event.target.value = "";
  } else if (value > 100) {
    event.target.value = "100";
  }
});

function isValueValid(value, errorElement) {
  if (isNaN(value) || value === "" || value <= 0) {
    errorElement.classList.add(SHOW_CLASS);
    errorElement.innerHTML = "This field is required";
    // Reset result if any error
    resetResult();
    return false;
  }
  errorElement.classList.remove(SHOW_CLASS);
  errorElement.innerHTML = "";

  return true;
}

function checkValidation() {
  const loanAmount = parseFloat(mortgageAmount.value.replace(/,/g, ""));
  const loanTerm = parseInt(mortgageTerm.value, 10);
  const rate = parseFloat(interestRate.value);

  const loanAmountError = document.getElementById("mortgage-amount");
  const loanTermError = document.getElementById("mortgage-term");

  let isValid =
    isValueValid(loanAmount, loanAmountError) &
    isValueValid(loanTerm, loanTermError) &
    isValueValid(rate, rateError);

  // Check if repayment or interest-only is selected
  if (!repayment.checked && !interestOnly.checked) {
    mortgageTypeError.classList.add(SHOW_CLASS);
    mortgageTypeError.innerHTML = "Please select a mortgage type";
    isValid = false;
  } else {
    mortgageTypeError.classList.remove(SHOW_CLASS);
    mortgageTypeError.innerHTML = "";
  }

  return isValid ? { loanAmount, loanTerm, rate } : null;
}

function calculateRepaymentMortgate(loanAmount, loanTerm, rate) {
  if (!loanAmount || !loanTerm || !rate) {
    return null;
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
  if (!loanAmount || !loanTerm || !rate) {
    return null;
  }
  // Calculate annual interest rate
  return (loanAmount * (rate / 100) * loanTerm).toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const validatedInputs = checkValidation();
  let mortgage;

  if (!validatedInputs) return;

  const { loanAmount, loanTerm, rate } = validatedInputs;

  if (repayment.checked) {
    mortgage = calculateRepaymentMortgate(loanAmount, loanTerm, rate);
  } else if (interestOnly.checked) {
    mortgage = calculateInterestOnlyMortgage(loanAmount, loanTerm, rate);
  }

  if (mortgage !== null) {
    return resultsComponent(mortgage, loanTerm);
  }
});

function resultsComponent(mortgage, loanTerm) {
  results.innerHTML = "";
  const totalRepayment = (Number(mortgage) * loanTerm * 12).toFixed(2);
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
      <span class="mnthly-repay">&pound;${Number(
        mortgage
      ).toLocaleString()}</span>
      <span class="line"></span>
      <p>Total you'll repay over the term</p>
      <span class="total-repay">&pound;${Number(
        totalRepayment
      ).toLocaleString()}</span>
    </div>
  </div>`;
}

function clearAll() {
  mortgageAmount.value = "";
  interestRate.value = "";
  mortgageTerm.value = "";
  repayment.checked = false;
  interestOnly.checked = false;

  // Clear error messages
  document.querySelectorAll(".error").forEach((error) => {
    error.classList.remove(SHOW_CLASS);
    error.innerHTML = "";
  });

  resetResult();
}

function resetResult() {
  results.innerHTML = `
  <div class="empty-result">
    <img
      src="./assets/images/illustration-empty.svg"
      alt="calculators, file and money"
    />

    <h2>Results shown here</h2>
    <p>
      Complete the form and click “calculate repayments” to see what your
      monthly repayments would be.
    </p>
  </div>`;
}

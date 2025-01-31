const mortgageAmount = document.getElementById("amount");

mortgageAmount.addEventListener("input", (event) => {
  let amount = event.target.value.replace(/[^0-9\.]/g, "");
  let formattedNumber = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Remove alphabets
  console.log(formattedNumber);
  event.target.value = formattedNumber;
});

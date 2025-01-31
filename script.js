const mortgageAmount = document.getElementById("amount");

// // function addComma(amount){
// //     let value = amount.replace(/,/g, "");
// //     if(!isNaN(value) && value !== ""){
// //         amount.
// //     }
// // }

// const formatter = new Intl.NumberFormat("en-US");

// mortgageAmount.addEventListener("input", (event) => {
//   let amount = event.target.value.replace(/[^0-9,.]/g, "");
//   if (!isNaN(amount) && amount !== "") {
//     event.target.value = formatter.format(amount);
//   }
//   //   event.target.value = Number(amount).toLocaleString();
// });

mortgageAmount.addEventListener("input", (event) => {
  let value = event.target.value.replace(/,/g, ""); // Remove commas

  if (!value) return; // Ignore empty input

  let number = Number(value);
  if (isNaN(number)) {
    console.warn("Invalid number input!");
    return;
  }

  try {
    event.target.value = new Intl.NumberFormat("en-US").format(number); // Format with commas
  } catch (error) {
    console.error("Formatting error:", error);
  }
});

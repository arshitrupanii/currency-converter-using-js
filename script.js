import { countryList } from "./codes.js";
const BASE_URL = "https://v6.exchangerate-api.com/v6/433f424dbcd5c29b755fb720/latest/USD";

let amount = document.querySelector(".input_amount").value || 1;
let from_curren = document.querySelector(".from select").value;
let to_curren = document.querySelector(".to select").value;
let result_text = document.querySelector(".converter_text").textContent;
let flag = document.querySelectorAll(".flag");


// update value of user input
document.querySelector(".from select").addEventListener("change", function () {
  from_curren = this.value;
  flag[0].src ? flag[0].src = `https://flagsapi.com/${countryList[from_curren]}/flat/64.png` : "";
});

document.querySelector(".to select").addEventListener("change", function () {
  to_curren = this.value;
  flag[1].src ? flag[1].src = `https://flagsapi.com/${countryList[to_curren]}/flat/64.png` : '';
});

document.querySelector(".input_amount").addEventListener("change", function () {
  amount = this.value
});


// add more select options ex USD, INR, etc
Object.entries(countryList).forEach(([key, value]) => {
  const from_option = document.createElement("option");
  from_option.value = key;
  from_option.textContent = key;

  const to_option = document.createElement("option");
  to_option.value = key;
  to_option.textContent = key;

  document.querySelector(".from select").appendChild(from_option);
  document.querySelector(".to select").appendChild(to_option);
});


// Event listener for form submission
document.querySelector("#my_form").addEventListener("submit", async function (event) {
  event.preventDefault();

  let res_text = await fetch(BASE_URL)
    .then(response => response.json())
    .then(data => data.conversion_rates)
    .then(conversion_rates => {
      return result_text = `${(conversion_rates[from_curren] * amount).toFixed(2)} ${from_curren} = ${(conversion_rates[to_curren] * amount).toFixed(2)} ${to_curren}`;
    })
    .catch(error => console.error('Error fetching data:', error));

    document.querySelector(".converter_text").textContent = res_text;
});
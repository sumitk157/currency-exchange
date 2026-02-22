const apiKey = "fd09ce2575fedf3e33114d69";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultBox = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

/* LOAD ALL CURRENCIES */
async function loadCurrencies() {
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
  const data = await res.json();

  data.supported_codes.forEach(c => {
    const o1 = document.createElement("option");
    const o2 = document.createElement("option");

    o1.value = o2.value = c[0];
    o1.textContent = o2.textContent = `${c[0]} - ${c[1]}`;

    fromCurrency.appendChild(o1);
    toCurrency.appendChild(o2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

loadCurrencies();

/* QUICK POWER SET */
function quickSet(code) {
  fromCurrency.value = code;
}

/* CONVERT */
convertBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  if (!amount || amount <= 0) {
    resultBox.classList.remove("hidden");
    resultBox.innerText = "⚠️ Enter valid amount";
    return;
  }

  resultBox.classList.remove("hidden");
  resultBox.innerText = "⏳ Converting...";

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
  );
  const data = await res.json();

  const rate = data.conversion_rates[toCurrency.value];
  const result = (amount * rate).toFixed(2);

  resultBox.innerText =
    `${amount} ${fromCurrency.value} = ${result} ${toCurrency.value}`;
});

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const phoneNumber = "447492379230";

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

function formatMoney(value) {
  return `£${value}`;
}

function updateOrderForm(form) {
  const sizeSelect = form.querySelector(".size-select");
  const vaseSelect = form.querySelector(".vase-select");
  const totalPriceEl = form.querySelector(".total-price");
  const whatsappBtn = form.querySelector(".whatsapp-btn");
  const whatsappChoiceBtn = form.querySelector(".whatsapp-choice-btn");
  const product = form.dataset.product || "Bouquet";

  if (!sizeSelect || !vaseSelect || !totalPriceEl) return;

  const selectedSizeOption = sizeSelect.options[sizeSelect.selectedIndex];
  const selectedVaseOption = vaseSelect.options[vaseSelect.selectedIndex];

  const basePrice = Number(selectedSizeOption.dataset.price || 0);
  const vaseBySize = Number(selectedSizeOption.dataset.vase || 0);

  let vaseExtra = Number(selectedVaseOption.dataset.extra || 0);

  if (selectedVaseOption.value === "Add Vase") {
    vaseExtra = vaseBySize;
  }

  const total = basePrice + vaseExtra;
  totalPriceEl.textContent = formatMoney(total);

  const size = selectedSizeOption.value;
  const vase = selectedVaseOption.value;

  const styleSelect = form.querySelector(".style-select");
  const styleText = styleSelect ? styleSelect.value : null;

  let message = `Hi Mayflower Studio, I'd like to enquire about ${product}. Size: ${size}. Vase: ${vase}. Total: £${total}.`;

  if (styleText) {
    message = `Hi Mayflower Studio, I'd like to enquire about ${product}. Style: ${styleText}. Size: ${size}. Vase: ${vase}. Total: £${total}.`;
  }

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (whatsappBtn) {
    whatsappBtn.href = url;
  }

  if (whatsappChoiceBtn) {
    whatsappChoiceBtn.href = url;
  }
}

document.querySelectorAll(".order-form, .choice-form").forEach((form) => {
  updateOrderForm(form);

  form.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", () => updateOrderForm(form));
  });
});

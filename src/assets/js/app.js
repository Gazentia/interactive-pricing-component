function calcPrice(amtView, unitDate) {
  const rate = 0.16;
  let monthNumber = 1;
  if (unitDate === "month") {
    monthNumber = 1;
  } else if (unitDate === "year") {
    monthNumber = 12;
  }
  return parseFloat(amtView * rate * monthNumber).toFixed(2);
}

function renderPrice(price) {
  const priceServiceElem = document.querySelector("#priceService");
  priceServiceElem.textContent = price;
}

function renderAmountView(amount) {
  const pageViewElem = document.querySelector("#amountpageView");
  pageViewElem.textContent = amount;
}

function renderUnitDate(unit) {
  const unitDateElem = document.querySelector("#unitDate");
  unitDateElem.textContent = unit;
}

function sliderHandler(e) {
  const switchBillDateElem = document.querySelector("#switchBillDate");
  let slider;
  if (!e.target) {
    slider = e;
  } else {
    slider = e.target;
  }

  const gredienStart = parseFloat((slider.value * 100) / slider.max).toFixed(2);
  slider.style.background =
    "linear-gradient(90deg, rgba(16, 213, 194, 0.5) " +
    gredienStart +
    "%, rgba(234, 238, 251,1) 0%)";
  let priceUpdate;
  renderAmountView(slider.value);
  if (switchBillDateElem.checked == true) {
    priceUpdate = calcPrice(slider.value, "year");
    renderPrice(priceUpdate);
    renderUnitDate("year");
  } else {
    priceUpdate = calcPrice(slider.value, "month");
    renderPrice(priceUpdate);
    renderUnitDate("month");
  }
}

function checkboxHandler(e) {
  const viewAmtSliderElem = document.querySelector("#viewAmtValue");
  let checkbox;
  if (!e.target) {
    checkbox = e;
  } else {
    checkbox = e.target;
  }
  let priceUpdate;
  const amtView = viewAmtSliderElem.value;
  if (checkbox.checked == true) {
    priceUpdate = calcPrice(amtView, "year");
    renderPrice(priceUpdate);
    renderUnitDate("year");
  } else {
    priceUpdate = calcPrice(amtView, "month");
    renderPrice(priceUpdate);
    renderUnitDate("month");
  }
}

function init() {
  const sliderElems = document.querySelectorAll(".form__slider");
  const switchBillDateElem = document.querySelector("#switchBillDate");
  const viewAmtSliderElem = document.querySelector("#viewAmtValue");

  if (sliderElems.length > 0) {
    sliderElems.forEach((x) => {
      x.addEventListener("input", sliderHandler);
    });
  }

  if (switchBillDateElem) {
    switchBillDateElem.addEventListener("click", checkboxHandler);
  }

  if (viewAmtSliderElem) {
    renderAmountView(viewAmtSliderElem.value);
    sliderHandler(viewAmtSliderElem);
  }
}

init();

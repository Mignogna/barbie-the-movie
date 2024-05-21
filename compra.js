
/*Passo 1*/
let radioBtns = document.querySelectorAll("input[name='address']");
let result = document.getElementById("address-chosen");
let chosenAddress = 0;

radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    chosenAddress = e.target.value;
    result.textContent = `${chosenAddress}`;
  });
});
let datePicker = document.getElementById("date");
let dateChosen = document.getElementById("date-scheduled");
let schedule = document.getElementById("schedule");

function handleDateChange() {
  const datePicker = document.getElementById("date").value;
  dateChosen.textContent = `${changeFormatDate(datePicker)}`;
}
function changeFormatDate(val) {
  let myArray = val.split("-");
  let year = myArray[0];
  let mounth = myArray[1];
  let day = myArray[2];
  let formatedDate = day + "-" + mounth + "-" + year;
  return formatedDate;
}

let sessionBtns = document.querySelectorAll("input[name='session']");
let resultSession = document.getElementById("session-chosen");
let chosenSession = 0;

sessionBtns.forEach((sessionBtn) => {
  sessionBtn.addEventListener("change", (e) => {
    sessionChoose = e.target.value;
    resultSession.textContent = `${sessionChoose}`;
  });
});

const btn16 = document.getElementById("btn16");
const btn18 = document.getElementById("btn18");
const btn21 = document.getElementById("btn21");

btn16.addEventListener("click", () => {
  btn16.style.backgroundColor = "rgb(255, 174, 201)";
  btn18.style.backgroundColor = "transparent";
  btn21.style.backgroundColor = "transparent";
});

btn18.addEventListener("click", () => {
  btn18.style.backgroundColor = "rgb(255, 174, 201)";
  btn16.style.backgroundColor = "transparent";
  btn21.style.backgroundColor = "transparent";
});

btn21.addEventListener("click", () => {
  btn21.style.backgroundColor = "rgb(255, 174, 201)";
  btn16.style.backgroundColor = "transparent";
  btn18.style.backgroundColor = "transparent";
});

const sessionForm = document.getElementById("choose-session");
const sessionFields = document.getElementsByClassName("session-required");
const sessionSpan = document.getElementsByClassName("session-span-required");
const btnSubmit1 = document.getElementById("forward");

sessionForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  validatingAddress();
  validatingDate();
  validatingTime();
});

function setSessionError(index) {
  sessionSpan[index].style.display = "block";
  btnSubmit1.style.cursor = "not-allowed";
}

function removeSessionError(index) {
  sessionSpan[index].style.display = "none";
  btnSubmit1.style.cursor = "pointer";
}

function validatingAddress() {
  const address1 = document.getElementById("address1");
  const address2 = document.getElementById("address2");
  if (address1.checked || address2.checked) {
    removeSessionError(0);
  } else {
    setSessionError(0);
  }
}

function validatingDate() {
  const date = document.getElementById("date");
  if (date.value !== "") {
    removeSessionError(1);
  } else {
    setSessionError(1);
  }
}

function validatingTime() {
  let valid = false;
  let timeBtn = document.querySelectorAll("input[name='session']");
  for (let i = 0; i < timeBtn.length; i++) {
    if (timeBtn[i].checked) {
      valid = true;
      break;
    }
  }
  if (valid) {
    removeSessionError(2);
  } else {
    setSessionError(2);
  }
}

/*Passo 2*/

const totalPurchaseElement = document.getElementById("total-price");
const ticketPrice = 50;
let totalPurchaseValue = 0;
let selectedSeats = [];

function selectSeat(seat) {
  const seatSelected = seat;
  if (seatSelected.classList.contains("ocupied")) {
    return;
  }
  if (seatSelected.classList.contains("selected")) {
    seatSelected.classList.remove("selected");
    selectedSeats = selectedSeats.filter((id) => id !== seatSelected.id);
    totalPurchaseValue = selectedSeats.length * ticketPrice;
    updatePrice();
    return;
  }
  seatSelected.classList.add("selected");
  selectedSeats.push(seatSelected.id);
  totalPurchaseValue = selectedSeats.length * ticketPrice;
  updatePrice();
}

function updatePrice() {
  totalPurchaseElement.innerText = `R$ ${totalPurchaseValue},00`;
}

function finalizePurchase() {
  if (selectedSeats.length === 0) {
    document.getElementById("warning").style.display = "block";
  }
  if (selectedSeats.length >= 1) {
    document.getElementById("warning").style.display = "none";
  }

  for (const id of selectedSeats) {
    const purchasedSeat = document.getElementById(id);
    purchasedSeat.classList.remove("selected");
    purchasedSeat.classList.add("ocupied");
    document.getElementById("n-assento").textContent = `${selectedSeats}`;
  }
  selectedSeats = [];
  updatePrice();
}

/*Passo 3*/
const form = document.getElementById("finalizar-compra");
const fields = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const celRegex = /\(\d\d\)\s\d\d\d\d\d-\d\d\d\d/;
const btnSubmit3 = document.getElementById("finalizar");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validatingName();
  validatingEmail();
  validatingCelPhone();
  validatingPayment();
  numTickets();
  printTicket();
});

function setError(index) {
  spans[index].style.display = "block";
  btnSubmit3.style.cursor = "not-allowed";
}

function removeError(index) {
  spans[index].style.display = "none";
  btnSubmit3.style.cursor = "pointer";
}

function validatingName() {
  const name = document.getElementById("name");
  let nameValue = name.value;
  const customerName = document.getElementById("written-name");
  customerName.textContent = nameValue;
  if (fields[0].value.length !== 0) {
    removeError(0);
  } else {
    setError(0);
  }
}

function validatingEmail() {
  const email = document.getElementById("email");
  if (emailRegex.test(fields[1].value)) {
    removeError(1);
  } else {
    setError(1);
  }
}

function validatingCelPhone() {
  const cel = document.getElementById("cel");
  if (celRegex.test(fields[2].value)) {
    removeError(2);
  } else {
    setError(2);
  }
}

function validatingPayment() {
  const payment1 = document.getElementById("pix-check");
  const payment2 = document.getElementById("credit-card-check");
  if (payment1.checked || payment2.checked) {
    removeError(3);
  } else {
    setError(3);
  }
}
function numTickets() {
  let x = Math.floor(Math.random() * 10000) + 1;
  let numTicket = document.getElementById("num-ticket");
  numTicket.textContent = x;
}

let nameValue = document.getElementById("written-name");
let addressTicket = document.getElementById("address-chosen");
let dateTicket = document.getElementById("date-scheduled");
let timeTicket = document.getElementById("session-chosen");
let seatNumTicket = document.getElementById("n-assento");
let numTicket = document.getElementById("num-ticket");

function printTicket() {
  const ticket = document.getElementById("ticket-container");
  const elementDiv = document.createElement("div");
  let eTicket = `<div class="ticket">
  <h2>Ingresso comprado</h2><br>
  <p style="text-transform: capitalize">Olá<b> ${nameValue.textContent}</b></p>
  <p>Tudo pronto para você assistir ao filme mais esperado do ano.</p>
  <p>Estes são os dados do seu bilhete:</p>
  <p>Endereço: <i>${addressTicket.textContent}</i></p>
  <p>Data: <i>${dateTicket.textContent}</i></p>
  <p>Sessão: <i>${timeTicket.textContent}</i></p>
  <p>Poltrona(s): <i>${seatNumTicket.textContent}</i></p>
  <p>Número do bilhete: <i>${numTicket.textContent}</i></p><br>
  <h3>Bom divertimento!</h3>
  </div>`;
  elementDiv.innerHTML = eTicket;
  localStorage.setItem("elementDiv", eTicket);
  window.location.href = window.location.origin + "/ingresso.html";
}

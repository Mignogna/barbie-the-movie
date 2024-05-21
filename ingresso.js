function printEticket() {
  const finalEticket = document.getElementById("ticket-container");
  finalEticket.innerHTML = localStorage.getItem("elementDiv");
  finalEticket.classList.add("ticket");

  localStorage.removeItem("elementDiv");
}
printEticket();

function removeMessage() {
  const message = (document.getElementById("tkt-msg").style.display = "none");
}

const viewBtn = document
  .getElementById("view-tkt")
  .addEventListener("click", removeMessage);

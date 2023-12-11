const form = document.querySelector("#shopping-form");
const listBody = document.querySelector("#shopping-list-body");
const totalElement = document.querySelector("#total");
const exportPdfBtn = document.querySelector("#export-pdf-btn"); 

let total = 0;

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const itemName = document.querySelector("#item-name").value;
  const itemQuantity = parseInt(document.querySelector("#item-quantity").value);
  const itemPrice = parseFloat(document.querySelector("#item-price").value);

  const row = document.createElement("tr");
  const itemColumn = document.createElement("td");
  itemColumn.innerText = itemName;
  const quantityColumn = document.createElement("td");
  quantityColumn.innerText = itemQuantity;
  const priceColumn = document.createElement("td");
  priceColumn.innerText = itemPrice.toFixed(2);
  const totalColumn = document.createElement("td");
  totalColumn.innerText = (itemQuantity * itemPrice).toFixed(2);

  const removeColumn = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.innerText = "X"; 
  removeButton.classList.add("remove-item-btn");
  removeButton.addEventListener("click", function() {
    removeItem(row, parseFloat(totalColumn.innerText));
  });
  removeColumn.appendChild(removeButton);

  row.appendChild(itemColumn);
  row.appendChild(quantityColumn);
  row.appendChild(priceColumn);
  row.appendChild(totalColumn);
  row.appendChild(removeColumn);

  listBody.appendChild(row);

  total += itemQuantity * itemPrice;
  totalElement.innerText = total.toFixed(2);

  form.reset();
});

function removeItem(row, itemTotal) {
  listBody.removeChild(row);
  total -= itemTotal;
  totalElement.innerText = total.toFixed(2);
}

exportPdfBtn.addEventListener("click", function() {
  const jsPDF = window.jspdf.jsPDF;

  const pdf = new jsPDF();

  pdf.text("Lista de Compras", 10, 10);

  let y = 30;
  const rows = document.querySelectorAll("#shopping-list-body tr");
  rows.forEach(row => {
    const columns = row.querySelectorAll("td");
    pdf.text(columns[0].innerText, 10, y);
    pdf.text(columns[1].innerText, 60, y);
    pdf.text(columns[2].innerText, 100, y);
    pdf.text(columns[3].innerText, 140, y);
    y += 10;
  });

  y += 10;
  pdf.text(`Total pago: R$ ${total.toFixed(2)}`, 10, y);

  pdf.save("lista_de_compras.pdf");
});

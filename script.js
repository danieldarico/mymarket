// Selecionamos o formulário de compras pelo seu ID
const form = document.querySelector("#shopping-form");

// Selecionamos o corpo da lista de compras pelo seu ID
const listBody = document.querySelector("#shopping-list-body");

// Selecionamos o elemento que mostrará o total pelo seu ID
const totalElement = document.querySelector("#total");

// Variável que armazenará o valor total
let total = 0;

// Adicionamos um evento de submit ao formulário de compras
form.addEventListener("submit", function(event) {
  // Previnimos o comportamento padrão do submit
  event.preventDefault();

  // Selecionamos o nome do item pelo seu ID
  const itemName = document.querySelector("#item-name").value;

  // Selecionamos a quantidade do item pelo seu ID e a convertemos para inteiro
  const itemQuantity = parseInt(document.querySelector("#item-quantity").value);

  // Selecionamos o preço do item pelo seu ID e a convertemos para float
  const itemPrice = parseFloat(document.querySelector("#item-price").value);

  // Criamos uma linha (row) da tabela
  const row = document.createElement("tr");

  // Criamos a coluna do nome do item
  const itemColumn = document.createElement("td");
  itemColumn.innerText = itemName;

  // Criamos a coluna da quantidade do item
  const quantityColumn = document.createElement("td");
  quantityColumn.innerText = itemQuantity;

  // Criamos a coluna do preço do item
  const priceColumn = document.createElement("td");
  priceColumn.innerText = itemPrice.toFixed(2);

  // Criamos a coluna do total (quantidade x preço)
  const totalColumn = document.createElement("td");
  totalColumn.innerText = (itemQuantity * itemPrice).toFixed(2);

  // Adicionamos as colunas à linha (row)
  row.appendChild(itemColumn);
  row.appendChild(quantityColumn);
  row.appendChild(priceColumn);
  row.appendChild(totalColumn);

  // Adicionamos a linha (row) ao corpo da lista de compras
  listBody.appendChild(row);

  // Atualizamos o valor total (adicionamos o valor da linha (quantidade x preço))
  total += itemQuantity * itemPrice;
  totalElement.innerText = total.toFixed(2);

  // Limpamos o formulário
  form.reset();
});

// Remove o último item da lista de compras
const removeLastItemBtn = document.querySelector("#remove-last-item-btn");
removeLastItemBtn.addEventListener("click", function() {
  const shoppingListBody = document.querySelector("#shopping-list-body");
  const lastRow = shoppingListBody.lastChild;
  const lastTotal = parseFloat(lastRow.lastChild.innerText);

  // Remove a última linha da tabela
  shoppingListBody.removeChild(lastRow);

  // Atualiza o total
  total -= lastTotal;
  totalElement.innerText = total.toFixed(2);
});
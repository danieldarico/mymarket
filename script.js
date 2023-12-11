// Seleciona os elementos HTML relevantes usando seus IDs
const form = document.querySelector("#shopping-form");
const listBody = document.querySelector("#shopping-list-body");
const totalElement = document.querySelector("#total");
const exportPdfBtn = document.querySelector("#export-pdf-btn"); // Botão de exportação em PDF

// Inicializa a variável para armazenar o valor total
let total = 0;

// Adiciona um evento de "submit" ao formulário para adicionar itens à lista
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o comportamento padrão do envio do formulário

  // Captura os valores dos campos do formulário
  const itemName = document.querySelector("#item-name").value;
  const itemQuantity = parseInt(document.querySelector("#item-quantity").value);
  const itemPrice = parseFloat(document.querySelector("#item-price").value);

  // Cria as colunas da linha da tabela para exibir os detalhes do item
  const row = document.createElement("tr");
  const itemColumn = document.createElement("td");
  itemColumn.innerText = itemName;
  const quantityColumn = document.createElement("td");
  quantityColumn.innerText = itemQuantity;
  const priceColumn = document.createElement("td");
  priceColumn.innerText = itemPrice.toFixed(2);
  const totalColumn = document.createElement("td");
  totalColumn.innerText = (itemQuantity * itemPrice).toFixed(2);

  // Cria a coluna para o botão de remover
  const removeColumn = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.innerText = "X"; // "X" vermelho para remover
  removeButton.classList.add("remove-item-btn");
  removeButton.addEventListener("click", function() {
    removeItem(row, parseFloat(totalColumn.innerText));
  });
  removeColumn.appendChild(removeButton);

  // Adiciona as colunas à linha
  row.appendChild(itemColumn);
  row.appendChild(quantityColumn);
  row.appendChild(priceColumn);
  row.appendChild(totalColumn);
  row.appendChild(removeColumn);

  // Adiciona a linha ao corpo da lista de compras
  listBody.appendChild(row);

  // Atualiza o valor total e exibe na tabela
  total += itemQuantity * itemPrice;
  totalElement.innerText = total.toFixed(2);

  // Limpa o formulário
  form.reset();
});

// Função para remover um item da lista
function removeItem(row, itemTotal) {
  listBody.removeChild(row);
  total -= itemTotal;
  totalElement.innerText = total.toFixed(2);
}

// Adiciona um evento de clique para exportar a lista em PDF
exportPdfBtn.addEventListener("click", function() {
  // Importa a biblioteca jsPDF
  const jsPDF = window.jspdf.jsPDF;

  // Cria uma instância do objeto jsPDF
  const pdf = new jsPDF();

  // Define o título do documento PDF
  pdf.text("Lista de Compras", 10, 10);

  // Itera sobre as linhas da tabela e adiciona os itens ao PDF
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

  // Adiciona o valor total pago no final do PDF
  y += 10;
  pdf.text(`Total pago: R$ ${total.toFixed(2)}`, 10, y);

  // Salva o PDF com o nome "lista_de_compras.pdf"
  pdf.save("lista_de_compras.pdf");
});

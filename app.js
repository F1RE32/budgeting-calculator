let totalBudget = 0;
const expenses = [];

function yourbudget() {
    totalBudget = parseFloat(document.getElementById("bdgt").value);
    remainingamount();
}

function expenseinfo() {
    const dc = document.getElementById("dsc").value;
    const at = parseFloat(document.getElementById("amt").value);
    const dt = document.getElementById("date").value;
    const expense = { dc, at, dt };
    expenses.push(expense);

    displayexpenses();
    remainingamount();

    document.getElementById("dsc").value = "";
    document.getElementById("amt").value = "";
    document.getElementById("date").value = "";
}

function displayexpenses() {
    const tableBody = document.getElementById("expense_show");
    tableBody.innerHTML = "";

    expenses.forEach(function (expense, index) {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.dc;
        row.appendChild(descriptionCell);

        const amountCell = document.createElement("td");
        amountCell.textContent = "Rs" + expense.at;
        row.appendChild(amountCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.dt;
        row.appendChild(dateCell);

        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editExpense(index);
        });
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteExpense(index);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

function editExpense(index) {
    const expense = expenses[index];

    if (expense) {
        const updatedDescription = prompt("Enter updated description:", expense.dc);
        const updatedAmount = parseFloat(prompt("Enter updated amount:", expense.at));
        const updatedDate = prompt("Enter updated date:", expense.dt);

        if (updatedDescription && !isNaN(updatedAmount) && updatedDate) {
            expense.dc = updatedDescription;
            expense.at = updatedAmount;
            expense.dt = updatedDate;

            displayexpenses();
            remainingamount();
        }
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayexpenses();
    remainingamount();
}

function remainingamount() {
    const totalExpenses = expenses.reduce(function (sum, expense) {
        return sum + expense.at;
    }, 0);
    const finalbudget = totalBudget - totalExpenses;
    document.getElementById("finalbdgt").textContent = finalbudget;
        if (finalbudget<0) {
        alert("BUDGET OUT OF RANGE   Please delete the last entered budget or edit it")
    }
}

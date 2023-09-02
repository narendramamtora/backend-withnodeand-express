const baseUrl = 'http://localhost:3000/expense';


function Storedata(event) {
  event.preventDefault();
  console.log('Submit button clicked');
  let submitDescrip = document.getElementById('descrip').value;
  let select = document.getElementById('select').value;
  let expense = document.getElementById('expense').value;
  console.log('Form values:', submitDescrip, select, expense);

  let obj = {
    descrip: submitDescrip,
    mselect: select,
    expense: expense
  };
  let obj1 = {
    description: submitDescrip,
    select: select,
    expamount: expense
  };


  // Display the new expense on the screen
  showExpenseOnScreen(obj1);

  axios
    .post(`${baseUrl}/add-expense`, obj)
    .then((response) => {
      console.log('POST request successful:', response.data);

      document.getElementById('descrip').value = '';
      document.getElementById('select').value = '';
      document.getElementById('expense').value = '';
      })
    .catch((err) => {
      console.log('POST request error:', err);
    });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${baseUrl}/all-expenses`)
    .then((res) => {
      console.log(res);
      for (const expense of res.data) {
        showExpenseOnScreen(expense);
       // console.log(expense)
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showExpenseOnScreen(obj) {

  const expensesList = document.getElementById("my-form");
  const listItem = document.createElement("li");
    listItem.textContent = `${obj.description}-${obj.expamount}-${obj.select}`;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios
      .delete(
        `${baseUrl}/delete-expense/${obj.id}`
      )
      .then(() => {
        console.log('expense deleted successfully'); 
        expensesList.removeChild(listItem);
      })
      .catch((err) => console.log(err));
  };
  
  const EditButton = document.createElement("input");
  EditButton.type = "button";
  EditButton.value = "Edit";
  EditButton.onclick = () => {

    
    document.getElementById("descrip").value = obj.description;
    document.getElementById("select").value = obj.select;
    document.getElementById("expense").value = obj.expamount;
    axios
    .delete(
      `${baseUrl}/delete-expense/${obj.id}`
    )
    .then((res) => {
      console.log(' edited successfully'); 
      expensesList.removeChild(listItem);
    })
    .catch((err) => console.log(err));
  };

  listItem.appendChild(deleteButton);
  listItem.appendChild(EditButton);
  expensesList.appendChild(listItem);
}

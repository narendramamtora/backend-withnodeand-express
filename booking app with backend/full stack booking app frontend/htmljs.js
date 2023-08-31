const baseUrl = 'http://localhost:3000/user';

function Storedata(event) {
  event.preventDefault();
  console.log('Submit button clicked');
  let submitName = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let number = document.getElementById('number').value;
  console.log('Form values:', submitName, email, number);

  let obj = {
    name: submitName,
    email: email,
    number: number
  };

  // Display the new user on the screen
  showUserOnScreen(obj);

  axios
    .post('http://localhost:3000/user/add-user', obj)
    .then((response) => {
      console.log('POST request successful:', response.data);
      // You can update the user entry on the screen with additional information if needed
    })
    .catch((err) => {
      console.log('POST request error:', err);
    });
}


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${baseUrl}/all-users`)
    .then((res) => {
      console.log(res);
      for (const user of res.data) {
        showUserOnScreen(user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showUserOnScreen(obj) {
  const parentElement = document.getElementById("my-form");
  const childElement = document.createElement("li");
  childElement.textContent = `${obj.name}-${obj.number}-${obj.email}   `;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios
      .delete(
        `${baseUrl}/delete-user/${obj.id}`
      )
      .then(() => {
        console.log('User deleted successfully'); 
        parentElement.removeChild(childElement);
      })
      .catch((err) => console.log(err));
  };
  
  const EditButton = document.createElement("input");
  EditButton.type = "button";
  EditButton.value = "Edit";
  EditButton.onclick = () => {
    document.getElementById("name").value = obj.name;
    document.getElementById("email").value = obj.email;
    document.getElementById("number").value = obj.number;
    axios
      .delete(
        `${baseUrl}/delete-user/${obj.id}`
      )
      .then((res) => {
        console.log('User edited successfully'); 
        parentElement.removeChild(childElement);
      })
      .catch((err) => console.log(err));
  };

  childElement.appendChild(deleteButton);
  childElement.appendChild(EditButton);
  parentElement.appendChild(childElement);
}

const addUserBtn = document.getElementById("add_task");
const btnText = addUserBtn.innerHTML;
const userTextField = document.getElementById("input_task");
const recordsDisplay = document.getElementById("tasks");

let userArray = [];

let editId = null;

let objStr = localStorage.getItem("users");

if (objStr != null) {
  userArray = JSON.parse(objStr);
}

//displayInfo();
addUserBtn.onclick = () => {
  //get user's task from text field
  const textValue = userTextField.value;
  const task = textValue.trim();
  if (task === "") {
    alert("Write Something in Input field 👇");
    userTextField.value = "";
    userTextField.focus();
    
  } else if (editId != null) {
    //edit action
    userArray.splice(editId, 1, {
      task: task,
    });
    editId = null;
  } else {
    //insert action
    userArray.push({
      task: task,
    });
  }

  saveInfo(userArray);
  userTextField.value = "";
  addUserBtn.innerHTML = btnText;
};

// store user's task in local storage
function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  displayInfo();
  userTextField.focus();
}

// display user's task
function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `
         
         <div>
         <span>${
           i + 1
         }</span> <input type="text" id="tasklist" class="tasklist" readonly="readonly"  value="${
      user.task
    }">
        <button type="submit" id="edit_button" class="btn" onclick='editInfo(${i})'><i class="fa-regular fa-pen-to-square"></i> Edit</button>
        <button type="submit" id="delete_button" class="btn" onclick='deleteInfo(${i})'><i class="fa-solid fa-trash-can"></i> Delete</button></div>`;
  });
  recordsDisplay.innerHTML = statement;
}displayInfo();

// edit user's task
function editInfo(id) {
  editId = id;
  userTextField.value = userArray[id].task;
  userTextField.focus();
  addUserBtn.innerHTML = `<i class="fas fa-save"></i>Save Changes`;
  
}

//delete user's task
function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
}
// Key press event for Enter
userTextField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addUserBtn.click();
  }
});

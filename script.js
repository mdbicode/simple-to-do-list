// Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const dayTime = document.getElementById('day');
const monthTime = document.getElementById('month');
const tasks = document.getElementById('tasks');
const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const sumTask = document.getElementById('tasks');
const sufiks = (number) =>{
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
        case 1:
        return "st";
        case 2:
        return "nd";
        case 3:
        return "rd";
        default:
        return "th";
    }
} 
const statusObj = [];
const taskObj = [
    ["Read a Book","9:00 PM"],
    ["Sleep","10:00 PM"],
]
const content = document.querySelector('.content');


function addRows(data) {
    content.innerHTML = '';
    data.forEach(e => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const task = document.createElement('p');
        task.className = 'task';
        task.innerHTML = e[0]

        const deadLine = document.createElement('p');
        deadLine.innerHTML = e[1]
        deadLine.className = 'deadline';

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "X";
        deleteButton.className = 'delete-button';
        

        rowDiv.appendChild(checkbox);
        rowDiv.appendChild(task);
        rowDiv.appendChild(deadLine);
        rowDiv.appendChild(deleteButton);

        content.appendChild(rowDiv);
        
    });
}

addRows(taskObj);

dayTime.innerHTML = `${days[date.getDay()]}, ${date.getDate()}${sufiks(date.getDate())}`;

monthTime.innerHTML = months[date.getMonth()];

const form = document.querySelector('form');
const inputData = form.getElementsByClassName('input-data');

form.addEventListener('submit',function(e){
    e.preventDefault();
    modal.style.display = "none";
    newTask()

});


function newTask(){
    const task = inputData[0].querySelector('input').value;
    const hour = inputData[1].querySelector('input').value;
    const minutes = inputData[2].querySelector('input').value;
    const selectedIndex = inputData[3].selectedIndex;
    const selectedOption = inputData[3].options[selectedIndex];
    const format = selectedOption.text;
    const deadLine = `${hour}:${minutes} ${format}`;

    taskObj.push([task,deadLine]);
    addRows(taskObj);
    form.reset();
    checkStatus = document.querySelectorAll('input[type=checkbox]');
    addCheckboxEventListeners();
    statusFunction();
    actionDeleteButton();
}



function ChangeStatus(e){
    const row = e.target;
    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    const index = checkboxes.indexOf(row);
    
    if(row.checked){
        statusObj.push(index);
        statusFunction();
        
    }else{
        const idx = statusObj.indexOf(index);
        if(idx > -1){
            statusObj.splice(idx,1);
        }
        statusFunction();
        row.checked = false;
        row.parentElement.style.textDecoration = "none";
        sumTask.innerHTML = `${taskObj.length-statusObj.length} Tasks`;
    }
}

function statusFunction(){
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    statusObj.forEach(e => {
        if(statusObj){
            checkboxes[e].checked = true;
            checkboxes[e].parentElement.style.textDecoration = "line-through";
            sumTask.innerHTML = `${taskObj.length-statusObj.length} Tasks`;
        }
    });
}


function addCheckboxEventListeners() {
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        checkbox.addEventListener('change', ChangeStatus);
        
    }); 
}

function actionDeleteButton(){
    const buttonDel = document.querySelectorAll('.delete-button');
    buttonDel.forEach(button => {
        button.addEventListener('click', function(e){
            const button = e.target;
            const row = button.closest('.row');
            const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
            const index = checkboxes.indexOf(row.querySelector('input[type=checkbox]'));

            if (index > -1) {
                taskObj.splice(index, 1);
                const statusIndex = statusObj.indexOf(index);
                if (statusIndex > -1) {
                    statusObj.splice(statusIndex, 1);
                }

                row.remove();
                statusFunction();
            }else {
                console.error('Checkbox tidak ditemukan di array checkboxes.');
            }
        });
    });
}

actionDeleteButton()
addCheckboxEventListeners()
sumTask.innerHTML = `${taskObj.length-statusObj.length} Tasks`;
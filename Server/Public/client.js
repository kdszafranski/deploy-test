$(document).ready(readyNow);

function readyNow(){
    console.log("ready for anything")
    getTasks();
    $('#addTaskButton').on('click', addTask);
    $('#tasksList').on('click', '.deleteButton', deleteTask)
}

function getTasks(){
$.ajax({
    method: "GET",
    url: "/tasks"
}).then((data) => {
    console.log(data);
    displayTasks(data);
})
.catch((error)=> {
    console.log('error:', error)
})
}

function displayTasks(data){
    console.log('in display tasks');
    let task = data.task;
    let dueDate = data.date;
    let status = data.status;

    for (i=0;i<data.length;i++){
        $('#tasksList').append(
            `<li>
            ${data[i].task}
            ${data[i].date}
            ${data[i].status}
            <button class="deleteButton" data-id=${data[i].id}>Delete Task</button> 
            <label for="markComplete">Mark Complete:</label>
            <input type="checkbox" "class="markComplete" data-id=${data[i].id} value="Complete"> 
            </li>`
        )
    }
}



function addTask(){
let task = $('#taskInput').val();
let date = $('#date').val();
let status = "Incomplete";

$.ajax({
    method: "POST",
    url:"/tasks",
    data: 
    {
        task: task,
        date: date,
        status: status

    }
}).then((response) => {
    console.log('response:', response)
    getTasks();
}).catch((error)=> {
    console.log('Post failed', error)
})
}

function deleteTask(){
    let id = $(this).data('id')
    console.log('id:', id)

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`    
    }).then((response) => {
        console.log('response:', response);
    }).catch((error)=> {
        console.log('Delete error:', error);
    })
}
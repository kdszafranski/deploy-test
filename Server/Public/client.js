$(document).ready(readyNow);

function readyNow(){
    console.log("ready for anything")
    getTasks();
    $('#addTaskButton').on('click', addTask);
    $('#tasksList').on('click', '.deleteButton', deleteTask)
    $('#tasksList').on('click', 'input[type="checkbox"]', completeTask); 
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
    $('#tasksList').empty();

    let task = data.task;
    let dueDate = data.date;
    let status = data.status;

        for (i=0;i<data.length;i++){
            if (data[i].status == 'Incomplete'){
            $('#tasksList').append(`
                <tr id="incomplete">
                    <td>${data[i].task}</td>
                    <td>${data[i].date}</td>
                    <td>${data[i].status}</td>
                    <td><button class="deleteButton" data-id=${data[i].id}>Delete</button></td> 
                    <td><input type="checkbox" data-id=${data[i].id}></td> 
                </tr>`
            )
        }
            else if (data[i].status == 'Complete') {
                $('#tasksList').append(`
                    <tr id="complete">
                        <td>${data[i].task}</td>
                        <td>${data[i].date}</td>
                        <td>${data[i].status}</td>
                        <td><button class="deleteButton" data-id=${data[i].id}>Delete</button></td>
                        <td><input type="checkbox" data-id=${data[i].id} checked></td> 
                    </tr>`
                )
            }
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
    let task = $('#taskInput').val('');
    let date = $('#date').val('');
}).catch((error)=> {
    console.log('Post failed', error)
})
}

function deleteTask(){
    let id = $(this).data('id');
    console.log('id:', id);

    $.ajax({
        method: "DELETE",
        url: `/tasks/${id}`    
    }).then((response) => {
        console.log('response:', response);
        getTasks();
    }).catch((error)=> {
        console.log('Delete', error);
    })
}


function completeTask(){

    let task = $(this).data('id')

    if ($(this).prop("checked") == true) {
        console.log("Checkbox is checked.");

        $.ajax({
            method: "PUT",
            url: `/tasks/complete/${task}`
        }).then((response) => {
            console.log("Successful PUT request", response)
            getTasks();
        }).catch((error) => {
            console.log("PUT request failure.", error)
        })
    }
    else if ($(this).prop("checked") == false) {
        console.log("Checkbox is unchecked.");

        $.ajax({
            method: "PUT",
            url: `/tasks/incomplete/${task}`
        }).then((response) => {
            console.log("Successful PUT request", response)
            getTasks();
        }).catch((error)=> {
            console.log("PUT request failure.", error)
        })
    }
}



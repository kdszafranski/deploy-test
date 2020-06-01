$(document).ready(readyNow);

function readyNow(){

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
        console.log('GET request successful');
        displayTasks(data);
    })
    .catch((error)=> {
        console.log('GET request failure', error)
    })
    }

function displayTasks(data){

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
    console.log('POST request response:', response)
    getTasks();
    let task = $('#taskInput').val('');
    let date = $('#date').val('');
}).catch((error)=> {
    console.log('Post request failed', error)
})
}

function deleteTask(){

    let id = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: `/tasks/${id}`    
    }).then((response) => {
        console.log('DELETE request response:', response);
        getTasks();
    }).catch((error)=> {
        console.log('DELETE request failed', error);
    })
}


function completeTask(){

    let task = $(this).data('id')

    if ($(this).prop("checked") == true) {

        $.ajax({
            method: "PUT",
            url: `/tasks/complete/${task}`
        }).then((response) => {
            console.log("Successful PUT request", response)
            getTasks();
        }).catch((error) => {
            console.log("PUT request failed", error)
        })
    }

    else if ($(this).prop("checked") == false) {

        $.ajax({
            method: "PUT",
            url: `/tasks/incomplete/${task}`
        }).then((response) => {
            console.log("Successful PUT request", response)
            getTasks();
        }).catch((error)=> {
            console.log("PUT request failed", error)
        })
    }
}



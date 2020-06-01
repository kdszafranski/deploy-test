// specifying function to run on page load
$(document).ready(readyNow);



// on page load the following function is run
function readyNow(){

// on page load getTasks function is run to request data for later appending to DOM
    getTasks();

// event listeners added to buttons and checkbox
    $('#addTaskButton').on('click', addTask);
    $('#tasksList').on('click', '.deleteButton', deleteTask)
    $('#tasksList').on('click', 'input[type="checkbox"]', completeTask); 
}



// function to request data from server
function getTasks(){

// GET request sent to server for all database data
    $.ajax({
        method: "GET",
        url: "/tasks"
    }).then((data) => {
        console.log('GET request successful');
        // function is called with data recieved from server
        displayTasks(data);
    })
    .catch((error)=> {
        console.log('GET request failure', error)
    })
    }


// function for appending data to the DOM
function displayTasks(data){

    // before data is appended to DOM, container is emptied to avoid redundancy
    $('#tasksList').empty();

    // looping through data and appending each objects pertinent data to a table on DOM
    // conditional added to allow styling differences between incomplete and complete tasks
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



// function pulls data from the client and sends it to the server
function addTask(){

// pulling data from client inputs
let task = $('#taskInput').val();
let date = $('#date').val();
let status = "Incomplete";

// data is sent to server
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
    // getTasks function is called again to update the DOM with new data
    getTasks();
    // input values are cleared - ready again for new submissions
    let task = $('#taskInput').val('');
    let date = $('#date').val('');
}).catch((error)=> {
    console.log('Post request failed', error)
})
}


// function allows tasks on DOM and in database to be deleted by sending DELETE request to the server
function deleteTask(){

    // targeting the specific data for deletion
    let id = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: `/tasks/${id}`    
    }).then((response) => {
        console.log('DELETE request response:', response);
        // getTasks function called again to reflect deletion on DOM
        getTasks();
    }).catch((error)=> {
        console.log('DELETE request failed', error);
    })
}


// function allows the status of a task to be changed with the selection of a checkbox
function completeTask(){

    // targeting the specific object id to be updated
    let task = $(this).data('id')

    // conditional added so that status can be toggled based on current status
    if ($(this).prop("checked") == true) {

        $.ajax({
            method: "PUT",
            url: `/tasks/complete/${task}`
        }).then((response) => {
            console.log("Successful PUT request", response)
            // getTasks function called again to reflect update on DOM
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
            // getTasks function called again to reflect update on DOM
            getTasks();
        }).catch((error)=> {
            console.log("PUT request failed", error)
        })
    }
}



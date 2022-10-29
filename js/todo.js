userData = testUser;

//Set current list to the first list "Tasks"
var currentList = userData.toDoLists[0]

//Set background color to list color
$("body")[0].style.backgroundColor = currentList.color[1];
$(".taskContainer h1").html(currentList.name);

//display individual task element
function displayTask(item, index, arr) {
    task = document.createElement("div")
    task.setAttribute("class", "task")
    var checkBtn = item.completed ? "check_circle" :  "radio_button_unchecked"
    task.innerHTML = `            
    <div class="taskCheck">
        <span id="check${index}" class="checkBtn material-symbols-outlined">
            ${checkBtn}
        </span>
        <p>${item.name}</p>
    </div>

    <div class="taskDelete">
        Are you sure?
        <span id="delete${index}" class="deleteBtn material-symbols-outlined">
            delete
        </span>
    </div>`
    
    if (!item.completed) {
        $(".currentTasks")[0].append(task)
    } else {
        $(".completedTasks")[0].append(task)
    }
    
}

// display individual list element
function displayList(item, index) {
    list = document.createElement("li");
    list.setAttribute("id", `list${index}`)
    var icon = index == 0 ? "home" : "menu"
    list.innerHTML =
    `<span class="material-symbols-outlined">${icon}</span><p>${item.name}</p>`
    list.getElementsByTagName("span")[0].style.color = item.color[0];
    $(".listContainer ul").append(list);
}

// Add a new task to list
function addTask() {
    var name = $("#addTaskInput").val()
    $("#addTaskInput").val('')
    //field must not be empty
    if (name != '') {
        currentList.addTask(new Task(name));
        $(".currentTasks").empty();
        $(".completedTasks")[0].innerHTML = "<h3>Completed Tasks</h3>";
        currentList.tasks.forEach(displayTask);
    }
}

// Add task if add button is pressed, or enter is pressed when input
$("#addTaskBtn").click(addTask)
$("#addTaskInput").keydown(function(e) {
    if (e.key == 'Enter') {
        addTask();
    }
})

// If click on check circle, move task <=> completed task
$(document).on("click",".checkBtn", function(e) {
    currentList.checkTask(e.target.id.slice(-1));
    $(".currentTasks").empty();
    $(".completedTasks")[0].innerHTML = "<h3>Completed Tasks</h3>";
    currentList.tasks.forEach(displayTask);
})

// If click trash icon, delete specific task
$(document).on("click",".deleteBtn", function(e) {
    currentList.deleteTask(e.target.id.slice(-1));
    $(".currentTasks").empty();
    $(".completedTasks")[0].innerHTML = "<h3>Completed Tasks</h3>";
    currentList.tasks.forEach(displayTask);
})

// If clicked on a different list, remake page for that list
$(document).on("click",".listContainer li", function(e) {
    var index = e.target.id.slice(-1);
    currentList = userData.toDoLists[index];
    $(".currentTasks").empty();
    $(".completedTasks")[0].innerHTML = "<h3>Completed Tasks</h3>";
    currentList.tasks.forEach(displayTask);
    $("body")[0].style.backgroundColor = currentList.color[1];
    $(".taskContainer h1").html(currentList.name);
})

// Open add List modal
function openAddListModal() {
    $(".modal").css("display","flex");
    $("#addListModal").css("display","flex");
}

// close modal
function closeModal() {
    $(".modal").css("display","none");
    $(".modalBox").css("display","none");
    $("#addListModal p").html("");
    $("#listNameInput").val('');
}

// close modal if click "x" or outside modal box
$(".close").click(closeModal);

window.onmousedown = function(event) {
    if (event.target == $(".modal")[0]) {
        closeModal();
    }
}

// open add List modal if button is clicked
$(".addList").click(openAddListModal)


// add List if button is pressed, create and open new list
$("#addListModal button").click(function() {
    var listName = ''
    if ($("#listNameInput").val()) {
        listName = $("#listNameInput").val();
        const color = $("#listColorSelect").val();
        const list = new ToDoList(listName, color)
        userData.addToDoList(list);
        currentList = list;
        $(".listContainer ul").empty();
        userData.toDoLists.forEach(displayList)

        $(".currentTasks").empty();
        $(".completedTasks")[0].innerHTML = "<h3>Completed Tasks</h3>";
        currentList.tasks.forEach(displayTask);
        $("body")[0].style.backgroundColor = currentList.color[1];
        $(".taskContainer h1").html(currentList.name);

        closeModal();
    } else {
        $("#addListModal p").html("Please enter a list name.")
    }
})

// Display initial tasks and lists
userData.toDoLists.forEach(displayList)
currentList.tasks.forEach(displayTask)
// "back end"
// Assign task with name and completed boolean
class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    checkTask() {
        this.completed = !this.completed;
    }
}

// Assign to do list with name, color, and list of tasks
class ToDoList {
    constructor(name, color) {
        this.name = name;
        this.tasks = new Array();

        switch (color) {
            case "yellow":
                this.color = ["#FDECA6","#FFFBD9"];
                break;
            case "red":
                this.color = ["#FFB7B2","#FFE3E1"];
                break;
            case "green":
                this.color = ["#C8EE81","#F1FFD7"];
                break;
            case "blue":
                this.color = ["#A9B7F0","#E9EDFE"]
                break;
        }
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);

    }

    checkTask(index) {
        var task = this.tasks.splice(index, 1)[0]
        task.checkTask()
        this.tasks.push(task)
    }
}

// Assign study sessions with list worked on, time spent, and date completed
class StudySession {
    constructor(listWorkedOn, timeSpent, dateCompleted) {
        this.listWorkedOn = listWorkedOn;
        this.timeSpent = timeSpent;
        this.dateCompleted = dateCompleted
    }
}

// Store study sessions and to do lists
class UserData {
    constructor() {
        this.toDoLists = new Array();
        this.studySessions = new Array();
        this.addToDoList(new ToDoList("Tasks", "yellow"))
    }

    addToDoList(list) {
        this.toDoLists.push(list);
    }

    addStudySession(studySession) {
        this.studySessions.push(studySession);
    }

    // Adapted from https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    getTotalTime() {
        const totalTimeSpent = this.studySessions.map(x => x.timeSpent)
        return totalTimeSpent.reduce((a, b) => a + b, 0)
    }
}

// Attempted to store data across pages. Could not find solution in time, did
// not realise localStorage removes object functionality.

// Generate test data instead.
testUser = new UserData();
testUser.addToDoList(new ToDoList("DECO1400", "red"))
testUser.addToDoList(new ToDoList("CSSE2002", "green"))
testUser.toDoLists[0].addTask(new Task("Start assignment"))



testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    20, new Date("May 16, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    20, new Date("May 16, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    60, new Date("May 16, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    120, new Date("May 19, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[1],
    20, new Date("May 21, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[2],
    20, new Date("May 23, 2022 21:50:44 GMT+1000")));

testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    20, new Date("May 23, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    60, new Date("May 23, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[2],
    40, new Date("May 24, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    20, new Date("May 25, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[1],
    30, new Date("May 29, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[2],
    20, new Date("May 29, 2022 21:50:44 GMT+1000")));

testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    20, new Date("May 30, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[0],
    25, new Date("May 30, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[1],
    20, new Date("May 30, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[1],
    45, new Date("May 31, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[1],
    20, new Date("May 31, 2022 21:50:44 GMT+1000")));
testUser.addStudySession(new StudySession(testUser.toDoLists[2],
    120, new Date("May 31, 2022 21:50:44 GMT+1000")));


// toggle menu display when clicking nav button
$("#menuNavBtn").click(function() {
    if (getComputedStyle($("#menuNav")[0]).display == "none") {
        $("#menuNav")[0].style.display = "flex";

    } else {
        $("#menuNav")[0].style.display = "none";
    }
});

// close menu Nav when resizing screen
window.onresize = function() {
    $("#menuNav")[0].style.display = "none";
}


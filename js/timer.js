// General idea adapted from: https://www.youtube.com/watch?v=x7WJEmxNlEs
// Timer variables
let studyLength = 25;
let breakLength = 5;
let time = Math.round(studyLength * 60);
let timerOn = false;
let confirmationOn = false;
var timerInterval;
let timerAudio = new Audio("files/timer bell.wav")
userData = testUser;

// set the Timer text on page
function setTimer(current_time) {
    const minutes = Math.floor(current_time / 60)
    let seconds = current_time % 60 
    
    seconds = seconds < 10 ? '0' + seconds : seconds
    $("#timerCountdown").html(`${minutes}:${seconds}`)
}

// decrement the timer text
function updateCountdown() {
    time--
    setTimer(time)
    if (time == 0) {
        timerAudio.play();
        timerOn = false;
        confirmationOn = false;
        confirmation.style.display = "none"
        clearInterval(timerInterval)
        timerBtn.innerHTML = 'Finish'
    }
}

// timer elements
const timerCountdown = document.getElementById('timerCountdown')
const chooseStudy = document.getElementById('chooseStudy')
const settings = document.getElementById('settings')
const timerBtn = document.getElementById('timerBtn')
const confirmation = document.getElementById('confirmation')

// When clicking the timer button, start/stop/warn user
timerBtn.onclick = function() {
    if (timerBtn.textContent == 'Finish') {
        timerOn = false;
        confirmationOn = false;
        confirmation.style.display = "none"
        clearInterval(timerInterval)
        
        time = Math.round(studyLength * 60);
        setTimer(Math.round(studyLength * 60))

        timerBtn.innerHTML = 'Start'
        timerBtn.style.color = "rgba(51, 51, 51, 0.7)"
        timerBtn.style.background = "#FDECA6"
    }
    else if (!timerOn) {
        timerOn = true;
        timerInterval = setInterval(updateCountdown, 1000)
        timerBtn.innerHTML = "Stop"
        timerBtn.style.color = "#FDECA6"
        timerBtn.style.backgroundColor = "#817B67"
    } else {
        //Display confirmation message if the user wants to stop timer
        if (!confirmationOn) {
            confirmationOn = true;
            confirmation.style.display = "block"
        } else {
            timerOn = false;
            confirmationOn = false;
            confirmation.style.display = "none"
            clearInterval(timerInterval)
            setTimer(Math.round(studyLength * 60))
            time = Math.round(studyLength * 60);
            timerBtn.innerHTML = 'Start'
            timerBtn.style.color = "rgba(51, 51, 51, 0.7)"
            timerBtn.style.background = "#FDECA6"
        } 
    }
}
// Modal idea adapted from https://www.w3schools.com/howto/howto_css_modals.asp

// close modal
function closeModal() {
    $(".modal").css("display","none");
    $(".modalBox").css("display","none");
}

// close modal if user clicks on 'x' or outside modal box
$(".close").click(closeModal);

window.onmousedown = function(event) {
    if (event.target == $(".modal")[0]) {
        closeModal();
    }
}

// open the modal
function openTimerSettingsModal() {
    $(".modal").css("display","flex");
    $("#timerSettingsModal").css("display","flex");
    $("#timerSettingsModal p").css("display","none")
}

// open modal if settings icon is clicked
$("#settings").click(openTimerSettingsModal);

// if OK button in timer settings clicked, check input to display warning message
// otherwise, save new times
$("#timerSettingsModal button").click(function() {
    if (parseFloat($("#studyLengthInput").val()) <= 0 ||
        parseFloat($("breakLengthInput").val()) <= 0) {
        $("#timerSettingsModal p").html("Invalid Input.")
        $("#timerSettingsModal p").css("display","block")
    } else {
        studyLength = parseFloat($("#studyLengthInput").val())
        breakLength = parseFloat($("breakLengthInput").val())
        $("#timerSettingsModal p").html("Timer settings saved.")
        $("#timerSettingsModal p").css("display","block")
        timerOn = false;
        confirmationOn = false;
        confirmation.style.display = "none"
        clearInterval(timerInterval)
        setTimer(Math.round(studyLength * 60))
        time = Math.round(studyLength * 60);

        timerBtn.innerHTML = 'Start'
        timerBtn.style.color = "rgba(51, 51, 51, 0.7)"
        timerBtn.style.background = "#FDECA6"

    }
})

// open the choose study modal
function openChooseStudyModal() {
    $(".modal").css("display","flex");
    $("#chooseStudyModal").css("display","flex");
}


// open choose study modal when choose studdy button clicked
$("#chooseStudy").click(openChooseStudyModal);

// display a list in choose study modal
function displayList(item, index) {
    list = document.createElement("li");
    list.setAttribute("id", `list${index}`)
    var icon = index == 0 ? "home" : "menu"
    list.innerHTML =
    `<span class="material-symbols-outlined">${icon}</span>${item.name}`
    list.getElementsByTagName("span")[0].style.color = item.color[0];
    $("#chooseStudyModal ul").append(list);
}

// If click on choose study modal, change the color of egg, button and close modal
$(document).on("click","#chooseStudyModal li", function(e) {
    var index = e.target.id.slice(-1);
    currentList = userData.toDoLists[index];
   
    $("#eggBody").css("fill", currentList.color[0]);
    $("#chooseStudy").css("backgroundColor", currentList.color[0]);
    $("#chooseStudy").html("Currently working on: " + currentList.name);
    
    closeModal();
})


// set inital time
setTimer(Math.round(studyLength * 60));

// display every list in choose studyModal
userData.toDoLists.forEach(displayList);

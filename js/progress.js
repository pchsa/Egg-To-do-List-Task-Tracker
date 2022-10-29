// Load user data
userData = testUser;

$("body").css("background-color", "#FFFDE9");

// Display total time spent
$(".studyStats h3")[0].innerHTML = `You have studied for ${userData.getTotalTime()} mins in total.`

// Display bird and pop up box
function displayBird(studySession) {
    birdItem = document.createElement("div")
    birdItem.setAttribute("class", "birdItem")
    const listWorkedOn = studySession.listWorkedOn;
    const timeSpent = studySession.timeSpent;
    const dateCompleted = studySession.dateCompleted.toLocaleDateString();

    // Placing this svg in an object does not enable me to change the colour, could not find other solution
    // Pop up adapted from https://www.w3schools.com/js/js_popup.asp
    birdItem.innerHTML =`
    <div class="birdItem">
        <svg width="90" height="80" viewBox="0 0 112 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70.672 0.526314C65.9306 1.61654 61.6746 3.98496 58.3894 7.36842C56.112 9.69924 54.5814 12.2932 53.2374 16.0902C49.952 25.3384 41.44 31.2031 31.9574 30.752C27.2534 30.5263 19.6 28.0452 7.392 22.782C3.024 20.9022 1.904 20.7143 1.008 21.7294C0.149335 22.6691 0.186669 24.8496 1.15734 29.8873C3.696 43.4586 9.55734 55.7143 17.248 63.4963C23.7814 70.1505 30.24 73.4963 41.552 76.0902L42.56 76.3158V87.3685C42.56 99.2481 42.5226 99.0226 44.5386 99.7369C45.248 100 46.6294 99.4362 47.1146 98.7218C47.264 98.4963 47.4134 93.5338 47.4134 87.6691C47.4134 79.5112 47.5254 76.9926 47.8986 76.8797C48.1226 76.8046 50.8106 76.6542 53.872 76.6165L59.36 76.5038V87.4812V98.4586L60.3306 99.2106C61.5626 100.188 62.0106 100.188 63.2426 99.2106L64.2134 98.4586L64.288 86.9549L64.4 75.4511L67.0134 74.5489C85.344 68.3836 98.6346 52.6691 101.92 33.2706L102.555 29.5112L106.624 29.3985C110.245 29.3233 110.768 29.2105 111.365 28.5338C112.224 27.4812 112.187 26.1279 111.253 25.188C110.619 24.5489 110.021 24.4362 106.661 24.4362H102.853L102.181 21.1654C100.203 11.5414 93.7066 4.17294 84.56 1.27819C80.7894 0.0751878 74.2186 -0.26316 70.672 0.526314ZM82.5066 5.86466C90.3466 8.19549 95.7974 14.4361 97.328 22.7068C97.8506 25.6015 97.8506 26.3158 97.328 30.1504C95.7974 41.2406 91.28 50.4888 83.6266 58.2706C74.7786 67.218 63.7654 71.8046 51.1466 71.8046C38.6774 71.8046 28.224 67.5941 20.496 59.5112C15.904 54.6993 12.5067 49.1353 9.59466 41.7294C7.80266 37.1428 5.56266 28.4963 6.048 28.0075C6.16 27.8572 7.504 28.3083 8.99734 28.9474C12.656 30.5263 20.7946 33.5338 24.192 34.5489C32.816 37.1428 41.6266 35.827 48.2346 30.9022C52.8266 27.4812 56.224 22.6691 58.4266 16.4286C59.696 12.8195 63.4294 8.90977 67.4614 6.99248C71.792 4.88722 77.8026 4.47369 82.5066 5.86466Z" fill="#333333"/>
            <path d="M82.5066 5.86466C90.3466 8.19549 95.7974 14.4361 97.328 22.7068C97.8506 25.6015 97.8506 26.3158 97.328 30.1504C95.7974 41.2406 91.28 50.4888 83.6266 58.2706C74.7786 67.218 63.7654 71.8046 51.1466 71.8046C38.6774 71.8046 28.224 67.5941 20.496 59.5112C15.904 54.6993 12.5067 49.1353 9.59466 41.7294C7.80266 37.1428 5.56266 28.4963 6.048 28.0075C6.16 27.8572 7.504 28.3083 8.99734 28.9474C12.656 30.5263 20.7946 33.5338 24.192 34.5489C32.816 37.1428 41.6266 35.827 48.2346 30.9022C52.8266 27.4812 56.224 22.6691 58.4266 16.4286C59.696 12.8195 63.4294 8.90977 67.4614 6.99248C71.792 4.88722 77.8026 4.47369 82.5066 5.86466Z" fill="${listWorkedOn.color[0]}"/>
            <circle class="birdEye" cx="79" cy="23" r="4" fill="#333333"/>
            <path class="birdSmile" d="M70.4 22.2411C71.664 18.8331 74.4315 16.4686 77.6421 16.4686C80.8527 16.4686 83.6202 18.8331 84.8842 22.2411" stroke="#333333" stroke-width="3"/>
        </svg>
        <div class="popUpArrow"></div>
        <div class="popUp">${listWorkedOn.name}: ${timeSpent} mins, ${dateCompleted}</div>
    </div>
    `
    birdItem.getElementsByClassName("popUp")[0].style.backgroundColor = listWorkedOn.color[0];
    birdItem.getElementsByClassName("popUpArrow")[0].style.borderColor = listWorkedOn.color[0] + " transparent";
    $(".birdArmy").append(birdItem);
}

// Display every study session as bird
userData.studySessions.forEach(displayBird);

$(document).ready(function() {
// NEED TO: add a clear button
// grab date from moments and append to header
const currentTime = moment().format("dddd, MMMM Do");
$('#currentDay').text(currentTime);
const $container = $('.container');
// for loop dynamically adding rows of div's for each work hour
for (let i= 0; i<=8; i++) {
    let hour = (i + 9);
    let ampm = "am";
    let momentHour = (i+9);
    // swich value of ampm once it is 12pm
    if (hour > 11) {
        ampm = "pm";
    }
    // once it is past 12, set hour back to 1 to avoid millitary time
    if (hour > 12) {
        hour = hour - 12;
    }
    const $parentContainer = $('<div>');
    $container.append($parentContainer);
    $parentContainer.addClass('parentContainer')
    //create the section that shows time 
    const $hourDiv = $('<div>');
    $hourDiv.css({
        'height': '80px',
        'border-top': '1px solid black',
        'border-right': '1px solid black',
        'float': 'left'
    });
    $hourDiv.addClass('col-md-2');
    $hourDiv.text(hour + ampm);
    $parentContainer.append($hourDiv);
    //end of time section
    //create the section that takes user input for activities
    const $activityDiv = $('<div>');
    $activityDiv.css({
        'height': '80px',
        'border-bottom': '1px solid white',
        'border-right': '1px solid black',
        'float': 'left',
        'color': 'black'
    });
    $activityDiv.addClass('col-md-8');
    $activityDiv.attr('hour', momentHour);
    //add class past, present, or future depending on the time of day
    if (momentHour === moment().hour()) {
        $activityDiv.addClass('present');
    }
    if (momentHour < moment().hour()) {
        $activityDiv.addClass('past');
    }
    if (momentHour > moment().hour()) {
        $activityDiv.addClass('future');
    }
    $parentContainer.append($activityDiv);
    //end of activity section
    //create section for save button
    const $saveDiv = $('<div>');
    $saveDiv.css({
        'height': '80px',
        'border-bottom': '1px solid white',
        'float': 'left'
    });
    $saveDiv.addClass('col-md-2');
    $parentContainer.append($saveDiv);
    //end of save button section
    //text box for user added to activity div
    $activityText = $('<textarea>');
    $activityText.text('');
    $activityText.addClass('textarea');
    $activityText.addClass(`divhour${momentHour}`);
    $activityText.attr('input-num', i);
    $activityDiv.append($activityText);
    //save button for save div
    const $savebtn = $('<button>');
    $savebtn.text('Save');
    $savebtn.addClass('btn btn-primary')
    $savebtn.css({
        'height': '80px',
        'border': '1px solid black',
    });
    $savebtn.addClass('saveindex-' + i);
    $savebtn.attr('save-num', i);
    $saveDiv.append($savebtn);
}
// run set activities function to set any saved activities to its corresponding hour
setActivities();
// add clear button to page
clearButton();
//saves user input to array stored in local storage
function saveInput(event) {
    event.preventDefault();
    // initialize variable to store array
    var arrayTimeObj;
    // set variable to array from local storage if one exists, else set to empty array
    if (localStorage.getItem("activities")) {
        arrayTimeObj = JSON.parse(localStorage.getItem("activities"));
    } else {
        arrayTimeObj = [];
    }
    //event.target click --- get time and value obj
    const time = $(event.target).closest(".parentContainer").find(".col-md-8").attr("hour");
    const value = $(event.target).closest(".parentContainer").find(".textarea").val();
    //store time and value in an obj
    let newObj = {'time': time, 'value': value}
    //push obj to array
    arrayTimeObj.push(newObj)
    //set item
    localStorage.setItem('activities', JSON.stringify(arrayTimeObj));
    //reload page
    window.location.reload(true);
}
// function to loop through stored array and set values to each hour, if one exists
function setActivities() {
    if (localStorage.getItem('activities')){
        const arr = JSON.parse(localStorage.getItem('activities'))
        for (let i=0; i < arr.length;i++) {
            // use time value in object to target text box for corresponding time
            let $divIndex = arr[i].time;
            // set text box to value that was saved by user
            $(`.divhour${$divIndex}`).text(arr[i].value);
        }
    }
}
// creates clear button and appends to page
function clearButton() {
    const $clearbtn = $('<button>');
    $clearbtn.text('Clear Schedule');
    $clearbtn.addClass('btn btn-danger')
    $clearbtn.css({
        'height': '80px',
        'border': '1px solid black',
    });
    $container.append($clearbtn);
}
// resets the page and clears local storage, then refreshes with an empty schedule
function clearSchedule() {
    $container.text('');
    localStorage.removeItem('activities')
    window.location.reload(true);
}
$(document).on('click', '.btn-danger',clearSchedule);
$(document).on('click', 'button',saveInput);
});
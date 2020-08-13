$(document).ready(function() {


// each save button should save content to the console log so it shows up
// on the screen when refreshed
const currentTime = moment().format("dddd, MMMM Do");
$('#currentDay').text(currentTime);
// each time slot imput box turns gray when the hour passes, red for current hour,
// and green for upcoming hours

// when day is over, planner gets cleared

const $container = $('.container');
for (let i= 0; i<=8; i++) {
    let hour = (i + 9);
    let ampm = "am";
    let momentHour = (i+9);
    if (hour > 11) {
        ampm = "pm";
    }
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

    //add class present if momentHour === moment().hour()
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
    
    //input box for user added to activity div
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
setActivities();

//saves user input to array stored in local storage
function saveInput(event) {
    event.preventDefault();
    // let corrIndex = $(this).attr('save-num');

    // let inputid = '.inputindex-'+ corrIndex;
    // let textVal = $(inputid).val();
    // activityArray[corrIndex] = textVal;
    // console.log(activityArray);

    var arrayTimeObj;
    if (localStorage.getItem("activities")) {
        arrayTimeObj = JSON.parse(localStorage.getItem("activities"));
    } else {
        arrayTimeObj = [];
    }

    //intialize the array of obj where we will store time: value pairs if array does not exist

    //event.target click --- get time and value obj
    const time = $(event.target).closest(".parentContainer").find(".col-md-8").attr("hour");
    const value = $(event.target).closest(".parentContainer").find(".textarea").val();
    //store time and value in an obj
    let newObj = {'time': time, 'value': value}
    //push obj to array
    arrayTimeObj.push(newObj)
    //set item
    localStorage.setItem('activities', JSON.stringify(arrayTimeObj));
    window.location.reload(true);
}
// another function to loop through and set values 
function setActivities() {
    if (localStorage.getItem('activities')){
        const arr = JSON.parse(localStorage.getItem('activities'))
        for (let i=0; i < arr.length;i++) {
            let $divIndex = arr[i].time;
            $(`.divhour${$divIndex}`).text(arr[i].value);

        }
    }
}

$(document).on('click', 'button',saveInput);
});
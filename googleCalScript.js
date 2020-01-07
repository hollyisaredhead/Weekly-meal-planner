$(document).ready(function () {

    var eventsLocal = [];
    var recipeHits = recipeSet.hits;
    var recipeDetails;
    var dayOfWeek, weekStartDt, weekStartDtISO, weekEndDt, weekEndDtISO;

    // Set weekly calendar to current
    goToCurrentWeek();

    $.getScript("https://apis.google.com/js/api.js", function () {
        handleClientLoad();
    });

    // Client ID and API key from the Developer Console
    var CLIENT_ID = '803650121348-q45tpl7gpaf83mm2b81oks4kesov2sd1.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyCeM1m73twcAewk29CbTe4IJIIc4U1hQkQ';

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";


    // var authorizeButton = document.getElementById('authorize_button');
    // var signoutButton = document.getElementById('signout_button');
    var addRecipeButton = document.getElementById('addEvent_button');


    // var deleteRecipeButton = document.getElementById('deleteEvent_button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            //signoutButton.onclick = handleSignoutClick;
            addRecipeButton.onclick = addEvent;
            // deleteRecipeButton.onclick = deleteEvent;
            getUpcomingEvents();
        }, function (error) {
            alert(JSON.stringify(error, null, 2));
        });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            getUpcomingEvents();
        };
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        event.preventDefault();
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
        event.preventDefault();
        gapi.auth2.getAuthInstance().signOut();
    }

    //--------------------------------------------------------//
    //             get given week's events                    
    //--------------------------------------------------------//
    function getUpcomingEvents() {

        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            handleAuthClick(event);
        };

        var authInst = gapi.auth2.getAuthInstance();
        var eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=' + authInst.currentUser.Ab.Zi.access_token;



        for (var i = 0; i <= 6; i++) {
            var date = moment(moment(weekStartDt).add(i, 'days')).format("MMM, YY");
            var weekday = moment(moment(weekStartDt).add(i, 'days')).format("dd, Do");
            var dateHolderId = "#day" + (i + 1) + "-date";
            var eventHolderId = "#day" + (i + 1) + "-events";

            // first clear the existing content, if exists
            $(dateHolderId).empty();
            $(eventHolderId).empty();

            // Set new values
            $(dateHolderId).append($("<div class='uk-text-large'>").text(weekday));
            $(dateHolderId).append($("<div>").text(date));

        }

        $.ajax({
            'url': eventsURL,
            'method': 'get',
            //'authorization': authCode,
            //'calendarId': 'primary',
            'data': {
                'timeMin': weekStartDtISO,
                'timeMax': weekEndDtISO,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            },

        }).then(function (response) {
            var events = response.items;

            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    // var when = event.start.dateTime;
                    var when = moment(event.start.dateTime).format("dddd, MM/DD/YYYY");

                    var day = moment(event.start.dateTime).day();

                    var eventHolderId = "#day" + (day + 1) + "-events";
                    var mealItem = $("<div class='mealEvent uk-button-primary uk-margin-small-bottom uk-padding-small uk-padding-remove-bottom uk-padding-remove-right uk-padding-remove-top'>");
                    mealItem.text(event.summary);

                    $(eventHolderId).append(mealItem);

                }
            } else {
                // No Events!
            }
        });
    }

    //--------------------------------------------------------//
    //                       add an event                       
    //--------------------------------------------------------//
    function addEvent(event) {

        event.preventDefault();

        recipeDetails
        // get start date/time from popper window
        var startDateTime = moment($(".mealDate").val() + "T" + $(".mealTime").val()).format();
        var endTime = moment($(".mealTime").val()).add(recipeDetails.totalTime, "minutes");
        var endDateTime = moment($(".mealDate").val() + "T" + endTime).format();

        // close the Popper element if it is visible
        document.querySelector("#dateTimePicker").classList.add("uk-hidden");

        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            handleAuthClick(event);
        };

        var authInst = gapi.auth2.getAuthInstance();
        var eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=' + authInst.currentUser.Ab.Zi.access_token;

        var event = {
            'summary': 'A Great Recipe',
            //'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'This is how you make tasty food',
            'colorId': "2",
            'start': {
                'dateTime': '2020-01-01T21:00:00-08:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2020-01-01T22:00:00-08:00',
                'timeZone': 'America/Los_Angeles'
            },
            // 'recurrence': [
            //     'RRULE:FREQ=DAILY;COUNT=2'
            // ],
            // 'attendees': [
            //     { 'email': 'lpage@example.com' },
            //     { 'email': 'sbrin@example.com' }
            // ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    // { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        };

        var headers = {};
        headers["Content-Type"] = "application/json ; charset=UTF-8";
        $.ajax({
            'url': eventsURL,
            'method': 'post',
            'contentType': 'application/json ; charset=UTF-8',
            // 'headers': headers,
            'data': JSON.stringify(event)
        }).then(function (response) {
            console.log(response);
        });

    }

    //--------------------------------------------------------//
    //               Delete selected event                       
    //--------------------------------------------------------//
    function deleteEvent(event) {

        event.preventDefault();

        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            handleAuthClick(event);
        };

        var authInst = gapi.auth2.getAuthInstance();
        var eventId = this.dataset.eventId;
        var eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events/' + eventId + '?access_token=' + authInst.currentUser.Ab.Zi.access_token;

        $.ajax({
            'url': eventsURL,
            'method': 'delete',
            'contentType': 'application/json ; charset=UTF-8',
            'data': JSON.stringify({ 'sendUpdates': 'all' })
        }).then(function (response) {
            console.log(response);
            // Event Deleted Successfully
        });


    }

    //--------------------------------------------------------//
    //               Popper: Preview on Hover function                       
    //--------------------------------------------------------//
    function mealPreviewOpen(event) {
        event.preventDefault();

        var refEle = this;

        $("#mealImage").attr("src", recipeHits[2].recipe.image);
        $("#mealName").text(recipeHits[2].recipe.label);
        $("#mealDetails").attr("href", recipeHits[2].recipe.url);
        $("#mealDetails").text(recipeHits[2].recipe.url);

        var popupEle = document.querySelector("#popupBubble");
        popupEle.classList.remove("uk-hidden");
        var popper = new Popper(refEle, popupEle, {
            placement: 'auto',
            eventsEnabled: true,
            modifiers: {
                preventOverflow: {
                    boundariesElement: refEle.parentNode,
                    escapeWithReference: true,
                },
            }
        });
    };

    function mealPreviewClose(event) {
        event.preventDefault();

        // To close the popup, either
        // pointer should be leaving a popper and entering a non-popper element, or
        // pointer should be leaving a non-popper and entering a non-popper element
        if (($(event.target).parents().hasClass("popper") &&
            !($(event.relatedTarget).parents().hasClass("popper"))) ||
            (!($(event.target).parents().hasClass("popper")) &&
                !($(event.relatedTarget).parents().hasClass("popper")))) {
            var popupEle = document.querySelector("#popupBubble");
            popupEle.classList.add("uk-hidden");
        }

    }

    $(document).on('mouseover', '.mealEvent', mealPreviewOpen);

    $(document).on('mouseout', mealPreviewClose);

    //--------------------------------------------------------//
    //               Popper: Date and time picker function                       
    //--------------------------------------------------------//

    function dateTimePicker(event) {
        event.preventDefault();
        var refEle = event.target;
        var popupEle = document.querySelector("#dateTimePicker");
        var mealDate = $("#mealDate");
        var mealTime = $("#mealTime");

        // Set default value for event date and time
        mealDate.val(moment().format("YYYY-MM-DD"));
        mealTime.val(moment().format("HH:MM"));

        console.log(mealDate.val() + "T" + mealTime.val());

        popupEle.classList.remove("uk-hidden");
        var popper = new Popper(refEle, popupEle, {
            placement: 'auto',
            eventsEnabled: true,
            modifiers: {
                preventOverflow: {
                    boundariesElement: refEle.parentNode,
                    escapeWithReference: true,
                },
            }
        });

    }

    $(document).on('click', '.addRecipe', function (event) {
        event.preventDefault();
        // get the recipe
        var recipeID = event.target.parentNode.dataset.recipeId;

        recipeDetails = recipeHits.find(obj => { return obj.uri === recipeID });

        dateTimePicker(event);
    });
    $(document).on('click', '#addEventCancelButton', function (event) {
        event.preventDefault();
        document.querySelector("#dateTimePicker").classList.add("uk-hidden");
    });


    //--------------------------------------------------------//
    //               Calendar Navigation                       
    //--------------------------------------------------------//
    var calNavPrev = $("a[uk-slidenav-previous]");
    var calNavNext = $("a[uk-slidenav-next]");
    var calNavCurr = $("#goToCurrentWeek");
    calNavPrev.on("click", navCal);
    calNavNext.on("click", navCal);
    calNavCurr.on("click", function (event) {
        event.preventDefault();
        goToCurrentWeek();
        getUpcomingEvents();
    })


    function navCal(event) {
        event.preventDefault();

        // Update the calendar start and end dates based on whether
        // previous week is selector or next
        if (this.hasAttribute("uk-slidenav-previous")) {
            weekStartDt = moment(weekStartDt).subtract(7, 'days');
            weekStartDtISO = moment(weekStartDt, moment.ISO_8601).toISOString();
            weekEndDt = moment(weekEndDt).subtract(7, 'days');
            weekEndDtISO = moment(weekEndDt, moment.ISO_8601).toISOString();
        }
        else {
            weekStartDt = moment(weekStartDt).add(7, 'days');
            weekStartDtISO = moment(weekStartDt, moment.ISO_8601).toISOString();
            weekEndDt = moment(weekEndDt).add(7, 'days');
            weekEndDtISO = moment(weekEndDt, moment.ISO_8601).toISOString();
        }

        // Now call the events for that week
        getUpcomingEvents()
    }

    function goToCurrentWeek() {
        dayOfWeek = moment().day();
        weekStartDt = moment().subtract(dayOfWeek, 'days');
        weekStartDtISO = moment(weekStartDt, moment.ISO_8601).toISOString();
        weekEndDt = moment().add((7 - dayOfWeek), 'days');
        weekEndDtISO = moment(weekEndDt, moment.ISO_8601).toISOString();
    }

});





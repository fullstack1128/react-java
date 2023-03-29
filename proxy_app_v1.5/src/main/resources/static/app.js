var stompClient = null;
var sessionId = "";
var socketEndpoint = 'outgame/v1/rh-websocket';
var actionResponseQueue = '/queue/battle/notification';
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

function connect() {
    var websocket = new SockJS("/" + socketEndpoint);
    stompClient = Stomp.over(websocket);
    stompClient.connect({'rh-access-token': getToken()}, function (frame) {
        setConnected(true);
        showMessage("Connected");
        subscribe(sessionId);
    });

    websocket.onerror = function (event) {
        console.log(event);
    };
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function getToken(){
    return $("#jwt-token").val();
}

function getDeckUuid(){
    return $("#deck-uuid").val();
}

function getBattleUuid(){
    return $("#battle-uuid").val();
}


function getUserUuid(){
    return $("#user-uuid").val();
}


function subscribe() {
    var subscribedQueue = "/user/" + getUserUuid() + '/queue/battle/notification';
    stompClient.subscribe(subscribedQueue, function (data) {
        var a = JSON.parse(data.body);
        console.log(data)
        showMessage(data.body);
    });
}

function joinGame() {
    var request = {
        'requestId': '1',
        'type': 'ACTION_FIND_MATCH',
        'payload': {
            'deckUuid': getDeckUuid()
        }
    };
    stompClient.send("/app/battle", {}, JSON.stringify(request));
}

function leaveRoom() {
    var request = {
        'requestId': '1',
        'type': 'ACTION_CANCEL_FIND_MATCH'
    };
    stompClient.send("/app/battle", {}, JSON.stringify(request));
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#subscribe" ).click(function() { subscribe(); });
    $( "#join-game" ).click(function() { joinGame(); });
    $( "#leave-room" ).click(function() { leaveRoom(); });
});

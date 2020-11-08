var connected = false;
var chatSocket;

$("#chat").attr("disabled", true);

$( document ).ready(function() {
    $("#goOnline").click(goOnline);
    $("#send").click(sendMessage);
    $("#receiverName").change(changeChat);
    $("#name").keypress(function(event){
        if(event.keyCode == 13 || event.which == 13) {
            goOnline();
        }
    });
    $("#name").focus();
    $("#msg").keypress(function(event) {
        if(event.keyCode == 13 || event.which == 13) {
            sendMessage();
        }
    });
    $("#chat").change(function() {
        scrollToBottom();
    });

});

// TODO choose better name than senderName (z.B. hostName)
var goOnline = function(){
    if (! connected) {
        const senderName = $("#name").val();
        console.log("Val: " + senderName);
        chatSocket = new WebSocket("ws://" + location.host + "/chat/" + senderName);
        chatSocket.onopen = function() {
            connected = true;
            console.log("Connected to the web socket");
            $("#goOnline").attr("disabled", true);
            $("#name").attr("disabled", true);
            $("#chat").attr("disabled", false);
            $("#send").attr("disabled", false);
            $("#msg").focus();
            updateReceivers();
        };
        chatSocket.onmessage =function(m) {
            const message = m.data;
            console.log("Got message: " + message);
            if(message == "New User") {
                updateReceivers();
            } else {
                const selectReceiver = document.getElementById("receiverName");
                const receiverName = selectReceiver.options[selectReceiver.selectedIndex].text;
                const jsonMessage = JSON.parse(message);
                if(jsonMessage.senderName === receiverName){
                    // TODO delete newLine character and include in message
                    $("#chat").val($("#chat").val() + jsonMessage.content + "\n");
                    scrollToBottom();
                }
            }
        };
    }
}

var changeChat = function(){
    $("#msg").focus();
    $("#msg").val("");
    $("#chat").val("");

    const selectReceiver = document.getElementById("receiverName");
    const receiverName = selectReceiver.options[selectReceiver.selectedIndex].text;
    const senderName = $("#name").val();
    const url='http://' + location.host + '/chatHistory/' + receiverName + '/' + senderName;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const jsonChat = JSON.parse(this.responseText);
            var message = "";
            for(var i = 0; i<jsonChat.length; i++){
                message = message + jsonChat[i].message + "\n" ;
            }
            $("#chat").val($("#chat").val() + message);
        }
    };
}

var sendMessage = function() {
    const selectReceiver = document.getElementById("receiverName");
    const receiverName = selectReceiver.options[selectReceiver.selectedIndex].text;
    const senderName = $("#name").val();
    const message = ">> " + senderName + ": " + $("#msg").val();

    var jsonMessage = {};
    jsonMessage["receiverName"] = receiverName;
    jsonMessage["senderName"] = senderName;
    jsonMessage["content"] = message

    chatSocket.send(JSON.stringify(jsonMessage));
    $("#chat").val($("#chat").val() + message +  "\n");
    scrollToBottom();
    $("#msg").val("");
};

var updateReceivers = function() {
    const http = new XMLHttpRequest();
    const url='http://' + location.host + '/users';
    http.open("GET", url);
    http.send();

    var select = document.getElementById("receiverName");
    var length = select.options.length;
    for (i = length-1; i > 0; i--) {
        select.options[i] = null;
    }

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            for(var i = 0; i<json.length; i++){
                $("#receiverName").append('<option value=' + (i + 1) + '>' + json[i].userName + '</option>');
            }
            // json.forEach(function (item, index) {
            //     $("#receiverName").append('<option value=' + index + '>' + item.name + '</option>');
            //     console.log(item, index);
            // });
        }
    };
};

var scrollToBottom = function () {
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
};

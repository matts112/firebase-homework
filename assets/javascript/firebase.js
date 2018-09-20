var config = {
    apiKey: "AIzaSyCh2rq9P2LsYQeImzi67i1QZE0-2rjicWQ",
    authDomain: "train-sheet-50aa9.firebaseapp.com",
    databaseURL: "https://train-sheet-50aa9.firebaseio.com",
    projectId: "train-sheet-50aa9",
    storageBucket: "train-sheet-50aa9.appspot.com",
    messagingSenderId: "191706449225"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
$('#add-train').on("click", function() {
  
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency-input").val().trim();
 
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
   
  database.ref().push(newTrain);
  
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");

  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;

  var firstTimeConverted = moment(firstTrain, "HH:mm");
  
  var currentTime = moment().format("HH:mm");
  

  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  

  var timeRemainder = timeDiff % frequency;
  
  
  var minToTrain = frequency - timeRemainder;
 
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#train-schedule>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});
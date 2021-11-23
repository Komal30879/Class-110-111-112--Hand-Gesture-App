prediction = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id= "captured_image" src= "'+ data_uri+'">'
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kVbBPlCzk/model.json', modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The  prediction is " + prediction;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utter_this);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,got_results);
}


function got_results(error,results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_alphabet_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0],label = "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        } else if(results[0].label = "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        } else if(results[0].label = "Goodbye"){
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        } else if(results[0].label = "Sign"){
            document.getElementById("update_emoji").innerHTML = "&&#128077;" + "&#128076;";
        } else if(results[0].label = "Language"){
            document.getElementById("update_emoji").innerHTML = "&#127545;";
        } else if(results[0].label = "Hello"){
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
    }
}
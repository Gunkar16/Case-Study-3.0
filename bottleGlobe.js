status = "";
img = "";
Objects = [];
objectDetector= "";


function preload(){
    img = loadImage('bottleGlobe.jpg')
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
        console.log(results);
        Objects = results;
}


function draw(){
    if(status != undefined){
        image(img,0,0,640,420)
        for(var i = 0 ; i < Objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects detected";
            noStroke();
            fill(0, 250, 0);
            percent = floor(Objects[i].confidence * 100);
            console.log(Objects[i].label,Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].height)
            text(Objects[i].label+" "+ percent + "%" , Objects[i].x+5, Objects[i].y+15)
            noFill();
            stroke(0, 250, 0);
            rect(Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].height);
        }
    }
    
}

function back(){
    window.location="index.html";
}
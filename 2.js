status = "";
length = [];
Img = "";
Objects = "";
function back(){
    window.location="index.html";
}

function setup(){
    canvas = createCanvas(560,370);
    canvas.center();
    img = loadImage('2.jpg')

    ObjectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    ObjectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        Objects = results;
        console.log(Objects);
    }
}


function draw(){
    image(img,0,0,560,370)
    if(status != ""){
        for(i = 0 ; i < Objects.length; i++){
            document.getElementById("objects").innerHTML="There are 2 big objects in the image from which cocossd model has detected " + Objects.length+ " objects.";
            document.getElementById("status").innerHTML = "Status : Objects detected";
            fill('orange')
            noStroke();
            textSize(25)
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%" , Objects[i].x , Objects[i].y)
            noFill();
            strokeWeight(4);
            stroke('orange');
            rect(Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].height);
        }
    }
    else{
        document.getElementById("objects").innerHTML="There are 2 big objects in the image from which cocossd model has detected 0 objects . "
    }
}
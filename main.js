img  = "";
status = "";
objects = [];


function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
}

function draw(){
    image(video, 0, 0, 480, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();    

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects"
}

function modelLoaded(){
    console.log("Model Loaded, p o g");
    objectDetector.detect(video, gotResult);
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}


function draw(){
    image(video, 0, 0, 380, 380);
    /*fill("#FF0000");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);
    fill("#FF0000");
    text("Cat", 320, 420);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);*/

    if (status != ""){
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected is: "+objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" + objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects != "person"){
                play("Alarm Clock For Heavy Sleepers (Loud).mp3");
                document.getElementById("status").innerHTML = "Baby Not Detected";
            }
        }
    }

}   

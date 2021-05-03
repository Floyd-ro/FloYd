song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Intialized');
}

function draw() {
    image(video, 0, 0, 600, 500)

    fill(255,0,0);
    stroke(0,0,255);
    circle(leftWristX,leftWristY,20);
    a = Number(leftWristY/500);
    b = Math.floor(a);
    song.setVolume(b);
    document.getElementById("volume").innerHTML = "volume = "+b;
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}
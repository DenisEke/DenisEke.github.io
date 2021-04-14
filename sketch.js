/*
Authors Note: Hey Mateusz, when running this in the web editor 
you have to click (focus) the canvas on the right. 
Otherwise hitting 'space' reloads the canvas
*/

let col = 0;
let times = [];
let now;

/*
state 0 = before starting the experiment
state 1 = the experiment is being conducted
state 2 = one part of the experiment is finished
state 3 = final insights
*/
let state = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//this function is when we want to change the screen from black to red
function timeoutChange() {
  const time = random(2000, 6000);
  setTimeout(() => {
    col = 255;
    now = millis();
  }, time);
}

//handles input
function keyPressed(){
  if(keyCode == 32){
    onSpacePress()
  }
  
  if(keyCode == 65){
    if(times.length > 2){
      if(state == 2){
       state = 3 
      }
    }
  }
}

//handles space press
function onSpacePress(){
  
  //starts the experiment
  if(state == 0){
    state = 1;
    timeoutChange()
    return;
  }
  
  //measures the users reaction time
  else if(state == 1 && col == 255){
    col = 0;
    const reactionTime = (millis() - now) / 1000;
    times.push(reactionTime);
    state = 2;
    return;
  }
  
  //starts the next round of the experiment
  else if(state == 2){
    state = 1;
    timeoutChange();
    return;
  }
}

function getLastTime(){
  return times[times.length-1].toFixed(3);
}

function getAverageTime(){
  
  let avg = 0;
  
  for (let i of times) {
    avg += i;
  }
  
  avg /= times.length;
  
  return avg.toFixed(3)
}

/*
function "inspired" by this https://stackoverflow.com/a/53577159
*/
function getStandardDeviation(){
  const mean = times.reduce((a, b) => a + b) / times.length
  
  return Math.sqrt(times.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / times.length).toFixed(3)

}

function draw() {
  
  //col will be 255 when we measure the reaction time of the user
  background(col, 0, 0);
  
  //text setup
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  //entry screen
  if(state == 0){
    text("Press 'Space' to start", width/2, height/2); 
  }
  
  //during experiment screen
  else if (state == 1){
    text("Press 'Space' as soon as the screen turns red", width/2, height/2); 
  }
  
  //after measurement screen
  else if (state == 2){
    
    string = "Your time was " + getLastTime()+ "\n"
    
    if(times.length > 1){
      string += "Your average time is " + getAverageTime() + "\n"
    }
    
    string += "Press 'Space' to restart the experiment \n"
    
    if(times.length > 2){
      string += "Press 'a' to view the final evaluation"
    }
    
    text(string, width/2, height/2); 
  }
  
  //final evaluation
  else if(state == 3){
    
    string = "Your average reaction time is " + getAverageTime() + "\n"
    string += "The standard deviation is " + getStandardDeviation()
    
    text(string, width/2, height/2); 
  }
  
}
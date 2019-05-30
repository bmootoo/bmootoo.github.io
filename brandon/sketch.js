
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBWrqitRsUd6UjYGxYt38NcyPjd_CSnpZE",
    authDomain: "alltime-leaderboard.firebaseapp.com",
    databaseURL: "https://alltime-leaderboard.firebaseio.com",
    projectId: "alltime-leaderboard",
    storageBucket: "alltime-leaderboard.appspot.com",
    messagingSenderId: "184094876329",
    appId: "1:184094876329:web:67d520fe5d75c93f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let scoreboard = {  }
let database = firebase.database()

let x
let y
let direction
let score
let level=1
let speed
let enemy
let time
let play= document.getElementById("play")

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/1032
  x=10
  y=15
  x2=10
  y2=300
  x3=[50,150,250,300,500,650,780,850]
  y3=[150,200,300,450,600,650,550,630,250,350,400,500,580,620,220,320,380]
  direction=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  score=5
  speed=5
  enemy=8
  time=50
}

function draw() {
  if (time > 0) {

  background(50,60,70);
  fill(255,100,100)
 circle(x*s,y,25*s)
  fill(350,150,150)
  
  if(x*s > width-100) {
    x = x - 50
  }
  
  circle(x2*s,y2,15*s)
  x2 = x2 + 5*direction[0]
   if (keyIsDown(LEFT_ARROW)) {
    x = x - 15
  }
 if (keyIsDown(RIGHT_ARROW)) {
    x = x +15
  }
 if (keyIsDown(UP_ARROW)) {
    y = y - 15
  }
 if (keyIsDown(DOWN_ARROW)) {
    y = y + 15
  }
if ( x2*s > width || x2*s < 0) {
	//x2 = 0
  direction[0]= direction[0]*-1
}
  textSize(30)
 text("score:"+score,50,100)
  if (dist( x*s, y, x2*s, y2) < 15*s+ 15*s) {
	score= score + 1
}
  
  for (i=0; i<enemy; i=i+1) {
    fill(100,150,250)
    circle(x3[i]*s,y3[i],20*s)
    y3[i] = y3[i] +speed*direction[i+1]
    if ( y3[i] > height || y3[i] < 0) {
      //x2 = 0
    direction[i+1]= direction[i+1]*-1
    }

   text("time:"+time.toFixed(0),50,50)
    time=time-0.01
    if (dist( x*s, y, x3[i]*s, y3[i]) < 15*s+ 20*s) {
      score= score - 1
    }
  }
  
  if (score> 65 && level == 1) {
     x3= [50,200,350,400,500,650,250,850,550,600,450,520,180,650,700,720,820] 
    level = 2
     speed = speed + 10
    }

 if (score > 85 && level == 2) {
enemy= enemy + 5
level = 3
}
 if (score > 115 && level == 3) {
enemy= enemy + 4
level = 4
}

}

    else {
      play.innerHTML = "Name? <input id=player><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()></button>"
      noLoop()
    }
  
    
}
function restart() { 
let player = document.getElementById("player")
		name = player.value 
		database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 60
		score = 0
        level=1
        speed=5
        enemy=8
        x=15
        y=10
		loop()
		play.innerHTML = ""
        generate_leaderboard()
}
function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 4) {
    let leaderboard = { }
    for (i=0; i<4; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }

  function generate_alltime_leaderboard() {
  	let alltime_leaderboard = { }
  	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
  		snapshot.forEach(function(data) {
  		alltime_leaderboard[data.key] = data.val()
  		});
      	});
  	if (Object.values(alltime_leaderboard).length > 0) {
  	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
      	}
  }

  generate_alltime_leaderboard()
  
}

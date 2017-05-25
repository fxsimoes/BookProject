function like(button) {
	button.parentNode.parentNode.appendChild(button.parentNode);
}


function dislike(button) {
	button.parentNode.parentNode.appendChild(button.parentNode);
}


// var button = document.getElementById("countlike");
// var parentDiv = button.parentNode;
// console.log(parentDiv);

// var button2 = document.getElementById("countdislike")
// var parentDiv2 = button2.parentNode;
// console.log(parentDiv2);

// var counterLike = 0;
// var buttonLike = document.getElementById("buttonLike");
// var parentDiv = buttonLike.parentNode;

// function LikeClicked(){
// 	counterLike++;
// 	console.log(counterLike);
// 	document.getElementById("countlike").innerHTML = counterLike;
// 	if(parentDiv.nextElementSibling)
//   		parentDiv.parentNode.insertBefore(parentDiv.nextElementSibling, parentDiv);
// }

// document.getElementById("countlike"	).innerHTML = counterLike;

// var counterDislike = 0;

// function DislikeClicked(){
// 	counterDislike++;
// 	console.log(counterDislike);
// 	document.getElementById("countdislike").innerHTML = counterDislike;
// }

// document.getElementById("countdislike").innerHTML = counterDislike;


// if(parentDiv.nextElementSibling)
//   parentDiv.parentNode.insertBefore(parentDiv.nextElementSibling, parentDiv);

// else if(parentDiv2.previousElementSibling)
// 	parentDiv2.parentNode.insertBefore(parentDiv2.previousElementSibling);

// var counter = 0;


// document.getElementById("counter").innerHTML= counter;

// function IncrementarContador(){
// 	counter++;
// 	document.getElementById("counter").innerHTML = counter;
// };

// var timer =0;
// var timerObject;
// var isRunning = false;


// document.getElementById("timer").innerHTML = timer;

// function startTimer(){
// 	if(!isRunning) {

// 		timerObject = setInterval(function(){
// 		timer++;
// 		document.getElementById("timer").innerHTML = timer;
// 	}, 1000);
// 		isRunning = true;
// 	}
// }
// function stopTimer(){
// 	clearInterval(timerObject);
// 	isRunning = false;
// }


// function CheckTimerStatus() {	while(isRunning){}
//  }

// var x = 1;
// var y = 2;

// console.log( x + y);
// console.log( x - y);
// console.log( x + y);
// console.log( x + y);

// var t = true;
// var f = false;

// console.log("Operações Logicas")

// console.log("AND")

// console.log( t && t);
// console.log( t && f);
// console.log( f && t);
// console.log( f && f);

// console.log("OR")

// console.log( t || t);
// console.log( t || f);
// console.log( f || t);
// console.log( f || f);
const command_cont = document.querySelector(".command-container");
const timer = document.querySelector(".timer");
const icons = document.querySelectorAll(".fa-solid");
const reaction_times_cont = document.querySelector(".reaction-times-container");
const avg_res_p1 = document.querySelector(".avg-res-p1");
const avg_res_p2 = document.querySelector(".avg-res-p2");
const win_cont = document.querySelector(".winning-container");
const start_btn = document.querySelector(".start-btn");
const reset_btn = document.querySelector(".reset-btn");

avg_res_p1.innerHTML = `Player 1 Average response Time: 0`;
avg_res_p2.innerHTML = `Player 2 Average response Time: 0`;

//setting the timer of 10s and we will collect response times under 10s.

let p1 = false;
let p2 = false;
let avg = 0;
let avg1,
  avg2 = 0; //for comparison who won

start_btn.addEventListener("click", () => {
  const commands = [
    "square",
    "circle",
    "umbrella",
    "tree",
    "house",
    "music-red",
    "tv",
    "mobile",
    "house-red",
    "music",
    "umbrella-blue",
    "tree-green",
  ];
  

  let rand_val = Math.floor(Math.random() * icons.length);    //when game starts a random value is generated
  command_cont.innerHTML = commands[rand_val];

  avg = 0; //for storing avg and setting it to specified player

  let seconds_playtime = 9;   //almost 10s gameplaytime
  seconds_for_spans = 0;

  // 1 sec timer
  let interval = setInterval(() => {
    if (seconds_playtime == 0) {
      timer.innerHTML = "Times up!";
      seconds_playtime = 9;
      clearInterval(interval);       //when times up we are clearing time interval
    } else {
      timer.innerHTML = `Timer: ${seconds_playtime}s`;    //else we are updating time
      seconds_playtime--;
    }
  }, 1000);



  //for checking response time with 0.1 seconds margin
  let interval2 = setInterval(() => {
    if (seconds_playtime == 0) {
      if(document.querySelectorAll(".react-time").length!=0){
      avg = (avg / document.querySelectorAll(".react-time").length).toFixed(2); //calculating avg
      if (p1 == false) {
        avg_res_p1.innerHTML = `Player 1 Average response  Time: ${avg}s`; //if p1 =false means not won or not set avg
        p1 = true;
        avg1 = avg;
      } else if (p1 == true) {
        avg_res_p2.innerHTML = `Player 2 Average response  Time: ${avg}s`; //if p1 avg already set then else is executed
        seconds_for_spans = 0;     // for storing new response time
        p2 = true;
        avg2 = avg;     //storing avg of player 2
        start_btn.disabled = true;   //after both players have played start is disabled
      }
      player.innerHTML = "Player 2 Turn:";
      reaction_times_cont.innerHTML = "";     // container which contains rection times this  is emptied
      seconds_for_spans = 0;
      if (avg1 != 0 && avg2 != 0 && avg1 < avg2 && avg1 != NaN) {   // guessing who won
        win_cont.innerHTML = "Player 1 won!";
      } else if (avg2 != 0 && avg2 != NaN) {
        win_cont.innerHTML = "Player 2 won!";
      }
      clearInterval(interval2);     //clearing second interval
    }

}
     else {
      seconds_for_spans += 100;
    }

  }, 100);

  //what happens when we click on each icon

  icons.forEach((i) => {
    i.addEventListener("click", () => {
      if (seconds_for_spans != "") {     //if response time is recorded and not empty means icon was clicked when game was started and response time started being recorded


        //now checking if player clicked the right icon which was asked else no response time is recorded
        if (i.getAttribute('data-value')==rand_val) {      
          let reaction_spans = document.createElement("span");
          reaction_spans.classList.add("react-time");
          reaction_spans.innerHTML = `Reaction Time 1: ${
            seconds_for_spans / 1000
          }`;
          avg = avg + seconds_for_spans / 1000;
          seconds_for_spans = 0;
          reaction_times_cont.insertAdjacentElement(
            "beforeend",
            reaction_spans
          );
      }

      rand_val = Math.floor(Math.random() * icons.length);
      command_cont.innerHTML = commands[rand_val];
      }
    });

  });
});


reset_btn.addEventListener("click", () => {
  window.location.reload();
});

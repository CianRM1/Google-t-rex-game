document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;

  function control(e) {
    if (e.code === "Space") {
      console.log("jump");
      jump();
    }
  }
  document.addEventListener("keydown", control);

  let position = 0;
  function jump() {
    isJumping === true;
    let count = 0;
    let timerId = setInterval(function () {
      //move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping === false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
        }, 20);
      }
      //move up
      position += 20;
      count++;
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePoistion = 1000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePoistion + "px";

      let timerId = setInterval(function () {
        if (obstaclePoistion > 0 && obstaclePoistion < 60 && position < 60) {
          clearInterval(timerId);
          alert.innerHTML = "Game Over";
          isGameOver = true;
          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }
        obstaclePoistion -= 10;
        obstacle.style.left = obstaclePoistion + "px";
      }, 20);
      setTimeout(generateObstacles, randomTime);
    }
  }

  generateObstacles();
});

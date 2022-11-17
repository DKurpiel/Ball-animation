const ball = document.querySelector('.ball');
const btn = document.querySelector('.btn-action');
const spring = document.querySelector('.spring');
const fill = document.querySelector('.fill');

const stretchSpring = () => {
  fill.style.animationName = "fill";
  fill.style.animationPlayState = "running";
  spring.style.animationPlayState = "running";
  btn.textContent = "Let go spring"
  // block click
  btn.removeEventListener('mousedown', stretchSpring);
  btn.removeEventListener('touchstart', stretchSpring);

}

const releaseSpring = () => {
  const fillStyles = getComputedStyle(fill);
  const fillWidth = parseInt(fillStyles.width, 10);
  const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
  const progressPercent = (fillWidth / barWidth).toFixed(2);

  btn.textContent = `The impact force is ${(progressPercent * 100).toFixed()}%`;
  fill.style.animationPlayState = 'paused';

  document.documentElement.style.setProperty("--power-x", `${(30 + progressPercent * 50)}%`);
  ball.style.animation = 'fly-ball-x 1s 1 forwards cubic-bezier(.17, .67, .6, 1), fly-ball-y 1s .15s 1 forwards linear'

  document.documentElement.style.setProperty("--spring-left", getComputedStyle(spring).left);
  spring.style.animation = 'release-spring .2s 1 forwards linear';

  btn.removeEventListener('mouseup', stretchSpring);
  btn.removeEventListener('touchend', stretchSpring);

  ball.addEventListener('animationend', resetAnimation);

}

const resetAnimation = () => {
  ball.removeEventListener('animationend', resetAnimation);

  setTimeout(() => {
    btn.addEventListener('mousedown', stretchSpring);
    btn.addEventListener('mouseup', releaseSpring);
    btn.addEventListener('touchstart', stretchSpring);
    btn.addEventListener('touchend', releaseSpring);
    btn.textContent = "Tighten the spring";

    spring.style.animation = "";
    ball.style.animation = "";
    fill.style.animationName = "none";
  }, 1000);



}

btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);
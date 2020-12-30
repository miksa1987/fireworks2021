export const Drawer = ({ canvas }) => {
  const ctx = canvas.getContext("2d");

  let bgImage = new Image(3000, 2000);
  bgImage.src = "bg.jpg";

  const setCanvasSize = () => {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 20;
  };

  const draw = (state) => {
    drawBg();
    drawInfo(state.soundOn, state.frequency);
    drawText();
    drawRockets(state.rockets);
    drawParticles(state.particles);
  };

  const drawBg = () => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  };

  const drawInfo = (soundOn, frequency) => {
    ctx.font = "17px Arial";
    ctx.fillStyle = "white";
    const soundText = soundOn ? "Sound ON" : "Sound OFF";
    const frequencyText = `Rocket frequency ${frequency}`;
    ctx.fillText(soundText, 20, 20);
    ctx.fillText(frequencyText, 20, 50);
  };

  const drawText = () => {
    ctx.font = "17px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Press S for sound and up/down arrows to control rocket frequency",
      20,
      canvas.height - 30
    );
  };

  const drawRockets = (rockets) => {
    rockets.forEach((rocket) => rocket.draw(ctx));
  };

  const drawParticles = (particles) => {
    particles.forEach((particle) => particle.draw(ctx));
  };

  return {
    draw,
    canvas,
    setCanvasSize,
    drawParticles,
    drawRockets,
    drawText,
    drawInfo,
    drawBg,
  };
};

import { FPS } from "./const";
import { Fireworks } from "./fireworks";
import { Drawer } from "./drawer";

(() => {
  const canvas = document.getElementById("canvas");
  const drawer = Drawer({ canvas });
  const fireworks = Fireworks({ drawer });
  drawer.setCanvasSize();
  setInterval(fireworks.update, 1000 / FPS);

  window.addEventListener("resize", () => drawer.setCanvasSize());
  window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 38:
        if (fireworks.state.frequency < 1) fireworks.increaseFrequency();
        break;
      case 40:
        if (fireworks.state.frequency > 0.035) fireworks.decreaseFrequency();
        break;
      case 83:
        fireworks.toggleSound();
        break;
    }
  });
})();

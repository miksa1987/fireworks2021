import { Rocket } from "./rocket";
import {
  ROCKET_FREQUENCY_MAX,
  ROCKET_FREQUENCY_MIN,
  ROCKET_DEFAULT_SPEED,
  ROCKET_SPEED_RANDOMIZER,
  ROCKET_DEFAULT_DIRECTION,
  ROCKET_DIRECTION_RANDOMIZER,
  ROCKET_MULTIPLE_PROBABILITY,
  ROCKET_MULTIPLE_BASE,
  ROCKET_MULTIPLE_RANDOMIZER,
  SIDE_PADDING,
  ROCKET_DEFAULT_LIFETIME,
} from "./const";

export const Fireworks = ({ drawer }) => {
  const state = {
    rockets: [],
    particles: [],
    soundOn: false,
    frequency: 0.03,
  };

  const createBang = () => {
    const audio = new Audio("bang.mp3");
    audio.play();
  };

  const update = () => {
    drawer.draw(state);

    updateParticles();
    updateRockets();

    state.particles = state.particles.filter((particle) => particle.alive);
    state.rockets = state.rockets.filter((rocket) => rocket.alive);
    maybeShootRockets();
  };

  const updateParticles = () => {
    state.particles.forEach((particle) => {
      particle.move();
      particle.update();
    });
  };

  const updateRockets = () => {
    state.rockets.forEach((rocket) => {
      rocket.move();
      rocket.update();

      if (rocket.alive === false) {
        const explode = () => {
          state.particles.push(...rocket.explode());
          if (state.soundOn) {
            createBang();
          }
        };

        for (let i = 0; i < rocket.explosions; i++) {
          explode();
        }
      }
    });
  };

  const maybeShootRockets = () => {
    const shootMultiple = Math.random() < ROCKET_MULTIPLE_PROBABILITY;
    const x =
      SIDE_PADDING + Math.random() * drawer.canvas.width - SIDE_PADDING * 2;
    const lifetime = drawer.canvas.height * ROCKET_DEFAULT_LIFETIME;

    if (Math.random() < state.frequency) {
      const shootRocket = () =>
        state.rockets.push(
          new Rocket({
            x,
            y: drawer.canvas.height,
            color: "white",
            direction:
              ROCKET_DEFAULT_DIRECTION +
              Math.random() * ROCKET_DIRECTION_RANDOMIZER,
            speed:
              ROCKET_DEFAULT_SPEED + Math.random() * ROCKET_SPEED_RANDOMIZER,
            lifetime,
          })
        );
      if (shootMultiple) {
        const numberOfRockets =
          Math.random() * ROCKET_MULTIPLE_RANDOMIZER + ROCKET_MULTIPLE_BASE;
        for (let i = 0; i < numberOfRockets; i++) {
          shootRocket();
        }
      } else {
        shootRocket();
      }
    }
  };

  const toggleSound = () => {
    state.soundOn = !state.soundOn;
  };

  const increaseFrequency = () => {
    if (state.frequency < ROCKET_FREQUENCY_MAX) state.frequency += 0.025;
  };

  const decreaseFrequency = () => {
    if (state.frequency > ROCKET_FREQUENCY_MIN) state.frequency -= 0.025;
  };

  return {
    state,
    drawer,
    update,
    createBang,
    updateRockets,
    updateParticles,
    maybeShootRockets,
    toggleSound,
    increaseFrequency,
    decreaseFrequency,
  };
};

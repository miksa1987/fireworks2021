import { Particle } from "./particle";
import {
  colors,
  MAX_EXPLOSIONS,
  MAX_EXPLOSION_SIZE,
  EXPLOSION_PARTICLES,
  EXPLOSION_SIZE_FACTOR,
  ROCKET_DEFAULT_LIFETIME,
  ROCKET_DEFAULT_SPEED,
  ROCKET_DEFAULT_DIRECTION,
} from "./const";

export class Rocket extends Particle {
  constructor({
    x,
    y,
    color,
    direction = ROCKET_DEFAULT_DIRECTION,
    speed = ROCKET_DEFAULT_SPEED,
    lifetime = ROCKET_DEFAULT_LIFETIME,
  }) {
    super(x, y, color, direction, speed);
    this.lifetime = lifetime;
    this.color = color;
    this.type = "rocket";
    this.explosions = Math.floor(Math.random() * MAX_EXPLOSIONS) + 1;

    while (this.lifetime > 100) {
      this.lifetime = this.lifetime - Math.random() * 10;
    }
  }

  explode() {
    let particles = [];
    const explosionSize = 1 + Math.random() * MAX_EXPLOSION_SIZE;
    const particleAmount =
      (EXPLOSION_PARTICLES + Math.random() * EXPLOSION_PARTICLES) *
      explosionSize *
      EXPLOSION_SIZE_FACTOR;

    const colorIdx = Math.floor(Math.random() * colors.length);
    const color = colors[colorIdx];

    for (let i = 0; i < particleAmount; i++) {
      particles.push(
        new Particle(
          this.x,
          this.y,
          color,
          Math.random() * 360,
          explosionSize + Math.random() * 2
        )
      );
    }

    return particles;
  }
}

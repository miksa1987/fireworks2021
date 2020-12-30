import { darken } from "polished";
import {
  GRAVITY,
  PARTICLE_DEFAULT_SPEED,
  PARTICLE_DEFAULT_LIFETIME,
  PARTICLE_DEFAULT_DIRECTION,
  PARTICLE_LIFETIME_RANDOMIZER,
  PARTICLE_LINE_LENGTH,
  PARTICLE_DARKENING,
  PARTICLE_MAX_SPEED,
  PARTICLE_MIN_SPEED_THRESHOLD,
  PARTICLE_MIN_SPEED,
  PARTICLE_RANDOM_MOVEMENT,
  PARTICLE_RANDOM_MOVEMENT_PROBABILITY,
  ROCKET_BOOST_INCREASE,
  ROCKET_TOO_LOW_SPEED_THRESHOLD,
  ROCKET_LIFETIME_INCREASE,
  SKY_UPPER_LIMIT,
  SKY_UPPER_LIMIT_RANDOMIZER,
  SKY_LOWER_LIMIT_FACTOR,
} from "./const";

export class Particle {
  constructor(
    x,
    y,
    color,
    direction = PARTICLE_DEFAULT_DIRECTION,
    speed = PARTICLE_DEFAULT_SPEED
  ) {
    this.lifetime =
      PARTICLE_DEFAULT_LIFETIME + Math.random() * PARTICLE_LIFETIME_RANDOMIZER;
    this.alive = true;
    this.x = x;
    this.y = y;
    this.color = color;
    this.direction = direction * (Math.PI / 180);
    this.angle = direction;
    this.speed = speed;
    this.movement = { x: 0, y: 0 };
    this.movement.x += this.speed * Math.cos(this.direction);
    this.movement.y -= this.speed * Math.sin(this.direction);
    this.type = "particle";
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - this.movement.x, this.y - this.movement.y);
    ctx.lineTo(
      this.x + this.movement.x * PARTICLE_LINE_LENGTH,
      this.y + this.movement.y * PARTICLE_LINE_LENGTH
    );
    ctx.stroke();
  }

  update() {
    this.lifetime--;

    if (this.type === "particle") {
      this.color = darken(PARTICLE_DARKENING, this.color);
    }
    if (
      this.type === "rocket" &&
      this.y < SKY_UPPER_LIMIT + Math.random() * SKY_UPPER_LIMIT_RANDOMIZER
    ) {
      this.lifetime = 0;
      this.alive = false;
    }
    if (this.lifetime < 0) {
      this.alive = false;
    }
  }

  move() {
    this.x += this.movement.x;
    this.y += this.movement.y;
    this.changeDirection();
    this.randomizeDirection();
  }

  randomizeDirection() {
    if (Math.random() < PARTICLE_RANDOM_MOVEMENT_PROBABILITY) {
      return;
    }

    const positive = Math.random() < 0.5;
    const xFactor = this.movement.x * PARTICLE_RANDOM_MOVEMENT * Math.random();
    this.movement.x = positive
      ? this.movement.x + xFactor
      : this.movement.x - xFactor;

    const yFactor = this.movement.y * PARTICLE_RANDOM_MOVEMENT * Math.random();
    this.movement.y = positive
      ? this.movement.y + yFactor
      : this.movement.y - yFactor;
  }

  changeDirection() {
    this.movement.x = this.movement.x * 1 - GRAVITY;

    if (
      this.movement.y > PARTICLE_MAX_SPEED ||
      this.movement.y < -PARTICLE_MAX_SPEED
    ) {
      return;
    }
    if (this.movement.y > 0) {
      this.movement.y = this.movement.y * (1 + GRAVITY);
    } else {
      this.movement.y = this.movement.y * (1 - GRAVITY);
    }

    if (
      this.movement.y < PARTICLE_MIN_SPEED_THRESHOLD &&
      this.movement.y > -PARTICLE_MIN_SPEED_THRESHOLD
    ) {
      this.movement.y = PARTICLE_MIN_SPEED;
    }
  }
}

export const MAX_ROTOR_SPEED = 78;
export function advanceRotor(speed, angle, powered, dt) {
  dt = Math.max(0, Math.min(dt, 0.1));
  const target = powered ? MAX_ROTOR_SPEED : 0;
  const tau = powered ? 0.34 : 1.1;
  const decay = Math.exp(-dt / tau);
  let nextSpeed = target + (speed - target) * decay;
  const delta = target * dt + (speed - target) * tau * (1 - decay);
  if (!powered && nextSpeed < 0.025) nextSpeed = 0;
  return { speed: nextSpeed, angle: (angle + delta) % (Math.PI * 2) };
}

export function motorLabel(speed, powered) {
  if (powered) return speed < MAX_ROTOR_SPEED * 0.95 ? "Starting" : "Running";
  return speed > 0 ? "Coasting" : "Idle";
}

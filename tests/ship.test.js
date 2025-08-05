import { ship } from '../src/ship.js'; 

describe('ship class', () => {
  test('initializes with correct properties', () => {
    const s = new ship(3);
    expect(s.length).toBe(3);
    expect(s.life).toBe(0);
    expect(s.sunk).toBe(false);
    expect(Array.isArray(s.location)).toBe(true);
  });

  test('hit() increases life', () => {
    const s = new ship(2);
    s.hit();
    expect(s.life).toBe(1);
    expect(s.sunk).toBe(false);
  });

  test('issunk() returns false when not fully hit', () => {
    const s = new ship(3);
    s.hit();
    s.hit();
    expect(s.issunk()).toBe(false);
  });

  test('issunk() returns true after enough hits', () => {
    const s = new ship(2);
    s.hit();
    s.hit();
    expect(s.issunk()).toBe(true);
    expect(s.sunk).toBe(true);
  });
});

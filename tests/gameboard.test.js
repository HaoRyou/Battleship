import { Gameboard } from '../src/gameboard.js';
import { ship } from '../src/ship.js';

describe('Gameboard', () => {
  test('places a ship and registers a hit and sunk', () => {
    const board = new Gameboard();

    // Place a ship of size 1 at (0, 0), facing right
    board.placeShip(1, 0, 0, 'right');

    // Validate that the ship is on the board at the correct location
    expect(board.board[0][0]).toBe(1);
    expect(board.numships.length).toBe(1);

    // Attack that location
    board.receiveAttack(0, 0);

    // Ship should be sunk, score should increase
    expect(board.score).toBe(1);
    expect(board.miss).toBe(0);
    expect(board.numships[0].sunk).toBe(true);
  });

  test('registers a miss when no ship is at target', () => {
    const board = new Gameboard();

    // Place a ship away from (5, 5)
    board.placeShip(2, 0, 0, 'right');

    board.receiveAttack(5, 5);

    expect(board.miss).toBe(1);
    expect(board.score).toBe(0);
  });

  test('match returns true when coordinates match a ship location', () => {
    const board = new Gameboard();
    board.placeShip(2, 1, 1, 'right');

    const shipLoc = board.numships[0].location[0];
    expect(board.match(shipLoc.x, shipLoc.y)).toBe(true);
    expect(board.match(9, 9)).toBe(false);
  });

  test('clearboard resets all ships and board', () => {
    const board = new Gameboard();
    board.placeShip(2, 0, 0, 'right');

    expect(board.numships.length).toBe(1);
    board.clearboard();

    expect(board.numships.length).toBe(0);
    expect(board.board[0][0]).toBe(0);
  });
});

import { player } from '../src/play.js';
import { Gameboard } from '../src/gameboard.js';

test('creates a player with correct title and Gameboard instance', () => {
    const p = new player('Alice');
    expect(p.title).toBe('Alice');
    expect(p.board).toBeInstanceOf(Gameboard);
});
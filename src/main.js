/*
Name: Jacky Chen
Game: Cloud Runner
Time Spent: 15 hours
Creative Tilt: One thing I am proud of is getting the finite state machine for my player to work, but we learned about that in class already.
If I had to choose something we didn't learn in class, I'd choose the way I spawned my objects on screen. I had them randomized in an interval,
which prevented overlapping objects and balanced which objects the player would see.
I think my general art was pretty bad, particularly the player sprite but it was very difficult to simulate running. I'm proud of the background
that I made because it was multiple images meaning I could layer them and attempt a parallax effect.
*/
const tileSize = 32;

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [ Menu, Credits, Play, GameOver]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyF,keyR,keyLEFT,keyRIGHT;
let cTrack = false;

const playerFunction = require("play-sound"); //function to initialize a new player (https://github.com/shime/play-sound/blob/master/index.js)

let files : string[] = [];
let player : any;
let directory = "";

/**
 * Initialize the playback system. 
 * @param dir The directory which contains the audio files.
 */
function initializeSound(dir : string) {
    directory = dir;
    player = playerFunction({});
}

function addSound(file : string) {
    files.push(file);
}

function getSound(index : number) {
    if (index < 0 || index >= files.length) { 
        return "No sound."
    }
    return files[index];
}

function clear() {
    files = [];
}

function playSound(index : number) {
    if (index < 0 || index >= files.length) {
        console.log("Index out of bounds, no sound played.");
        return;
    }
    player.play(directory + "/" + files[index], errorHandler);
}

function errorHandler(err : any) {
    if (err) {
        console.log("An error occurred while trying to play audio file under directory " + directory);
        throw err;
    }
}

export {playSound, initializeSound, addSound, getSound, clear};
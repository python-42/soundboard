import { addSound, clear } from "./sound";
import filesystem from "node:fs";

function addFilesToSound(directory : string) {
    clear();
    ensureDirectory(directory);
    const files = filesystem.readdirSync(directory, {encoding: "utf8"});
    for (let i = 0; i < files.length; i++) {
        if (files[i].substring(files[i].lastIndexOf(".")) == ".mp3") {
            addSound(files[i]);
        }
        
    }
}

function ensureDirectory(directory : string) {
    if (!filesystem.existsSync(directory)) {
        filesystem.mkdirSync(directory);
    }
}

export default addFilesToSound;
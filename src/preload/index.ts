const {contextBridge, ipcRenderer} = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    onUpdateUI: (callback : any) => {ipcRenderer.on("update-ui", (_event, value : string[]) => callback(value))},
    onUpdateWorkingDir: (callback : any) => {ipcRenderer.on("update-working-dir", (_event, value : string) => callback(value))}
});

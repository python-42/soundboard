import { electronApp, is } from '@electron-toolkit/utils'
import { app, BrowserWindow, globalShortcut, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import addFilesToSound from './file'
import { getSound, initializeSound, playSound } from './sound'

const workingDirectory = require("os").homedir() + "/Desktop/soundboard";;
let mainWindow : BrowserWindow;

function registerShortcuts() : void {
  globalShortcut.register("Control+Shift+Alt+Insert", () => playSound(0));
  globalShortcut.register("Control+Shift+Alt+Home", () => playSound(1));
  globalShortcut.register("Control+Shift+Alt+PageUp", () => playSound(2));
  globalShortcut.register("Control+Shift+Alt+Delete", () => playSound(3));
  globalShortcut.register("Control+Shift+Alt+End", () => playSound(4));
  globalShortcut.register("Control+Shift+Alt+PageDown", () => playSound(5));

  globalShortcut.register("Control+Shift+Alt+R", () => {
    addFilesToSound(workingDirectory);
    updateUI();
  });
}

function updateUI() : void {
  let sounds : string[] = [];
  for (let i = 0; i < 6; i++) {
    sounds.push(getSound(i));
  }
  mainWindow.webContents.send("update-ui", sounds);
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    updateUI();
    mainWindow.webContents.send("update-working-dir", workingDirectory);
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  initializeSound(workingDirectory);
  addFilesToSound(workingDirectory);
  registerShortcuts();

  createWindow()
});

const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require("path");
require('./rpc'); // Load Discord Rich Presence

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: false,
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "items/images/icon.ico") // 👈 set icon here
  })

  win.loadFile('index.html')

  win.setMenuBarVisibility(false);
}

// Open version selector window
ipcMain.on("open-version-window", () => {
  const versionWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: true,
    icon: path.join(__dirname, "items/images/icon.ico"), // 👈 set icon here
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  versionWindow.loadFile("manage.html");

    versionWindow.setMenuBarVisibility(false);
});

// When user chooses version
ipcMain.on("version-chosen", (event, version) => {
  // Map version names to URLs
  const versionURLs = {
    "1.12.2": "https://eaglercraft.com/mc/1.12.2/",
    "1.8.8": "https://eaglercraft.com/mc/1.8.8/",
    "1.5.2": "https://eaglercraft.com/mc/1.5.2/"
  };

  const url = versionURLs[version];

  if (url) {
    const gameWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: false, // security: no Node in game window
        contextIsolation: true
      }
    });

    gameWindow.loadURL(url);
  }
});

  ipcMain.on("close-window", () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
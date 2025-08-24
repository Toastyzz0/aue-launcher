const RPC = require('discord-rpc');
const clientId = '1408882915097706566';

const rpc = new RPC.Client({ transport: 'ipc' });

const startTimestamp = new Date();

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'Playing Eaglercraft',
    state: 'Using AUE Launcher.',
    startTimestamp,
    largeImageKey: 'logo', // Set in Discord Developer Portal
    largeImageText: 'AUE Launcher',
    smallImageKey: 'icon',
    smallImageText: 'Eaglercraft',
    instance: false,
  });
});

rpc.login({ clientId }).catch(console.error);
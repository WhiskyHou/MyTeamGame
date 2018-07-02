import * as electron from 'electron'

export function run() {
    electron.remote.Menu.setApplicationMenu(null);
}


/**
 * 系统托盘
 */

import { app, Tray, Menu, ipcMain } from 'electron';
import { focusAppWin } from './browserWindow';
import { getIcon, appName } from './utils';

const init = () => {
  const tray = new Tray(getIcon('favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click() {
        app.exit();
      },
    },
  ]);
  tray.setToolTip(appName);
  tray.setContextMenu(contextMenu);
  tray.on('click', focusAppWin);

  ipcMain.on('display-balloon', (e, { title, content }) => {
    tray.displayBalloon({ title, content, noSound: true, iconType: 'none', icon: getIcon('favicon.ico') });
  });
};

app.whenReady().then(init);

/**
 * electron entry
 */

import { app } from "electron";
import { createBrowserWindow } from "./browserWindow";
import "./listeners";
import "./tray";

app.on("window-all-closed", () => {});
app.whenReady().then(() => createBrowserWindow());

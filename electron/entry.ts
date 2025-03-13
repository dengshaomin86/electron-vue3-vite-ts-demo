/**
 * electron entry
 */

import { app } from "electron";
import { createBrowserWindow } from "./browserWindow";
import "./listeners";
import "./tray";
import "./update";

app.on("window-all-closed", () => {});
app.whenReady().then(() => createBrowserWindow());

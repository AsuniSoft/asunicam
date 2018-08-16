/*
 *  Asunicam
 *  Copyright (C) 2018  Asuni
 *  https://www.asuni.com
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


// configuration file will be placed at -> %APPDATA%/asunicam/config.json
const camera = require('./camera.js');
const Configuration = require('electron-config');
const config = new Configuration();

let devices = null; // array with the detected devices

// check the connected devices (async, promise type)
camera.getDevices().then(selectDevice);

// keyboard inputs
document.addEventListener('keydown', event => {
    // exit app with escape key
    if (event.key === 'Escape' || event.keyCode === 27) {
        window.close();
    }

    if (event.keyCode > 47 && event.keyCode < 58) {
        // numbers between 0 and 9 to change between video devices
        if (devices !== null) {
            var index = parseInt(event.key) - 1;
            if (devices[index]) {
                config.set('deviceId', devices[index].deviceId);
                startCamera(devices[index].deviceId);
            }
        }
    }
});

function startCamera(deviceId) {
    document.getElementById('errorMessage').style = 'display: none;';
    document.getElementById('selectMessage').style = 'display: none;';
    document.getElementById('video').style = 'display: show;';
    camera.record(deviceId);
}

function selectDevice(deviceList) {
    if (deviceList.length > 0) {
        devices = deviceList;

        if (config.get('deviceId')) {
            // just delete config file to avoid start this camera
            startCamera(config.get('deviceId'));
        } else {
            if (deviceList.length === 1) {
                // if just 1 device detected, fire it
                startCamera(deviceList[0].deviceId);
            } else {
                // show simple list of detected devices (use numbers to select)
                document.getElementById('selectMessage').style = 'display: show;';

                for (var i = 0; i < deviceList.length; i++) {
                    var node = document.createElement("li");
                    var textnode = document.createTextNode((i + 1) + " - " + deviceList[i].label);
                    node.appendChild(textnode);
                    document.getElementById("selectionList").appendChild(node);
                }
            }
        }
    } else {
        document.getElementById('errorMessage').style = 'display: show;';
    }
}

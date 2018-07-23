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

// camera default config
const constraints = {
    audio: false,
    facingMode: { exact: "user" }, // facing toward the user
    video: {
        /// by default FullHD (ideal), max. 4k
        width: { min: 1280, ideal: 1920, max: 4096 },
        height: { min: 720, ideal: 1080, max: 2160 }
    },
};

function startRecord(inDevId) {
    const videoElement = document.getElementById('video');
    navigator.getUserMedia = navigator.webkitGetUserMedia;
    constraints.video.deviceId = inDevId;

    navigator.getUserMedia(
        constraints,
        stream => videoElement.src = window.URL.createObjectURL(stream),
        error => console.error(error)
    );
}

function getVideoDevices() {
    return navigator.mediaDevices.enumerateDevices().then(devices => devices.filter(dev => dev.kind === "videoinput"));
}

// export nodejs modules
exports.record = (r) => startRecord(r);
exports.getDevices = (r) => getVideoDevices();

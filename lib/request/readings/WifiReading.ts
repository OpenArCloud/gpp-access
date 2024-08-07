/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { Reading } from './Reading';
import { Privacy } from '../Privacy'

/**
 * Structure for a Wifi sensor reading
 */
export class WifiReading extends Reading {
    protected wifiReading: {
        BSSID: string;
        frequency: number;
        RSSI: number;
        SSID: string;
        scanTimeStart: string;
        scanTimeEnd: string;
        scanTimeStop?: string;

        // TODO: move to parent class and find a way to fixup toJSON
        timestamp: number; // The number of milliseconds since the Unix Epoch.
        sensorId: string;
        privacy: Privacy;
    };

    /**
     * Constructor, setting the required properties
     *
     * @param bssid  String  The bssid of the network
     * @param frequency  Number
     * @param rssi  Number
     * @param ssid  String  The ssid of the network
     * @param scanTimeStart  String
     * @param scanTimeEnd  String
     */
    constructor(bssid: string, frequency: number, rssi: number, ssid: string, scanTimeStart: string, scanTimeEnd: string, timestamp: number, sensorId: string, privacy: Privacy) {
        super(timestamp, sensorId, privacy)
        this.wifiReading = {
            BSSID: bssid,
            frequency: frequency,
            RSSI: rssi,
            SSID: ssid,
            scanTimeStart: scanTimeStart,
            scanTimeEnd: scanTimeEnd,

            // TODO: move to parent class and find a way to fixup toJSON
            timestamp: timestamp, // The number of milliseconds since the Unix Epoch.
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get bssid() {
        return this.wifiReading.BSSID;
    }

    set bssid(bssid) {
        this.wifiReading.BSSID = bssid;
    }

    get frequency() {
        return this.wifiReading.frequency;
    }

    set frequency(frequency) {
        this.wifiReading.frequency = frequency;
    }

    get RSSI() {
        return this.wifiReading.RSSI;
    }

    set RSSI(rssi) {
        this.wifiReading.RSSI = rssi;
    }

    get SSID() {
        return this.wifiReading.SSID;
    }

    set SSID(ssid) {
        this.wifiReading.SSID = ssid;
    }

    get scanTimeStart() {
        return this.wifiReading.scanTimeStart;
    }

    set scanTimeStart(start) {
        this.wifiReading.scanTimeStart = start;
    }

    get scanTimeStop() {
        return this.wifiReading.scanTimeStop;
    }

    set scanTimeStop(stop) {
        this.wifiReading.scanTimeStop = stop;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.wifiReading | keyof typeof this.reading | '' | 'wifiReading' | number) {
        if (typeof key === "number")
            return this.wifiReading;
        if (key === '' || key === 'wifiReading')
            return this.wifiReading;
        if (this.wifiReading[key as keyof typeof this.wifiReading] != undefined)
            return this.wifiReading[key as keyof typeof this.wifiReading];
        if (this.reading[key as keyof typeof this.reading] != undefined)
            return this.reading[key as keyof typeof this.reading];
        throw TypeError("WifiReading object has no key " + key);
    }
}

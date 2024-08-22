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
 * Structure for a bluetooth sensor reading
 */
export class BluetoothReading extends Reading {
    protected bluetoothReading;

    /**
     * Constructor, setting the required properties
     *
     * @param address  String  address from the sensor
     * @param rssi  Number  rssi from the sensor
     * @param name  String  name of the sensor
     */
    constructor(address: string, rssi: number, name: string, timestamp: number, sensorId: string, privacy: Privacy) {
        super(timestamp, sensorId, privacy)
        this.bluetoothReading = {
            address: address,
            RSSI: rssi,
            name: name,

            // TODO: move to parent class and find a way to fixup toJSON
            timestamp: timestamp, // The number of milliseconds since the Unix Epoch.
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get address() {
        return this.bluetoothReading.address;
    }

    set address(address) {
        this.bluetoothReading.address = address;
    }

    get rssi() {
        return this.bluetoothReading.RSSI;
    }

    set rssi(rssi) {
        this.bluetoothReading.RSSI = rssi;
    }

    get name() {
        return this.bluetoothReading.name;
    }

    set name(name) {
        this.bluetoothReading.name = name;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.bluetoothReading | keyof typeof this.reading | '' | 'bluetoothReading' | number) {
        //NOTE: numeric indices may come here as keys because this object is stored in an array
        //const isNumericKey = (typeof key === "number") // TODO: this does not work for array indices
        const isNumericKey = !isNaN(parseFloat(String(key))) && isFinite(Number(key));
        if (isNumericKey)
            return this.bluetoothReading;

        if (key === '' || key === 'bluetoothReading')
            return this.bluetoothReading;
        if (this.bluetoothReading[key as keyof typeof this.bluetoothReading] != undefined)
            return this.bluetoothReading[key as keyof typeof this.bluetoothReading];
        if (this.reading[key as keyof typeof this.reading] != undefined)
            return this.reading[key as keyof typeof this.reading];
        throw TypeError("BluetoothReading object has no key " + key);
    }
}

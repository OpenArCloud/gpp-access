/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { Reading } from './Reading'
import { Privacy } from '../Privacy'

export class XyzReading extends Reading {
    protected xyzReading: {
        x: number;
        y: number;
        z: number;

        // TODO: move to parent class and find a way to fixup toJSON
        timestamp: number; // The number of milliseconds since the Unix Epoch.
        sensorId: string;
        privacy: Privacy;
    };

    constructor(x: number, y: number, z: number, timestamp: number, sensorId: string, privacy: Privacy) {
        super(timestamp, sensorId, privacy)
        this.xyzReading = {
            x: x,
            y: y,
            z: z,

            // TODO: move to parent class and find a way to fixup toJSON
            timestamp: timestamp, // The number of milliseconds since the Unix Epoch.
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get x() {
        return this.xyzReading.x;
    }

    set x(x) {
        this.xyzReading.x = x;
    }

    get y() {
        return this.xyzReading.y;
    }

    set y(y) {
        this.xyzReading.y = y;
    }

    get z() {
        return this.xyzReading.z;
    }

    set z(z) {
        this.xyzReading.x = z;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.xyzReading | keyof typeof this.reading | '' | 'xyzReading' | number) {
        if (typeof key === "number")
            return this.xyzReading;
        if (key === '' || key === 'xyzReading')
            return this.xyzReading;
        if (this.xyzReading[key as keyof typeof this.xyzReading] != undefined)
            return this.xyzReading[key as keyof typeof this.xyzReading];
        if (this.reading[key as keyof typeof this.reading] != undefined)
            return this.reading[key as keyof typeof this.reading];
        throw TypeError("XyzReading object has no key " + key);
    }
}

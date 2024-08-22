/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { Privacy } from '../Privacy';

export class Reading {
    protected reading :{
        timestamp: number; // The number of milliseconds since the Unix Epoch.
        sensorId: string;
        privacy: Privacy;
    }

    constructor(timestamp: number = new Date().getTime(), sensorId: string = "", privacy: Privacy = new Privacy()) {
        this.reading = {
            timestamp: timestamp,
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get timestamp() {
        return this.reading.timestamp;
    }

    set timestamp(t: number) {
        this.reading.timestamp = t;
    }

    get sensorId() {
        return this.reading.sensorId;
    }

    set sensorId(id: string) {
        this.reading.sensorId = id;
    }

    get privacy() {
        return this.reading.privacy;
    }

    set privacy(p: Privacy) {
        this.reading.privacy = p;
    }

    // no toJSON method in this class
}

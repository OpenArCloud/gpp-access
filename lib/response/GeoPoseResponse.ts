/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { GeoPose } from '../response/GeoPose'

const DEFAULTTYPE = 'geopose';

export class GeoPoseAccuracy {
    position: number = Number.MAX_VALUE;  // mean for all components in meters
    orientation: number = Number.MAX_VALUE; // mean for all 3 angles in degrees
}

export class GeoPoseResponse {
    id: string;
    timestamp: number;  //  The number of milliseconds* since the Unix Epoch.
    accuracy: GeoPoseAccuracy;
    type: string; //ex. geopose
    geopose: GeoPose;

    constructor(id: string, timestamp: number, accuracy: GeoPoseAccuracy = new GeoPoseAccuracy(), type: string = DEFAULTTYPE, geopose: GeoPose) {
        this.id = id;
        this.timestamp = timestamp;
        this.accuracy = accuracy;
        this.type = type;
        this.geopose = geopose;
    }
}

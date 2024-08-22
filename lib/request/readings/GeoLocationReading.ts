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
 * Structure for a Geolocation sensor reading
 */
export class GeoLocationReading extends Reading {
    protected geolocationReading: {
        latitude: number;
        longitude: number;
        altitude: number;
        accuracy: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;

        // TODO: move to parent class and find a way to fixup toJSON
        timestamp: number; // The number of milliseconds since the Unix Epoch.
        sensorId: string;
        privacy: Privacy;
    }

    /**
     * Constructor, setting the required properties
     *
     * @param lat  Number  latitude in decimal degrees
     * @param lon  Number  longitude in decimal degrees
     * @param alt  Number  Height of the position, specified in meters above the [WGS84] ellipsoid
     * @param accuracy  Number  Denotes the accuracy level of the latitude and longitude coordinates in meters. Value
     *      MUST be a non-negative real number
     * @param altAccuracy  Number  Denotes the accuracy level of the altitude in meters. Value MUST be a non-negative
     *      real number
     * @param heading  Number  Denotes the direction of travel of the hosting device and is specified in degrees, where
     *      0° ≤ heading < 360°, counting clockwise relative to the true north. If the hosting device is stationary
     *      (i.e. the value of the speed attribute is 0), then the value of the heading attribute MUST be NaN
     * @param speed  Number  Denotes the magnitude of the horizontal component of the hosting device's current velocity
     *      and is specified in meters per second. MUST be a non-negative real number.
     */
    constructor(lat: number, lon: number, alt: number, accuracy: number, altAccuracy: number, heading: number, speed: number, timestamp: number, sensorId: string, privacy: Privacy) {
        super(timestamp, sensorId, privacy)
        this.geolocationReading = {
            latitude: lat,
            longitude: lon,
            altitude: alt,
            accuracy: accuracy,
            altitudeAccuracy: altAccuracy,
            heading: heading,
            speed: speed,

            // TODO: move to parent class and find a way to fixup toJSON
            timestamp: timestamp, // The number of milliseconds since the Unix Epoch.
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get latitude() {
        return this.geolocationReading.latitude;
    }

    set latitude(lat) {
        this.geolocationReading.latitude = lat;
    }

    get longitude() {
        return this.geolocationReading.longitude;
    }

    set longitude(lon) {
        this.geolocationReading.longitude = lon;
    }

    get altitude() {
        return this.geolocationReading.altitude;
    }

    set altitude(alt) {
        this.geolocationReading.altitude = alt;
    }

    get accuracy() {
        return this.geolocationReading.accuracy;
    }

    set accuracy(accuracy) {
        this.geolocationReading.accuracy = accuracy;
    }

    get altitudeAccuracy() {
        return this.geolocationReading.altitudeAccuracy;
    }

    set altitudeAccuracy(accuracy) {
        this.geolocationReading.altitudeAccuracy = accuracy;
    }

    get heading() {
        return this.geolocationReading.heading;
    }

    set heading(heading) {
        this.geolocationReading.heading = heading;
    }

    get speed() {
        return this.geolocationReading.speed;
    }

    set speed(speed) {
        this.geolocationReading.speed = speed;
    }


    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.geolocationReading | keyof typeof this.reading | '' | 'geolocationReading' | number) {
        //NOTE: numeric indices may come here as keys because this object is stored in an array
        //const isNumericKey = (typeof key === "number") // TODO: this does not work for array indices
        const isNumericKey = !isNaN(parseFloat(String(key))) && isFinite(Number(key));
        if (isNumericKey)
            return this.geolocationReading;

        if (key === '' || key === 'geolocationReading')
            return this.geolocationReading;
        if (this.geolocationReading[key as keyof typeof this.geolocationReading] != undefined)
            return this.geolocationReading[key as keyof typeof this.geolocationReading];
        if (this.reading[key as keyof typeof this.reading] != undefined)
            return this.reading[key as keyof typeof this.reading];
        throw TypeError("GeolocationReading object has no key " + key);
    }
}

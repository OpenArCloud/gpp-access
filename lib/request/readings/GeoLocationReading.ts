/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

/**
 * Structure for a Geolocation sensor reading
 */
export class GeoLocationReading {
    private reading;
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
    constructor(lat: number, lon: number, alt: number, accuracy: number, altAccuracy: number, heading: number, speed: number) {
        this.reading = {
            latitude: lat,
            longitude: lon,
            altitude: alt,
            accuracy: accuracy,
            altitudeAccuracy: altAccuracy,
            heading: heading,
            speed: speed,
        };
    }

    get latitude() {
        return this.reading.latitude;
    }

    set latitude(lat) {
        this.reading.latitude = lat;
    }

    get longitude() {
        return this.reading.longitude;
    }

    set longitude(lon) {
        this.reading.longitude = lon;
    }

    get altitude() {
        return this.reading.altitude;
    }

    set altitude(alt) {
        this.reading.altitude = alt;
    }

    get accuracy() {
        return this.reading.accuracy;
    }

    set accuracy(accuracy) {
        this.reading.accuracy = accuracy;
    }

    get altitudeAccuracy() {
        return this.reading.altitudeAccuracy;
    }

    set altitudeAccuracy(accuracy) {
        this.reading.altitudeAccuracy = accuracy;
    }

    get heading() {
        return this.reading.heading;
    }

    set heading(heading) {
        this.reading.heading = heading;
    }

    get speed() {
        return this.reading.speed;
    }

    set speed(speed) {
        this.reading.speed = speed;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.reading | '' | 'reading') {
        if (key !== '' && key !== 'reading') return this.reading[key];
        else return this.reading;
    }
}

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { AccelerometerReading } from './readings/AccelerometerReading';
import { BluetoothReading } from './readings/BluetoothReading';
import { CameraReading } from './readings/CameraReading';
import { GeoLocationReading } from './readings/GeoLocationReading';
import { GyroscopeReading } from './readings/GyroscopeReading';
import { MagnetometerReading } from './readings/MagnetometerReading';
import { WifiReading } from './readings/WifiReading';


/**
 * Structure for the data of the sensors defined in the Sensor structure.
 */
export class SensorReadings {
    private sensorReadings : {
        accelerometerReadings? : undefined | AccelerometerReading[];
        bluetoothReadings? : BluetoothReading[] | undefined;
        cameraReadings? : CameraReading[] | undefined;
        geoLocationReadings? : GeoLocationReading[] | undefined;
        gyroscopeReadings? : GyroscopeReading[] | undefined;
        magnetometerReadings? : MagnetometerReading[] | undefined;
        wifiReadings? : WifiReading[] | undefined;
    }

    /**
     * Constructor, setting the required properties
     *
     * @param sensorId  String  Id of the Sensor object this reading belongs to
     * @param timestamp  Optional, timestamp of the reading
     */
    constructor() {
        this.sensorReadings = {
            accelerometerReadings: undefined,
            bluetoothReadings: undefined,
            cameraReadings: undefined,
            geoLocationReadings: undefined,
            gyroscopeReadings: undefined,
            magnetometerReadings: undefined,
            wifiReadings: undefined,
        }
    }

    get accelerometerReadings() {
        return this.sensorReadings.accelerometerReadings;
    }

    set accelerometerReadings(accelerometerReadings: AccelerometerReading[] | undefined) {
        this.sensorReadings.accelerometerReadings = accelerometerReadings;
    }

    get bluetoothReadings() {
        return this.sensorReadings.bluetoothReadings;
    }

    set bluetoothReadings(bluetoothReadings: BluetoothReading[] | undefined) {
        this.sensorReadings.bluetoothReadings = bluetoothReadings;
    }

    get cameraReadings() {
        return this.sensorReadings.cameraReadings;
    }

    set cameraReadings(cameraReadings: CameraReading[] | undefined) {
        this.sensorReadings.cameraReadings = cameraReadings;
    }

    get geoLocationReadings() {
        return this.sensorReadings.geoLocationReadings;
    }

    set geoLocationReadings(geoLocationReadings: GeoLocationReading[] | undefined) {
        this.sensorReadings.geoLocationReadings = geoLocationReadings;
    }

    get gyroscopeReadings() {
        return this.sensorReadings.gyroscopeReadings;
    }

    set gyroscopeReadings(gyroscopeReadings: GyroscopeReading[] | undefined) {
        this.sensorReadings.gyroscopeReadings = gyroscopeReadings;
    }

    get magnetometerReadings() {
        return this.sensorReadings.magnetometerReadings;
    }

    set magnetometerReadings(magnetometerReadings: MagnetometerReading[] | undefined) {
        this.sensorReadings.magnetometerReadings = magnetometerReadings;
    }

    get wifiReadings() {
        return this.sensorReadings.wifiReadings;
    }

    set wifiReadings(wifiReadings: WifiReading[] | undefined) {
        this.sensorReadings.wifiReadings = wifiReadings;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.sensorReadings | '' | 'sensorReadings') {
        if (key === '' || key === 'sensorReadings')
            return this.sensorReadings;
        return this.sensorReadings[key];
    }
}

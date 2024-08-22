/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { Privacy } from './Privacy';
import { Sensor } from './Sensor';
import { SensorReadings } from './SensorReadings';
import { SENSORTYPE } from '../GppGlobals';
import { CameraReading } from './readings/CameraReading';
import { GeoLocationReading } from './readings/GeoLocationReading';
import { AccelerometerReading } from './readings/AccelerometerReading';
import { BluetoothReading } from './readings/BluetoothReading';
import { GyroscopeReading } from './readings/GyroscopeReading';
import { MagnetometerReading } from './readings/MagnetometerReading';
import { WifiReading } from './readings/WifiReading';
import { CameraParam } from './options/CameraParam';
import { ImageOrientation } from './options/ImageOrientation';
import { GeoPoseResponse } from '../response/GeoPoseResponse';

const DEFAULTTYPE = 'geopose';

/**
 * Root class of a GeoPose request, used to request a GeoPose based on the provided sensor data
 *
 * Implementation based on the GeoPose request protocoll as defined by Open AR Cloud.
 */
export class GeoPoseRequest {
    private internal: {
        id: string;
        timestamp: number;  // The number of milliseconds since the Unix Epoch.
        type: string;
        sensors: Sensor[];
        sensorReadings: SensorReadings;
        priorPoses?: GeoPoseResponse[]; //previous geoposes, if known
    };

    private idGen;
    /**
     * Constructor, setting the required properties
     *
     * @param id  String  ?
     * @param type  Type of the request. 'geopose' by default
     * @param timestamp  timestamp as the number of milliseconds since epoch
     */
    constructor(id: string, type = DEFAULTTYPE, timestamp = new Date().getTime()) {
        this.internal = {
            id: id,
            timestamp: timestamp,
            type: type,
            sensors: [],
            sensorReadings: new SensorReadings(),
        };
        this.idGen = this.idGenerator();
    }

    get id() {
        return this.internal.id;
    }

    set id(id) {
        this.internal.id = id;
    }

    get timestamp() {
        return this.internal.timestamp;
    }

    set timestamp(timestamp) {
        this.internal.timestamp = timestamp;
    }

    get type() {
        return this.internal.type;
    }

    set type(type) {
        this.internal.type = type;
    }

    get sensors() {
        return this.internal.sensors;
    }
    // no set sensors!

    get sensorReadings() {
        return this.internal.sensorReadings;
    }
    // no set sensorReadings!

    public generateNewSensorId() {
        return this.idGen.next().value;
    }

    private verifySensor(sensorId: string, sensorType: string) {
        let found = false;
        this.internal.sensors.forEach((sensor, index) => {
            if (sensor.id == sensorId) {
                found = true;
                if (sensor.type != sensorType ) {
                    throw new Error('Sensor type is wrong!');
                }
            }
        });
        if (!found) {
            throw new Error('Sensor ID not known yet! Please add the Sensor first');
        }
    }

    /**
     * Add a new Sensor to the GeoPoseRequest
     * This method must be called before a SensorReading of the same type can be added to the request.
     *
     * @param sensor  Sensor  The Sensor to add
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addSensor(sensor: Sensor) {
        if (this.internal.sensors === undefined) {
            this.internal.sensors = [];
        }

        if (this.internal.sensors.filter((item) => item.id === sensor.id).length !== 0)
            throw new Error('A sensor with ID ' + sensor.id + ' was already added. Sensor IDs must to be unique in a request');

        this.internal.sensors.push(sensor);
        //console.log("Added sensor: ")
        //console.log(JSON.stringify(sensor))
        return this;
    }

    /**
     * Convenience method for adding an accelerator sensor reading to the request
     *
     * @param x  Number  Acceleration of the device along the device's x axis
     * @param y  Number  Acceleration of the device along the device's y axis
     * @param z  Number  Acceleration of the device along the device's z axis
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addAccelerometerData(x: number, y: number, z: number, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.accelerometer);

        if (this.internal.sensorReadings.accelerometerReadings === undefined)
            this.internal.sensorReadings.accelerometerReadings = [];

        const reading = new AccelerometerReading(x, y, z, timestamp, sensorId, privacy);
        this.internal.sensorReadings.accelerometerReadings.push(reading);
        return this;
    }

    /**
     * Convenience method for adding a bluetooth sensor reading to the request
     *
     * @param address  String  address from the sensor
     * @param rssi  Number  rssi from the sensor
     * @param name  String  name of the sensor
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addBluetoothData(address: string, rssi: number, name: string, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.bluetooth);

        if (this.internal.sensorReadings.bluetoothReadings === undefined)
            this.internal.sensorReadings.bluetoothReadings = [];

        const reading = new BluetoothReading(address, rssi, name, timestamp, sensorId, privacy);
        this.internal.sensorReadings.bluetoothReadings.push(reading);
        return this;
    }

    /**
     *  Convenience method for adding an image to the request
     *
     * @param imageFormat  String  The format of the image data. Possible values are available with IMAGEFORMAT global
     * @param size  String[]  Vector2 with the dimensions of the image
     * @param imageBytes  String  The base64 encoded image data
     * @param imageOrientation  ImageOrientation  The orientation of the image, defined with an ImageOrientation object
     * @param sequenceNumber  Number  Sequence of the image. Default is 0
     * @param cameraParams CameraParam  optional camera parameters as a CameraParam object
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addCameraData(
        imageFormat: string,
        size: number[],
        imageBytes: string,
        sequenceNumber: number = 0,
        imageOrientation: ImageOrientation | undefined = undefined,
        cameraParams: CameraParam | undefined = undefined,
        timestamp: number,
        sensorId: string,
        privacy: Privacy
    ) {
        this.verifySensor(sensorId, SENSORTYPE.camera);

        if (this.internal.sensorReadings.cameraReadings === undefined)
            this.internal.sensorReadings.cameraReadings = [];

        const reading = new CameraReading(imageFormat, size, imageBytes, sequenceNumber, imageOrientation, cameraParams, timestamp, sensorId, privacy);
        this.internal.sensorReadings.cameraReadings.push(reading);
        return this;
    }

    /**
     * Convenience method for adding location sensor data to the request. Values need to be based on WGS84
     *
     * @param latAngle  Number  latitude in decimal degrees
     * @param lonAngle  Number  longitude in decimal degrees
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
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addGeoLocationData(latAngle: number, lonAngle: number, alt: number, accuracy: number, altAccuracy: number, heading: number, speed: number, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.geolocation);

        if (this.internal.sensorReadings.geoLocationReadings === undefined)
            this.internal.sensorReadings.geoLocationReadings = [];

        const id = this.idGen.next().value;
        const reading = new GeoLocationReading(latAngle, lonAngle, alt, accuracy, altAccuracy, heading, speed, timestamp, sensorId, privacy);
        this.internal.sensorReadings.geoLocationReadings.push(reading);
        return this;
    }

    /**
     * Convenience method for adding Gyroscope data to the request
     *
     * @param x  Number  Angular velocity of the device along the device's x axis
     * @param y  Number  Angular velocity of the device along the device's y axis
     * @param z  Number  Angular velocity of the device along the device's z axis
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addGyroscopeData(x: number, y: number, z: number, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.gyroscope);

        if (this.internal.sensorReadings.gyroscopeReadings === undefined)
            this.internal.sensorReadings.gyroscopeReadings = [];


        const reading = new GyroscopeReading(x, y, z, timestamp, sensorId, privacy);
        this.internal.sensorReadings.gyroscopeReadings.push(reading);
        return this;
    }

    /**
     * Convenience method for adding Magnetometer data to the request
     *
     * @param x  Number  Magnetic field around the device's x axis
     * @param y  Number  Magnetic field around the device's y axis
     * @param z  Number  Magnetic field around the device's z axis
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addMagnetometerData(x: number, y: number, z: number, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.magnetometer);

        if (this.internal.sensorReadings.magnetometerReadings === undefined)
            this.internal.sensorReadings.magnetometerReadings = [];

        const reading = new MagnetometerReading(x, y, z, timestamp, sensorId, privacy);
        this.internal.sensorReadings.magnetometerReadings.push(reading);
        return this;
    }

    /**
     * Convenience method for adding Wifi data to the request
     *
     * @param bssid  String  The bssid of the network
     * @param frequency  Number
     * @param rssi  Number
     * @param ssid  String  The ssid of the network
     * @param scanTimeStart  String
     * @param scanTimeEnd  String
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addWifiData(bssid: string, frequency: number, rssi: number, ssid: string, scanTimeStart: string, scanTimeEnd: string, timestamp: number, sensorId: string, privacy: Privacy) {
        this.verifySensor(sensorId, SENSORTYPE.wifi);

        if (this.internal.sensorReadings.wifiReadings === undefined)
            this.internal.sensorReadings.wifiReadings = [];

        const reading = new WifiReading(bssid, frequency, rssi, ssid, scanTimeStart, scanTimeEnd, timestamp, sensorId, privacy);
        this.internal.sensorReadings.wifiReadings.push(reading);
        return this;
    }

    /**
     * Delete the Sensor and SensorReading properties from the object
     */
    clearSensorData() {
        this.internal.sensors = [];
        this.internal.sensorReadings = new SensorReadings();
    }

    /**
     * Request the registered prior GeoPoseResponse(s) received from the selected GeoPose service
     *
     * @returns {GeoPoseResponse[]}  Array of the registered objects
     */
    get priorPoses() {
        return this.internal.priorPoses;
    }

    /**
     * Add previously received GeoPoseResponse(s) to help with the localisation
     *
     * @param priorPoses  GeoPoseResponse[]  The objects to add to the GeoPoseRequest
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addPriorPoses(priorPoses: GeoPoseResponse[]) {
        if (this.internal.priorPoses === undefined) this.internal.priorPoses = [];

        if (priorPoses instanceof Array) {
            priorPoses.forEach((pose) => {
                if (!(pose instanceof GeoPoseResponse))
                    throw new Error('Array of type GeoPoseResponse required');
            });
        } else {
            throw new Error('Parameter of type Array required');
        }

        this.internal.priorPoses.push(...priorPoses);

        return this;
    }

    /**
     * Delete the priorPoses property from the object
     */
    clearPriorPoses() {
        delete this.internal.priorPoses;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.internal | '' | 'internal') {
        if (key === '' || key === 'internal')
            return this.internal;
        if (this.internal[key as keyof typeof this.internal] != undefined)
            return this.internal[key as keyof typeof this.internal];
        throw TypeError("GeoPoseRequest object has no key " + key);
    }

    /**
     * Generator for Sensor IDs
     *
     * @returns {Generator<String, void, *>}
     */
    *idGenerator(): Generator<string> {
        let id = 0;
        while (true) {
            yield id.toString();
            id++;
        }
    }
}

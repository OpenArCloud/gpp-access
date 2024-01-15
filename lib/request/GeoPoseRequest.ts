/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { Sensor } from './Sensor';
import { SensorReading } from './SensorReading';
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

const DEFAULTTYPE = 'geopose';

/**
 * Root class of a GeoPose request, used to request a GeoPose based on the provided sensor data
 *
 * Implementation based on the GeoPose request protocoll as defined by Open AR Cloud.
 */
export class GeoPoseRequest {
    private request: {
        id: string;
        timestamp: string;
        type: string;
        sensors?: Sensor[];
        sensorReadings?: SensorReading[];
        priorPoses?: GeoPoseRequest[];
    };
    private idGen;
    /**
     * Constructor, setting the required properties
     *
     * @param id  String  ?
     * @param type  Type of the request. 'geopose' by default
     */
    constructor(id: string, type = DEFAULTTYPE) {
        this.request = {
            id: id,
            timestamp: new Date().toJSON(),
            type: type,
        };
        this.idGen = this.idGenerator();
    }

    get id() {
        return this.request.id;
    }

    set id(id) {
        this.request.id = id;
    }

    get timestamp() {
        return this.request.timestamp;
    }

    set timestamp(timestamp) {
        this.request.timestamp = timestamp;
    }

    get type() {
        return this.request.type;
    }

    set type(type) {
        this.request.type = type;
    }

    /**
     * Request the Sensors and SensorReadings registered in the GeoPoseRequest
     *
     * @returns {Sensor[],SensorReading[]}
     */
    get sensorData() {
        if (this.request.sensors === undefined) return [[], []];

        return [this.request.sensors, this.request.sensorReadings];
    }

    /**
     * Add a new pair of Sensor and SensorReading to the GeoPoseReading
     *
     * The type of the parameters, and the equality of Sensor.id and SensorReading.sensorId are verified.
     *
     * @param sensor  Sensor  The Sensor to add
     * @param reading  SensorReading  The SensorReading to add
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addSensorData(sensor: Sensor, reading: SensorReading) {
        if (!(sensor instanceof Sensor) || !(reading instanceof SensorReading)) throw new Error('Sensor or SensorReading wrong type');

        if (sensor.id !== reading.sensorId) throw new Error('Sensor IDs in sensor and reading need to be identical');

        if (this.request.sensors !== undefined && this.request.sensors.filter((item) => item.id === sensor.id).length !== 0) throw new Error('Sensor  IDs need to be unique for a request');

        if (this.request.sensors === undefined) {
            this.request.sensors = [];
            this.request.sensorReadings = [];
        }

        this.request.sensors.push(sensor);
        this.request.sensorReadings?.push(reading);

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
    addAccelerometerData(x: number, y: number, z: number) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new AccelerometerReading(x, y, z));

        this.addSensorData(new Sensor(id, SENSORTYPE.accelerometer), reading);

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
    addBluetoothData(address: string, rssi: number, name: string) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new BluetoothReading(address, rssi, name));

        this.addSensorData(new Sensor(id, SENSORTYPE.bluetooth), reading);

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
        size: string[],
        imageBytes: string,
        sequenceNumber: number = 0,
        imageOrientation: ImageOrientation | undefined = undefined,
        cameraParams: CameraParam | undefined = undefined
    ) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new CameraReading(imageFormat, size, imageBytes, sequenceNumber, imageOrientation));

        const sensor = new Sensor(id, SENSORTYPE.camera);
        if (cameraParams) {
            sensor.params = cameraParams;
        }
        this.addSensorData(sensor, reading);

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
    addLocationData(latAngle: number, lonAngle: number, alt: number, accuracy: number, altAccuracy: number, heading: number, speed: number) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new GeoLocationReading(latAngle, lonAngle, alt, accuracy, altAccuracy, heading, speed));

        this.addSensorData(new Sensor(id, SENSORTYPE.geolocation), reading);

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
    addGyroscopeData(x: number, y: number, z: number) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new GyroscopeReading(x, y, z));

        this.addSensorData(new Sensor(id, SENSORTYPE.gyroscope), reading);

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
    addMagnetometerData(x: number, y: number, z: number) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new MagnetometerReading(x, y, z));

        this.addSensorData(new Sensor(id, SENSORTYPE.magnetometer), reading);

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
    addWifiData(bssid: string, frequency: number, rssi: number, ssid: string, scanTimeStart: string, scanTimeEnd: string) {
        const id = this.idGen.next().value;
        const reading = new SensorReading(id).setReading(new WifiReading(bssid, frequency, rssi, ssid, scanTimeStart, scanTimeEnd));

        this.addSensorData(new Sensor(id, SENSORTYPE.wifi), reading);

        return this;
    }

    /**
     * Delete the Sensor and SensorReading properties from the object
     */
    clearSensorData() {
        delete this.request.sensors;
        delete this.request.sensorReadings;
    }

    /**
     * Request the registered prior GeoPoseRequests received from the selected GeoPose service
     *
     * @returns {GeoPoseRequest[]}  Array of the registered objects
     */
    get priorPoses() {
        return this.request.priorPoses;
    }

    /**
     * Add previously received GeoPoseRequests to help with the localisation
     *
     * @param priorPoses  GeoPoseRequest[]  The objects to add to the GeoPoseRequest
     * @returns {GeoPoseRequest}  To allow method chaining
     */
    addPriorPoses(priorPoses: GeoPoseRequest[]) {
        if (this.request.priorPoses === undefined) this.request.priorPoses = [];

        if (priorPoses instanceof Array) {
            priorPoses.forEach((pose) => {
                if (!(pose instanceof GeoPoseRequest)) throw new Error('Array of type GeoPoseRequest required');
            });
        } else {
            throw new Error('Parameter of type Array required');
        }

        this.request.priorPoses.push(...priorPoses);

        return this;
    }

    /**
     * Delete the priorPoses property from the object
     */
    clearPriorPoses() {
        delete this.request.priorPoses;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.request) {
        if (key) return this.request[key];
        else return this.request;
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

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import { Privacy } from './Privacy';
import { AccelerometerReading } from './readings/AccelerometerReading';
import { BluetoothReading } from './readings/BluetoothReading';
import { CameraReading } from './readings/CameraReading';
import { GeoLocationReading } from './readings/GeoLocationReading';
import { MagnetometerReading } from './readings/MagnetometerReading';
import { WifiReading } from './readings/WifiReading';

// import { READINGTYPE } from '../GppGlobals';

/**
 * Structure for the data of the sensors defined in the Sensor structure.
 */
export class SensorReading {
    private readingObject: {
        sensorId: string;
        timestamp: string;
        privacy: Privacy;
        reading?: AccelerometerReading | BluetoothReading | CameraReading | GeoLocationReading | MagnetometerReading | WifiReading;
    };
    /**
     * Constructor, setting the required properties
     *
     * @param sensorId  String  Id of the Sensor object this reading belongs to
     * @param timestamp  Optional, timestamp of the reading
     */
    constructor(sensorId: string, timestamp = new Date().toJSON()) {
        this.readingObject = {
            sensorId: sensorId,
            timestamp: timestamp,
            privacy: new Privacy(),
        };
    }

    get sensorId() {
        return this.readingObject.sensorId;
    }

    set sensorId(id) {
        this.readingObject.sensorId = id;
    }

    get timestamp() {
        return this.readingObject.timestamp;
    }

    set timestamp(timestamp) {
        this.readingObject.timestamp = timestamp;
    }

    get reading(): AccelerometerReading | BluetoothReading | CameraReading | GeoLocationReading | MagnetometerReading | WifiReading | undefined {
        return this.readingObject.reading;
    }

    set reading(reading: AccelerometerReading | BluetoothReading | CameraReading | GeoLocationReading | MagnetometerReading | WifiReading) {
        this.setReading(reading);
    }

    /**
     * Setter for the reading data
     *
     * Asserts that it's the correct reading type.
     *
     * @param reading  AccelerometerReading|BluetoothReading|CameraReading|GeoLocationReading|MagnetometerReading|WifiReading
     *      The sensor data according to the accompanying Sensor type
     * @returns {SensorReading}  To allow method chaining
     */
    setReading(reading: AccelerometerReading | BluetoothReading | CameraReading | GeoLocationReading | MagnetometerReading | WifiReading) {
        this._verifyReadingType(reading);

        this.readingObject.reading = reading;
        return this;
    }

    get privacy() {
        return this.readingObject.privacy;
    }

    /**
     * Setter for the privacy rules
     *
     * @param privacy  Privacy ?
     * @returns {SensorReading}  To allow method chaining
     */
    set privacy(privacy) {
        if (!(privacy instanceof Privacy)) throw new Error('Parameter needs to be of type Privacy');

        this.readingObject.privacy = privacy;
    }

    /**
     * Verify that the provided type is valid
     *
     * Throws exception when type is invalid.
     *
     * @param type  Any  The type to check
     * @private
     */
    _verifyReadingType(type: any) {
        // TODO: Verify correct parameter type (without TS)
        // const isValid = READINGTYPE.reduce((accu, item) => {
        //     return accu === true || type instanceof item;
        // }, false)
        //
        // if (isValid !== true)
        //     throw new Error('Invalid sensor reading type');
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: any) {
        const isNumericKey = !isNaN(key) && !isNaN(parseFloat(key));

        if (!isNumericKey && key) {
            return this.readingObject[key as keyof typeof this.readingObject];
        } else {
            return this.readingObject;
        }
    }
}

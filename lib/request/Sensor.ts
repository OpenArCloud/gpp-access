/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import type { QuaternionType } from '..';
import { SENSORTYPE } from '../GppGlobals';
import { CameraParam } from './options/CameraParam';

/**
 * Defines a sensor used for the GeoPoseRequest
 */
export class Sensor {
    private sensor: {
        id: string;
        type: string;
        name?: string;
        model?: string;
        rigIdentifier?: string;
        rigRotation?: QuaternionType;
        rigTranslation?: number[];
        params?: CameraParam;
    };
    /**
     * Constructor, setting the required properties
     *
     * @param id  String  Id, used to bind to the readings
     * @param type  String  One of the supported types, defined in GppGlobals.SENSORTYPE
     */
    constructor(id: string, type: string) {
        this._verifySensorType(type);

        this.sensor = {
            id: id,
            type: type,
        };
    }

    get id() {
        return this.sensor.id;
    }

    set id(id) {
        this.sensor.id = id;
    }

    get type() {
        return this.sensor.type;
    }

    set type(type) {
        this._verifySensorType(type);
        this.sensor.type = type;
    }

    get name() {
        return this.sensor.name;
    }

    set name(name) {
        this.sensor.name = name;
    }

    get model() {
        return this.sensor.model;
    }

    set model(model) {
        this.sensor.model = model;
    }

    get rigIdentifier() {
        return this.sensor.rigIdentifier;
    }

    set rigIdentifier(identifier) {
        this.sensor.rigIdentifier = identifier;
    }

    get rigRotation() {
        return this.sensor.rigRotation;
    }

    set rigRotation(quaternion) {
        if (!(quaternion instanceof Object)) throw new Error('Parameter of type Object with x, y, z, w properties required');

        if (typeof quaternion.x !== 'number' || typeof quaternion.y !== 'number' || typeof quaternion.z !== 'number' || typeof quaternion.w !== 'number')
            throw new Error('Parameters of type Number required');

        this.sensor.rigRotation = quaternion;
    }

    get rigTranslation() {
        return this.sensor.rigTranslation;
    }

    set rigTranslation(translation) {
        if (!(translation instanceof Array) || translation.length !== 3) throw new Error('Parameter of type Array with length 3 required');

        if (typeof translation[0] !== 'number' || typeof translation[1] !== 'number' || typeof translation[2] !== 'number') throw new Error('Array of type Number required');

        this.sensor.rigTranslation = translation;
    }

    get params() {
        return this.sensor.params;
    }

    set params(params) {
        this.sensor.params = params;
    }

    /**
     * Verify that the provided type is one of the supported ones
     *
     * @param type  String  The type to check
     * @private
     */
    _verifySensorType(type: string) {
        if (!SENSORTYPE.hasOwnProperty(type)) throw new Error('Invalid sensor type');
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
            return this.sensor[key as keyof typeof this.sensor];
        } else {
            return this.sensor;
        }
    }
}

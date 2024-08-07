/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import { IMAGEFORMAT } from '../../GppGlobals';
import { ImageOrientation } from '../options/ImageOrientation';
import { CameraParam } from '../options/CameraParam';
import { Reading } from './Reading';
import { Privacy } from '../Privacy'

/**
 * Structure for a camera sensor reading
 */
export class CameraReading extends Reading {
    protected cameraReading: {
        sequenceNumber: number;
        imageFormat: string; //ex. RGBA32, GRAY8, DEPTH
        size: number[]; //width, height
        imageBytes: string; //base64 encoded data
        imageOrientation?: ImageOrientation | undefined;
        params?: CameraParam | undefined;

        // TODO: move to parent class and find a way to fixup toJSON
        timestamp: number; // The number of milliseconds since the Unix Epoch.
        sensorId: string;
        privacy: Privacy;
    };

    /**
     * Constructor, setting the required properties
     *
     * @param imageFormat  String  The format of the image data. Possible values are available with IMAGEFORMAT global
     * @param size  Number[]  Vector2 with the dimensions of the image as [width, height]
     * @param imageBytes  String  The base64 encoded image data
     * @param sequenceNumber  Number  Sequence of the image. Default is 0
     * @param imageOrientation  ImageOrientation  The orientation of the image, defined with an ImageOrientation object
     * @param params: CameraParam  camera parameters
     */
    constructor(imageFormat: string, size: number[], imageBytes: string, sequenceNumber: number = 0, imageOrientation: ImageOrientation | undefined = undefined, params: CameraParam | undefined = undefined, timestamp: number, sensorId: string, privacy: Privacy) {
        super(timestamp, sensorId, privacy)
        this.cameraReading = {
            sequenceNumber: sequenceNumber,
            imageFormat: imageFormat,
            size: size,
            imageBytes: imageBytes,
            imageOrientation: imageOrientation,
            params: params,

            // TODO: move to parent class and find a way to fixup toJSON
            timestamp: timestamp, // The number of milliseconds since the Unix Epoch.
            sensorId: sensorId,
            privacy: privacy,
        };
    }

    get sequenceNumber() {
        return this.cameraReading.sequenceNumber;
    }

    set sequenceNumber(number) {
        this.cameraReading.sequenceNumber = number;
    }

    get imageFormat() {
        return this.cameraReading.imageFormat;
    }

    set imageFormat(format) {
        if (!IMAGEFORMAT.hasOwnProperty(format)) throw new Error('Unknown image format');

        this.cameraReading.imageFormat = format;
    }

    get size() {
        return this.cameraReading.size;
    }

    set size(size) {
        this.cameraReading.size = size;
    }

    get imageBytes() {
        return this.cameraReading.imageBytes;
    }

    set imageBytes(bytes) {
        this.cameraReading.imageBytes = bytes;
    }

    get imageOrientation() {
        return this.cameraReading.imageOrientation;
    }

    set imageOrientation(orientation) {
        if (!(orientation instanceof ImageOrientation)) throw new Error('Image orientation parameter of type ImageOrientation required');

        this.cameraReading.imageOrientation = orientation;
    }

    get params() {
        return this.cameraReading.params;
    }

    set params(params) {
        this.cameraReading.params = params;
    }


    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.cameraReading | keyof typeof this.reading | '' | 'cameraReading' | number) {
        console.log("CameraReading.toJSON  " + key)

        // TODO: remove
        //const isNumericKey = !isNaN(key) && !isNaN(parseFloat(key));
        //if (!isNumericKey && key) {
        //    return this.cameraReading[key as keyof typeof this.cameraReading];
        //} else {
        //    return this.cameraReading;
        //}
        if (typeof key === "number") // TODO: this does not work for array indices
            return this.cameraReading;

        if (key === '' || key === 'cameraReading')
            return this.cameraReading;

        if (this.cameraReading[key as keyof typeof this.cameraReading] != undefined)
            return this.cameraReading[key as keyof typeof this.cameraReading];
        if (this.reading[key as keyof typeof this.reading] != undefined)
            return this.reading[key as keyof typeof this.reading];
        //throw TypeError("CameraReading object has no key " + key);
        console.log("CameraReading object has no key " + key); // TODO:fix that numeric indices come here as keys because this is object is stored in an array
        return this.cameraReading
    }
}

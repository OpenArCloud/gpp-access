/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import { IMAGEFORMAT } from '../../GppGlobals';
import ImageOrientation from '../options/ImageOrientation';

/**
 * Structure for a camera sensor reading
 */
export default class CameraReading {
    private reading;
    /**
     * Constructor, setting the required properties
     *
     * @param imageFormat  String  The format of the image data. Possible values are available with IMAGEFORMAT global
     * @param size  String[]  Vector2 with the dimensions of the image
     * @param imageBytes  String  The base64 encoded image data
     * @param sequenceNumber  Number  Sequence of the image. Default is 0
     * @param imageOrientation  ImageOrientation  The orientation of the image, defined with an ImageOrientation object
     */
    constructor(imageFormat: string, size: string[], imageBytes: string, sequenceNumber: number = 0, imageOrientation: ImageOrientation | undefined = undefined) {
        this.reading = {
            sequenceNumber: sequenceNumber,
            imageFormat: imageFormat,
            size: size,
            imageBytes: imageBytes,
            imageOrientation: imageOrientation,
        };
    }

    get sequenceNumber() {
        return this.reading.sequenceNumber;
    }

    set sequenceNumber(number) {
        this.reading.sequenceNumber = number;
    }

    get imageFormat() {
        return this.reading.imageFormat;
    }

    set imageFormat(format) {
        if (!IMAGEFORMAT.hasOwnProperty(format)) throw new Error('Unknown image format');

        this.reading.imageFormat = format;
    }

    get size() {
        return this.reading.size;
    }

    set size(size) {
        this.reading.size = size;
    }

    get imageBytes() {
        return this.reading.imageBytes;
    }

    set imageBytes(bytes) {
        this.reading.imageBytes = bytes;
    }

    get imageOrientation() {
        return this.reading.imageOrientation;
    }

    set imageOrientation(orientation) {
        if (!(orientation instanceof ImageOrientation)) throw new Error('Image orientation parameter of type ImageOrientation required');

        this.reading.imageOrientation = orientation;
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

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';

import { CameraReading } from '../../../request/readings/CameraReading';
import { ImageOrientation } from '../../../request/options/ImageOrientation';
import { IMAGEFORMAT } from '../../../GppGlobals';

const expect = chai.expect;

const sequenceNumber = 0;
const imageFormat = IMAGEFORMAT.GRAY8;
const imageSize = [200, 200];
const imageBytes = 'imageb64';
const orientationMirrored = false;
const orientationRotation = 6;

const defaultJson = `"sequenceNumber":${sequenceNumber},"imageFormat":"${imageFormat}","size":[${imageSize}],"imageBytes":"${imageBytes}"`;
const orientationJson = `"imageOrientation":{"mirrored":${orientationMirrored},"rotation":${orientationRotation}`;

let reading;

describe('CameraReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new CameraReading(imageFormat, imageSize, imageBytes, sequenceNumber);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });

    describe('Accessors', () => {
        beforeEach(() => {
            reading = new CameraReading(imageFormat, imageSize, imageBytes, sequenceNumber);
        });

        it('ImageOrientation', () => {
            reading.imageOrientation = new ImageOrientation(orientationMirrored, orientationRotation);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson},${orientationJson}}}`);
        });
    });
});

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { CameraReading } from '../../../request/readings/CameraReading';
import { CAMERAMODEL } from '../../../request/options/CameraParam';
import { ImageOrientation } from '../../../request/options/ImageOrientation';
import { IMAGEFORMAT } from '../../../GppGlobals';
import { defaultPrivacy, defaultPrivacyJson } from '../PrivacyTest';
import { CameraParam } from '../../../request/options/CameraParam';

const expect = chai.expect;

const sequenceNumber = 0;
const imageFormat = IMAGEFORMAT.GRAY8;
const imageSize = [200, 200];
const imageBytes = 'imageb64';
const imageOrientation = new ImageOrientation(false, 90);
const cameraParams = new CameraParam();
const timestamp = new Date().getTime();
const sensorId = "myCameraSensor";

const defaultCameraParamsJson = `"model":"UNKNOWN","modelParams":[]`;
const orientationJson = `"mirrored":false,"rotation":90`;
const defaultJson = `"sequenceNumber":${sequenceNumber},"imageFormat":"${imageFormat}","size":[${imageSize}],"imageBytes":"${imageBytes}","imageOrientation":{${orientationJson}},"params":{${defaultCameraParamsJson}},"timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}`;


let reading;

describe('CameraReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new CameraReading(imageFormat, imageSize, imageBytes, sequenceNumber, imageOrientation, cameraParams, timestamp, sensorId, defaultPrivacy);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });

    describe('Accessors', () => {
        beforeEach(() => {
            reading = new CameraReading(imageFormat, imageSize, imageBytes, sequenceNumber, imageOrientation, cameraParams, timestamp, sensorId, defaultPrivacy);
        });

        it('CameraParams', () => {
            reading.params.model = CAMERAMODEL.PINHOLE;
            reading.params.modelParams = [100,100,50,50];
            const newCameraParamsJson = `"model":"PINHOLE","modelParams":[100,100,50,50]`
            expect(JSON.stringify(reading)).to.be.equal(`{"sequenceNumber":${sequenceNumber},"imageFormat":"${imageFormat}","size":[${imageSize}],"imageBytes":"${imageBytes}","imageOrientation":{${orientationJson}},"params":{${newCameraParamsJson}},"timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}}`);
        });
    });
});

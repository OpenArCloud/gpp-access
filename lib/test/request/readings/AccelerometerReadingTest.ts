/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { AccelerometerReading } from '../../../request/readings/AccelerometerReading';
import { defaultPrivacy, defaultPrivacyJson } from '../PrivacyTest';

const expect = chai.expect;

const x = 1;
const y = 2;
const z = 3;
const timestamp = new Date().getTime();
const sensorId = "myAccelerometerSensor";


const defaultJson = `"x":${x},"y":${y},"z":${z},"timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}`;

let reading;

describe('AccelerometerReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new AccelerometerReading(x, y, z, timestamp, sensorId, defaultPrivacy);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});

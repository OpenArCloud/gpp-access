/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { GeoLocationReading } from '../../../request/readings/GeoLocationReading';
import { defaultPrivacy, defaultPrivacyJson } from '../PrivacyTest';

const expect = chai.expect;

const lat = 0.0;
const lon = 0.0;
const alt = 0;
const accuracy = 0;
const altAccuracy = 0;
const heading = 0;
const speed = 0;
const timestamp = new Date().getTime();
const sensorId = "myGeolocationSensor";

const defaultJson = `"latitude":${lat},"longitude":${lon},"altitude":${alt},"accuracy":${accuracy},"altitudeAccuracy":${altAccuracy},"heading":${heading},"speed":${speed},"timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}`;

let reading;

describe('GeoLocationReadingTest', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new GeoLocationReading(lat, lon, alt, accuracy, altAccuracy, heading, speed, timestamp, sensorId, defaultPrivacy);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});

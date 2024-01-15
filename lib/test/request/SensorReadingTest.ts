/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';

import { SensorReading } from '../../request/SensorReading';
import { CameraReading } from '../../request/readings/CameraReading';

const expect = chai.expect;

const sensorId = 'sensorid';

let readingObject;

describe('SensorReadingTest', () => {
    describe('constructor', () => {
        it('expect provided sensorid', () => {
            const sensorReading = new SensorReading(sensorId);

            expect(sensorReading.sensorId).to.be.equal(sensorId);
        });
    });

    describe('Accessors', () => {
        beforeEach(() => {
            readingObject = new SensorReading(sensorId);
        });

        it('privacy', () => {
            expect(readingObject.privacy).to.be.not.undefined;
            expect(() => (readingObject.privacy = 'privacy')).to.throw();
        });

        it('reading', () => {
            expect(readingObject.reading).to.be.undefined;

            readingObject.reading = new CameraReading();
            expect(readingObject.reading).to.not.be.undefined;
        });
    });
});

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { GeoPoseRequest } from '../../request/GeoPoseRequest';
import { GeoPose} from '../../response/GeoPose';
import { GeoPoseResponse } from '../../response/GeoPoseResponse';
import { Sensor } from '../../request/Sensor';
import { SensorReadings } from '../../request/SensorReadings';
import { defaultPrivacy, defaultPrivacyJson } from './PrivacyTest';
import { AccelerometerReading } from '../../request/readings/AccelerometerReading';
import { SENSORTYPE } from '../../GppGlobals';

const expect = chai.expect;

const requestId = 'request_uuid';
const defaultType = 'geopose';

const sensorId = 'sensorid';

let request: GeoPoseRequest;
let now: number;

describe('GeoPoseRequest', () => {
    describe('constructor', () => {
        it('expect provided id and default type', () => {
            request = new GeoPoseRequest(requestId);

            expect(request.id).to.be.a('string').and.equal(requestId);
            expect(request.type).to.be.a('string').and.equal(defaultType);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":${request.timestamp},"type":"${defaultType}","sensors":[],"sensorReadings":{}}`);
        });

        it('expect provided type', () => {
            let geoposeObjectType = 'geopose-objects';
            const request = new GeoPoseRequest(requestId, geoposeObjectType);

            expect(request.type).to.be.a('string').and.equal(geoposeObjectType);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":${request.timestamp},"type":"${geoposeObjectType}","sensors":[],"sensorReadings":{}}`);
        });
    });

    describe('Accessors', () => {

        beforeEach(() => {
            request = new GeoPoseRequest(requestId);
            now = new Date().getTime();
        });

        it('Timestamp', () => {
            request.timestamp = now;

            expect(request.timestamp).to.be.a('number').and.equal(now);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":${now},"type":"${defaultType}","sensors":[],"sensorReadings":{}}`);
        });

        it('SensorReadings', () => {
            expect(request.sensors.length).to.be.equal(0);
            expect(request.sensorReadings.accelerometerReadings).to.be.undefined;

            request.addSensor(new Sensor(sensorId, SENSORTYPE.accelerometer))
            request.addAccelerometerData(0,0,0, now, sensorId, defaultPrivacy);

            expect(request.sensorReadings).to.be.an.instanceOf(SensorReadings);
            expect(request.sensors[0]).to.be.an.instanceOf(Sensor);
            expect(request.sensorReadings.accelerometerReadings![0]).to.be.an.instanceOf(AccelerometerReading);
            expect(request.sensorReadings.accelerometerReadings!.length).to.be.equal(1);

            request.clearSensorData();
            expect(request.sensors.length).to.be.equal(0);
            expect(request.sensorReadings.accelerometerReadings).to.be.undefined;
        });

        it('Sensor unique id', () => {
            request.addSensor(new Sensor(sensorId, SENSORTYPE.accelerometer));
            expect(() => request.addSensor(new Sensor(sensorId, SENSORTYPE.accelerometer))).to.throw();
        });

        it('AccelerometerData json', () => {
            request.addSensor(new Sensor(sensorId, SENSORTYPE.accelerometer))
            request.addAccelerometerData(0, 0, 0, now, sensorId, defaultPrivacy);

            const requestJson = `"id":"${requestId}","timestamp":${request.timestamp},"type":"${defaultType}"`;
            const sensorsJson = `[{"id":"${sensorId}","type":"accelerometer"}]`;
            const sensorReadingsJson = `{"accelerometerReadings":[{"x":0,"y":0,"z":0,"timestamp":${now},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}}]}`;
            expect(JSON.stringify(request)).to.be.equal(`{${requestJson},"sensors":${sensorsJson},"sensorReadings":${sensorReadingsJson}}`);

            request.clearSensorData();
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":${request.timestamp},"type":"${defaultType}","sensors":[],"sensorReadings":{}}`);
        });

        it('PriorPoses', () => {
            expect(request.priorPoses).to.be.undefined;

            request.addPriorPoses([new GeoPoseResponse("uuid", now, undefined, defaultType, new GeoPose())]);
            expect(request.priorPoses).to.be.an('Array').and.of.length(1);
            expect(request.priorPoses![0]).to.be.instanceOf(GeoPoseResponse);

            request.clearPriorPoses();
            expect(request.priorPoses).to.be.undefined;
        });
    });
});

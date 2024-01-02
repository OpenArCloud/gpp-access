/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import chai from 'chai';

import GeoPoseRequest from '../../request/GeoPoseRequest';
import Sensor from '../../request/Sensor';
import SensorReading from '../../request/SensorReading';
import { SENSORTYPE } from '../../GppGlobals';

const expect = chai.expect;

const requestId = 'requestid';
const defaultType = 'geopose';

const sensorId = 'sensorid';

let request: GeoPoseRequest;
let now: string;

describe('GeoPoseRequest', () => {
    describe('constructor', () => {
        it('expect provided id and default type', () => {
            request = new GeoPoseRequest(requestId);

            expect(request.id).to.be.a('string').and.equal(requestId);
            expect(request.type).to.be.a('string').and.equal(defaultType);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":"${request.timestamp}","type":"${defaultType}"}`);
        });

        it('expect provided type', () => {
            let geoposeObjectType = 'geopose-objects';
            const request = new GeoPoseRequest(requestId, geoposeObjectType);

            expect(request.type).to.be.a('string').and.equal(geoposeObjectType);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":"${request.timestamp}","type":"${geoposeObjectType}"}`);
        });
    });

    describe('Accessors', () => {
        beforeEach(() => {
            request = new GeoPoseRequest(requestId);
            now = new Date().toJSON();
        });

        it('Timestamp', () => {
            request.timestamp = now;

            expect(request.timestamp).to.be.a('string').and.equal(now);
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":"${now}","type":"${defaultType}"}`);
        });

        it('SensorData', () => {
            expect(request.sensorData[0]?.length).to.be.equal(0);
            expect(request.sensorData[1]?.length).to.be.equal(0);

            request.addSensorData(new Sensor(sensorId, SENSORTYPE.camera), new SensorReading(sensorId, ''));

            const sensorData = request.sensorData;
            expect(sensorData).to.be.a('Array').and.of.length(2);
            expect(sensorData[0]?.[0]).to.be.an.instanceOf(Sensor);
            expect(sensorData[1]?.[0]).to.be.an.instanceOf(SensorReading);

            request.clearSensorData();
            expect(request.sensorData[0]?.length).to.be.equal(0);
            expect(request.sensorData[1]?.length).to.be.equal(0);
        });

        it('SensorData unique id', () => {
            request.addSensorData(new Sensor(sensorId, SENSORTYPE.camera), new SensorReading(sensorId, ''));

            expect(() => request.addSensorData(new Sensor(sensorId, SENSORTYPE.camera), new SensorReading(sensorId, ''))).to.throw();
        });

        it('SensorData json', () => {
            request.addSensorData(new Sensor(sensorId, SENSORTYPE.camera), new SensorReading(sensorId, now));

            const requestJson = `"id":"${requestId}","timestamp":"${request.timestamp}","type":"${defaultType}"`;
            const sensorJson = `{"id":"sensorid","type":"camera"}`;
            const readingJson = `{"sensorId":"sensorid","timestamp":"${now}","privacy":{"dataRetention":[],"dataAcceptableUse":[],"dataSanitizationApplied":[],"dataSanitizationRequested":[]}}`;
            expect(JSON.stringify(request)).to.be.equal(`{${requestJson},"sensors":[${sensorJson}],"sensorReadings":[${readingJson}]}`);

            request.clearSensorData();
            expect(JSON.stringify(request)).to.be.equal(`{"id":"${requestId}","timestamp":"${request.timestamp}","type":"${defaultType}"}`);
        });

        it('PriorPoses', () => {
            expect(request.priorPoses).to.be.undefined;

            request.addPriorPoses([new GeoPoseRequest(requestId)]);
            expect(request.priorPoses).to.be.an('Array').and.of.length(1);
            expect(request.priorPoses?.[0]).to.be.instanceOf(GeoPoseRequest);

            request.clearPriorPoses();
            expect(request.priorPoses).to.be.undefined;
        });
    });
});

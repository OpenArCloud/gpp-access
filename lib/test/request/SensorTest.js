/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import chai from 'chai';

import Sensor from "../../request/Sensor.js";
import CameraParam from "../../request/options/CameraParam.js";
import { SENSORTYPE } from '../../GppGlobals.js';


const expect = chai.expect;

const sensorId = 'sensorid';
const sensorName = 'name';
const sensorModel = 'model';
const rigIdentifier = 'identifier';
const rigRotation = {x: 0.1, y: 0.2, z: 0.3, w: 1};
const rigTranslation = [0.1, 0.2, 0.3];

let sensor;


describe('SensorTest', () => {
    describe('constructor', () => {
        it('expect provided id and provided type', () => {
            const sensor = new Sensor(sensorId, SENSORTYPE.camera);

            expect(sensor.id).to.be.a('string').and.equal(sensorId);
            expect(sensor.type).to.be.equal(SENSORTYPE.camera);
        })
    });

    describe('Accessors', () => {
        beforeEach(() => {
            sensor = new Sensor(sensorId, SENSORTYPE.camera);
        })

        it('name', () => {
            expect(sensor.name).to.be.undefined;

            sensor.name = sensorName;
            expect(sensor.name).to.be.equal(sensorName);
        })

        it('model', () => {
            expect(sensor.model).to.be.undefined;

            sensor.model = sensorModel;
            expect(sensor.model).to.be.equal(sensorModel);
        })

        it('rigIdentifier', () => {
            expect(sensor.rigIdentifier).to.be.undefined;

            sensor.rigIdentifier = rigIdentifier;
            expect(sensor.rigIdentifier).to.be.equal(rigIdentifier);
        })

        it('rigRotation', () => {
            sensor.rigRotation = rigRotation;
            expect(sensor.rigRotation).to.be.equal(rigRotation);

            expect(() => sensor.rigRotation = {}).to.throw();
            expect(() => sensor.rigRotation = {x: 0.1, y: 0.2, z: 0.3}).to.throw();
        })

        it('rigTranslation', () => {
            sensor.rigTranslation = rigTranslation;
            expect(sensor.rigTranslation).to.be.equal(rigTranslation);

            expect(() => sensor.rigTranslation = [1, 2]).to.throw();
            expect(() => sensor.rigTranslation = [1, 2, '3']).to.throw();

        })

        it('type', () => {
            expect(() => sensor.type = 5).to.throw();
            expect(() => sensor.type = 'myspecialsensortype').to.throw();
        })

        it('params', () => {
            expect(sensor.params).to.be.undefined;

            sensor.params = new CameraParam();
            expect(sensor.params).to.be.instanceOf(CameraParam);
        })

        it('required json', () => {
            sensor.name = sensorName;
            sensor.model = sensorModel;
            expect(JSON.stringify(sensor)).to.be.equal(
                '{"id":"sensorid","type":"camera","name":"name","model":"model"}');
        })

        it('rig json', () => {
            sensor.rigIdentifier = rigIdentifier;
            sensor.rigRotation = rigRotation;
            sensor.rigTranslation = rigTranslation

            const requiredJson = '"id":"sensorid","type":"camera"';
            const rigJson = `"rigIdentifier":"identifier","rigRotation":${JSON.stringify(rigRotation)},"rigTranslation":${JSON.stringify(rigTranslation)}`;
            expect(JSON.stringify(sensor)).to.be.equal(`{${requiredJson},${rigJson}}`);
        });
    })
});

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import chai from 'chai';

import AccelerometerReading from '../../../request/readings/AccelerometerReading';

const expect = chai.expect;

const x = 1;
const y = 2;
const z = 3;

const defaultJson = `"x":${x},"y":${y},"z":${z}`;

let reading;

describe('AcceleratingReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new AccelerometerReading(x, y, z);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});

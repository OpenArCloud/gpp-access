/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import chai from 'chai';

import BluetoothReading from "../../../request/readings/BluetoothReading.js";


const expect = chai.expect;

const address = 'address';
const rssi = 0;
const name = 'name';

const defaultJson = `"address":"${address}","RSSI":${rssi},"name":"${name}"`;

let reading;


describe('BluetoothReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new BluetoothReading(address, rssi, name);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});
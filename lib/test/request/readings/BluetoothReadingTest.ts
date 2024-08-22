/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { BluetoothReading } from '../../../request/readings/BluetoothReading';
import { defaultPrivacy, defaultPrivacyJson } from '../PrivacyTest';

const expect = chai.expect;

const address = 'address';
const rssi = 0;
const name = 'name';
const timestamp = new Date().getTime();
const sensorId = "myBluetoothSensor";

const defaultJson = `"address":"${address}","RSSI":${rssi},"name":"${name}","timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}`;

let reading;

describe('BluetoothReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new BluetoothReading(address, rssi, name, timestamp, sensorId, defaultPrivacy);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});

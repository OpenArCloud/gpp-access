/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { WifiReading } from '../../../request/readings/WifiReading';
import { defaultPrivacy, defaultPrivacyJson } from '../PrivacyTest';

const expect = chai.expect;

const bssid = 'bssid';
const frequency = 0;
const rssi = 0;
const ssid = 'ssid';
const scanTimeStart = 'now';
const scanTimeEnd = 'later';
const timestamp = new Date().getTime();
const sensorId = "myWifiSensor";

const defaultJson = `"BSSID":"${bssid}","frequency":${frequency},"RSSI":${rssi},"SSID":"${ssid}","scanTimeStart":"${scanTimeStart}","scanTimeEnd":"${scanTimeEnd}","timestamp":${timestamp},"sensorId":"${sensorId}","privacy":${defaultPrivacyJson}`;

let reading;

describe('WifiReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new WifiReading(bssid, frequency, rssi, ssid, scanTimeStart, scanTimeEnd, timestamp, sensorId, defaultPrivacy);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});

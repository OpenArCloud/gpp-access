/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import chai from 'chai';

import WifiReading from "../../../request/readings/WifiReading.js";


const expect = chai.expect;

const bssid = 'bssid';
const frequency = 0;
const rssi = 0;
const ssid = 'ssid';
const scanTimeStart = 'now';
const scanTimeEnd = 'later';

const defaultJson = `"BSSID":"${bssid}","frequency":${frequency},"RSSI":${rssi},"SSID":"${ssid}","scanTimeStart":"${scanTimeStart}","scanTimeEnd":"${scanTimeEnd}"`

let reading;


describe('WifiReading', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            reading = new WifiReading(bssid, frequency, rssi, ssid, scanTimeStart, scanTimeEnd);
            expect(JSON.stringify(reading)).to.be.equal(`{${defaultJson}}`);
        });
    });
});
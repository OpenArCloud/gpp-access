/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

import chai from 'chai';
import 'mocha';

import { Privacy } from '../../request/Privacy';

export const defaultPrivacy = new Privacy();
export const defaultPrivacyJson = `{"dataRetention":[],"dataAcceptableUse":[],"dataSanitizationApplied":[],"dataSanitizationRequested":[]}`;

const expect = chai.expect;

describe('Privacy', () => {
    describe('constructor', () => {
        it('expect provided parameters', () => {
            const reading = defaultPrivacy;
            expect(JSON.stringify(reading)).to.be.equal(`${defaultPrivacyJson}`);
        });
    });
});

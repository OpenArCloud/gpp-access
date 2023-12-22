/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/


/**
 * Defines the data handling on the server
 */
export default class Privacy {
    constructor() {
        this.privacy = {
            dataRetention: [],
            dataAcceptableUse: [],
            dataSanitizationApplied: [],
            dataSanitizationRequested: []
        }
    }


    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key) {
        if (key !== '' && key !== 'privacy') {
            return this.privacy[key];
        } else
            return this.privacy;
    }
};
/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

/**
 * Structure for a bluetooth sensor reading
 */
export default class BluetoothReading {
    /**
     * Constructor, setting the required properties
     *
     * @param address  String  address from the sensor
     * @param rssi  Number  rssi from the sensor
     * @param name  String  name of the sensor
     */
    constructor(address, rssi, name) {
        this.reading = {
            address: address,
            RSSI: rssi,
            name: name
        }
    }

    get address() {
        return this.reading.address;
    }

    set address(address) {
        this.reading.address = address;
    }

    get rssi() {
        return this.reading.RSSI;
    }

    set rssi(rssi) {
        this.reading.RSSI = rssi;
    }

    get name() {
        return this.reading.name;
    }

    set name(name) {
        this.reading.name = name;
    }


    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key) {
        if (key !== '' && key !== 'reading')
            return this.reading[key];
        else
            return this.reading;
    }
};
/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

/**
 * Structure for a Wifi sensor reading
 */
export class WifiReading {
    private reading: {
        BSSID: string;
        frequency: number;
        RSSI: number;
        SSID: string;
        scanTimeStart: string;
        scanTimeEnd: string;
        scanTimeStop?: string;
    };
    /**
     * Constructor, setting the required properties
     *
     * @param bssid  String  The bssid of the network
     * @param frequency  Number
     * @param rssi  Number
     * @param ssid  String  The ssid of the network
     * @param scanTimeStart  String
     * @param scanTimeEnd  String
     */
    constructor(bssid: string, frequency: number, rssi: number, ssid: string, scanTimeStart: string, scanTimeEnd: string) {
        this.reading = {
            BSSID: bssid,
            frequency: frequency,
            RSSI: rssi,
            SSID: ssid,
            scanTimeStart: scanTimeStart,
            scanTimeEnd: scanTimeEnd,
        };
    }

    get bssid() {
        return this.reading.BSSID;
    }

    set bssid(bssid) {
        this.reading.BSSID = bssid;
    }

    get frequency() {
        return this.reading.frequency;
    }

    set frequency(frequency) {
        this.reading.frequency = frequency;
    }

    get RSSI() {
        return this.reading.RSSI;
    }

    set RSSI(rssi) {
        this.reading.RSSI = rssi;
    }

    get SSID() {
        return this.reading.SSID;
    }

    set SSID(ssid) {
        this.reading.SSID = ssid;
    }

    get scanTimeStart() {
        return this.reading.scanTimeStart;
    }

    set scanTimeStart(start) {
        this.reading.scanTimeStart = start;
    }

    get scanTimeStop() {
        return this.reading.scanTimeStop;
    }

    set scanTimeStop(stop) {
        this.reading.scanTimeStop = stop;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.reading | '' | 'reading') {
        if (key !== '' && key !== 'reading') return this.reading[key];
        else return this.reading;
    }
}

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

export default class XyzReading {
    private reading;
    constructor(x: number, y: number, z: number) {
        this.reading = {
            x: x,
            y: y,
            z: z,
        };
    }

    get x() {
        return this.reading.x;
    }

    set x(x) {
        this.reading.x = x;
    }

    get y() {
        return this.reading.y;
    }

    set y(y) {
        this.reading.y = y;
    }

    get z() {
        return this.reading.z;
    }

    set z(z) {
        this.reading.x = z;
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

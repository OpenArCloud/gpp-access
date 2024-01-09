/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

export class ImageOrientation {
    private orientation;
    constructor(mirrored: boolean, rotation: number) {
        this.orientation = {
            mirrored: mirrored,
            rotation: rotation,
        };
    }

    get mirrored() {
        return this.orientation.mirrored;
    }

    set mirrored(mirrored) {
        this.orientation.mirrored = mirrored;
    }

    get rotation() {
        return this.orientation.rotation;
    }

    set rotation(rotation) {
        this.orientation.rotation = rotation;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.orientation | 'imageOrientation') {
        if (key !== 'imageOrientation') return this.orientation[key];
        else return this.orientation;
    }
}

/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

export class ImageOrientation {
    private imageOrientation: {
        mirrored: boolean;
        rotation: number;
    };

    constructor(mirrored: boolean, rotation: number) {
        this.imageOrientation = {
            mirrored: mirrored,
            rotation: rotation,
        };
    }

    get mirrored() {
        return this.imageOrientation.mirrored;
    }

    set mirrored(mirrored) {
        this.imageOrientation.mirrored = mirrored;
    }

    get rotation() {
        return this.imageOrientation.rotation;
    }

    set rotation(rotation) {
        this.imageOrientation.rotation = rotation;
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.imageOrientation | '' | 'imageOrientation') {
        if (key === '' || key === 'imageOrientation') {
            return this.imageOrientation;
        }
        if (this.imageOrientation[key] != undefined) {
            return this.imageOrientation[key];
        }
        throw TypeError("ImageOrientation object has no key " + key)
    }
}

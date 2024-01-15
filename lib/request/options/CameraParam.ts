/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

/**
 * Camera models according to Colmap
 * See https://github.com/colmap/colmap/blob/dev/src/base/camera_models.h
 * Use when creating a new camera Sensor object.
 */
export const CAMERAMODEL = {
    SIMPLE_PINHOLE: 'SIMPLE_PINHOLE', // f, cx, cy
    PINHOLE: 'PINHOLE', // fx, fy, cx, cy
    SIMPLE_RADIAL: 'SIMPLE_RADIAL', // f, cx, cy, k
    RADIAL: 'RADIAL', //  f, cx, cy, k1, k2
    OPENCV: 'OPENCV', // fx, fy, cx, cy, k1, k2, p1, p2
    OPENCV_FISHEYE: 'OPENCV_FISHEYE', // fx, fy, cx, cy, k1, k2, k3, k4
    FULL_OPENCV: 'FULL_OPENCV', // fx, fy, cx, cy, k1, k2, p1, p2, k3, k4, k5, k6
    FOV: 'FOV', // fx, fy, cx, cy, omega
    SIMPLE_RADIAL_FISHEYE: 'SIMPLE_RADIAL_FISHEYE', // f, cx, cy, k
    RADIAL_FISHEYE: 'RADIAL_FISHEYE', // f, cx, cy, k1, k2
    THIN_PRISM: 'THIN_PRISM', // fx, fy, cx, cy, k1, k2, p1, p2, k3, k4, sx1, sy1
    UNKNOWN: 'UNKNOWN',
};

export class CameraParam {
    private params: {
        model: string;
        modelParams: number[];
        minMaxDepth?: [number, number];
        minMaxDisparity?: [number, number];
    };
    constructor() {
        this.params = {
            model: CAMERAMODEL.UNKNOWN,
            modelParams: [],
        };
    }

    get model() {
        return this.params.model;
    }

    /**
     * @param model String  One of the supported camera models defined in CAMERAMODEL (optional)
     */
    set model(model) {
        this._verifyCameraModel(model);
        this.params.model = model;
    }

    get modelParams() {
        return this.params.modelParams;
    }

    /**
     * @param modelParams Number[] An array of model parameters. Make sure to supply exactly as many numbers as the model requires (optional)
     */
    set modelParams(modelParams) {
        this.params.modelParams = modelParams;
    }

    get minMaxDepth() {
        return this.params.minMaxDepth;
    }

    /**
     * @param minMaxDepth Number[]  Two numbers (optional)
     */
    set minMaxDepth(minMaxDepth) {
        this.params.minMaxDepth = minMaxDepth;
    }

    get minMaxDisparity() {
        return this.params.minMaxDisparity;
    }

    /**
     * @param minMaxDisparity Number[]  Two numbers (optional)
     */
    set minMaxDisparity(minMaxDisparity) {
        this.params.minMaxDisparity = minMaxDisparity;
    }

    /**
     * Verify that the provided camera model is one of the supported ones
     *
     * @param model  String  The model to check
     * @private
     */
    _verifyCameraModel(model: string) {
        if (!CAMERAMODEL.hasOwnProperty(model)) throw new Error('Invalid camera model');
    }

    /**
     * Providing the correct data to JSON.stringify()
     *
     * @param key  String|Number  Indicates which information the JSON-parser expect to be returned
     * @returns {*}  The content of the local object according to the provided key parameter
     */
    toJSON(key: keyof typeof this.params | 'params' | '') {
        console.log(key);
        if (key !== '' && key !== 'params') {
            return this.params[key];
        } else {
            return this.params;
        }
    }
}

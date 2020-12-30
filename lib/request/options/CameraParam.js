/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

export default class CameraParam {
    constructor() {
        this.params = {};
    }

    get model() {
        return this.params.model;
    }

    set model(model) {
        this.params.model = model;
    }

    get modelParams() {
        return this.params.modelParams;
    }

    set modelParams(modelParams) {
        this.params.modelParams = modelParams;
    }

    get minMaxDepth() {
        return this.params.minMaxDepth;
    }

    set minMaxDepth(minMaxDepth) {
        this.params.minMaxDepth = minMaxDepth;
    }

    get minMaxDisparity() {
        return this.params.minMaxDisparity;
    }

    set minMaxDisparity(minMaxDisparity) {
        this.params.minMaxDisparity = minMaxDisparity;
    }
}
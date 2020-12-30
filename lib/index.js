/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import Ajv from 'ajv';
import deepMerge from 'deepmerge';

import gppSchema from './geopose-request.schema.json';

/** Endpoints for GeoPose services returned from Spatial Service Discovery */
export const defaultEndpoint = 'scrs/geopose';
export const objectEndpoint = 'scrs/geopose_objs';

/** Base options for fetch to post json payload */
const JSONPOST = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
}


/**
 * Convenience function to send GeoPose request to GeoPose service
 *
 * Validates the payload against the GeoPoseRequest json-schema before sending the request.
 *
 * @param serviceUrl  String  URL of the GeoPose service and endpoint to access
 * @param payload  String  Stringified GeoPoseRequest object
 * @param options  object  Additional options for the fetch. Default options will be overwritten.
 * @returns {Promise<Response>}  Response promise from GeoPose service, resolving to GeoPoseResponse json
 */
export function sendRequest(serviceUrl, payload, options = {}) {
    validate(gppSchema, payload);

    let allOptions = deepMerge(JSONPOST, options);
    allOptions.body = payload;

    return fetch(serviceUrl, allOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
}

/**
 * Validates the provided json String against the provided json-schema
 *
 * @param schema  The schema to use for validation
 * @param json  The json string to validate
 * @returns {boolean}  True when valid, throws an exception otherwise
 */
function validate(schema, json) {
    let ajv = new Ajv();
    if (ajv.validate(schema, JSON.parse(json)) === false) {
        throw new Error(`Provided json isn't valid: ${ajv.errorsText()}`);
    }

    return true;
}
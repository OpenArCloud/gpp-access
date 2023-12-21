/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import gppSchema from './geopose-request.schema.json';

import Ajv from 'ajv';
import addFormats from "ajv-formats"; // note: introduced in Ajv 8, see https://github.com/ajv-validator/ajv-formats

import deepMerge from 'deepmerge';

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

let doValidation = true;


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
    if (doValidation) validate(gppSchema, payload);

    let allOptions = deepMerge(JSONPOST, options);
    allOptions.body = payload;

    return fetch(serviceUrl, allOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(
                    text => { 
                        throw new Error('Network response was not OK: ' + text) 
                    })
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
export function validate(schema, json) {
    let ajv = new Ajv();
    addFormats(ajv);
    let parsed;

    try {
        parsed = JSON.parse(scr);
    } catch (error) {
        throw new Error(`Unable to parse JSON content: ${error}`);
    }

    if (ajv.validate(schema, parsed) === false) {
        throw new Error(`Provided json isn't valid: ${ajv.errorsText()}`);
    }

    return true;
}

/**
 * Temporarily allow skipping the validation
 *
 * Might become a noop sometime in the future when protocol definition is stable and more services
 * have implemented it. Might stay when validation delay turns out to be a performance problem.
 *
 * @param validate  Boolean Indicates if payloads should be validated against geopose-request.schema
 *      before sending them to the server.
 */
export function validateRequest(validate) {
    doValidation = validate;
}

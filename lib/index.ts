/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

import deepMerge from 'deepmerge';

/** Endpoints for GeoPose services returned from Spatial Service Discovery */
export const defaultEndpoint = 'scrs/geopose';
export const objectEndpoint = 'scrs/geopose_objs';

export * from './request';

/** Base options for fetch to post json payload */
const JSONPOST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

let doValidation = true;

import { z } from 'zod';

export const cameraParamSchema = z.object({
    model: z.string().optional(),
    modelParams: z.array(z.number()).optional(),
    minMaxDepth: z.array(z.number()).optional(),
    minMaxDisparity: z.array(z.number()).optional(),
});

export const privacySchema = z.object({
    dataRetention: z.array(z.string()),
    dataAcceptableUse: z.array(z.string()),
    dataSanitizationApplied: z.array(z.string()),
    dataSanitizationRequested: z.array(z.string()),
});

export const imageOrientationSchema = z.object({
    mirrored: z.boolean(),
    rotation: z.number(),
});

export const cameraReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    sequenceNumber: z.number(),
    imageFormat: z.string(),
    size: z.array(z.number()),
    imageBytes: z.string(),
    imageOrientation: imageOrientationSchema.optional(),
    params: cameraParamSchema.optional(),
});

export const geolocationReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number(),
    accuracy: z.number(),
    altitudeAccuracy: z.number(),
    heading: z.number(),
    speed: z.number(),
});

export const wiFiReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    BSSID: z.string(),
    frequency: z.number(),
    RSSI: z.number(),
    SSID: z.string(),
    scanTimeStart: z.number(),
    scanTimeEnd: z.number(),
});

export const bluetoothReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    address: z.string(),
    RSSI: z.number(),
    name: z.string(),
});

export const accelerometerReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

export const gyroscopeReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

export const magnetometerReadingSchema = z.object({
    timestamp: z.number(),
    sensorId: z.string(),
    privacy: privacySchema,
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

export const positionSchema = z.object({
    lon: z.number(),
    lat: z.number(),
    h: z.number(),
});

export const quaternionSchema = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
    w: z.number(),
});

export const vector3Schema = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

export const sensorSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    model: z.string().optional(),
    rigIdentifier: z.string().optional(),
    rigRotation: quaternionSchema.optional(),
    rigTranslation: vector3Schema.optional(),
    type: z.string(),
});

export const sensorReadingsSchema = z.object({
    cameraReadings: z.array(cameraReadingSchema).optional(),
    geolocationReadings: z.array(geolocationReadingSchema).optional(),
    wiFiReadings: z.array(wiFiReadingSchema).optional(),
    bluetoothReadings: z.array(bluetoothReadingSchema).optional(),
    accelerometerReadings: z.array(accelerometerReadingSchema).optional(),
    gyroscopeReadings: z.array(gyroscopeReadingSchema).optional(),
    magnetometerReadings: z.array(magnetometerReadingSchema).optional(),
});

export const geoPoseAccuracySchema = z.object({
    position: z.number(),
    orientation: z.number(),
});

export const geoPoseSchema = z.object({
    position: positionSchema,
    quaternion: quaternionSchema,
});

export const geoPoseRespSchema = z.object({
    id: z.string(),
    timestamp: z.number(),
    accuracy: geoPoseAccuracySchema,
    type: z.string(),
    geopose: geoPoseSchema,
});

export const geoPoseReqSchema = z.object({
    id: z.string(),
    timestamp: z.number(),
    type: z.string(),
    sensors: z.array(sensorSchema),
    sensorReadings: sensorReadingsSchema,
    priorPoses: z.array(geoPoseRespSchema).optional(),
});

export type GeoposeRequest = z.infer<typeof geoPoseReqSchema>;
export type GeoposeResponse = z.infer<typeof geoPoseRespSchema>;
export type Geopose = z.infer<typeof geoPoseSchema>;
export type GeoposeAccuracy = z.infer<typeof geoPoseAccuracySchema>;
export type SensorReadings = z.infer<typeof sensorReadingsSchema>;
export type Sensor = z.infer<typeof sensorSchema>;
export type Vector3 = z.infer<typeof vector3Schema>;
export type Quaternion = z.infer<typeof quaternionSchema>;
export type Position = z.infer<typeof positionSchema>;
export type MagnetometerReading = z.infer<typeof magnetometerReadingSchema>;
export type GyroscopeReading = z.infer<typeof gyroscopeReadingSchema>;
export type AccelerometerReading = z.infer<typeof accelerometerReadingSchema>;
export type BluetoothReading = z.infer<typeof bluetoothReadingSchema>;
export type WiFiReading = z.infer<typeof wiFiReadingSchema>;
export type GeolocationReading = z.infer<typeof geolocationReadingSchema>;
export type CameraReading = z.infer<typeof cameraReadingSchema>;
export type ImageOrientation = z.infer<typeof imageOrientationSchema>;
export type Privacy = z.infer<typeof privacySchema>;
export type CameraParam = z.infer<typeof cameraParamSchema>;

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
export async function sendRequest(serviceUrl: string, payload: string, options: RequestInit = {}): Promise<GeoposeResponse> {
    if (doValidation) {
        validate(geoPoseReqSchema, payload);
    }

    const allOptions = deepMerge(JSONPOST, options);
    allOptions.body = payload;

    const response = await fetch(serviceUrl, allOptions);
    if (!response.ok) {
        const responseText = await response.text();
        throw new Error('Network response was not OK: ' + responseText);
    }
    const jsonResponse = await response.json();
    if (doValidation) {
        try {
            const parsedResponse = geoPoseRespSchema.parse(jsonResponse);
            return parsedResponse;
        } catch (error) {
            throw new Error(`Response does not conform to schema of GeoposeResponse: ${error}`);
        }
    }
    return jsonResponse;
}

/**
 * Validates the provided json String against the provided json-schema
 *
 * @param schema  The schema to use for validation
 * @param json  The json string to validate
 * @returns {boolean}  True when valid, throws an exception otherwise
 */
export function validate(schema: z.ZodSchema, json: string): boolean {
    try {
        schema.parse(JSON.parse(json));
        return true;
    } catch (error) {
        throw new Error(`Unable to parse JSON content: ${error}`);
    }
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
export function validateRequest(validate: boolean) {
    doValidation = validate;
}

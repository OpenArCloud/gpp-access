/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)
*/

/**
 * Sensor types usable with the GeoPose protocol
 *
 * Use when creating a new Sensor object.
 */
export const SENSORTYPE = {
    camera: 'camera',
    geolocation: 'geolocation',
    wifi: 'wifi',
    bluetooth: 'bluetooth',
    accelerometer: 'accelerometer',
    gyroscope: 'gyroscope',
    magnetometer: 'magnetometer'
}

/**
 * Image formats usable with the CameraReading object
 *
 * Use when creating a SensorReading object for a new Sensor of type 'camera'.
 */
export const IMAGEFORMAT = {
    RGBA32: 'RGBA32',
    GRAY8: 'GRAY8',
    DEPTH: 'DEPTH',
    JPG: 'JPG'
}

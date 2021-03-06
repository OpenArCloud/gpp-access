Simple library aiming to make using the GeoPoseRequest protocol as easy 
as possible.


This module will very likely only run in a browser using rollup right now. 
Compatibility with other packagers and with Node on the server side is planned.


### Simple usage
    import { sendRequest, objectEndpoint } from 'gpp-access';
    import GeoPoseRequest from 'gpp-access/request/GeoPoseRequest.js';
    import ImageOrientation from 'gpp-access/request/options/ImageOrientation.js';
    import { IMAGEFORMAT } from 'gpp-access/GppGlobals.js';

    const geoPoseRequest = new GeoPoseRequest(uuidv4())
        .addLocationData(latAngle, lonAngle, 0, 0, 0, 0, 0)
        .addCameraData(IMAGEFORMAT.JPG, imageSize, imageBytes, 0, new ImageOrientation(false, 0));

    sendRequest(`${serviceUrl}/${objectEndpoint}`, JSON.stringify(geoPoseRequest))
        .then(data => {
            // handle GeoPoseResponse
        })


### More information about the discovery services used can be found here:
https://github.com/OpenArCloud/oscp-geopose-protocol

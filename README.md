Simple client library for the Open AR Cloud GeoPoseProtocol.

This module will very likely only run in a browser using rollup right now.
Compatibility with other packagers and with Node on the server side is planned.


### New with version 0.1.0:
- conversion from JavaScript to TypeScript

### New with version 0.0.3:
- update to new GeoPose format

### Simple usage
```
    import { sendRequest, defaultEndpoint } from 'gpp-access';
    import GeoPoseRequest from 'gpp-access/request/GeoPoseRequest';
    import ImageOrientation from 'gpp-access/request/options/ImageOrientation';
    import { IMAGEFORMAT } from 'gpp-access/GppGlobals';

    const geoPoseRequest = new GeoPoseRequest(uuidv4())
        .addLocationData(latAngle, lonAngle, 0, 0, 0, 0, 0)
        .addCameraData(IMAGEFORMAT.JPG, imageSize, imageBytes, 0, new ImageOrientation(false, 0));

    sendRequest(`${serviceUrl}/${defaultEndpoint}`, JSON.stringify(geoPoseRequest))
        .then(data => {
            // handle GeoPoseResponse
        })
```

### More information about the discovery services used can be found here:
[https://github.com/OpenArCloud/oscp-geopose-protocol](https://github.com/OpenArCloud/oscp-geopose-protocol)

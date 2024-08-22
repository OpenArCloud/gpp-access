Simple client library for the Open AR Cloud GeoPoseProtocol for visual positioning.

### New with version 0.2.0:
- BREAKING: upgrade to GeoPoseProtocol v2

### New with version 0.1.0:
- conversion from JavaScript to TypeScript

### New with version 0.0.3:
- update to new GeoPose format

### Simple usage
```
    import { sendRequest, validateRequest, GeoPoseRequest, type GeoposeResponseType } from '@oarc/gpp-access';
    import { ImageOrientation, IMAGEFORMAT, CameraParam, CAMERAMODEL } from '@oarc/gpp-access';

    /*
    // Input
    image: string, // base64 encoded JPG image
    width: number,
    height: number,
    cameraIntrinsics: { fx: number; fy: number; cx: number; cy: number; }
    */

    let cameraParams = new CameraParam();
    cameraParams.model = CAMERAMODEL.PINHOLE;
    cameraParams.modelParams = [cameraIntrinsics.fx, cameraIntrinsics.fx, cameraIntrinsics.cx, cameraIntrinsics.cy];

    const geoPoseRequest = new GeoPoseRequest(uuidv4())
        .addCameraData(IMAGEFORMAT.JPG, [width, height], image.split(',')[1], 0, new ImageOrientation(false, 0), cameraParams)
        .addLocationData(latAngle, lonAngle, 0, 0, 0, 0, 0)

    sendRequest(`${serviceUrl}`, JSON.stringify(geoPoseRequest))
        .then(data => {
            // handle GeoPoseResponse
        })
```

### More information about the GeoPoseProtocol can be found here:
[https://github.com/OpenArCloud/oscp-geopose-protocol](https://github.com/OpenArCloud/oscp-geopose-protocol)

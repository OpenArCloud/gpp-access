/*
  (c) 2020 Open AR Cloud
  This code is licensed under MIT license (see LICENSE.md for details)

  (c) 2024 Nokia
  Licensed under the MIT License
  SPDX-License-Identifier: MIT
*/

export class Position {
    lon: number = 0.0;
    lat: number = 0.0;
    h: number = 0.0;
}

export class Quaternion {
    x: number = 0.0;
    y: number = 0.0;
    z: number = 0.0;
    w: number = 1.0;
}

export class GeoPose {
    position: Position = new Position();
    quaternion: Quaternion = new Quaternion();
}

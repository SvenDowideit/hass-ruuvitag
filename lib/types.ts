export interface TagConfig {
  id: string;
  name: string;
  enabled: boolean;
  temperature: boolean;
  humidity: boolean;
  pressure: boolean;
  battery: boolean;
  acceleration: boolean;
  accelerationX: boolean;
  accelerationY: boolean;
  accelerationZ: boolean;
  rssi?: boolean;
  interval?: number;
  equilibriumVaporPressure?: boolean;
  absoluteHumidity?: boolean;
  airDensity?: boolean;
  dewPoint?: boolean;
  vapourPressureDeficit?: boolean;
}

export interface Config {
  interval: number;
  debug: 0;
  tags: TagConfig[];
  hassHost: string;
  hassToken?: string;
}

export interface Tag {
  id: string;
  on: (event: string, handler: (data: TagData) => void) => void;
}

export interface TagData {
  timestamp?: number;
  dataFormat?: number;
  rssi?: number;
  temperature: number;
  humidity: number;
  pressure: number;
  battery: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  acceleration?: number; // computed by ourselves
  equilibriumVaporPressure?: number; // computed
  absoluteHumidity?: number; // computed
  airDensity?: number; // computed
  dewPoint?: number; // computed
  vapourPressureDeficit?: number; // computed
}

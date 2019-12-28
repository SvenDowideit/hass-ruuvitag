export interface TagConfig {
  id: string;
  name: string;
  enabled: boolean;
  temperature: boolean;
  pressure: boolean;
  humidity: boolean;
  battery: boolean;
  acceleration: boolean;
  accelerationX: boolean;
  accelerationY: boolean;
  accelerationZ: boolean;
  rssi: boolean;
  interval?: number;
  equilibrium_vapor_pressure: boolean;
  absolute_humidity: boolean;
  air_density: boolean;
  dew_point: boolean;
  vapour_pressure_deficit: boolean;
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
  humidity: number;
  temperature: number;
  pressure: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  acceleration?: number; // computed by ourselves
  battery: number;
  equilibrium_vapor_pressure?: number; // computed
  absolute_humidity?: number; // computed
  air_density?: number; // computed
  dew_point?: number; // computed
  vapour_pressure_deficit?: number; // computed
}

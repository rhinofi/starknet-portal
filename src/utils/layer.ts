export enum Layers {
    L1,
    L2
  }

export const layerSwitch = (layer: Layers, l1Option: any, l2Option: any) => layer === Layers.L1 ? l1Option : l2Option

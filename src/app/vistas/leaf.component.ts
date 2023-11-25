import { Component } from './component.interface';

export class Leaf implements Component {
    private consumption: number;

    constructor(consumption: number) {
      this.consumption = consumption;
    }
  
    calculateConsumption(): number {
      return this.consumption;
    }

  // Implementación de Leaf
}
import { Component } from './component.interface';

export class Composite implements Component {
    private components: Component[] = [];

    add(component: Component): void {
      this.components.push(component);
    }
  
    remove(component: Component): void {
      const index = this.components.indexOf(component);
      if (index !== -1) {
        this.components.splice(index, 1);
      }
    }
  
    calculateConsumption(): number {
      let totalConsumption = 0;
      for (const component of this.components) {
        totalConsumption += component.calculateConsumption();
      }
      return totalConsumption;
    }
}
import { getGlobalObject } from '../core';

const DI_INSTANCES = 'DI_INSTANCES';
const DI_CREATORS = 'DI_CREATORS';

export type DependencyStrategy = 'singleton' | 'factory';

export function registerDependency(key: string, creator: () => object, strategy: DependencyStrategy = 'singleton'): void {
  const global: any = getGlobalObject();

  if (typeof global[DI_CREATORS] !== 'object') {
    global[DI_CREATORS] = {};
  }

  global[DI_CREATORS][key] = {
    creator,
    strategy,
  };
}

export function getDependency<T>(key: string): T {
  const global: any = getGlobalObject();

  if (!global[DI_CREATORS]) {
    throw new Error('DI: No creators');
  }

  const dependency = global[DI_CREATORS][key];

  if (!dependency) {
    throw new Error(`DI: ${key} - No dependency registered`);
  }

  if (dependency.strategy === 'factory') {
    return dependency.creator();
  }

  if (dependency.strategy === 'singleton') {
    if (typeof global[DI_INSTANCES] !== 'object') {
      global[DI_INSTANCES] = {};
    }

    if (!global[DI_INSTANCES][key]) {
      global[DI_INSTANCES][key] = dependency.creator();
    }

    return global[DI_INSTANCES][key];
  }

  throw new Error('DI: Unknown strategy');
}

const defaultGlobalObject = {};

export function getGlobalObject(): object {
  if (eval('typeof window') === 'object') return eval('window');
  if (eval('typeof global') === 'object') return eval('global');
  return defaultGlobalObject;
}

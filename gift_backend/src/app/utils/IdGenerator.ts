export function generateId(prefix = 'G-', length = 3) {
    const randomPart = Math.random().toString(36).substr(2, length);
    return `${prefix}${randomPart}`;
  }
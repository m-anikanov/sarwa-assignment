function ensureArray(arg) {
  return Array.isArray(arg) ? arg : [arg];
}

module.exports = ensureArray;
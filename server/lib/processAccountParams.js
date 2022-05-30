const ensureArray = require('./ensureArray');

function processAccountParams(query) {
  const {
    limit: rawLimit,
    offset: rawOffset,
    statusIn: rawStatusIn,
  } = query;

  const limit = rawLimit ? parseInt(rawLimit) : 100;
  const offset = rawOffset ? parseInt(rawOffset) : 0;
  const statusIn = rawStatusIn ? ensureArray(rawStatusIn) : [];

  return {
    limit,
    offset,
    statusIn,
  };
}

module.exports = processAccountParams;

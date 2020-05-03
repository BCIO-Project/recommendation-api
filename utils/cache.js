getCacheHeaders = () => {
  return {
    "Cache-Control": "public, max-age=300",
    "Expires": new Date(Date.now() + 300 *1000).toUTCString()
  };
}

module.exports = {
  getCacheHeaders
}
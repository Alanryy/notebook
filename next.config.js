/** @type {import('next').NextConfig} */
module.exports = {
    exportPathMap: async function (defaultPathMap) {
      // Define custom path mappings for static export
      const customPathMap = {
        // Add your custom path mappings here
      };
  
      // Merge the default and custom path mappings
      return Object.assign({}, defaultPathMap, customPathMap);
    },
  };

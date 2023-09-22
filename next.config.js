/** @type {import('next').NextConfig} */
module.exports = {
  exportPathMap: async function (defaultPathMap) {
    const customPathMap = {
      // Map API routes to custom paths
      '/api/notepages': { page: '/api/notepages/' },
      
      // Add more custom path mappings here
      
      // Default path mappings based on your project's file structure
      ...defaultPathMap,
    };

    return customPathMap;
  },
};
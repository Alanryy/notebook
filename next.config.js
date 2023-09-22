/** @type {import('next').NextConfig} */

module.exports = {
  async generateStaticParams() {
    // Map API routes to custom paths
    const customPathMap = {
      '/api/notepages/get': { page: '/api/notepages/get' },
      '/api/notepages/put': { page: '/api/notepages/put' },
      '/api/notepages/delete': { page: '/api/notepages/delete' },
      '/api/notepages/post': { page: '/api/notepages/post' },
      
      // Add more custom path mappings here
      
      // Default path mappings based on your project's file structure
      ...defaultPathMap,
    };

    return customPathMap;
  },
};
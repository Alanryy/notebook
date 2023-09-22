
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    kipTrailingSlashRedirect: true,
    distDir: 'dist',
    // basePath: '/api',
  async generateStaticParams() {
    // Define how to generate static versions of dynamic routes
    const dynamicParams = [
      // Define the dynamic parameters for your route
      { id: '1' },
      { id: '2' },
      // Add more dynamic parameters as needed
    ];

    // Create an array of static paths based on dynamic parameters
    const paths = dynamicParams.map((params) => ({
      params,
      // Specify the page component for this route
      page: '/api/notepages/[id]',
    }));

    return paths;
  },
}
 
module.exports = nextConfig
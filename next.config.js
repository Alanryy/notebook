
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
    trailingSlash: true,
    kipTrailingSlashRedirect: true,
    distDir: 'dist',
}
 
module.exports = nextConfig
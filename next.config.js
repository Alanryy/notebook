
/** @type {import('next').NextConfig} */

const nextConfig = {
    source: '/api/:path*',
    destination: 'http://notebook-git-api-alanrys-projects.vercel.app/api/:path*',
}
 
module.exports = nextConfig
import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'zmorse',
    short_name: 'zmorse',
    description: 'play around with morse code',
    start_url: '/',
    display: 'browser',
    background_color: '#313131',
    theme_color: '#ffffff',
    screenshots: [{src: '../public/thumbnail.png'}],
    categories: ['morse', 'morse-code', '.-', 'morse code'],
    icons: [
      {
        src: './favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
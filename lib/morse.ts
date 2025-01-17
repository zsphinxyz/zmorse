// copied from http://freenet.msp.mn.us/people/calguire/morse.html
export const morseLetter:any = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',}

export const morseAccent:any = {
  'Á': '.--.-', // A with acute accent
  'Ä': '.-.-',  // A with diaeresis
  'É': '..-..', // E with acute accent
  'Ñ': '--.--', // N with tilde
  'Ö': '---.',  // O with diaeresis
  'Ü': '..--',  // U with diaeresis
}

export const morseNumber:any = {
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
}

export const morsePunctuation:any = {
  ',': '--..--',  // comma
  '.': '.-.-.-',  // period
  '?': '..--..',  // question mark
  ';': '-.-.-',   // semicolon
  ':': '---...',  // colon
  '/': '-..-.',   // slash
  '-': '-....-',  // dash
  "'": '.----.',  // apostrophe
  '()': '-.--.-', // parenthesis
  '_': '..--.-',  // underline
  '@': '.--.-.',  // at symbol from http://www.learnmorsecode.com/
  ' ': ' '
}

export const all = {...morseLetter, ...morseAccent, ...morsePunctuation, ...morseNumber}

let arr:any = Object.entries(all).map(code => code.reverse())
let ob = {};

arr.map( (i:any) => {
 Object.defineProperty(ob, i[0], {value: i[1]})
})

export const all_rev = ob     // revert values to keys and keys to values

export const letter_imgs = [
  { id: 0, img: 'Archery.png', steps: 3 },
  { id: 1, img: 'Banjo.png', steps: 5 },
  { id: 2, img: 'Candy.png', steps: 5 },
  { id: 3, img: 'Dog.png', steps: 4 },
  { id: 4, img: 'Eye.png', steps: 2 },
  { id: 5, img: 'Firetruck.png', steps: 5 },
  { id: 6, img: 'Giraffe.png', steps: 4 },
  { id: 7, img: 'Hippo.png', steps: 5 },
  { id: 8, img: 'Insect.png', steps: 3 },
  { id: 9, img: 'Jet.png', steps: 5 },
  { id: 10, img: 'Kite.png', steps: 4 },
  { id: 11, img: 'Laboratory.png', steps: 5 },
  { id: 12, img: 'Mustache.png', steps: 3 },
  { id: 13, img: 'Net.png', steps: 3 },
  { id: 14, img: 'Orchestra.png', steps: 4 },
  { id: 15, img: 'Paddle.png', steps: 5 },
  { id: 16, img: 'Quarterback.png', steps: 5 },
  { id: 18, img: 'Robot.png', steps: 4 },
  { id: 19, img: 'Submarine.png', steps: 4 },
  { id: 20, img: 'Tape.png', steps: 2 },
  { id: 21, img: 'Unicorn.png', steps: 4 },
  { id: 22, img: 'Vacuum.png', steps: 5 },
  { id: 23, img: 'Wand.png', steps: 4 },
  { id: 24, img: 'X-ray.png', steps: 5 },
  { id: 25, img: 'Yard.png', steps: 5 },
  { id: 26, img: 'Zebra.png', steps: 5 },
]


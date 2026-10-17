/* ====== EDIT YOUR PERSONAL MESSAGE HERE ====== */
const LETTER = `Dear MyLove,

Happy 18th birthday!I hope your day feels special and joyful, and marks the beginning of a wonderful new chapter for you. Thank you for the memories, the laughter, and everything I learned from you. I truly appreciate them, and I will always wish you well. May the years ahead bring you love, success, and wonderful opportunities. Remember to take care of yourself and be proud of how far you have come—you have so many beautiful things ahead of you.Legal Age mo na

Enjoy your debut. You deserve to be happy and celebrated. I love you so much, and I hope this birthday is just the start of a year filled with happiness and amazing experiences. I hope you know how much you are loved and cherished, not just today, but every day. I am grateful for the chance to celebrate this special milestone with you. May your birthday be as wonderful and extraordinary as you are.

I love you, and I am so proud of the person you are becoming. Happy birthday, my love!

Proudly yours,
Michael`;

const WISHES = [
    "May your heart always find reasons to be happy.",
    "May the dreams that matter most to you come true.",
    "Wishing you health, strength, and plenty of joyful days.",
    "May learning bring you confidence and exciting opportunities.",
    "May you always have kind, genuine friends by your side.",
    "May you find a reason to laugh every single day.",
    "May you feel proud of everything you have accomplished.",
    "May you meet every challenge with courage.",
    "May you discover more of the things that make you feel alive.",
    "Wishing you peace of mind and a calm, happy heart.",
    "May you always remember to love and take care of yourself.",
    "May the year ahead bring you wonderful new adventures.",
    "May you give yourself permission to rest whenever you need it.",
    "May you be surrounded by people who bring out the best in you.",
    "May your beautiful smile never lose its sparkle.",
    "May you always feel free to be your wonderful, authentic self.",
    "May each new day be as lovely as the kindness you share.",
    "Wishing you the happiest 18th birthday and many beautiful years to come. "
];

/* ====== CHANGE YOUR PHOTOS, MUSIC, AND VIDEO HERE ======
   Add each photo file name to this list. The alt text is for screen
   readers only and is not shown as a caption.
   Set audioSrc, videoSrc, and videoPoster to your own file paths.
*/
const MEDIA = {
    photos: [
        { src: 'Neyet.jpg', alt: 'Kricel smiling in her portrait' },
        { src: 'img1.jpg', alt: 'Birthday memory 1' },
        { src: 'img2.jpg', alt: 'Birthday memory 2' },
        { src: 'img3.jpg', alt: 'Birthday memory 3' },
        { src: 'img4.jpg', alt: 'Birthday memory 4' },
        { src: 'img5.jpg', alt: 'Birthday memory 5' },
        { src: 'img6.jpg', alt: 'Birthday memory 6' },
        { src: 'img7.jpg', alt: 'Birthday memory 7' },
        { src: 'img8.jpg', alt: 'Birthday memory 8' },
        { src: 'img9.jpg', alt: 'Birthday memory 9' },
        { src: 'img10.jpg', alt: 'Birthday memory 10' },
        { src: 'img11.jpg', alt: 'Birthday memory 11' },
        { src: 'img12.jpg', alt: 'Birthday memory 12' },
        { src: 'img13.jpg', alt: 'Birthday memory 13' },
        { src: 'img14.jpg', alt: 'Birthday memory 14' },
        { src: 'img15.jpg', alt: 'Birthday memory 15' }
    ],
    audioSrc: 'Dancing Queen.mp3',
    videoSrc: 'video12.mp4',
    videoPoster: 'Mwa.png'
};
/* ====== END OF MEDIA SETTINGS ====== */
const FINAL = "Happy 18th birthday, MyLove! \n May your day be full of joy, kindness, and beautiful memories. You deserve to be happy. I love you so much, and I hope this birthday is just the start of a year filled with happiness and amazing experiences. I hope you know how much you are loved and cherished, not just today, but every day. I am grateful for the chance to celebrate this special milestone with you. May your birthday be as wonderful and extraordinary as you are.";
/* ====== END OF PERSONALIZATION ====== */

const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cv = $('fx');
const cx = cv.getContext('2d');
let parts = [];
let raf = 0;
let letterTimer = 0;
let lastFlowerAt = 0;

function sizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(window.innerWidth * ratio);
    cv.height = Math.round(window.innerHeight * ratio);
    cx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

sizeCanvas();
window.addEventListener('resize', sizeCanvas);

function burst(amount = 140) {
    if (reduceMotion) return;

    const colors = ['#be5876', '#f2b5c6', '#ffd9a0', '#fff', '#d39ab1', '#e8c7a8'];
    for (let i = 0; i < amount; i++) {
        parts.push({
            kind: 'confetti',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2.2,
            vx: (Math.random() - .5) * 14,
            vy: Math.random() * -13 - 2,
            size: Math.random() * 7 + 3,
            color: colors[i % colors.length],
            rotation: Math.random() * 6,
            life: 140
        });
    }
    if (!raf && !document.hidden) raf = requestAnimationFrame(animateConfetti);
}

function animateConfetti(now = 0) {
    cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const flowerInterval = reduceMotion ? 850 : 300;
    if (now - lastFlowerAt >= flowerInterval) {
        lastFlowerAt = now;
        parts.push({
            kind: 'flower',
            x: Math.random() * window.innerWidth,
            y: -20,
            vx: (Math.random() - .5) * .65,
            vy: reduceMotion ? .45 + Math.random() * .35 : .7 + Math.random() * .75,
            size: reduceMotion ? 6 + Math.random() * 4 : 7 + Math.random() * 7,
            color: ['#ed9eb5', '#f5c7d1', '#fff1e6', '#e9b5c7'][Math.floor(Math.random() * 4)],
            rotation: Math.random() * Math.PI * 2,
            spin: (Math.random() - .5) * .018,
            sway: Math.random() * Math.PI * 2,
            life: window.innerHeight + 80
        });
    }

    parts = parts.filter(particle => particle.kind === 'flower'
        ? particle.y < window.innerHeight + 30
        : particle.life > 0);
    parts.forEach(particle => {
        particle.x += particle.vx;
        if (particle.kind === 'flower') {
            particle.sway += .018;
            particle.x += Math.sin(particle.sway) * .35;
            particle.y += particle.vy;
            particle.rotation += particle.spin;
        } else {
            particle.y += particle.vy;
            particle.vy += .3;
            particle.rotation += .2;
            particle.life--;
        }

        cx.save();
        cx.translate(particle.x, particle.y);
        cx.rotate(particle.rotation);
        cx.fillStyle = particle.color;
        if (particle.kind === 'flower') {
            cx.globalAlpha = .78;
            for (let petal = 0; petal < 5; petal++) {
                cx.save();
                cx.rotate((Math.PI * 2 * petal) / 5);
                cx.beginPath();
                cx.ellipse(0, -particle.size * .48, particle.size * .28, particle.size * .48, 0, 0, Math.PI * 2);
                cx.fill();
                cx.restore();
            }
            cx.fillStyle = '#f3d58b';
            cx.beginPath();
            cx.arc(0, 0, particle.size * .2, 0, Math.PI * 2);
            cx.fill();
        } else {
            cx.globalAlpha = Math.min(1, particle.life / 40);
            cx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * .6);
        }
        cx.restore();
    });
    raf = document.hidden ? 0 : requestAnimationFrame(animateConfetti);
}

raf = requestAnimationFrame(animateConfetti);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else if (!raf) {
        raf = requestAnimationFrame(animateConfetti);
    }
});

$('start')?.addEventListener('click', () => {
    burst();
    $('letter').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

$('env').addEventListener('click', function () {
    if (this.classList.contains('open')) return;
    this.classList.add('open');

    const letter = $('ltr');
    window.clearTimeout(letterTimer);
    letter.textContent = '';
    letter.hidden = false;
    letter.classList.add('show');

    if (reduceMotion) {
        letter.textContent = LETTER;
        return;
    }

    let index = 0;
    const typeNextCharacter = () => {
        if (index >= LETTER.length) return;
        letter.textContent += LETTER[index++];
        letterTimer = window.setTimeout(typeNextCharacter, 18);
    };
    typeNextCharacter();
});

const modal = $('modal');
let modalTrigger = null;

function closeModal() {
    modal.classList.remove('show');
    modalTrigger?.focus();
}

function openModal(title, message, trigger) {
    modalTrigger = trigger;
    $('mt').textContent = title;
    $('mp').textContent = message;
    modal.classList.add('show');
    $('modal-close').focus();
}

const grid = $('grid');
WISHES.forEach((wish, index) => {
    const button = document.createElement('button');
    button.className = 'rose';
    button.type = 'button';
    button.setAttribute('aria-label', `Open wish number ${index + 1}`);
    button.innerHTML = `🌷<small>${index + 1}</small>`;
    button.addEventListener('click', () => {
        button.classList.add('done');
        openModal(`Wish #${index + 1}`, wish, button);
    });
    grid.appendChild(button);
});

$('modal-close').addEventListener('click', closeModal);
$('modal-done').addEventListener('click', closeModal);
modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

const gallery = $('gal');
MEDIA.photos.forEach((photo, index) => {
    const card = document.createElement('article');
    card.className = 'ph';
    const imageArea = document.createElement('div');
    imageArea.className = index === 0 ? 'img portrait' : 'img';
    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = index === 0 ? 'eager' : 'lazy';
    image.fetchPriority = index === 0 ? 'high' : 'auto';
    image.decoding = 'async';
    image.addEventListener('error', () => {
        imageArea.classList.add('image-unavailable');
        image.remove();
    }, { once: true });
    imageArea.appendChild(image);

    card.append(imageArea);
    gallery.appendChild(card);
});

function createBirthdayMelody() {
    const sampleRate = 22050;
    const beatDuration = .42;
    const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 880, 783.99, 659.25, 523.25];
    const notes = melody.concat(melody);
    const sampleCount = Math.ceil((notes.length * beatDuration + .6) * sampleRate);
    const samples = new Float32Array(sampleCount);

    notes.forEach((frequency, index) => {
        const start = Math.floor(index * beatDuration * sampleRate);
        const duration = Math.floor(beatDuration * .9 * sampleRate);
        for (let offset = 0; offset < duration && start + offset < sampleCount; offset++) {
            const time = offset / sampleRate;
            const progress = offset / duration;
            const envelope = Math.min(1, time / .025) * Math.pow(1 - progress, 1.8);
            const fundamental = Math.sin(2 * Math.PI * frequency * time);
            const overtone = Math.sin(4 * Math.PI * frequency * time) * .22;
            const harmony = Math.sin(2 * Math.PI * frequency / 2 * time) * .16;
            samples[start + offset] += (fundamental + overtone + harmony) * envelope * .24;
        }
    });

    const headerSize = 44;
    const buffer = new ArrayBuffer(headerSize + samples.length * 2);
    const view = new DataView(buffer);
    const writeText = (offset, text) => {
        for (let index = 0; index < text.length; index++) view.setUint8(offset + index, text.charCodeAt(index));
    };
    writeText(0, 'RIFF');
    view.setUint32(4, buffer.byteLength - 8, true);
    writeText(8, 'WAVE');
    writeText(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeText(36, 'data');
    view.setUint32(40, samples.length * 2, true);
    samples.forEach((sample, index) => {
        const value = Math.max(-1, Math.min(1, sample));
        view.setInt16(headerSize + index * 2, value < 0 ? value * 0x8000 : value * 0x7fff, true);
    });
    return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

const audioPlayer = $('audio-player');
let melodyUrl = '';
if (MEDIA.audioSrc) {
    audioPlayer.src = MEDIA.audioSrc;
} else {
    melodyUrl = createBirthdayMelody();
    audioPlayer.src = melodyUrl;
}

const videoPlayer = $('video-player');
const videoDescription = $('video-description');
videoPlayer.poster = MEDIA.videoPoster;
videoPlayer.addEventListener('error', () => {
    videoDescription.textContent = 'The video could not be loaded. Check the videoSrc file path in index.js.';
});
if (MEDIA.videoSrc) {
    videoPlayer.src = MEDIA.videoSrc;
    videoDescription.textContent = '';
    videoPlayer.load();
} else {
    videoDescription.textContent = 'Add your video file path to MEDIA.videoSrc in index.js.';
}

if (melodyUrl) {
    window.addEventListener('pagehide', () => URL.revokeObjectURL(melodyUrl), { once: true });
}

$('surprise').addEventListener('click', () => {
    burst(220);
    $('final').textContent = FINAL;
    window.setTimeout(() => burst(160), 600);
});

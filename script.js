const START_DATE = new Date(2026, 8, 28);
const END_DATE = new Date(2027, 8, 28);

const SPECIAL_LOVE_DATE = "2026-10-03";

const STORAGE_KEY = "blubi_omrum_new_calendar_2026_2027";

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    opened: [],
    secretUnlocked: false
};

const modal = document.getElementById("flowerModal");
const modalFlower = document.getElementById("modalFlower");
const modalDate = document.getElementById("modalDate");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalClose = document.getElementById("modalClose");

const toast = document.getElementById("toast");
const calendarContainer = document.getElementById("calendarContainer");

const todayFlower = document.getElementById("todayFlower");
const todayDate = document.getElementById("todayDate");
const todayTitle = document.getElementById("todayTitle");
const todayMessage = document.getElementById("todayMessage");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const specialBanner = document.getElementById("specialBanner");

const secretButton = document.getElementById("secretButton");
const musicButton = document.getElementById("musicButton");
const backTop = document.getElementById("backTop");

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const monthThemes = {
    8: "El comienzo de nuestro jardín",
    9: "Octubre de abrazos",
    10: "Noviembre de recuerdos",
    11: "Diciembre de sueños",
    0: "Enero de nuevos comienzos",
    1: "Febrero de nosotros",
    2: "Marzo de primavera",
    3: "Abril de sonrisas",
    4: "Mayo de momentos",
    5: "Junio de celebraciones",
    6: "Julio de nuestro amor",
    7: "Agosto de aventuras",
};

const specialMessages = {
    "2026-09-28": {
        title: "El comienzo",
        text: "Hoy empieza nuestro pequeño jardín. Una flor, un día y un recuerdo para nosotros.",
        flower: "🌹"
    },

    "2026-10-03": {
        title: "Te amo mucho",
        text: "Mi kurdi, te amo un monton, no veas lo cómodo que estoy cuando te abrazo, siento que no me hace falta nada mas de este mundo. Al igual soy un poco intenso que me enfado por tonterias o me pongo muy feliz por cosas insignificantes, pero no quiero que dudes un segundo de que te amo. Y aunque me cueste imaginar la vida sin ti, quiero compartir contigo todo el tiempo que la vida nos dé.",
        flower: "🌹",
        special: true
    },

    "2027-01-21": {
        title: "Feliz cumpleaños",
        text: "Hoy es tu día. Espero que nunca olvides lo especial que eres para mí.",
        flower: "🌷"
    },

    "2027-02-08": {
        title: "Nuestro día",
        text: "Otro capítulo de nuestra historia. Gracias por seguir formando parte de ella.",
        flower: "🌹"
    },

    "2027-06-03": {
        title: "Mi cumpleaños",
        text: "Un año más, y una de las cosas que más quiero seguir teniendo eres tú.",
        flower: "🌻"
    },

    "2027-07-24": {
        title: "Nuestro comienzo",
        text: "El día que todo cambió y decidimos darnos una oportunidad.",
        flower: "🌹"
    },

    "2027-09-28": {
        title: "Un año entero",
        text: "Llegamos al final de nuestro jardín. Pero esto no es el final de nuestra historia.",
        flower: "🌹"
    }
};

const twentyFourMessages = {
    8: {
        title: "Una pequeña promesa",
        text: "Cada 24 será una pequeña sorpresa dentro de nuestro jardín.",
        flower: "🌷"
    },

    9: {
        title: "Un día para nosotros",
        text: "No necesito una fecha especial para quererte, pero me gusta tener días que me recuerden lo importante que eres.",
        flower: "🌹"
    },

    10: {
        title: "Otro recuerdo",
        text: "Guarda este día como otro pequeño recuerdo de nosotros.",
        flower: "🌸"
    },

    11: {
        title: "Diciembre",
        text: "Que este mes nos deje muchos momentos que recordar.",
        flower: "🌺"
    },

    0: {
        title: "Enero",
        text: "Un nuevo mes, pero el mismo cariño.",
        flower: "🌷"
    },

    1: {
        title: "Febrero",
        text: "Un poquito más de nosotros.",
        flower: "🌹"
    },

    2: {
        title: "Marzo",
        text: "Que sigamos creciendo juntos como estas flores.",
        flower: "🌼"
    },

    3: {
        title: "Abril",
        text: "Otro pequeño momento para guardar.",
        flower: "🌸"
    },

    4: {
        title: "Mayo",
        text: "Que nunca nos falten sonrisas.",
        flower: "🌷"
    },

    5: {
        title: "Junio",
        text: "Un mes más compartiendo recuerdos.",
        flower: "🌻"
    },

    6: {
        title: "Julio",
        text: "Nuestro mes especial.",
        flower: "🌹"
    },

    7: {
        title: "Agosto",
        text: "Que este verano nos deje historias bonitas.",
        flower: "🌺"
    }
};

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeDate(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}

function dateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
}

function isSameDay(a, b) {
    return dateKey(a) === dateKey(b);
}

function getToday() {
    return normalizeDate(new Date());
}

function isDateInRange(date) {
    return date >= START_DATE && date <= END_DATE;
}

function getMessage(date) {
    const key = dateKey(date);

    if (specialMessages[key]) {
        return specialMessages[key];
    }

    if (date.getDate() === 24) {
        return (
            twentyFourMessages[date.getMonth()] || {
                title: "Para ti",
                text: "Una pequeña flor para recordarte que te quiero.",
                flower: "🌷"
            }
        );
    }

    const flowers = [
        "🌷",
        "🌹",
        "🌸",
        "🌺",
        "🌻",
        "🌼"
    ];

    const flower = flowers[
        Math.floor(
            (date.getTime() / 86400000) % flowers.length
        )
    ];

    return {
        title: "Una flor para ti",
        text: "Hoy también quería dejarte un pequeño detalle. Espero que tengas un día bonito.",
        flower
    };
}

function formatDate(date) {
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function renderCalendar() {
    calendarContainer.innerHTML = "";

    const today = getToday();

    let currentMonth = new Date(
        START_DATE.getFullYear(),
        START_DATE.getMonth(),
        1
    );

    while (
        currentMonth <=
        new Date(END_DATE.getFullYear(), END_DATE.getMonth(), 1)
    ) {
        const monthCard = document.createElement("section");
        monthCard.className = "month-card";

        const monthHeader = document.createElement("div");
        monthHeader.className = "month-header";

        const monthTitle = document.createElement("h2");
        monthTitle.textContent =
            monthNames[currentMonth.getMonth()];

        const monthSubtitle = document.createElement("p");
        monthSubtitle.textContent =
            monthThemes[currentMonth.getMonth()] || "";

        monthHeader.appendChild(monthTitle);
        monthHeader.appendChild(monthSubtitle);

        const grid = document.createElement("div");
        grid.className = "calendar-grid";

        const firstDay = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1
        );

        const daysInMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            0
        ).getDate();

        let startOffset = firstDay.getDay();

        startOffset = startOffset === 0 ? 6 : startOffset - 1;

        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement("div");
            empty.className = "day empty";
            grid.appendChild(empty);
        }

        for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
            const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                dayNumber
            );

            if (!isDateInRange(date)) {
                const empty = document.createElement("div");
                empty.className = "day empty";
                grid.appendChild(empty);
                continue;
            }

            const key = dateKey(date);
            const message = getMessage(date);

            const cell = document.createElement("button");
            cell.className = "day";

            const isToday = isSameDay(date, today);
            const isPast = date < today;
            const isFuture = date > today;
            const isSpecialLove = key === SPECIAL_LOVE_DATE;
            const isSpecial = Boolean(
                specialMessages[key] || date.getDate() === 24
            );

            if (isToday) {
                cell.classList.add("today");
            }

            if (isPast) {
                cell.classList.add("past");
            }

            if (isFuture) {
                cell.classList.add("future");
            }

            if (isSpecial) {
                cell.classList.add("special");
            }

            if (isSpecialLove) {
                cell.classList.add("special-love-day");
            }

            if (state.opened.includes(key)) {
                cell.classList.add("opened");
            }

            const number = document.createElement("span");
            number.className = "day-number";
            number.textContent = dayNumber;

            const flower = document.createElement("span");
            flower.className = "flower";
            flower.textContent = message.flower;

            const mark = document.createElement("span");
            mark.className = "day-mark";

            if (isSpecialLove) {
                mark.textContent = "TE AMO";
            } else if (key === "2026-09-28") {
                mark.textContent = "INICIO";
            } else if (date.getDate() === 24) {
                mark.textContent = "24";
            } else {
                mark.textContent = "";
            }

            cell.appendChild(number);
            cell.appendChild(flower);
            cell.appendChild(mark);

            cell.addEventListener("click", () => {
                if (isFuture) {
                    showToast(
                        "Esta flor todavía está cerrada 🌱"
                    );
                    return;
                }

                if (isPast && !isToday) {
                    showToast(
                        "Esta flor ya pasó 🌸"
                    );
                    return;
                }

                openFlower(date);
            });

            grid.appendChild(cell);
        }

        monthCard.appendChild(monthHeader);
        monthCard.appendChild(grid);
        calendarContainer.appendChild(monthCard);

        currentMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            1
        );
    }
}

function openFlower(date) {
    const key = dateKey(date);
    const message = getMessage(date);

    const isSpecialLove =
        key === SPECIAL_LOVE_DATE ||
        message.special === true;

    modal.classList.remove("special-love");

    modalFlower.textContent = message.flower;
    modalDate.textContent = formatDate(date);
    modalTitle.textContent = message.title;
    modalMessage.textContent = message.text;

    modal.classList.add("show");

    if (isSpecialLove) {
        modal.classList.add("special-love");

        createLoveBurst();
        playSpecialSound();
    } else {
        createConfetti();
        playOpenSound();
    }

    if (!state.opened.includes(key)) {
        state.opened.push(key);
        saveState();
    }

    renderCalendar();
}

function closeModal() {
    modal.classList.remove("show");
    modal.classList.remove("special-love");
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

function updateToday() {
    const today = getToday();

    if (!isDateInRange(today)) {
        todayFlower.textContent = "🌹";
        todayDate.textContent = "";
        todayTitle.textContent = "Nuestro jardín";
        todayMessage.textContent =
            "Nuestro calendario está fuera del periodo disponible.";
        return;
    }

    const key = dateKey(today);
    const message = getMessage(today);

    todayFlower.textContent = message.flower;
    todayDate.textContent = formatDate(today);
    todayTitle.textContent = message.title;
    todayMessage.textContent = message.text;

    const totalDays =
        Math.floor(
            (END_DATE - START_DATE) / 86400000
        ) + 1;

    const elapsedDays =
        Math.floor(
            (today - START_DATE) / 86400000
        ) + 1;

    const percentage = Math.max(
        0,
        Math.min(100, (elapsedDays / totalDays) * 100)
    );

    progressText.textContent =
        `${elapsedDays} / ${totalDays}`;

    progressBar.style.width =
        `${percentage}%`;

    if (key === SPECIAL_LOVE_DATE) {
        specialBanner.classList.add("active");

        specialBanner.textContent =
            "❤️ Hoy hay una flor especialmente para ti...";
    } else {
        specialBanner.classList.remove("active");

        specialBanner.textContent =
            "Cada día tiene una pequeña sorpresa para ti.";
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function createConfetti() {
    const symbols = [
        "♥",
        "✦",
        "✧",
        "♡"
    ];

    for (let i = 0; i < 28; i++) {
        const particle = document.createElement("span");

        particle.className = "confetti";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            `${Math.random() * 100}vw`;

        particle.style.animationDelay =
            `${Math.random() * 0.8}s`;

        particle.style.animationDuration =
            `${2 + Math.random() * 2}s`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 4500);
    }
}

function createLoveBurst() {
    const container =
        document.createElement("div");

    container.className =
        "love-burst-container";

    const symbols = [
        "♥",
        "♥",
        "♡",
        "✦",
        "✧",
        "♥"
    ];

    for (let i = 0; i < 36; i++) {
        const particle =
            document.createElement("span");

        particle.className =
            "love-particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            120 + Math.random() * 330;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );

        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 540 - 270}deg`
        );

        particle.style.setProperty(
            "--time",
            `${1.8 + Math.random() * 1.3}s`
        );

        particle.style.setProperty(
            "--delay",
            `${Math.random() * 0.35}s`
        );

        particle.style.left = "50%";
        particle.style.top = "50%";

        container.appendChild(particle);
    }

    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 4000);
}

function playOpenSound() {
    if (!window.AudioContext && !window.webkitAudioContext) {
        return;
    }

    try {
        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioCtx();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 520;

        gain.gain.setValueAtTime(
            0.0001,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.08,
            audio.currentTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audio.currentTime + 0.45
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();
        oscillator.stop(
            audio.currentTime + 0.5
        );
    } catch (error) {
        console.log(error);
    }
}

function playSpecialSound() {
    if (!window.AudioContext && !window.webkitAudioContext) {
        return;
    }

    try {
        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioCtx();

        const notes = [
            523.25,
            659.25,
            783.99,
            1046.5
        ];

        notes.forEach((frequency, index) => {
            const oscillator =
                audio.createOscillator();

            const gain =
                audio.createGain();

            const start =
                audio.currentTime +
                index * 0.13;

            oscillator.type = "sine";
            oscillator.frequency.value =
                frequency;

            gain.gain.setValueAtTime(
                0.0001,
                start
            );

            gain.gain.exponentialRampToValueAtTime(
                0.07,
                start + 0.03
            );

            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                start + 0.55
            );

            oscillator.connect(gain);
            gain.connect(audio.destination);

            oscillator.start(start);
            oscillator.stop(start + 0.6);
        });
    } catch (error) {
        console.log(error);
    }
}

function showSecret() {
    modal.classList.remove("special-love");

    modalFlower.textContent = "💗";
    modalDate.textContent = "Un pequeño secreto";
    modalTitle.textContent = "Para ti";
    modalMessage.textContent =
        "Si has llegado hasta aquí, significa que has estado mirando nuestro pequeño jardín. Te quiero, Ömrüm.";

    modal.classList.add("show");

    createConfetti();
}

if (secretButton) {
    let secretClicks = 0;
    let secretTimer;

    secretButton.addEventListener("click", () => {
        secretClicks++;

        clearTimeout(secretTimer);

        secretTimer = setTimeout(() => {
            secretClicks = 0;
        }, 1000);

        if (secretClicks >= 3) {
            secretClicks = 0;
            state.secretUnlocked = true;
            saveState();

            showSecret();
        }
    });
}

let audioEnabled = false;
let backgroundAudio;

if (musicButton) {
    musicButton.addEventListener("click", () => {
        audioEnabled = !audioEnabled;

        musicButton.textContent =
            audioEnabled ? "🔊" : "🔇";

        if (audioEnabled) {
            startBackgroundMusic();
        } else {
            stopBackgroundMusic();
        }
    });
}

function startBackgroundMusic() {
    if (backgroundAudio) {
        return;
    }

    try {
        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioCtx();

        backgroundAudio = audio;

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 220;

        gain.gain.value = 0.008;

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();

        backgroundAudio.oscillator =
            oscillator;
        backgroundAudio.gain =
            gain;
    } catch (error) {
        console.log(error);
    }
}

function stopBackgroundMusic() {
    if (
        backgroundAudio &&
        backgroundAudio.oscillator
    ) {
        try {
            backgroundAudio.oscillator.stop();
        } catch (error) {
            console.log(error);
        }
    }

    backgroundAudio = null;
}

if (backTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const canvas =
    document.getElementById("backgroundCanvas");

const ctx =
    canvas ? canvas.getContext("2d") : null;

let particles = [];

function resizeCanvas() {
    if (!canvas) {
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];

    const amount =
        Math.min(
            80,
            Math.floor(
                window.innerWidth / 16
            )
        );

    for (let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 1 + Math.random() * 3,
            speed: 0.15 + Math.random() * 0.4,
            drift:
                (Math.random() - 0.5) * 0.3,
            opacity:
                0.15 + Math.random() * 0.35
        });
    }
}

function animateBackground() {
    if (!canvas || !ctx) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -10) {
            particle.y =
                canvas.height + 10;

            particle.x =
                Math.random() * canvas.width;
        }

        if (
            particle.x < -10 ||
            particle.x > canvas.width + 10
        ) {
            particle.x =
                Math.random() * canvas.width;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.globalAlpha =
            particle.opacity;

        ctx.fillStyle = "#f5b7cf";
        ctx.fill();

        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(
        animateBackground
    );
}

window.addEventListener(
    "resize",
    () => {
        resizeCanvas();
        createParticles();
    }
);

resizeCanvas();
createParticles();
animateBackground();

updateToday();
renderCalendar();

setInterval(() => {
    updateToday();
    renderCalendar();
}, 60000);

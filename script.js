/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://jqehzruekmlfagyvytsn.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Q-FkjZiyjIbriXcDUliaVQ__MnqNIhV";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


/* =========================================================
   CALENDARIO
========================================================= */

const START_DATE =
    new Date(2026, 8, 28);

const END_DATE =
    new Date(2027, 8, 28);

const SPECIAL_LOVE_DATE =
    "2026-10-03";

const SECOND_SPECIAL_LOVE_DATE =
    "2026-10-04";

const STORAGE_KEY =
    "blubi_omrum_new_calendar_2026_2027";


/* =========================================================
   MENSAJES ESPECIALES
========================================================= */

const specialMessages = {

    "2026-10-03": {

        title:
            "Te amo mucho",

        text:
            "Mi kurdi, te amo un montón. " +
            "No veas lo cómodo que estoy cuando te abrazo, " +
            "siento que no me hace falta nada más de este mundo. " +
            "Al igual soy un poco intenso, que me enfado por tonterías " +
            "o me pongo muy feliz por cosas insignificantes, " +
            "pero no quiero que dudes un segundo de que te amo. " +
            "Y aunque me cueste imaginar la vida sin ti, " +
            "quiero compartir contigo todo el tiempo que la vida nos dé.",

        flower:
            "🌹",

        special:
            true

    },


    "2026-10-04": {

        title:
            "Para mi Ömrüm",

        text:
            "Ömrüm,\n\n" +
            "Sé que a veces pienso demasiado y que no siempre hago las cosas perfectas, " +
            "pero quiero que sepas que eres una de las mejores cosas que me han pasado. " +
            "Desde que volviste a mi vida has estado en mi cabeza todos los días, " +
            "tanto en los momentos buenos como en los malos.\n\n" +
            "Gracias por aguantarme, por escucharme, por hacerme reír y por todos los recuerdos " +
            "que estamos creando juntos. Puede que no te diga estas cosas muchas veces, " +
            "pero te quiero muchísimo y me importas más de lo que probablemente imaginas.\n\n" +
            "Te quiere,\n\n" +
            "Tu Blubi ❤️",

        flower:
            "🌷",

        special:
            true

    }

};


/* =========================================================
   MENSAJES NORMALES
========================================================= */

const normalMessages = [

    {
        title:
            "Una pequeña flor",

        text:
            "Hoy quiero recordarte que eres una persona muy especial para mí.",

        flower:
            "🌷"
    },

    {
        title:
            "Para ti",

        text:
            "Otra flor para nuestro pequeño jardín. Espero que hoy tengas un día bonito.",

        flower:
            "🌸"
    },

    {
        title:
            "Un poquito de cariño",

        text:
            "A veces las cosas pequeñas son las que terminan significando más.",

        flower:
            "🌺"
    },

    {
        title:
            "Nuestro jardín",

        text:
            "Cada día que pasa, esta pequeña colección crece un poquito más.",

        flower:
            "🌻"
    },

    {
        title:
            "Siempre tú",

        text:
            "Una flor más para recordarte cuánto cariño hay detrás de este jardín.",

        flower:
            "🌹"
    }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const calendar =
    document.getElementById("calendar");

const modal =
    document.getElementById("messageModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const closeModal =
    document.getElementById("closeModal");

const modalFlower =
    document.getElementById("modalFlower");

const modalDate =
    document.getElementById("modalDate");

const modalTitle =
    document.getElementById("modalTitle");

const modalMessage =
    document.getElementById("modalMessage");

const todayTitle =
    document.getElementById("todayTitle");

const todayDate =
    document.getElementById("todayDate");

const dayCounter =
    document.getElementById("dayCounter");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const specialBanner =
    document.getElementById("specialBanner");

const toast =
    document.getElementById("toast");

const loveBurstContainer =
    document.getElementById("loveBurstContainer");

const backTop =
    document.getElementById("backTop");

const secretButton =
    document.getElementById("secretButton");

const musicButton =
    document.getElementById("musicButton");

const backgroundCanvas =
    document.getElementById("backgroundCanvas");

const replyMessage =
    document.getElementById("replyMessage");

const sendReply =
    document.getElementById("sendReply");

const replyCounter =
    document.getElementById("replyCounter");


let currentlyOpenedDate = null;


/* =========================================================
   FECHAS
========================================================= */

function normalizeDate(date) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

}


function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function getToday() {

    return normalizeDate(
        new Date()
    );

}


function formatDate(date) {

    return date.toLocaleDateString(
        "es-ES",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getStoredFlowers() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || {};

    } catch {

        return {};

    }

}


function saveFlower(key) {

    const opened =
        getStoredFlowers();

    opened[key] = true;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(opened)
    );

}


/* =========================================================
   MENSAJES
========================================================= */

function getMessage(key) {

    if (specialMessages[key]) {

        return specialMessages[key];

    }


    const start =
        START_DATE.getTime();


    const current =
        new Date(
            Number(key.slice(0, 4)),
            Number(key.slice(5, 7)) - 1,
            Number(key.slice(8, 10))
        ).getTime();


    const index =
        Math.floor(
            (
                current - start
            ) /
            (1000 * 60 * 60 * 24)
        );


    return normalMessages[
        Math.abs(index) %
        normalMessages.length
    ];

}


/* =========================================================
   CALENDARIO
========================================================= */

function renderCalendar() {

    if (!calendar) {
        return;
    }


    calendar.innerHTML = "";


    const today =
        getToday();


    const opened =
        getStoredFlowers();


    const current =
        new Date(START_DATE);


    while (current <= END_DATE) {

        const year =
            current.getFullYear();

        const month =
            current.getMonth();


        const monthCard =
            document.createElement("section");

        monthCard.className =
            "month-card";


        const monthHeader =
            document.createElement("div");

        monthHeader.className =
            "month-header";


        const monthTitle =
            document.createElement("h2");


        monthTitle.textContent =
            current.toLocaleDateString(
                "es-ES",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        const monthDescription =
            document.createElement("p");


        monthDescription.textContent =
            "Cada día, una nueva flor.";


        monthHeader.appendChild(
            monthTitle
        );

        monthHeader.appendChild(
            monthDescription
        );


        monthCard.appendChild(
            monthHeader
        );


        const grid =
            document.createElement("div");

        grid.className =
            "calendar-grid";


        const firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();


        const mondayIndex =
            firstDay === 0
                ? 6
                : firstDay - 1;


        for (
            let i = 0;
            i < mondayIndex;
            i++
        ) {

            const empty =
                document.createElement("div");

            empty.className =
                "day empty";

            grid.appendChild(
                empty
            );

        }


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const date =
                new Date(
                    year,
                    month,
                    day
                );


            if (
                date < START_DATE ||
                date > END_DATE
            ) {

                continue;

            }


            const key =
                dateKey(date);


            const cell =
                document.createElement("button");


            cell.type =
                "button";

            cell.className =
                "day";


            const isToday =
                date.getTime() ===
                today.getTime();


            const isFuture =
                date > today;


            const isPast =
                date < today;


            const isSpecial =
                key === SPECIAL_LOVE_DATE ||
                key === SECOND_SPECIAL_LOVE_DATE;


            if (isToday) {
                cell.classList.add("today");
            }

            if (isFuture) {
                cell.classList.add("future");
            }

            if (isPast) {
                cell.classList.add("past");
            }

            if (isSpecial) {
                cell.classList.add("special-love-day");
            }

            if (opened[key]) {
                cell.classList.add("opened");
            }


            const number =
                document.createElement("span");

            number.className =
                "day-number";

            number.textContent =
                day;


            const flower =
                document.createElement("span");

            flower.className =
                "flower";

            flower.textContent =
                getMessage(key).flower;


            const mark =
                document.createElement("span");

            mark.className =
                "day-mark";


            if (
                key === SPECIAL_LOVE_DATE
            ) {

                mark.textContent =
                    "TE AMO";

            } else if (
                key === SECOND_SPECIAL_LOVE_DATE
            ) {

                mark.textContent =
                    "PARA TI";

            } else if (isToday) {

                mark.textContent =
                    "HOY";

            }


            cell.appendChild(number);
            cell.appendChild(flower);
            cell.appendChild(mark);


            cell.addEventListener(
                "click",
                () => openFlower(date)
            );


            grid.appendChild(cell);

        }


        monthCard.appendChild(grid);

        calendar.appendChild(monthCard);


        current.setMonth(
            current.getMonth() + 1
        );

        current.setDate(1);

    }

}


/* =========================================================
   ABRIR FLOR
========================================================= */

function openFlower(date) {

    const today =
        getToday();


    const key =
        dateKey(date);


    if (date > today) {

        showToast(
            "🌱 Esta flor todavía no ha crecido."
        );

        return;

    }


    const message =
        getMessage(key);


    currentlyOpenedDate =
        key;


    if (modalFlower) {
        modalFlower.textContent =
            message.flower;
    }


    if (modalDate) {
        modalDate.textContent =
            formatDate(date);
    }


    if (modalTitle) {
        modalTitle.textContent =
            message.title;
    }


    if (modalMessage) {
        modalMessage.textContent =
            message.text;
    }


    if (replyMessage) {
        replyMessage.value = "";
    }


    updateReplyCounter();


    if (modal) {

        modal.classList.remove(
            "special-love"
        );

    }


    if (
        message.special ||
        key === SPECIAL_LOVE_DATE ||
        key === SECOND_SPECIAL_LOVE_DATE
    ) {

        if (modal) {
            modal.classList.add(
                "special-love"
            );
        }

        createLoveBurst();

        playSpecialSound();

    }


    saveFlower(key);


    if (modal) {

        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    renderCalendar();

}


/* =========================================================
   CERRAR MODAL
========================================================= */

function closeMessageModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    currentlyOpenedDate =
        null;

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeMessageModal
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeMessageModal
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMessageModal();

        }

    }
);


/* =========================================================
   RESPUESTAS → SUPABASE
========================================================= */

function updateReplyCounter() {

    if (!replyMessage || !replyCounter) {
        return;
    }


    replyCounter.textContent =
        `${replyMessage.value.length} / 1000`;

}


if (replyMessage) {

    replyMessage.addEventListener(
        "input",
        updateReplyCounter
    );

}


async function submitReply() {

    if (
        !currentlyOpenedDate ||
        !replyMessage ||
        !sendReply
    ) {

        return;

    }


    const message =
        replyMessage.value.trim();


    if (!message) {

        showToast(
            "💌 Escribe algo antes de enviarlo."
        );

        return;

    }


    sendReply.disabled =
        true;

    sendReply.textContent =
        "Enviando...";


    try {

        const {
            error
        } = await supabaseClient
            .from("responses")
            .insert({

                date:
                    currentlyOpenedDate,

                message:
                    message

            });


        if (error) {
            throw error;
        }


        replyMessage.value =
            "";

        updateReplyCounter();


        showToast(
            "❤️ Tu mensaje ha llegado a Blubi."
        );


    } catch (error) {

        console.error(
            "Error enviando respuesta:",
            error
        );


        showToast(
            "❌ No se pudo enviar. Inténtalo otra vez."
        );

    } finally {

        sendReply.disabled =
            false;

        sendReply.textContent =
            "Enviar ❤️";

    }

}


if (sendReply) {

    sendReply.addEventListener(
        "click",
        submitReply
    );

}


/* =========================================================
   HOY
========================================================= */

function updateToday() {

    const today =
        getToday();


    const key =
        dateKey(today);


    const totalDays =
        Math.floor(
            (
                END_DATE.getTime() -
                START_DATE.getTime()
            ) /
            (1000 * 60 * 60 * 24)
        ) + 1;


    let currentDay =
        Math.floor(
            (
                today.getTime() -
                START_DATE.getTime()
            ) /
            (1000 * 60 * 60 * 24)
        ) + 1;


    currentDay =
        Math.max(
            1,
            Math.min(
                totalDays,
                currentDay
            )
        );


    const percentage =
        Math.round(
            (
                currentDay /
                totalDays
            ) * 100
        );


    if (todayDate) {
        todayDate.textContent =
            formatDate(today);
    }


    if (dayCounter) {
        dayCounter.textContent =
            `Día ${currentDay} de ${totalDays}`;
    }


    if (progressPercent) {
        progressPercent.textContent =
            `${percentage}%`;
    }


    if (progressFill) {
        progressFill.style.width =
            `${percentage}%`;
    }


    if (
        key === SPECIAL_LOVE_DATE
    ) {

        if (todayTitle) {
            todayTitle.textContent =
                "Te amo mucho";
        }


        if (specialBanner) {

            specialBanner.innerHTML = `
                <strong>❤️ Hoy es un día especial</strong>
                <br>
                <span>Hay una flor especial esperándote.</span>
            `;

            specialBanner.classList.add(
                "active"
            );

        }

    } else if (
        key === SECOND_SPECIAL_LOVE_DATE
    ) {

        if (todayTitle) {
            todayTitle.textContent =
                "Para mi Ömrüm";
        }


        if (specialBanner) {

            specialBanner.innerHTML = `
                <strong>❤️ Una pequeña nota para ti</strong>
                <br>
                <span>Hoy he dejado algo especial en nuestro jardín.</span>
            `;

            specialBanner.classList.add(
                "active"
            );

        }

    } else {

        if (todayTitle) {
            todayTitle.textContent =
                "Una flor para ti";
        }


        if (specialBanner) {

            specialBanner.innerHTML =
                "Cada día guarda una pequeña sorpresa.";

            specialBanner.classList.remove(
                "active"
            );

        }

    }

}


/* =========================================================
   EFECTOS
========================================================= */

function createLoveBurst() {

    if (!loveBurstContainer) {
        return;
    }


    loveBurstContainer.innerHTML =
        "";


    const symbols = [
        "♥",
        "♡",
        "💕",
        "✨",
        "🌸"
    ];


    for (
        let i = 0;
        i < 42;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "love-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 700}px`
        );

        particle.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 600}px`
        );

        particle.style.setProperty(
            "--rotation",
            `${(Math.random() - 0.5) * 720}deg`
        );

        particle.style.setProperty(
            "--time",
            `${1.5 + Math.random() * 1.4}s`
        );

        particle.style.setProperty(
            "--delay",
            `${Math.random() * 0.35}s`
        );

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


        loveBurstContainer.appendChild(
            particle
        );

    }


    setTimeout(
        () => {

            loveBurstContainer.innerHTML =
                "";

        },
        3500
    );

}


function playSpecialSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const audio =
            new AudioContext();


        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            523.25,
            audio.currentTime
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            783.99,
            audio.currentTime + 0.45
        );


        gain.gain.setValueAtTime(
            0.0001,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.06,
            audio.currentTime + 0.03
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audio.currentTime + 0.7
        );


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.7
        );

    } catch {

    }

}


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================================
   BOTONES
========================================================= */

if (secretButton) {

    secretButton.addEventListener(
        "click",
        () => {

            showToast(
                "♥ Nuestro pequeño secreto."
            );

        }
    );

}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            showToast(
                "♪ La música llegará pronto."
            );

        }
    );

}


window.addEventListener(
    "scroll",
    () => {

        if (!backTop) {
            return;
        }


        if (window.scrollY > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   FONDO
========================================================= */

if (backgroundCanvas) {

    const ctx =
        backgroundCanvas.getContext("2d");

    let particles = [];


    function resizeCanvas() {

        backgroundCanvas.width =
            window.innerWidth;

        backgroundCanvas.height =
            window.innerHeight;

    }


    function createBackgroundParticles() {

        particles = [];


        const amount =
            Math.min(
                80,
                Math.floor(
                    window.innerWidth / 15
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    backgroundCanvas.width,

                y:
                    Math.random() *
                    backgroundCanvas.height,

                size:
                    Math.random() * 2 + 0.5,

                speed:
                    Math.random() * 0.35 + 0.1,

                opacity:
                    Math.random() * 0.4 + 0.1

            });

        }

    }


    function animateBackground() {

        ctx.clearRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
        );


        particles.forEach(
            particle => {

                particle.y -=
                    particle.speed;


                if (
                    particle.y < -10
                ) {

                    particle.y =
                        backgroundCanvas.height + 10;

                }


                ctx.beginPath();


                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(242,154,187,${particle.opacity})`;


                ctx.fill();

            }
        );


        requestAnimationFrame(
            animateBackground
        );

    }


    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createBackgroundParticles();

        }
    );


    resizeCanvas();

    createBackgroundParticles();

    animateBackground();

}


/* =========================================================
   INICIO
========================================================= */

updateToday();

renderCalendar();

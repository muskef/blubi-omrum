/* =========================================================
   BLUBI ❤️ ÖMRÜM
   JAVASCRIPT COMPLETO
   ========================================================= */

const START_DATE = new Date(2026, 8, 28);
const END_DATE = new Date(2027, 8, 28);

const STORAGE_KEY =
    "blubi_omrum_new_calendar_2026_2027";


/* =========================================================
   ELEMENTOS
   ========================================================= */

const calendar =
    document.getElementById("calendar");

const modal =
    document.getElementById("messageModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalMessage =
    document.getElementById("modalMessage");

const modalDate =
    document.getElementById("modalDate");

const modalFlower =
    document.getElementById("modalFlower");

const closeModal =
    document.getElementById("closeModal");

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

const specialTitle =
    document.getElementById("specialTitle");

const specialText =
    document.getElementById("specialText");

const toast =
    document.getElementById("toast");

const musicButton =
    document.getElementById("musicButton");

const secretButton =
    document.getElementById("secretButton");

const backTop =
    document.getElementById("backTop");


/* =========================================================
   ESTADO
   ========================================================= */

let state;

try {

    state = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

} catch {

    state = null;
}

if (!state) {

    state = {
        opened: [],
        secretUnlocked: false
    };
}

if (!Array.isArray(state.opened)) {
    state.opened = [];
}


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}


/* =========================================================
   FECHAS
   ========================================================= */

function dateKey(date) {

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}


function cloneDate(date) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}


function addDays(date, amount) {

    const result = cloneDate(date);

    result.setDate(
        result.getDate() + amount
    );

    return result;
}


function daysBetween(a, b) {

    const first = Date.UTC(
        a.getFullYear(),
        a.getMonth(),
        a.getDate()
    );

    const second = Date.UTC(
        b.getFullYear(),
        b.getMonth(),
        b.getDate()
    );

    return Math.round(
        (second - first) / 86400000
    );
}


function getToday() {

    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
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


function isSameDay(a, b) {

    return dateKey(a) === dateKey(b);
}


/* =========================================================
   MENSAJES
   ========================================================= */

const dailyMessages = [

    "Hoy no hace falta que pase nada extraordinario para que piense en ti. Me basta con recordar tu forma de hablar, tus pequeñas manías y esa manera tan tuya de hacer que un momento normal tenga algo distinto.",

    "Hay personas que aparecen en tu vida y otras que poco a poco empiezan a formar parte de ella. Tú eres de esas personas que consiguen quedarse en los pensamientos incluso después de despedirnos.",

    "Me gusta pensar en todos esos momentos que desde fuera podrían parecer pequeños, pero que para mí tienen muchísimo valor. Una conversación, una risa, una mirada o simplemente estar juntos pueden terminar siendo recuerdos enormes.",

    "Si pudiera guardar un momento contigo dentro de una caja para abrirlo cada vez que necesitara sonreír, probablemente necesitaría una caja enorme. Hemos ido acumulando demasiados pequeños momentos bonitos.",

    "Una de las cosas que más me gustan es que contigo no necesito que todo sea perfecto para disfrutar de estar juntos. Incluso los días raros pueden terminar teniendo algo especial.",

    "A veces pienso en cómo empezó todo y me hace gracia imaginar que ninguno de los dos sabía dónde acabarían aquellas primeras conversaciones. Y ahora tenemos nuestra propia pequeña historia.",

    "Me gusta que tengas una forma de ser que no se pueda resumir en una sola palabra. Tus detalles, tus expresiones y tus pequeñas manías forman parte de lo que hace que seas tú.",

    "Hay días en los que no necesito una razón concreta para sonreír. Pienso en ti y aparece sola. Es bonito saber que alguien puede mejorar tu día simplemente existiendo.",

    "Si algún día sientes que no estás haciendo suficiente, recuerda algo: para mí tu presencia ya tiene valor. No necesitas tener siempre las palabras perfectas ni saber exactamente qué hacer.",

    "Me encanta pensar que todavía nos quedan muchísimas conversaciones que tener, sitios que descubrir, tonterías de las que reírnos y recuerdos que todavía ni siquiera existen.",

    "Hay recuerdos que se vuelven especiales con el tiempo. Y luego están esos momentos que desde el principio sabes que quieres guardar. Muchos de los míos tienen tu nombre escondido dentro.",

    "No sé exactamente qué nos traerá cada día, pero me gusta descubrirlo poco a poco. Cada etapa tiene sus cosas buenas, sus dificultades y sus aprendizajes.",

    "A veces la felicidad no se siente como algo enorme. A veces es simplemente mirar el móvil y ver tu nombre, escuchar tu voz o acordarme de alguna tontería nuestra.",

    "Si esta flor pudiera hablar probablemente te diría algo muy sencillo: eres importante para mí. No por una fecha concreta, sino por todos los días en los que has dejado una pequeña huella.",

    "Me encanta esa mezcla que tenemos de poder hablar de cosas importantes y, cinco minutos después, estar diciendo la mayor tontería del mundo. Es una de esas cosas que hacen especial estar contigo.",

    "Cuando pienso en ti no pienso solamente en los momentos bonitos. También pienso en todo lo que hemos aprendido cuando las cosas no han sido fáciles. Eso también forma parte de nuestra historia.",

    "Quizá uno de mis recuerdos favoritos todavía no haya ocurrido. Y me encanta pensar que hay conversaciones, risas, paseos y momentos que todavía nos quedan por vivir.",

    "No quería que esta flor fuera solamente otro mensaje bonito. Quería que fuera una pequeña prueba de que mientras tú lees esto, alguien pensó en ti con muchísimo cariño.",

    "Me gusta tu manera de ser incluso en esos momentos en los que tú misma quizá no la entiendes del todo. No tienes que tenerlo todo claro para seguir siendo especial.",

    "Si pudiera enseñarte cómo te veo cuando pienso en ti, quizá entenderías por qué tantas veces termino sonriendo sin darme cuenta. Hay cosas que son difíciles de explicar con palabras.",

    "Una relación no está hecha solamente de grandes momentos. Está hecha de cientos de pequeños detalles que se van acumulando. Y esos pequeños detalles son los que terminan creando recuerdos.",

    "Hay algo bonito en saber que mientras lees esto estamos compartiendo el mismo día aunque estemos haciendo cosas diferentes. Durante unos segundos, esta flor nos vuelve a juntar.",

    "Me gusta imaginar que dentro de mucho tiempo podremos mirar atrás y recordar esta etapa como una parte de nuestra vida que nos hizo crecer, aprender y conocernos todavía más.",

    "Si alguna vez dudas de lo importante que eres para mí, vuelve a esta flor. Un mensaje no puede explicar todo, pero sí puede recordarte que hubo alguien pensando en ti.",

    "No necesito que cada día sea perfecto. Prefiero que sea real: con risas, cansancio, conversaciones largas, días extraños y momentos que nos hagan valorar los buenos.",

    "Hay algo bonito en construir recuerdos poco a poco. Nunca sabes cuál terminará siendo tu favorito hasta que pasa el tiempo. Quizá algunos de nuestros mejores recuerdos todavía estén esperando.",

    "Hoy simplemente quería dejarte una pequeña parte de mi cariño aquí. Sin ninguna razón complicada. Solo porque eres tú y porque me apetecía que encontraras algo bonito.",

    "Cada flor de este jardín representa una pequeña parte de todo lo que siento. Algunas hablan de recuerdos, otras del futuro y otras simplemente de lo mucho que disfruto teniendo a alguien como tú en mi vida.",

    "A veces las palabras se quedan pequeñas. Así que esta flor no intenta explicar todo. Solo intenta decirte algo sencillo: gracias por formar parte de mi vida y por todos los momentos compartidos.",

    "Quizá dentro de unos meses volvamos a leer algunas de estas flores y nos haga gracia recordar cómo éramos hoy. Me gusta pensar que estamos viviendo una historia que todavía se está escribiendo.",

    "Si algún día vuelves a esta flor, quiero que recuerdes una cosa: entre todos los días normales hubo uno en el que Blubi decidió dejarte unas palabras para que pudieras encontrarlas."
];


const dailyTitles = [

    "Una flor para ti",
    "Hoy pensé en ti",
    "Un pequeño recuerdo",
    "Guarda este momento",
    "Solo porque sí",
    "Nuestra historia",
    "Algo que me gusta de ti",
    "Una razón para sonreír",
    "Para cuando lo necesites",
    "Lo que todavía nos queda",
    "Un recuerdo más",
    "Seguimos escribiendo",
    "Pequeñas cosas",
    "Esta flor es tuya",
    "Eso que tenemos",
    "También en los días raros",
    "Un momento que todavía no existe",
    "Un mensaje para ti",
    "Tal como eres",
    "Así te veo",
    "Pequeños detalles",
    "Durante unos segundos",
    "Mirando hacia atrás",
    "Para que no lo olvides",
    "Sin necesidad de perfección",
    "Todavía quedan historias",
    "Hoy quería decirte esto",
    "Otra flor para el jardín",
    "Gracias",
    "Lo que estamos construyendo",
    "Una pequeña última idea"
];


/* =========================================================
   TEMAS DE LOS MESES
   ========================================================= */

const monthThemes = {

    8:
        "Este es solamente el comienzo de nuestro pequeño jardín. Hoy aparece la primera flor y todavía quedan muchísimas por crecer.",

    9:
        "Octubre llega con días nuevos y nuevas flores. Me gusta pensar que este jardín empieza a parecerse un poquito más a todos los recuerdos que vamos acumulando.",

    10:
        "Noviembre nos recuerda que incluso cuando los días cambian, hay personas que siguen siendo importantes. Tú eres una de ellas para mí.",

    11:
        "Diciembre tiene algo diferente. Entre todas sus fechas, me quedo con la idea de terminar otro año teniendo recuerdos contigo.",

    0:
        "Enero guarda una fecha que este jardín nunca podría olvidar: tu cumpleaños. Entre todas las flores, hoy hay una que lleva tu nombre.",

    1:
        "Febrero guarda una fecha muy nuestra: el 8. Hay días que terminan siendo importantes simplemente porque forman parte de nuestra historia.",

    2:
        "Marzo significa que el tiempo sigue avanzando. Y mientras avanza, seguimos acumulando momentos que algún día podremos recordar.",

    3:
        "Abril trae otra etapa del jardín. No importa cuántas flores hayan aparecido ya; todavía quedan muchas historias por escribir.",

    4:
        "Mayo es una pequeña pausa para recordar que las cosas bonitas también se construyen con paciencia, conversación y pequeños detalles.",

    5:
        "Junio tiene otra fecha especial: mi cumpleaños. Pero este jardín no va solamente de cumplir años; va de las personas que hacen que los años tengan más significado.",

    6:
        "Julio guarda una fecha que para mí siempre tendrá un lugar especial: el 24. El día que decidimos darle un nombre a todo aquello que llevábamos construyendo.",

    7:
        "Agosto es para recordar todos esos momentos que quizá nunca publicaríamos ni contaríamos a nadie, pero que precisamente por eso se sienten tan nuestros."
};


/* =========================================================
   FECHAS ESPECIALES
   ========================================================= */

const specialMessages = {

    "2026-09-28": {
        title: "Aquí empieza nuestro jardín 🌱",

        text:
            "Hoy nace este pequeño rincón para ti. Durante un año aparecerá una flor cada día y detrás de cada una habrá unas palabras pensadas especialmente para ti. No quiero que sea solamente un calendario; quiero que sea una colección de pequeños momentos que puedas ir descubriendo poco a poco.",

        flower: "🌱"
    },


    /* =====================================================
       02 DE OCTUBRE DE 2026
       FECHA ESPECIAL
       ===================================================== */

    "2026-10-02": {

        title: "Te amo mucho",

        text:
            "Mi kurdi, te amo un montón, no veas lo cómodo que estoy cuando te abrazo, siento que no me hace falta nada más de este mundo. Al igual soy un poco intenso, que me enfado por tonterías o me pongo muy feliz por cosas insignificantes, pero no quiero que dudes un segundo de que te amo. Y si algún día me toca despedirme de este mundo, solo espero haber tenido la suerte de vivir todo lo bonito que pueda a tu lado.",

        flower: "🌹",

        animation: "love"
    },


    "2027-01-21": {
        title: "Feliz cumpleaños, Ömrüm 🎂",

        text:
            "Hoy no podía aparecer una flor cualquiera. Hoy el jardín se llena un poquito más porque es tu día. Espero que este nuevo año de tu vida te traiga tranquilidad, momentos que te hagan sonreír y muchas razones para sentirte orgullosa de la persona que eres. Entre todas las flores de este jardín, esta siempre tendrá un sitio especial.",

        flower: "🌹"
    },

    "2027-02-08": {
        title: "8 de febrero ❤️",

        text:
            "Hay fechas que terminan teniendo un significado especial simplemente porque forman parte de nuestra historia. El 8 de febrero es una de ellas. Por eso esta flor no podía ser como las demás: es un pequeño recordatorio de todo lo que hemos vivido y de todos los recuerdos que esta fecha guarda.",

        flower: "🌷"
    },

    "2027-06-03": {
        title: "Hoy también es un día especial 🎂",

        text:
            "Hoy me toca cumplir un año más. Pero entre todas las cosas que podría pedir para este nuevo año, hay algo que ya tengo y que valoro muchísimo: recuerdos contigo. Esta flor es para recordarme que algunos regalos no vienen envueltos.",

        flower: "🌻"
    },

    "2027-07-24": {
        title: "24 de julio ❤️",

        text:
            "El 24 de julio siempre tendrá un pequeño rincón en este jardín. Fue el día en el que te pregunté si querías ser mi novia y aquello que llevábamos construyendo tomó otro nombre. Desde entonces han pasado muchas cosas, pero esa fecha sigue siendo especial para mí.",

        flower: "🌹"
    },

    "2027-09-28": {
        title: "Un año de flores 🌹",

        text:
            "Hoy termina este calendario, pero no quiero que lo sientas como el final de algo. Durante un año cada flor tuvo una fecha, una pequeña historia y unas palabras para ti. Esta última simplemente dice gracias. Gracias por todos los recuerdos, por todas las conversaciones y por formar parte de una etapa que guardaré con cariño.",

        flower: "🌹"
    }
};


/* =========================================================
   MENSAJES DEL DÍA 24
   ========================================================= */

const twentyFourMessages = {

    9:
        "Hoy es 24. Una pequeña fecha dentro del calendario que siempre me hace pensar en nuestra historia y en todo lo que hemos ido viviendo.",

    10:
        "Otro día 24. Otra pequeña excusa para detener el calendario durante unos segundos y pensar en alguien importante.",

    11:
        "Hoy es 24 y esta flor viene con una misión sencilla: recordarte que eres una de esas personas capaces de hacer que un día normal tenga algo especial.",

    12:
        "El 24 de diciembre merece una flor diferente. Entre todas las cosas de este mes, quería dejar aquí un pequeño recuerdo para ti.",

    1:
        "Primer 24 del año. Me gusta pensar que todavía quedan muchísimos días por delante que pueden convertirse en recuerdos bonitos.",

    2:
        "Otro 24 para nuestro jardín. Una fecha pequeña, pero una excusa perfecta para recordarte cuánto significan para mí nuestros pequeños momentos.",

    3:
        "El calendario sigue avanzando y nosotros seguimos llenándolo de historias. Feliz 24, Ömrüm.",

    4:
        "Hay fechas que no necesitan una gran celebración. A veces basta con detenerse un segundo y pensar en alguien importante.",

    5:
        "Este 24 es otra pequeña flor dentro de nuestro año. Una más de muchas que todavía quedan por aparecer.",

    6:
        "Un nuevo 24 y una nueva oportunidad para decirte algo que probablemente ya sabes: me importas muchísimo.",

    7:
        "Hoy el jardín recuerda una fecha que ya forma parte de nuestra historia. Feliz 24, Ömrüm.",

    8:
        "Otro mes, otra flor y otro 24. Me gusta que el calendario siga guardando pequeños recordatorios de nosotros."
};


/* =========================================================
   OBTENER MENSAJE
   ========================================================= */

function getMessage(date, index) {

    const key = dateKey(date);

    if (specialMessages[key]) {

        return {
            title: specialMessages[key].title,
            text: specialMessages[key].text,
            flower: specialMessages[key].flower,
            animation: specialMessages[key].animation || null
        };
    }


    if (date.getDate() === 24) {

        return {
            title: "El día 24 ❤️",

            text:
                twentyFourMessages[date.getMonth() + 1] ||
                "Una flor especial para un día especial.",

            flower: "🌹",

            animation: null
        };
    }


    const dailyIndex =
        (index + date.getDate() * 3)
        % dailyMessages.length;

    const monthTheme =
        monthThemes[date.getMonth()] ||
        "Otra pequeña etapa de nuestro jardín.";

    return {

        title:
            dailyTitles[
                (date.getDate() - 1)
                % dailyTitles.length
            ],

        text:
            dailyMessages[dailyIndex]
            + " "
            + monthTheme,

        flower:
            getFlowerEmoji(index),

        animation: null
    };
}


/* =========================================================
   FLORES
   ========================================================= */

const flowers = [
    "🌷",
    "🌹",
    "🌸",
    "🌺",
    "🌻",
    "🌼",
    "🪻",
    "🌷",
    "🌹",
    "🌸",
    "🌼",
    "🌺"
];


function getFlowerEmoji(index) {

    return flowers[
        index % flowers.length
    ];
}


/* =========================================================
   ANIMACIÓN ÚNICA PARA CADA FLOR
   ========================================================= */

function applyFlowerAnimation(element, index) {

    const duration =
        2.8 + ((index * 17) % 35) / 10;

    const delay =
        -((index * 13) % 30) / 10;

    const float =
        2 + ((index * 7) % 8);

    element.style.setProperty(
        "--duration",
        `${duration}s`
    );

    element.style.setProperty(
        "--delay",
        `${delay}s`
    );

    element.style.setProperty(
        "--float",
        `${float}px`
    );

    const rotations = [
        -5, 4, -3, 6, -7, 3,
        -4, 7, -2, 5, -6, 2
    ];

    element.style.transform =
        `rotate(${rotations[index % rotations.length]}deg)`;
}


/* =========================================================
   CALENDARIO
   ========================================================= */

function renderCalendar() {

    calendar.innerHTML = "";

    let current =
        cloneDate(START_DATE);

    let dayIndex = 0;

    const monthNames = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];

    while (
        current <= END_DATE
    ) {

        const year =
            current.getFullYear();

        const month =
            current.getMonth();

        const monthCard =
            document.createElement("section");

        monthCard.className =
            "month-card";


        const header =
            document.createElement("div");

        header.className =
            "month-header";

        header.innerHTML = `
            <div>
                <div class="month-name">
                    ${monthNames[month]}
                </div>

                <div class="month-year">
                    Nuestro jardín
                </div>
            </div>

            <div class="month-year">
                ${year}
            </div>
        `;

        monthCard.appendChild(header);


        const weekdays =
            document.createElement("div");

        weekdays.className =
            "weekdays";

        [
            "L",
            "M",
            "X",
            "J",
            "V",
            "S",
            "D"
        ].forEach(day => {

            const span =
                document.createElement("span");

            span.textContent = day;

            weekdays.appendChild(span);
        });

        monthCard.appendChild(weekdays);


        const grid =
            document.createElement("div");

        grid.className =
            "month-grid";


        let firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();

        firstDay =
            firstDay === 0
                ? 6
                : firstDay - 1;


        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const empty =
                document.createElement("div");

            empty.className =
                "day empty";

            grid.appendChild(empty);
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

                const empty =
                    document.createElement("div");

                empty.className =
                    "day empty";

                grid.appendChild(empty);

                continue;
            }


            const index =
                daysBetween(
                    START_DATE,
                    date
                );

            const today =
                getToday();

            const isToday =
                isSameDay(
                    date,
                    today
                );

            const isPast =
                date < today;

            const isFuture =
                date > today;


            const key =
                dateKey(date);

            const message =
                getMessage(
                    date,
                    index
                );


            const cell =
                document.createElement("div");

            cell.className = "day";

            if (isToday) {
                cell.classList.add("today");
            }

            if (isPast) {
                cell.classList.add("past");
            }

            if (isFuture) {
                cell.classList.add("future");
            }


            if (
                specialMessages[key] ||
                date.getDate() === 24
            ) {

                cell.classList.add("special");
            }


            if (
                key === "2026-10-02"
            ) {

                cell.classList.add(
                    "ultimate-special"
                );
            }


            const number =
                document.createElement("div");

            number.className =
                "day-number";

            number.textContent =
                day;

            cell.appendChild(number);


            if (isFuture) {

                const lock =
                    document.createElement("div");

                lock.className =
                    "day-lock";

                lock.textContent =
                    "🔒";

                cell.appendChild(lock);
            }


            const flowerContainer =
                document.createElement("div");

            flowerContainer.className =
                "day-flower";


            if (isFuture) {

                flowerContainer.innerHTML = `
                    <div class="locked-icon">
                        ♡
                    </div>
                `;

            } else {

                const flower =
                    document.createElement("div");

                flower.className =
                    "flower";

                applyFlowerAnimation(
                    flower,
                    index
                );

                flower.innerHTML = `

                    <div
                        class="flower-stem">
                    </div>

                    <div
                        class="flower-leaf">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 0deg;
                            --flower-main: #f4729a;
                        ">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 60deg;
                            --flower-main: #fb7185;
                        ">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 120deg;
                            --flower-main: #f472b6;
                        ">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 180deg;
                            --flower-main: #fb7185;
                        ">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 240deg;
                            --flower-main: #f4729a;
                        ">
                    </div>

                    <div
                        class="petal"
                        style="
                            --angle: 300deg;
                            --flower-main: #f9a8d4;
                        ">
                    </div>

                    <div class="flower-center"></div>

                `;

                flowerContainer.appendChild(
                    flower
                );
            }


            cell.appendChild(
                flowerContainer
            );


            if (
                specialMessages[key] ||
                date.getDate() === 24
            ) {

                const mark =
                    document.createElement("div");

                mark.className =
                    "special-mark";


                if (specialMessages[key]) {

                    if (key === "2026-10-02") {

                        mark.textContent =
                            "TE AMO";

                    } else if (
                        key === "2027-01-21"
                    ) {

                        mark.textContent =
                            "CUMPLEAÑOS";

                    }

                    else if (
                        key === "2027-02-08"
                    ) {

                        mark.textContent =
                            "8 FEB";

                    }

                    else if (
                        key === "2027-06-03"
                    ) {

                        mark.textContent =
                            "CUMPLE BLUBI";

                    }

                    else if (
                        key === "2027-07-24"
                    ) {

                        mark.textContent =
                            "NUESTRO DÍA";

                    }

                    else {

                        mark.textContent =
                            "ESPECIAL";
                    }

                } else {

                    mark.textContent =
                        "24 ♥";
                }

                cell.appendChild(mark);
            }


            cell.addEventListener(
                "click",
                () => {

                    if (isFuture) {

                        showToast(
                            "Esta flor todavía está esperando su día 🌱"
                        );

                        return;
                    }


                    if (!isToday) {

                        showToast(
                            "Esta sorpresa solo podía abrirse el día indicado ❤️"
                        );

                        return;
                    }


                    openFlower(
                        date,
                        index,
                        message
                    );
                }
            );


            grid.appendChild(cell);

            dayIndex++;
        }


        monthCard.appendChild(grid);

        calendar.appendChild(monthCard);


        current =
            new Date(
                year,
                month + 1,
                1
            );
    }
}


/* =========================================================
   ABRIR FLOR
   ========================================================= */

function openFlower(
    date,
    index,
    message
) {

    const key =
        dateKey(date);

    const isLoveSpecial =
        key === "2026-10-02";


    modalDate.textContent =
        formatDate(date);

    modalTitle.textContent =
        message.title;

    modalMessage.textContent =
        message.text;

    modalFlower.textContent =
        message.flower ||
        getFlowerEmoji(index);


    modal.classList.remove(
        "love-special"
    );


    if (isLoveSpecial) {

        /*
         * Pequeña pausa para que la animación
         * tenga una entrada más cinematográfica.
         */

        requestAnimationFrame(() => {

            modal.classList.add(
                "love-special"
            );

        });

        createLoveParticles();

    }


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";


    markOpened(
        key
    );


    createConfetti();


    if (isLoveSpecial) {

        createHeartExplosion();

    }


    playOpenSound();
}


/* =========================================================
   MARCAR COMO ABIERTA
   ========================================================= */

function markOpened(key) {

    if (
        !state.opened.includes(key)
    ) {

        state.opened.push(key);

        saveState();
    }
}


/* =========================================================
   CERRAR MODAL
   ========================================================= */

function closeMessageModal() {

    modal.classList.remove(
        "active",
        "love-special"
    );

    document.body.style.overflow =
        "";
}


closeModal.addEventListener(
    "click",
    closeMessageModal
);


document.querySelector(
    ".modal-backdrop"
)?.addEventListener(
    "click",
    closeMessageModal
);


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
   HOY
   ========================================================= */

function updateToday() {

    const today =
        getToday();

    if (
        today < START_DATE ||
        today > END_DATE
    ) {

        todayDate.textContent =
            "Nuestro jardín ha terminado";

        dayCounter.textContent =
            "366 flores";

        progressPercent.textContent =
            "100%";

        progressFill.style.width =
            "100%";

        return;
    }


    const index =
        daysBetween(
            START_DATE,
            today
        );

    const total =
        daysBetween(
            START_DATE,
            END_DATE
        ) + 1;

    const percent =
        Math.round(
            ((index + 1) / total) * 100
        );


    todayDate.textContent =
        formatDate(today);

    dayCounter.textContent =
        `Día ${index + 1} de ${total}`;

    progressPercent.textContent =
        `${percent}%`;

    progressFill.style.width =
        `${percent}%`;


    updateSpecialBanner(today);
}


/* =========================================================
   BANNER ESPECIAL
   ========================================================= */

function updateSpecialBanner(
    date
) {

    const key =
        dateKey(date);

    let title = "";
    let text = "";


    if (
        specialMessages[key]
    ) {

        title =
            specialMessages[key].title;

        if (
            key === "2026-10-02"
        ) {

            text =
                "Hoy hay algo muy especial esperando por ti. ❤️";

        } else {

            text =
                "Hoy hay una flor especial esperando por ti.";
        }

    }

    else if (
        date.getDate() === 24
    ) {

        title =
            "Hoy es día 24 ❤️";

        text =
            "Hoy hay una flor diferente en nuestro jardín.";

    }


    if (title) {

        specialTitle.textContent =
            title;

        specialText.textContent =
            text;

        specialBanner.classList.remove(
            "hidden"
        );

    } else {

        specialBanner.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimeout
    );

    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );
}


/* =========================================================
   CONFETI
   ========================================================= */

function createConfetti() {

    const container =
        document.createElement(
            "div"
        );

    container.className =
        "confetti-container";


    const pieces = 65;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            120 +
            Math.random() *
            360;


        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        piece.style.setProperty(
            "--x",
            `${x}px`
        );

        piece.style.setProperty(
            "--y",
            `${y}px`
        );

        piece.style.setProperty(
            "--rotation",
            `${Math.random() * 720 - 360}deg`
        );

        piece.style.setProperty(
            "--time",
            `${1.1 + Math.random() * 1.5}s`
        );


        const colors = [
            "#f4729a",
            "#fb7185",
            "#fda4af",
            "#f9a8d4",
            "#c4b5fd",
            "#fef3c7"
        ];

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.width =
            `${4 + Math.random() * 5}px`;

        piece.style.height =
            `${7 + Math.random() * 8}px`;


        container.appendChild(
            piece
        );
    }


    document.body.appendChild(
        container
    );


    setTimeout(
        () => {
            container.remove();
        },
        3000
    );
}


/* =========================================================
   ANIMACIÓN ESPECIAL 02/10/2026
   CORAZONES
   ========================================================= */

function createHeartExplosion() {

    const container =
        document.createElement(
            "div"
        );

    container.className =
        "love-explosion";


    const hearts = 34;


    for (
        let i = 0;
        i < hearts;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );

        heart.className =
            "love-particle";

        heart.textContent =
            Math.random() > 0.35
                ? "♥"
                : "♡";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            90 +
            Math.random() *
            260;


        heart.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        heart.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        heart.style.setProperty(
            "--delay",
            `${Math.random() * 0.35}s`
        );

        heart.style.setProperty(
            "--size",
            `${10 + Math.random() * 17}px`
        );

        heart.style.setProperty(
            "--rotation",
            `${Math.random() * 70 - 35}deg`
        );


        container.appendChild(
            heart
        );
    }


    document.body.appendChild(
        container
    );


    setTimeout(
        () => {
            container.remove();
        },
        2200
    );
}


/* =========================================================
   PARTÍCULAS ESPECIALES
   ========================================================= */

function createLoveParticles() {

    const container =
        document.createElement(
            "div"
        );

    container.className =
        "love-background";


    const amount = 24;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.className =
            "love-background-particle";

        particle.textContent =
            Math.random() > 0.5
                ? "♥"
                : "✦";


        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${50 + Math.random() * 50}%`;

        particle.style.setProperty(
            "--delay",
            `${Math.random() * 1.4}s`
        );

        particle.style.setProperty(
            "--duration",
            `${2.5 + Math.random() * 3}s`
        );

        particle.style.setProperty(
            "--size",
            `${7 + Math.random() * 13}px`
        );


        container.appendChild(
            particle
        );
    }


    document.body.appendChild(
        container
    );


    setTimeout(
        () => {
            container.remove();
        },
        6000
    );
}


/* =========================================================
   MÚSICA / SONIDOS
   ========================================================= */

let audioContext = null;
let musicInterval = null;
let musicPlaying = false;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}


function playTone(
    frequency,
    duration = 0.5,
    volume = 0.025
) {

    const ctx =
        getAudioContext();


    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type =
        "sine";

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0,
        ctx.currentTime
    );

    gain.gain.linearRampToValueAtTime(
        volume,
        ctx.currentTime + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
    );


    oscillator.connect(gain);

    gain.connect(
        ctx.destination
    );


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + duration
    );
}


function playOpenSound() {

    try {

        playTone(
            523.25,
            0.35,
            0.035
        );

        setTimeout(
            () => {
                playTone(
                    659.25,
                    0.5,
                    0.025
                );
            },
            120
        );

    } catch {}
}


function startMusic() {

    const ctx =
        getAudioContext();

    if (
        ctx.state === "suspended"
    ) {

        ctx.resume();
    }


    musicPlaying = true;

    musicButton.textContent =
        "♫";


    const notes = [
        261.63,
        329.63,
        392,
        329.63,
        293.66,
        349.23,
        440,
        349.23
    ];

    let i = 0;


    playTone(
        notes[i],
        1.7,
        0.012
    );


    musicInterval =
        setInterval(
            () => {

                i =
                    (i + 1)
                    % notes.length;

                playTone(
                    notes[i],
                    1.7,
                    0.012
                );

            },
            1700
        );
}


function stopMusic() {

    clearInterval(
        musicInterval
    );

    musicInterval = null;

    musicPlaying = false;

    musicButton.textContent =
        "♪";
}


musicButton.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            stopMusic();

        } else {

            startMusic();
        }
    }
);


/* =========================================================
   SECRETO
   ========================================================= */

let secretClicks = 0;
let secretTimer;


secretButton.addEventListener(
    "click",
    () => {

        secretClicks++;

        clearTimeout(
            secretTimer
        );

        secretTimer =
            setTimeout(
                () => {
                    secretClicks = 0;
                },
                900
            );


        if (
            secretClicks >= 3
        ) {

            secretClicks = 0;

            showSecret();

        } else {

            showToast(
                "Hay algo escondido aquí... ✦"
            );
        }
    }
);


function showSecret() {

    modalDate.textContent =
        "Un pequeño secreto";

    modalTitle.textContent =
        "Blubi ♥ Ömrüm";

    modalFlower.textContent =
        "🌙";

    modalMessage.textContent =
        "Si llegaste hasta aquí, solo quería dejarte algo que no necesitaba una fecha: entre todas las flores, todos los días y todos los mensajes, la parte más importante siempre ha sido la persona que está al otro lado de la pantalla leyendo esto.";

    modal.classList.remove(
        "love-special"
    );

    modal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

    createConfetti();
}


/* =========================================================
   BOTÓN ARRIBA
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

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


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================================
   FONDO CON CORAZONES / PÉTALOS
   ========================================================= */

const canvas =
    document.getElementById(
        "backgroundCanvas"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}


function createParticles() {

    particles = [];


    const amount =
        window.innerWidth < 600
            ? 35
            : 65;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                2 +
                Math.random() * 4,

            speed:
                0.2 +
                Math.random() * 0.7,

            drift:
                -0.4 +
                Math.random() * 0.8,

            rotation:
                Math.random() *
                Math.PI *
                2,

            rotationSpeed:
                -0.01 +
                Math.random() * 0.02,

            opacity:
                0.08 +
                Math.random() * 0.18,

            heart:
                Math.random() > 0.45
        });
    }
}


function drawHeart(
    x,
    y,
    size,
    opacity
) {

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.globalAlpha =
        opacity;

    ctx.fillStyle =
        "#fda4b9";

    ctx.beginPath();

    ctx.moveTo(
        0,
        size * 0.3
    );

    ctx.bezierCurveTo(
        -size,
        -size * 0.4,
        -size,
        size * 0.7,
        0,
        size
    );

    ctx.bezierCurveTo(
        size,
        size * 0.7,
        size,
        -size * 0.4,
        0,
        size * 0.3
    );

    ctx.fill();

    ctx.restore();
}


function drawParticle(p) {

    p.y += p.speed;

    p.x += p.drift;

    p.rotation +=
        p.rotationSpeed;


    if (
        p.y >
        window.innerHeight + 20
    ) {

        p.y = -20;

        p.x =
            Math.random() *
            window.innerWidth;
    }


    if (
        p.x <
        -20
    ) {

        p.x =
            window.innerWidth + 20;
    }


    if (
        p.x >
        window.innerWidth + 20
    ) {

        p.x = -20;
    }


    if (p.heart) {

        drawHeart(
            p.x,
            p.y,
            p.size,
            p.opacity
        );

    } else {

        ctx.save();

        ctx.translate(
            p.x,
            p.y
        );

        ctx.rotate(
            p.rotation
        );

        ctx.globalAlpha =
            p.opacity;

        ctx.fillStyle =
            "#f9a8d4";

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            p.size * 0.7,
            p.size * 1.4,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }
}


function animateBackground() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach(
        drawParticle
    );


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


/* =========================================================
   INICIO
   ========================================================= */

resizeCanvas();

createParticles();

animateBackground();

updateToday();

renderCalendar();


/* =========================================================
   CAMBIAR AUTOMÁTICAMENTE EL DÍA
   ========================================================= */

setInterval(
    () => {

        updateToday();

    },
    60000
);

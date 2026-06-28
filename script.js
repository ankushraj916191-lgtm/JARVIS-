// ===============================
// JARVIS v2.0 - script.js
// Hindi Voice Assistant
// ===============================

// -------------------------------
// TEXT TO SPEECH
// -------------------------------

function speak(text) {

    window.speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

// -------------------------------
// CLOCK
// -------------------------------

function updateClock() {

    let now = new Date();

    let time = now.toLocaleTimeString("hi-IN");

    let date = now.toLocaleDateString("hi-IN");

    if (document.getElementById("clock")) {
        document.getElementById("clock").innerText = time;
    }

    if (document.getElementById("time")) {
        document.getElementById("time").innerText = time;
    }

    if (document.getElementById("date")) {
        document.getElementById("date").innerText = date;
    }
}

setInterval(updateClock, 1000);
updateClock();

// -------------------------------
// WELCOME MESSAGE
// -------------------------------

window.onload = () => {

    setTimeout(() => {

        speak("नमस्ते Sir। JARVIS तैयार है।");

    }, 1000);

};

// -------------------------------
// SPEECH RECOGNITION
// -------------------------------

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert(
        "आपका ब्राउज़र Voice Recognition सपोर्ट नहीं करता।"
    );

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    const micBtn =
        document.getElementById("micBtn");

    // ---------------------------
    // MIC BUTTON
    // ---------------------------

    if (micBtn) {

        micBtn.addEventListener("click", () => {

            micBtn.innerText =
                "🎤 सुन रहा हूँ...";

            recognition.start();

        });

    }

    // ---------------------------
    // START
    // ---------------------------

    recognition.onstart = () => {

        console.log(
            "JARVIS Listening..."
        );

    };

    // ---------------------------
    // RESULT
    // ---------------------------

    recognition.onresult = (event) => {

        let command =
            event.results[0][0]
            .transcript
            .toLowerCase();

        console.log(command);

        micBtn.innerText =
            "🎤 JARVIS";

        // =====================
        // YOUTUBE
        // =====================

        if (
            command.includes("यूट्यूब")
        ) {

            speak("ठीक है Sir।");

            window.open(
                "https://youtube.com",
                "_blank"
            );

        }

        // =====================
        // INSTAGRAM
        // =====================

        else if (
            command.includes("इंस्टाग्राम")
        ) {

            speak("जी Sir।");

            window.open(
                "https://instagram.com",
                "_blank"
            );

        }

        // =====================
        // WHATSAPP
        // =====================

        else if (
            command.includes("व्हाट्सएप")
        ) {

            speak(
                "व्हाट्सएप खोल रहा हूँ Sir।"
            );

            window.open(
                "https://web.whatsapp.com",
                "_blank"
            );

        }

        // =====================
        // GOOGLE
        // =====================

        else if (
            command.includes("गूगल")
        ) {

            speak(
                "एक क्षण Sir।"
            );

            window.open(
                "https://google.com",
                "_blank"
            );

        }

        // =====================
        // MUSIC
        // =====================

        else if (
            command.includes("गाना") ||
            command.includes("म्यूजिक")
        ) {

            speak(
                "संगीत चला रहा हूँ Sir।"
            );

            window.open(
                "https://music.youtube.com",
                "_blank"
            );

        }

        // =====================
        // TIME
        // =====================

        else if (
            command.includes("समय")
        ) {

            let time =
                new Date()
                .toLocaleTimeString(
                    "hi-IN"
                );

            speak(
                "अभी " +
                time +
                " बजे हैं Sir।"
            );

        }

        // =====================
        // SEARCH
        // =====================

        else if (
            command.startsWith("खोजो")
        ) {

            let query =
                command
                .replace(
                    "खोजो",
                    ""
                )
                .trim();

            if (query !== "") {

                speak(
                    "खोज रहा हूँ Sir।"
                );

                window.open(
                    "https://www.google.com/search?q=" +
                    encodeURIComponent(
                        query
                    ),
                    "_blank"
                );

            }

        }

        // =====================
        // WHO ARE YOU
        // =====================

        else if (
            command.includes(
                "तुम कौन हो"
            )
        ) {

            speak(
                "मैं JARVIS हूँ Sir। आपका निजी सहायक।"
            );

        }

        // =====================
        // GREETING
        // =====================

        else if (
            command.includes(
                "नमस्ते"
            )
        ) {

            speak(
                "नमस्ते Sir।"
            );

        }

        // =====================
        // UNKNOWN
        // =====================

        else {

            speak(
                "माफ़ कीजिए Sir, मैं यह कमांड अभी नहीं समझ पाया।"
            );

        }

    };

    // ---------------------------
    // END
    // ---------------------------

    recognition.onend = () => {

        micBtn.innerText =
            "🎤 JARVIS";

    };

    // ---------------------------
    // ERROR
    // ---------------------------

    recognition.onerror = (event) => {

        console.log(
            event.error
        );

        micBtn.innerText =
            "🎤 JARVIS";

        if (
            event.error ===
            "not-allowed"
        ) {

            speak(
                "Sir, कृपया माइक्रोफोन की अनुमति दें।"
            );

        }

        else if (
            event.error ===
            "no-speech"
        ) {

            speak(
                "मैं आपकी आवाज़ नहीं सुन पाया, Sir।"
            );

        }

        else {

            speak(
                "माइक्रोफोन में समस्या है Sir।"
            );

        }

    };

            }

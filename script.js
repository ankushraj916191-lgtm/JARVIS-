// ======================
// JARVIS v3.0
// ======================

// TEXT TO SPEECH

function speak(text) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}

// CLOCK

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("hi-IN");

    const clock =
        document.getElementById("clock");

    if (clock) {

        clock.innerText = time;

    }

}

setInterval(updateClock, 1000);

updateClock();

// WELCOME

window.onload = () => {

    setTimeout(() => {

        speak("नमस्ते Sir। JARVIS ऑनलाइन है।");

    }, 1000);

};

// SPEECH RECOGNITION

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert(
        "आपका ब्राउज़र Voice Recognition सपोर्ट नहीं करता।"
    );

} else {

    const recognition =
        new SpeechRecognition();

    recognition.lang = "hi-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    const micBtn =
        document.getElementById("micBtn");

    micBtn.onclick = () => {

        micBtn.innerText =
            "🎤 सुन रहा हूँ...";

        recognition.start();

    };

    // RESULT

    recognition.onresult = (event) => {

        let command =
            event.results[0][0]
            .transcript
            .toLowerCase();

        console.log(command);

        micBtn.innerText =
            "🎤 JARVIS";

        // HELLO

        if (

            command.includes("हेलो") ||
            command.includes("hello") ||
            command.includes("hi") ||
            command.includes("नमस्ते")

        ) {

            const replies = [

                "नमस्ते Sir।",
                "जी Sir, मैं सुन रहा हूँ।",
                "हैलो Sir, क्या सहायता करूँ?",
                "मैं तैयार हूँ Sir।"

            ];

            let randomReply =
                replies[
                    Math.floor(
                        Math.random() *
                        replies.length
                    )
                ];

            speak(randomReply);

        }

        // YOUTUBE

        else if (
            command.includes("यूट्यूब")
        ) {

            speak("ठीक है Sir।");

            window.open(
                "https://youtube.com",
                "_blank"
            );

        }

        // INSTAGRAM

        else if (
            command.includes("इंस्टाग्राम")
        ) {

            speak("जी Sir।");

            window.open(
                "https://instagram.com",
                "_blank"
            );

        }

        // WHATSAPP

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

        // TIME

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

        // SEARCH

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

        // WHO ARE YOU

        else if (
            command.includes(
                "तुम कौन हो"
            )
        ) {

            speak(
                "मैं JARVIS हूँ Sir। आपका निजी सहायक।"
            );

        }

        // UNKNOWN

        else {

            speak(
                "माफ़ कीजिए Sir, मैं यह कमांड अभी नहीं समझ पाया।"
            );

        }

    };

    // END

    recognition.onend = () => {

        micBtn.innerText =
            "🎤 JARVIS";

    };

    // ERROR

    recognition.onerror = (event) => {

        console.log(event.error);

        micBtn.innerText =
            "🎤 JARVIS";

        if (
            event.error ===
            "not-allowed"
        ) {

            speak(
                "Sir, कृपया माइक्रोफोन की अनुमति दें।"
            );

        } else {

            speak(
                "मैं आपकी आवाज़ नहीं सुन पाया, Sir।"
            );

        }

    };

}

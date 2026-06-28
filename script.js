// JARVIS v3.0

function speak(text) {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hi-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
}

// Welcome

window.addEventListener("load", () => {

    setTimeout(() => {
        speak("नमस्ते Sir। JARVIS ऑनलाइन है।");
    }, 1000);

});

// Clock

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("hi-IN");

    const clock = document.getElementById("clock");

    if (clock) {
        clock.innerText = time;
    }
}

setInterval(updateClock, 1000);

// Speech Recognition

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert("Voice Recognition सपोर्ट नहीं है।");

} else {

    const recognition = new SpeechRecognition();

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

    recognition.onresult = (event) => {

        let command =
            event.results[0][0]
            .transcript
            .toLowerCase();

        console.log(command);

        micBtn.innerText =
            "🎤 JARVIS";

        if (
            command.includes("यूट्यूब")
        ) {

            speak("ठीक है Sir");

            window.open(
                "https://youtube.com",
                "_blank"
            );

        }

        else if (
            command.includes("इंस्टाग्राम")
        ) {

            speak("जी Sir");

            window.open(
                "https://instagram.com",
                "_blank"
            );

        }

        else if (
            command.includes("व्हाट्सएप")
        ) {

            speak(
                "व्हाट्सएप खोल रहा हूँ Sir"
            );

            window.open(
                "https://web.whatsapp.com",
                "_blank"
            );

        }

        else if (
            command.includes("समय")
        ) {

            const time =
                new Date()
                .toLocaleTimeString("hi-IN");

            speak(
                "अभी " + time + " बजे हैं Sir"
            );

        }

        else {

            speak(
                "माफ़ कीजिए Sir, मैं यह कमांड नहीं समझ पाया।"
            );

        }

    };

    recognition.onerror = (e) => {

        console.log(e.error);

        micBtn.innerText =
            "🎤 JARVIS";

        speak(
            "माइक्रोफोन में समस्या है Sir"
        );

    };

}

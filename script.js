// =======================
// JARVIS v1.0
// script.js
// =======================

// Welcome Message
window.onload = () => {

    setTimeout(() => {
        speak("नमस्ते Sir। JARVIS तैयार है।");
    }, 1000);

    updateClock();
    setInterval(updateClock, 1000);
};

// =======================
// Text To Speech
// =======================

function speak(text) {

    speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.95;
    speech.pitch = 0.9;
    speech.volume = 1;

    speechSynthesis.speak(speech);
}

// =======================
// Clock
// =======================

function updateClock() {

    let now = new Date();

    let time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    let clock = document.getElementById("clock");
    let mainTime = document.getElementById("time");

    if (clock) clock.innerText = time;
    if (mainTime) mainTime.innerText = time;
}

// =======================
// Speech Recognition
//

// =========================
// JARVIS v1.0 - script.js
// =========================

// Welcome
window.onload = function () {

    setTimeout(() => {
        speak("नमस्ते Sir। JARVIS तैयार है।");
    }, 1000);

    updateClock();
    setInterval(updateClock, 1000);
};

// =========================
// Human Voice Function
// =========================

function speak(text) {

    window.speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.95;
    speech.pitch = 0.9;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}

// =========================
// Clock
// =========================

function updateClock() {

    let now = new Date();

    let time = now.toLocaleTimeString("hi-IN");

    let clock = document.getElementById("clock");
    let mainTime = document.getElementById("time");

// =============================
// JARVIS v4.0 (with Gemini API)
// =============================

// 1. Gemini API Configuration
// ध्यान दें: ब्राउज़र में सीधे API Key रखना सुरक्षित नहीं है, लेकिन टेस्टिंग के लिए आप इसे यहाँ रख सकते हैं।
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // <-- अपनी API Key यहाँ डालें

// Text To Speech
function speak(text) {
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

// Function to call Gemini API
async function askGemini(prompt) {
    try {
        // System instruction ताकि Gemini हमेशा JARVIS की तरह छोटा और सटीक जवाब हिंदी में दे
        const systemInstruction = "Your name is JARVIS. You are a helpful AI assistant. Always reply in Hindi, keep your answers very short, concise, and natural for speech synthesis (1-2 sentences max). Address the user as 'Sir'.";
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] }
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            return "माफ़ कीजिए Sir, मैं समझ नहीं पाया।";
        }
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Sir, सर्वर से कनेक्ट करने में समस्या हो रही है।";
    }
}

// =============================
// Clock
// =============================
function updateClock() {
    let now = new Date();
    let time = now.toLocaleTimeString("hi-IN");
    let clock = document.getElementById("clock");
    if (clock) {
        clock.innerText = time;
    }
}
setInterval(updateClock, 1000);
updateClock();

// =============================
// Welcome
// =============================
window.onload = () => {
    setTimeout(() => {
        speak("नमस्ते Sir। JARVIS तैयार है।");
    }, 1000);
};

// =============================
// Speech Recognition
// =============================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("आपका ब्राउज़र Voice Recognition सपोर्ट नहीं करता।");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    const micBtn = document.getElementById("micBtn");

    micBtn.onclick = () => {
        micBtn.innerText = "🎤 सुन रहा हूँ...";
        recognition.start();
    };

    // =========================
    // Result
    // =========================
    recognition.onresult = async (event) => { // async जोड़ा गया है ताकि Gemini API का वेट कर सकें
        let command = event.results[0][0].transcript.toLowerCase();
        console.log(command);
        micBtn.innerText = "🎤 JARVIS";

        // HELLO
        if (command.includes("हेलो") || command.includes("hello") || command.includes("hi") || command.includes("नमस्ते")) {
            const replies = [
                "नमस्ते Sir।",
                "जी Sir, मैं सुन रहा हूँ।",
                "हैलो Sir, क्या सहायता करूँ?",
                "मैं तैयार हूँ Sir।"
            ];
            let reply = replies[Math.floor(Math.random() * replies.length)];
            speak(reply);
        }
        // HOW ARE YOU
        else if (command.includes("कैसे हो")) {
            speak("मैं बिल्कुल ठीक हूँ Sir। आपकी सहायता के लिए तैयार हूँ।");
        }
        // YOUR NAME
        else if (command.includes("तुम्हारा नाम")) {
            speak("मेरा नाम JARVIS है Sir।");
        }
        // INDIA CAPITAL
        else if (command.includes("भारत की राजधानी")) {
            speak("Sir, भारत की राजधानी नई दिल्ली है।");
        }
        // PRIME MINISTER
        else if (command.includes("प्रधानमंत्री")) {
            speak("Sir, भारत के प्रधानमंत्री नरेंद्र मोदी हैं।");
        }
        // TIME
        else if (command.includes("समय")) {
            let time = new Date().toLocaleTimeString("hi-IN");
            speak("अभी " + time + " बजे हैं Sir।");
        }
        // YOUTUBE
        else if (command.includes("यूट्यूब")) {
            speak("ठीक है Sir।");
            window.open("https://youtube.com", "_blank");
        }
        // INSTAGRAM
        else if (command.includes("इंस्टाग्राम")) {
            speak("जी Sir।");
            window.open("https://instagram.com", "_blank");
        }
        // WHATSAPP
        else if (command.includes("व्हाट्सएप")) {
            speak("व्हाट्सएप खोल रहा हूँ Sir।");
            window.open("https://web.whatsapp.com", "_blank");
        }
        // GOOGLE SEARCH
        else if (command.startsWith("खोजो")) {
            let query = command.replace("खोजो", "").trim();
            speak("खोज रहा हूँ Sir।");
            window.open("https://www.google.com/search?q=" + encodeURIComponent(query), "_blank");
        }
        // ==========================================
        // GEMINI AI FOR UNKNOWN COMMANDS
        // ==========================================
        else {
            micBtn.innerText = "🤖 सोच रहा हूँ...";
            
            // Gemini से जवाब मांग रहे हैं
            let geminiReply = await askGemini(command);
            
            micBtn.innerText = "🎤 JARVIS";
            speak(geminiReply);
        }
    };

    // =========================
    // Error
    // =========================
    recognition.onerror = (event) => {
        console.log(event.error);
        micBtn.innerText = "🎤 JARVIS";
        if (event.error === "not-allowed") {
            speak("Sir, कृपया माइक्रोफोन की अनुमति दें।");
        } else {
            speak("मैं आपकी आवाज़ नहीं सुन पाया, Sir।");
        }
    };

    recognition.onend = () => {
        micBtn.innerText = "🎤 JARVIS";
    };
    }

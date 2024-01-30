const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");
msg.text = document.querySelector('[name="text"]').value;
let chathams_blue = "#1A4B84";

function populateVoices() {
    voices = speechSynthesis.getVoices();
    console.log(voices);
    voiceDropdown.innerHTML = voices
        .filter((voice) => voice.lang.includes("en"))
        .map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

// Function to set the selected voice for speech
function setVoice() {
    msg.voice = voices.find((voice) => voice.name === this.value);
    toggle();
}

// Function to cancel and restart speech synthesis
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

// Function to set options for speech
function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);

// Event listeners for user interactions
voiceDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));

speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));

// Set theme
function setTheme(theme) {
    document.documentElement.style.setProperty("--primary-color", theme);
    localStorage.setItem("movie-theme", theme);
}

// Set the initial theme to the value stored in local storage or the default 'chathams_blue'
setTheme(localStorage.getItem("movie-theme") || chathams_blue);

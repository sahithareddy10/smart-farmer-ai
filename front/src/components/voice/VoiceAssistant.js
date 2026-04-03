function VoiceAssistant() {
  const speak = () => {
    const msg = new SpeechSynthesisUtterance("Hello Farmer");
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="main">
      <h1>🎤 Voice Assistant</h1>
      <button onClick={speak}>Speak</button>
    </div>
  );
}

export default VoiceAssistant;
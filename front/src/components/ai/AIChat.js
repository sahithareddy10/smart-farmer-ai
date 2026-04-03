import { useState } from "react";
import { sendMessage } from "../../api/aiApi";

function AIChat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    try {
      const res = await sendMessage(msg);

      setChat([
        ...chat,
        { user: msg, bot: res.data.reply }
      ]);

      setMsg("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <h1>🤖 AI Chat</h1>

      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.user}</p>
          <p><b>Bot:</b> {c.bot}</p>
        </div>
      ))}

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default AIChat;
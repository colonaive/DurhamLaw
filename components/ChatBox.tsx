import React, { useState } from 'react';

export const ChatBox: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = `You: ${input}`;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = `AI: ${data.reply}`;
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, 'AI: Error fetching reply']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Durham Law Chat Assistant</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 200 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>{msg}</div>
        ))}
        {loading && <div>AI is thinking...</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%', padding: 8 }}
        placeholder="Ask something..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px', marginLeft: 8 }}>
        Send
      </button>
    </div>
  );
};

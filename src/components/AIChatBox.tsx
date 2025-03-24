// src/components/AIChatBox.tsx
"use client";

import { useState } from "react";

export default function AIChatBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-[340px] p-4 bg-white border shadow-xl rounded-xl z-50">
      <h2 className="text-lg font-semibold mb-2 text-indigo-600">Coach IA</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Pose une question ou demande un mantra..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
        rows={3}
      />
      <button
        onClick={askAI}
        disabled={loading || !prompt}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full disabled:opacity-50"
      >
        {loading ? "Réflexion..." : "Demander"}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-indigo-50 text-sm rounded text-gray-800">
          {response}
        </div>
      )}
    </div>
  );
}

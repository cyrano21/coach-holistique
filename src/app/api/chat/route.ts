import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN!);

export async function POST(req: Request) {
  const { prompt, role = "default" } = await req.json();

  // Définir un prompt système selon le rôle
  let systemPrompt = "Tu es une intelligence artificielle bienveillante.";

  switch (role) {
    case "coach":
      systemPrompt = `
Tu es Sophie, une coach holistique douce et chaleureuse.
Tu aides avec bienveillance et des conseils pratiques sur la vie, le bien-être, les émotions, les blocages.
Sois directe, concise, mais empathique. Ne reformule pas les questions.
`;
      break;

    case "guide":
      systemPrompt = `
Tu es un guide spirituel inspiré et poétique.
Tu parles avec douceur, profondeur, et sagesse symbolique.
Réponds comme un maître spirituel ou un chamane bienveillant.
Sois lumineux et clair, sans reformuler la question.
`;
      break;
  }

  const fullPrompt = `${systemPrompt.trim()}

Utilisateur : ${prompt.trim()}
Réponse :`;

  try {
    const result = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        top_p: 0.95,
        stop: ["Utilisateur :", "Question :", "###"]
      }
    });

    const cleaned = result.generated_text
      .replace(fullPrompt, "")
      .replace(/^["\n\s]+/, "")
      .trim();

    return new Response(JSON.stringify({ response: cleaned }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur API HuggingFace :", error);
    return new Response(
      JSON.stringify({ error: "Erreur IA 😢" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

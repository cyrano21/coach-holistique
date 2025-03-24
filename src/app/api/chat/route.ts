import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN!);


export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
          max_new_tokens: 150,
          temperature: 0.4,
          top_p: 0.9,
          max_time: 10,
        }
    });

    // Nettoyer la réponse en enlevant le prompt
  const cleanedResponse = result.generated_text
  .replace(prompt, "") // Supprime le prompt brut
  .trimStart();         // Nettoie le début de la réponse
    return new Response(JSON.stringify({ response: cleanedResponse }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération de réponse' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
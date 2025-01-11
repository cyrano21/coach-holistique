
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.9,
      }
    });

    return new Response(JSON.stringify({ response: result.generated_text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération de réponse' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

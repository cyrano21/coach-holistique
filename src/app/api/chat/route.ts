import { HfInference } from "@huggingface/inference";

if (!process.env.HF_TOKEN) {
  console.error("❌ HF_TOKEN manquant !");
  throw new Error("HF_TOKEN non défini dans .env.local");
}

const hf = new HfInference(process.env.HF_TOKEN!);

export async function POST(req: Request) {
  try {
    const { prompt, role = "default" } = await req.json();

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

    const fullPrompt = `${systemPrompt.trim()}\n\nUtilisateur : ${prompt.trim()}\nRéponse :`;

    try {
      const result = await hf.textGeneration({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          nucleus_sampling: 0.95, 
          stop: ["Utilisateur :", "Question :", "###"],
        },
      });

      console.log("Réponse HuggingFace:", result);

      if (!result.generated_text) {
        throw new Error("Réponse vide reçue du modèle");
      }

      const cleaned = result.generated_text
        .replace(fullPrompt, "")
        .replace(/^["\n\s]+/, "")
        .trim();

      return new Response(JSON.stringify({ response: cleaned }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: unknown) {
      // Typage sécurisé de l'erreur
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Erreur API HuggingFace:", errorMessage);
      
      // Vérifier si l'erreur est liée au dépassement de crédits
      if (errorMessage.includes("exceeded your monthly included credits")) {
        // Réponse alternative en cas de dépassement de crédits
        return new Response(
          JSON.stringify({
            message: "Désolé, le service de chat est temporairement indisponible en raison de limitations de l'API. Veuillez réessayer plus tard ou contacter l'administrateur pour passer à un plan supérieur.",
            error: "CREDIT_LIMIT_EXCEEDED"
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      
      // Pour les autres erreurs
      return new Response(
        JSON.stringify({
          message: "Une erreur s'est produite lors de la génération de la réponse.",
          error: errorMessage
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error: unknown) {
    const err = error as Error;

    console.error("Erreur API HuggingFace :", err);

    return new Response(
      JSON.stringify({ error: "Erreur IA ", detail: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

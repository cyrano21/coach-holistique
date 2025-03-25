"use client";
import Link from "next/link";
import needsData from "@/data/needs.json";
import { Need } from "@/types/need";

// Accéder correctement au tableau needs dans le fichier JSON
const allNeeds = (needsData as unknown as { needs: Need[] }).needs;

export default function TapHome() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Choisis ce que tu veux guérir</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allNeeds.map((need) => (
          <Link
            key={need.id}
            href={`/parcours-spirituels/eft/${need.id}`}
            className="p-4 border rounded shadow hover:bg-gray-100"
          >
            {need.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

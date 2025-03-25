'use client';
import { useParams } from 'next/navigation';
import needs from '@/data/needs.json';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type NeedPoint = {
  name: string;
  image: string;
  phrase: string;
  audio: string;
};

type Need = {
  id: string;
  title: string;
  points: NeedPoint[];
};

export default function TapSession() {
  const params = useParams();
  const needId = params?.need as string;

  const current: Need | undefined = (needs as unknown as Need[]).find(
    (n) => n.id === needId
  );
  const [step, setStep] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (current) {
      audio?.pause();
      const audioFile = new Audio(current.points[step].audio);
      setAudio(audioFile);
      audioFile.play();
      return () => audioFile.pause();
    }
  }, [step, current, audio]);

  if (!current) return <div>Besoin non trouvé</div>;

  const point = current.points[step]; // ✅ clé manquante

  const next = () => {
    setStep((s) => (s + 1 < current.points.length ? s + 1 : 0));
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
      <Image
        src={point.image}
        alt={point.name}
        width={300}
        height={300}
        className="mx-auto h-48 animate-pulse-circle"
      />
      <p className="text-xl mt-4">{point.phrase}</p>
      <button
        onClick={next}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Suivant
      </button>
    </div>
  );
}

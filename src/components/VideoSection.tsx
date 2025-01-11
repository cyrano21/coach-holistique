import { VideoSource } from "../data/approchesData";

interface VideoSectionProps {
  videos: VideoSource[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  console.log("Videos received in VideoSection:", videos);

  if (!videos || videos.length === 0) {
    console.error("No videos found in VideoSection");
    return <div>Aucune vidéo disponible</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video, index) => {
        console.log(`Rendering video ${index}:`, video);
        return (
          <div key={index} className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={video.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      })}
    </div>
  );
}

interface AspectRatioVideoProps {
  videoUrl: string; // URL of the video
  aspectRatio?: string; // Aspect ratio in the format "width/height", default is "16/9"
  title?: string; // Video title, default is "Embedded Video"
}

const AspectRatioVideo: React.FC<AspectRatioVideoProps> = ({
  videoUrl,
  aspectRatio = "video", // Default aspect ratio
  title = "Embedded Video",
}) => {
  return (
    <div className={`aspect-${aspectRatio} overflow-hidden rounded-lg`}>
      <iframe
        className="w-full h-full"
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        sandbox=""
      ></iframe>
    </div>
  );
};

export default AspectRatioVideo;

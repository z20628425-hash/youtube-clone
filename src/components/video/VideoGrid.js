import VideoCard from './VideoCard';

function VideoGrid({ videos, onVideoSelect }) {
  if (videos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gray-400" role="status">
        Bu qidiruv bo&apos;yicha video topilmadi.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
      ))}
    </div>
  );
}

export default VideoGrid;

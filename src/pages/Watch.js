import VideoCard from '../components/video/VideoCard';

function Watch({ video, videos, onBack, onVideoSelect }) {
  const recommendedVideos = videos.filter((item) => item.id !== video.id).slice(0, 4);

  return (
    <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="min-w-0">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm text-gray-600 hover:text-black"
        >
          ← Bosh sahifaga qaytish
        </button>
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <h1 className="mt-4 text-xl font-bold">{video.title}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {video.channel} · {video.views} · {video.uploadedAt}
        </p>
      </section>

      <aside aria-label="Tavsiya etilgan videolar">
        <h2 className="mb-4 text-lg font-semibold">Tavsiya etiladi</h2>
        <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 xl:grid-cols-1">
          {recommendedVideos.map((recommendedVideo) => (
            <VideoCard
              key={recommendedVideo.id}
              video={recommendedVideo}
              onVideoSelect={onVideoSelect}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Watch;

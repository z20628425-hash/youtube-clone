function VideoCard({ video, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      className="group min-w-0 text-left"
      aria-label={`${video.title} videosini ko'rish`}
    >
      <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-gray-100">
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-sm font-bold"
          aria-hidden="true"
        >
          {video.channel.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="line-clamp-2 block text-sm font-semibold leading-5">
            {video.title}
          </span>
          <span className="mt-1 block text-xs text-gray-600">{video.channel}</span>
          <span className="block text-xs text-gray-600">
            {video.views} · {video.uploadedAt}
          </span>
        </span>
      </div>
    </button>
  );
}

export default VideoCard;

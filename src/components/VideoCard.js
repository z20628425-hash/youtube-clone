export default function VideoCard({ video, onSelect }) {
  const snippet = video?.snippet || {};
  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.image || snippet.thumbnails?.high?.url;
  const title = video.title || snippet.title;
  const channelTitle = video.channelTitle || snippet.channelTitle;
  const publishTime = video.publishTime || snippet.publishTime;

  if (!videoId) return null;

  return (
    <article className="group flex flex-col gap-2">
      <button
        aria-label={`${title || "Video"}ni ko‘rish`}
        className="flex flex-col gap-2 text-left"
        onClick={() => onSelect?.(video)}
        type="button"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title || "Video rasmi"}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              Rasm tanlanmagan
            </div>
          )}
        </div>

        <div className="mt-1 flex gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
            {channelTitle?.charAt(0) || "V"}
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
              {title}
            </h3>
            <p className="mt-1 text-xs text-gray-600">{channelTitle}</p>
            <p className="text-xs text-gray-600">
              {publishTime
                ? new Date(publishTime).toLocaleDateString()
                : "Yangi yuklangan"}
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
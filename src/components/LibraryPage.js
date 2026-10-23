import VideoCard from "./VideoCard";

const pageDetails = {
  channel: {
    title: "Kanalim",
    description: "Kanalingizda e’lon qilingan videolar.",
    list: "published",
  },
  uploads: {
    title: "Videolaringiz",
    description: "Siz qo‘shgan va boshqarayotgan videolar.",
    list: "uploads",
  },
  history: {
    title: "Tomosha tarixi",
    description: "Siz yaqinda ko‘rgan videolar.",
    list: "history",
  },
  watchLater: {
    title: "Keyinroq",
    description: "Keyin ko‘rish uchun saqlagan videolar.",
    list: "watchLater",
  },
  liked: {
    title: "Yoqgan videolar",
    description: "Siz yoqtirgan videolar.",
    list: "liked",
  },
  shorts: {
    title: "Shorts",
    description: "Qisqa videolarni qidirish uchun kategoriya tugmasidan foydalaning.",
    list: "shorts",
  },
};

export default function LibraryPage({
  page,
  videos,
  library,
  onNavigate,
  onVideoSelect,
  onRemove,
  onClearHistory,
}) {
  if (page === "playlists") {
    return (
      <main className="min-h-screen bg-white px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold">Playlistlar</h1>
        <p className="mt-2 text-sm text-gray-600">
          Saqlangan videolaringizni playlist sifatida ko‘ring.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Keyinroq ko‘rish",
              count: library.watchLater.length,
              page: "watchLater",
            },
            {
              title: "Yoqgan videolar",
              count: library.liked.length,
              page: "liked",
            },
          ].map((playlist) => (
            <button
              className="rounded-xl border border-gray-200 p-5 text-left hover:bg-gray-50"
              key={playlist.page}
              onClick={() => onNavigate(playlist.page)}
              type="button"
            >
              <span className="block text-lg font-semibold">{playlist.title}</span>
              <span className="mt-2 block text-sm text-gray-500">
                {playlist.count} ta video
              </span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  const details = pageDetails[page];
  const isOwnedVideosPage = page === "channel" || page === "uploads";
  const pageVideos =
    details.list === "published"
      ? videos.filter((video) => video.status === "Published")
      : details.list === "uploads"
        ? videos
        : details.list === "shorts"
          ? []
          : library[details.list] || [];

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold">{details.title}</h1>
          <p className="mt-2 text-sm text-gray-600">{details.description}</p>
        </div>
        {page === "history" && pageVideos.length > 0 && (
          <button
            className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:self-auto"
            onClick={onClearHistory}
            type="button"
          >
            Tarixni tozalash
          </button>
        )}
      </header>

      {pageVideos.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageVideos.map((video, index) => (
            <div key={video.id?.videoId || video.id || index}>
              <VideoCard onSelect={onVideoSelect} video={video} />
              {(page === "watchLater" || page === "liked") && (
                <button
                  className="mt-2 text-sm font-medium text-gray-600 hover:text-red-600"
                  onClick={() => onRemove(page, video)}
                  type="button"
                >
                  Ro‘yxatdan olib tashlash
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl bg-gray-50 px-6 py-12 text-center">
          <p className="font-medium text-gray-800">
            {isOwnedVideosPage
              ? "Hozircha videolar yo‘q."
              : page === "shorts"
                ? "Shorts videolarini qidirish uchun qidiruvdan foydalaning."
                : "Bu yerda hozircha video yo‘q."}
          </p>
          {page !== "shorts" && (
            <button
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              onClick={() => onNavigate(isOwnedVideosPage ? "admin" : "home")}
              type="button"
            >
              {isOwnedVideosPage
                ? "Admin panelga o‘tish"
                : "Video topish"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}

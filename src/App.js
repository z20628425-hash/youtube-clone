import { useState, useEffect, useCallback, useRef } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoCard from "./components/VideoCard";
import CategoryBar from "./components/CategoryBar";
import AdminPanel from "./components/AdminPanel";
import LibraryPage from "./components/LibraryPage";
import { fetchFromAPI } from "./utils/fetchFromAPI";
import {
  loadAdminVideos,
  loadUserLibrary,
  saveAdminVideos,
  saveUserLibrary,
} from "./utils/adminVideoStorage";

const emptyLibrary = { history: [], watchLater: [], liked: [] };

function normalizeVideo(video) {
  const snippet = video.snippet || {};
  const sourceId = video.id?.videoId || video.id;
  const urlId = video.url?.match(/[?&]v=([^&]+)/)?.[1];
  const id = String(sourceId || urlId || video.url || video.title);
  const image = video.image || snippet.thumbnails?.high?.url || "";

  return {
    ...video,
    id,
    videoId: video.videoId || (typeof sourceId === "string" ? sourceId : urlId),
    title: video.title || snippet.title || "Nomsiz video",
    image,
    channelTitle: video.channelTitle || snippet.channelTitle || "Sizning kanalingiz",
    publishTime: video.publishTime || snippet.publishTime || video.updatedAt,
    snippet: {
      ...snippet,
      title: video.title || snippet.title || "Nomsiz video",
      channelTitle: video.channelTitle || snippet.channelTitle || "Sizning kanalingiz",
      publishTime: video.publishTime || snippet.publishTime || video.updatedAt,
      thumbnails: snippet.thumbnails || { high: { url: image } },
    },
  };
}

export default function App() {
  const [videos, setVideos] = useState([]);
  const [adminVideos, setAdminVideos] = useState([]);
  const [library, setLibrary] = useState(emptyLibrary);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [storageReady, setStorageReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [storageError, setStorageError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Hammasi");
  const searchRequestId = useRef(0);

  const searchVideos = useCallback(async (query, options = {}) => {
    const requestId = searchRequestId.current + 1;
    searchRequestId.current = requestId;
    setLoading(true);
    setError("");
    setVideos([]);
    try {
      const params = new URLSearchParams({
        part: "snippet",
        type: "video",
        ...(query ? { q: query } : {}),
        ...(options.eventType ? { eventType: options.eventType } : {}),
        ...(options.videoCategoryId
          ? { videoCategoryId: options.videoCategoryId }
          : {}),
      });
      const data = await fetchFromAPI(
        `search?${params.toString()}`
      );
      if (!Array.isArray(data.items)) {
        throw new Error("API javobida video ro'yxati topilmadi.");
      }
      if (searchRequestId.current === requestId) {
        setVideos(data.items);
      }
    } catch (requestError) {
      if (searchRequestId.current === requestId) {
        setError(requestError.message || "Videolarni yuklashda xatolik yuz berdi.");
      }
    } finally {
      if (searchRequestId.current === requestId) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    searchVideos("reactjs");
  }, [searchVideos]);

  function selectCategory(category) {
    setActiveCategory(category.label);
    searchVideos(category.query, {
      eventType: category.eventType,
      videoCategoryId: category.videoCategoryId,
    });
  }

  function handleSearch(query) {
    setActiveCategory("");
    searchVideos(query);
  }

  useEffect(() => {
    Promise.all([loadAdminVideos(), loadUserLibrary()])
      .then(([savedVideos, savedLibrary]) => {
        setAdminVideos(savedVideos);
        setLibrary({
          history: savedLibrary.history || [],
          watchLater: savedLibrary.watchLater || [],
          liked: savedLibrary.liked || [],
        });
        setStorageError("");
        setStorageReady(true);
      })
      .catch((storageLoadError) => {
        setStorageError(
          `Saqlangan videolarni yuklab bo‘lmadi: ${storageLoadError.message}`
        );
      });
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    Promise.all([saveAdminVideos(adminVideos), saveUserLibrary(library)])
      .then(() => setStorageError(""))
      .catch((storageWriteError) => {
        setStorageError(
          `Videolarni brauzer xotirasiga saqlab bo‘lmadi: ${storageWriteError.message}`
        );
      });
  }, [adminVideos, library, storageReady]);

  function openVideo(video) {
    const normalizedVideo = normalizeVideo(video);
    setSelectedVideo(normalizedVideo);
    setLibrary((currentLibrary) => ({
      ...currentLibrary,
      history: [
        normalizedVideo,
        ...currentLibrary.history.filter((item) => item.id !== normalizedVideo.id),
      ],
    }));
    setActivePage("watch");
  }

  function toggleLibraryVideo(listName, video) {
    const normalizedVideo = normalizeVideo(video);
    setLibrary((currentLibrary) => {
      const list = currentLibrary[listName];
      const alreadySaved = list.some((item) => item.id === normalizedVideo.id);
      return {
        ...currentLibrary,
        [listName]: alreadySaved
          ? list.filter((item) => item.id !== normalizedVideo.id)
          : [normalizedVideo, ...list],
      };
    });
  }

  function removeFromLibrary(listName, video) {
    setLibrary((currentLibrary) => ({
      ...currentLibrary,
      [listName]: currentLibrary[listName].filter((item) => item.id !== video.id),
    }));
  }

  function navigateTo(page) {
    if (page === "admin") {
      setActivePage("admin");
      return;
    }
    setActivePage(page);
  }

  const dashboardVideos = [
    ...(activeCategory === "Hammasi"
      ? adminVideos
      .filter((video) => video.status === "Published")
      .map((video) => ({
        ...normalizeVideo(video),
      }))
      : []),
    ...videos.map(normalizeVideo),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header
        onAdminOpen={() => setActivePage("admin")}
        onHome={() => setActivePage("home")}
        onMenuToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
        onSearch={handleSearch}
      />

      <div className="flex">
        <Sidebar
          activePage={activePage}
          collapsed={sidebarCollapsed}
          onNavigate={navigateTo}
          onAdminOpen={() => setActivePage("admin")}
          onHome={() => setActivePage("home")}
        />

        <div className="min-w-0 flex-1">
          {activePage === "admin" ? (
            <AdminPanel
              videos={adminVideos}
              setVideos={setAdminVideos}
              storageReady={storageReady}
              storageError={storageError}
            />
          ) : activePage === "watch" && selectedVideo ? (
            <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
              <div className="aspect-video overflow-hidden rounded-xl bg-black">
                {selectedVideo.videoId ? (
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${encodeURIComponent(selectedVideo.videoId)}`}
                    title={selectedVideo.title}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white">
                    Bu video uchun YouTube havolasi topilmadi.
                  </div>
                )}
              </div>
              <h1 className="mt-4 text-xl font-bold">{selectedVideo.title}</h1>
              <p className="mt-2 text-sm text-gray-600">{selectedVideo.channelTitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    library.liked.some((item) => item.id === selectedVideo.id)
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleLibraryVideo("liked", selectedVideo)}
                  type="button"
                >
                  {library.liked.some((item) => item.id === selectedVideo.id)
                    ? "Yoqdi"
                    : "Yoqtirish"}
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    library.watchLater.some((item) => item.id === selectedVideo.id)
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleLibraryVideo("watchLater", selectedVideo)}
                  type="button"
                >
                  {library.watchLater.some((item) => item.id === selectedVideo.id)
                    ? "Keyinroqqa saqlandi"
                    : "Keyinroq ko‘rish"}
                </button>
                <button
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
                  onClick={() => setActivePage("home")}
                  type="button"
                >
                  Bosh sahifa
                </button>
              </div>
            </main>
          ) : ["channel", "history", "playlists", "watchLater", "liked", "uploads", "shorts"].includes(activePage) ? (
            <LibraryPage
              library={library}
              onClearHistory={() =>
                setLibrary((currentLibrary) => ({ ...currentLibrary, history: [] }))
              }
              onNavigate={navigateTo}
              onRemove={removeFromLibrary}
              onVideoSelect={openVideo}
              page={activePage}
              videos={adminVideos}
            />
          ) : (
            <main className="px-4 pb-8 pt-3 sm:px-6">
              <CategoryBar
                activeCategory={activeCategory}
                onSelectCategory={selectCategory}
              />
              {storageError && (
                <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800" role="alert">
                  {storageError}
                </p>
              )}
              {loading && (
                <p className="mt-4 text-gray-600" role="status">
                  {activeCategory
                    ? `${activeCategory} videolari yuklanmoqda...`
                    : "Videolar yuklanmoqda..."}
                </p>
              )}
              {!loading && error && (
                <div role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                  <p className="font-semibold">Videolarni yuklab bo'lmadi.</p>
                  <p className="mt-1 text-sm">{error}</p>
                  <p className="mt-2 text-sm">
                    RapidAPI kalitingiz borligini va unga YouTube API uchun ruxsat berilganini tekshiring.
                    `.env.local` faylini o'zgartirgandan keyin dev serverni qayta ishga tushiring.
                  </p>
                </div>
              )}
              {!loading && !error && dashboardVideos.length === 0 && (
                <p className="mt-4 text-gray-600">Hozircha video topilmadi.</p>
              )}
              {!loading && !error && dashboardVideos.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dashboardVideos.map((video, index) => (
                  <VideoCard
                    key={video.id?.videoId || video.id || index}
                    onSelect={openVideo}
                    video={video}
                  />
                  ))}
                </div>
              )}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
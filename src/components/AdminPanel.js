import { useMemo, useState } from "react";

const emptyForm = { title: "", url: "", status: "Published", image: "" };

function Icon({ children, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

export default function AdminPanel({
  videos,
  setVideos,
  storageReady,
  storageError,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.url.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || video.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, videos]);

  function openCreateForm() {
    setIsFormOpen(true);
    setEditingVideo(null);
    setForm(emptyForm);
    setFormError("");
  }

  function openEditForm(video) {
    setIsFormOpen(true);
    setEditingVideo(video);
    setForm({
      title: video.title,
      url: video.url,
      status: video.status,
      image: video.image || "",
    });
    setFormError("");
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingVideo(null);
    setForm(emptyForm);
    setFormError("");
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Iltimos, rasm faylini tanlang.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setFormError("Rasmni o‘qib bo‘lmadi. Boshqa rasm tanlab ko‘ring.");
        return;
      }
      setForm((currentForm) => ({ ...currentForm, image: reader.result }));
      setFormError("");
    };
    reader.onerror = () => {
      setFormError("Rasmni o‘qib bo‘lmadi. Boshqa rasm tanlab ko‘ring.");
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    const url = form.url.trim();

    if (!title || !url) {
      setFormError("Video nomi va havolasini kiriting.");
      return;
    }

    if (editingVideo) {
      setVideos((currentVideos) =>
        currentVideos.map((video) =>
          video.id === editingVideo.id
            ? {
                ...video,
                title,
                url,
                status: form.status,
                image: form.image,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : video
        )
      );
    } else {
      setVideos((currentVideos) => [
        {
          id: Date.now(),
          title,
          url,
          status: form.status,
          image: form.image,
          views: "—",
          updatedAt: new Date().toISOString().slice(0, 10),
        },
        ...currentVideos,
      ]);
    }

    closeForm();
  }

  function deleteVideo(id) {
    if (window.confirm("Ushbu videoni o‘chirishni xohlaysizmi?")) {
      setVideos((currentVideos) => currentVideos.filter((video) => video.id !== id));
    }
  }

  const publishedCount = videos.filter((video) => video.status === "Published").length;
  const draftCount = videos.length - publishedCount;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {storageError && (
          <p className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800" role="alert">
            {storageError}
          </p>
        )}
        {!storageReady && !storageError && (
          <p className="mb-5 text-sm text-gray-500" role="status">
            Saqlangan videolar yuklanmoqda...
          </p>
        )}
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Video boshqaruvi
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Videolarni ko‘ring, tahrirlang yoki yangi video qo‘shing.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={!storageReady}
            onClick={openCreateForm}
            type="button"
          >
            <span className="text-lg leading-none">+</span>
            Video qo‘shish
          </button>
        </header>

        <section aria-label="Video statistikasi" className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Jami videolar", value: videos.length, tone: "text-gray-900" },
            { label: "E’lon qilingan", value: publishedCount, tone: "text-green-700" },
            { label: "Qoralamalar", value: draftCount, tone: "text-amber-700" },
          ].map((stat) => (
            <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`mt-2 text-2xl font-bold ${stat.tone}`}>{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-semibold">Barcha videolar</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative">
                <span className="sr-only">Video qidirish</span>
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </Icon>
                <input
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:w-60"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Videolarni qidirish"
                  type="search"
                  value={search}
                />
              </label>
              <label>
                <span className="sr-only">Holat bo‘yicha filtrlash</span>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:w-auto"
                  onChange={(event) => setStatusFilter(event.target.value)}
                  value={statusFilter}
                >
                  <option value="All">Barcha holatlar</option>
                  <option value="Published">E’lon qilingan</option>
                  <option value="Draft">Qoralama</option>
                </select>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Video</th>
                  <th className="px-5 py-3 font-medium">Holati</th>
                  <th className="px-5 py-3 font-medium">Ko‘rishlar</th>
                  <th className="px-5 py-3 font-medium">Yangilangan</th>
                  <th className="px-5 py-3 text-right font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50">
                    <td className="max-w-md px-5 py-4">
                      <div className="flex items-center gap-3">
                        {video.image ? (
                          <img
                            alt=""
                            className="h-12 w-20 shrink-0 rounded-md object-cover"
                            src={video.image}
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="flex h-12 w-20 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-400"
                          >
                            <Icon className="h-5 w-5">
                              <path d="m9 7 8 5-8 5z" />
                            </Icon>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">{video.title}</p>
                          <p className="mt-1 truncate text-xs text-gray-500">{video.url}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          video.status === "Published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {video.status === "Published" ? "E’lon qilingan" : "Qoralama"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{video.views}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {new Date(`${video.updatedAt}T00:00:00`).toLocaleDateString("uz-UZ")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          aria-label={`${video.title} videosini tahrirlash`}
                          className="rounded-md px-2.5 py-1.5 font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          disabled={!storageReady}
                          onClick={() => openEditForm(video)}
                          type="button"
                        >
                          Tahrirlash
                        </button>
                        <button
                          aria-label={`${video.title} videosini o‘chirish`}
                          className="rounded-md px-2.5 py-1.5 font-medium text-red-600 hover:bg-red-50"
                          disabled={!storageReady}
                          onClick={() => deleteVideo(video.id)}
                          type="button"
                        >
                          O‘chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredVideos.length === 0 && (
                  <tr>
                    <td className="px-5 py-12 text-center text-gray-500" colSpan="5">
                      Qidiruvga mos video topilmadi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isFormOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            aria-labelledby="video-form-title"
            aria-modal="true"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold" id="video-form-title">
                  {editingVideo ? "Videoni tahrirlash" : "Yangi video"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">Video ma’lumotlarini kiriting.</p>
              </div>
              <button
                aria-label="Formani yopish"
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                onClick={closeForm}
                type="button"
              >
                <Icon>
                  <path d="m18 6-12 12M6 6l12 12" />
                </Icon>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700">
                Video nomi
                <input
                  autoFocus
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="Video nomini kiriting"
                  value={form.title}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Video havolasi
                <input
                  className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  onChange={(event) => setForm({ ...form, url: event.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  type="url"
                  value={form.url}
                />
              </label>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="video-image"
                >
                  Video rasmi
                </label>
                <input
                  accept="image/*"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 text-sm text-gray-600 file:mr-3 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-3 file:py-2.5 file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                  id="video-image"
                  onChange={handleImageChange}
                  type="file"
                />
                {form.image && (
                  <img
                    alt="Tanlangan video rasmi"
                    className="mt-3 aspect-video max-h-48 w-full rounded-lg bg-gray-100 object-cover"
                    src={form.image}
                  />
                )}
              </div>
              <label className="block text-sm font-medium text-gray-700">
                Holati
                <select
                  className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  onChange={(event) => setForm({ ...form, status: event.target.value })}
                  value={form.status}
                >
                  <option value="Draft">Qoralama</option>
                  <option value="Published">E’lon qilingan</option>
                </select>
              </label>
              {formError && (
                <p className="text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  onClick={closeForm}
                  type="button"
                >
                  Bekor qilish
                </button>
                <button
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  type="submit"
                >
                  {editingVideo ? "Saqlash" : "Qo‘shish"}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}

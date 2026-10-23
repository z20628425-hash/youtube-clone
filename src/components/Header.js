import { useEffect, useRef, useState } from "react";

function Icon({ children, className = "h-6 w-6" }) {
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

export default function Header({ onMenuToggle, onSearch, onAdminOpen, onHome }) {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function closeProfile(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("mousedown", closeProfile);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeProfile);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const query = search.trim();
    if (query) onSearch(query);
  }

  function openAdminPanel() {
    setProfileOpen(false);
    onAdminOpen();
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 bg-white px-3 sm:px-6">
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          aria-label="Menyuni ochish yoki yopish"
          className="rounded-full p-2 hover:bg-gray-100"
          onClick={onMenuToggle}
          type="button"
        >
          <Icon>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </Icon>
        </button>
        <button
          aria-label="YouTube bosh sahifasi"
          className="flex items-center gap-1"
          onClick={onHome}
          type="button"
        >
          <span className="flex h-6 w-9 items-center justify-center rounded-lg bg-red-600 text-sm text-white">
            ▶
          </span>
          <span className="text-xl font-bold tracking-tight">YouTube</span>
          <sup className="self-start text-[10px] text-gray-500">UZ</sup>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-3 px-1 sm:px-6">
        <form
          className="flex w-full max-w-[640px]"
          onSubmit={handleSubmit}
          role="search"
        >
          <input
            aria-label="Videolarni qidirish"
            className="min-w-0 flex-1 rounded-l-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 sm:px-5"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Qidiruv"
            type="search"
            value={search}
          />
          <button
            aria-label="Qidirish"
            className="flex w-14 shrink-0 items-center justify-center rounded-r-full border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 sm:w-16"
            type="submit"
          >
            <Icon className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </Icon>
          </button>
        </form>
        <button
          aria-label="Ovozli qidiruv"
          className="hidden rounded-full bg-gray-100 p-2 hover:bg-gray-200 sm:inline-flex"
          title="Ovozli qidiruv"
          type="button"
        >
          <Icon className="h-5 w-5">
            <rect height="11" rx="5.5" width="6" x="9" y="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8" />
          </Icon>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          aria-label="Yaratish"
          className="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 sm:flex"
          onClick={openAdminPanel}
          type="button"
        >
          <span className="text-xl leading-none">+</span>
          <span>Yaratish</span>
        </button>
        <button
          aria-label="Bildirishnomalar"
          className="relative rounded-full p-2 hover:bg-gray-100"
          type="button"
        >
          <Icon>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0" />
          </Icon>
          <span className="absolute right-0 top-0 rounded-full bg-red-600 px-1 text-[10px] text-white">
            9+
          </span>
        </button>
        <div className="relative" ref={profileRef}>
          <button
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Foydalanuvchi profili"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 font-semibold text-white"
            onClick={() => setProfileOpen((open) => !open)}
            type="button"
          >
            U
          </button>
          {profileOpen && (
            <div
              className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-xl"
              role="menu"
            >
              <div className="flex gap-3 border-b border-gray-200 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-700 font-semibold text-white">
                  U
                </span>
                <div className="min-w-0">
                  <p className="font-medium">Foydalanuvchi</p>
                  <p className="truncate text-gray-500">@user</p>
                  <button
                    className="mt-1 text-xs text-blue-700 hover:underline"
                    onClick={openAdminPanel}
                    role="menuitem"
                    type="button"
                  >
                    Kanalni boshqarish
                  </button>
                </div>
              </div>
              <div className="p-2">
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-100"
                  onClick={openAdminPanel}
                  role="menuitem"
                  type="button"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                    ▶
                  </span>
                  <span>
                    <span className="block font-medium">Admin panel</span>
                    <span className="block text-xs text-gray-500">Videolarni boshqarish</span>
                  </span>
                </button>
                <button
                  className="w-full rounded-lg px-3 py-2.5 text-left text-gray-700 hover:bg-gray-100"
                  onClick={openAdminPanel}
                  role="menuitem"
                  type="button"
                >
                  YouTube Studio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Icon({ children }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
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

const primaryLinks = [
  { label: "Asosiy", icon: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /> },
  { label: "Shorts", icon: <path d="m10 3 9 5a3 3 0 0 1 0 5l-9 5a3 3 0 0 1-4-2.6V5.6A3 3 0 0 1 10 3Zm0 5v8l7-4z" /> },
];

const libraryLinks = [
  { label: "Kanalim", icon: <><rect height="14" rx="2" width="16" x="4" y="5" /><path d="M9 5V3h6v2m-6 5h6m-6 4h6" /></> },
  { label: "Tomosha tarixi", icon: <><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" /><path d="M3 3v5h5m4-1v5l3 2" /></> },
  { label: "Playlistlar", icon: <><path d="M4 6h16M4 12h16M4 18h10" /><path d="m18 16 3 2-3 2z" /></> },
  { label: "Keyinroq", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { label: "Yoqgan videolar", icon: <><path d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zm0 0 5-8a3 3 0 0 1 2 3l-1 5h6a3 3 0 0 1 3 4l-2 6a3 3 0 0 1-3 2H7" /></> },
  { label: "Videolaringiz", icon: <><rect height="16" rx="2" width="18" x="3" y="4" /><path d="m10 9 5 3-5 3z" /></> },
];

export default function Sidebar({
  collapsed,
  activePage,
  onNavigate,
  onHome,
  onAdminOpen,
}) {
  if (collapsed) {
    return (
      <aside className="hidden w-[72px] shrink-0 flex-col items-center gap-2 px-1 pt-2 md:flex">
        {primaryLinks.map((link, index) => (
          <button
            aria-label={link.label}
            className={`flex w-16 flex-col items-center gap-1 rounded-xl py-3 text-[10px] hover:bg-gray-100 ${
              index === 0 && activePage === "home" ? "bg-gray-100" : ""
            }`}
            key={link.label}
            onClick={index === 0 ? onHome : () => onNavigate("shorts")}
            type="button"
          >
            <Icon>{link.icon}</Icon>
            {link.label}
          </button>
        ))}
        <button
          aria-label="Admin panel"
          className={`flex w-16 flex-col items-center gap-1 rounded-xl py-3 text-[10px] text-gray-700 hover:bg-gray-100 ${
            activePage === "admin" ? "bg-gray-100" : ""
          }`}
          onClick={onAdminOpen}
          type="button"
        >
          <Icon><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7z" /><path d="m9 12 2 2 4-4" /></Icon>
          Admin
        </button>
      </aside>
    );
  }

  return (
    <aside className="hidden w-60 shrink-0 overflow-y-auto px-3 pb-4 md:block">
      <nav aria-label="Asosiy menyu">
        <div className="space-y-1 border-b border-gray-200 pb-3">
          {primaryLinks.map((link, index) => (
            <button
              className={`flex w-full items-center gap-5 rounded-lg px-3 py-2.5 text-sm ${
                index === 0 && activePage === "home"
                  ? "bg-gray-100 font-semibold"
                  : "font-normal hover:bg-gray-100"
              }`}
              key={link.label}
              onClick={index === 0 ? onHome : () => onNavigate("shorts")}
              type="button"
            >
              <Icon>{link.icon}</Icon>
              {link.label}
            </button>
          ))}
        </div>

        <div className="border-b border-gray-200 py-3">
          <button
            className="mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-100"
            onClick={() => onNavigate("playlists")}
            type="button"
          >
            Siz <span aria-hidden="true">›</span>
          </button>
          {libraryLinks.map((link) => (
            <button
              className={`flex w-full items-center gap-5 rounded-lg px-3 py-2.5 text-left text-sm ${
                activePage === ({
                  "Kanalim": "channel",
                  "Tomosha tarixi": "history",
                  "Playlistlar": "playlists",
                  "Keyinroq": "watchLater",
                  "Yoqgan videolar": "liked",
                  "Videolaringiz": "uploads",
                })[link.label]
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              key={link.label}
              onClick={() =>
                onNavigate(
                  {
                    "Kanalim": "channel",
                    "Tomosha tarixi": "history",
                    "Playlistlar": "playlists",
                    "Keyinroq": "watchLater",
                    "Yoqgan videolar": "liked",
                    "Videolaringiz": "uploads",
                  }[link.label]
                )
              }
              type="button"
            >
              <Icon>{link.icon}</Icon>
              {link.label}
            </button>
          ))}
          <button
            className={`mt-1 flex w-full items-center gap-5 rounded-lg px-3 py-2.5 text-left text-sm ${
              activePage === "admin" ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
            }`}
            onClick={onAdminOpen}
            type="button"
          >
            <Icon><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7z" /><path d="m9 12 2 2 4-4" /></Icon>
            Admin panel
          </button>
        </div>

      </nav>
    </aside>
  );
}

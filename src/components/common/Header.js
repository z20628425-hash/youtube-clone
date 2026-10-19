import SearchBar from './SearchBar';

function Header({ onHome, onMenuToggle, searchQuery, onSearchChange }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 border-b border-gray-100 bg-white px-3 md:gap-6 md:px-4">
      <div className="flex w-auto shrink-0 items-center gap-2 md:w-[180px] md:gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Navigatsiya menyusini ochish yoki yopish"
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
          aria-label="YouTube bosh sahifasi"
        >
          <span className="flex h-[19px] w-[28px] items-center justify-center rounded-[6px] bg-red-600 text-white">
            <svg aria-hidden="true" viewBox="0 0 24 18" className="h-3 w-4">
              <path d="M23.5 3a3 3 0 0 0-2.1-2.1C19.5.4 12 .4 12 .4s-7.5 0-9.4.5A3 3 0 0 0 .5 3 31 31 0 0 0 0 9s0 3.8.5 6a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 9s0-3.8-.5-6ZM9.6 12.8V5.2L16 9l-6.4 3.8Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-[-1.2px] text-[#0f0f0f]">
            YouTube
          </span>
          <span className="hidden self-start text-[9px] text-gray-500 sm:inline">
            UZ
          </span>
        </button>
      </div>

      <div className="flex min-w-0 max-w-[690px] flex-1 items-center justify-center gap-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <button
          type="button"
          aria-label="Ovozli qidiruv"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 sm:flex"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <rect x="9" y="2.5" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4m-4 0h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex w-auto shrink-0 items-center justify-end gap-1 sm:gap-2 md:w-[180px]">
        <button
          type="button"
          aria-label="Video yaratish"
          className="flex h-9 items-center gap-1.5 rounded-full bg-gray-100 px-3 text-sm font-medium text-gray-800 hover:bg-gray-200"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="hidden lg:inline">Yaratish</span>
        </button>
        <button
          type="button"
          aria-label="Bildirishnomalar"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute right-0.5 top-0.5 rounded-full border-2 border-white bg-red-600 px-1 text-[9px] font-semibold leading-3 text-white">
            9+
          </span>
        </button>
        <button
          type="button"
          aria-label="Profil"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#365c83] text-white"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <circle cx="12" cy="8" r="3.5" fill="currentColor" />
            <path d="M5 20c.5-3.4 3.2-5.5 7-5.5s6.5 2.1 7 5.5" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;

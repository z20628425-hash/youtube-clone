function SearchBar({ value, onChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex h-9 w-full items-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm focus-within:border-blue-600"
    >
      <label htmlFor="video-search" className="sr-only">
        Videolarni qidirish
      </label>
      <input
        id="video-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Qidiruv"
        className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-[#0f0f0f] outline-none placeholder:text-gray-500"
      />
      <button
        type="submit"
        aria-label="Qidirish"
        className="flex h-full w-[52px] shrink-0 items-center justify-center border-l border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
          <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;

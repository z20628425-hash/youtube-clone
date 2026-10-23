const categories = [
  { label: "Hammasi", query: "reactjs" },
  { label: "Dasturlash", query: "programming tutorials" },
  { label: "JavaScript", query: "JavaScript tutorials" },
  { label: "ReactJS", query: "ReactJS tutorials" },
  { label: "Ta’lim", query: "educational videos", videoCategoryId: "27" },
  { label: "Jonli efir", query: "", eventType: "live" },
  { label: "O‘yin", query: "gaming videos", videoCategoryId: "20" },
  { label: "Podkastlar", query: "podcasts" },
];

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <nav
      aria-label="Video kategoriyalari"
      className="sticky top-16 z-40 -mx-4 bg-white px-4 py-2 sm:-mx-6 sm:px-6"
    >
      <div className="category-scrollbar flex gap-2 overflow-x-auto">
      {categories.map((category) => {
        const isActive = activeCategory === category.label;
        return (
          <button
            aria-pressed={isActive}
            className={`h-8 shrink-0 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
              isActive
                ? "bg-black text-white"
                : "bg-[#f2f2f2] text-gray-900 hover:bg-[#e5e5e5]"
            }`}
            key={category.label}
            onClick={() => onSelectCategory(category)}
            type="button"
          >
            {category.label}
          </button>
        );
      })}
      </div>
    </nav>
  );
}
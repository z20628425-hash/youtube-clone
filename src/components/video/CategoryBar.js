const categories = ['All', 'Music', 'Gaming', 'Education', 'News', 'Sports', 'Podcasts'];

function CategoryBar({ selectedCategory, onCategorySelect }) {
  return (
    <nav
      aria-label="Video kategoriyalari"
      className="mb-6 flex gap-3 overflow-x-auto pb-2"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategorySelect(category)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isSelected
                ? 'bg-[#0f0f0f] text-white'
                : 'bg-gray-100 text-[#0f0f0f] hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryBar;

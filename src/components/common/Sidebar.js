const navigationItems = [
  { label: 'Home', category: 'All', icon: '⌂' },
  { label: 'Music', category: 'Music', icon: '♫' },
  { label: 'Gaming', category: 'Gaming', icon: '▣' },
  { label: 'Education', category: 'Education', icon: '▤' },
  { label: 'News', category: 'News', icon: '▧' },
  { label: 'Sports', category: 'Sports', icon: '⚽' },
];

function Sidebar({ isOpen, selectedCategory, onSelectCategory }) {
  return (
    <aside
      className={`${
        isOpen
          ? 'fixed left-0 top-14 z-20 block h-[calc(100vh-3.5rem)] bg-white shadow-lg md:sticky md:z-0 md:shadow-none'
          : 'hidden'
      } w-60 shrink-0 overflow-y-auto px-3 py-4`}
    >
      <nav aria-label="Asosiy navigatsiya" className="space-y-1">
        {navigationItems.map((item) => {
          const isSelected = selectedCategory === item.category;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectCategory(item.category)}
              className={`flex w-full items-center gap-6 rounded-lg px-3 py-3 text-left text-sm transition hover:bg-gray-100 ${
                isSelected ? 'bg-gray-100 font-semibold' : ''
              }`}
              aria-current={isSelected ? 'page' : undefined}
            >
              <span className="w-5 text-center text-lg" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mx-3 my-4 border-t border-gray-200" />
      <p className="px-3 text-xs leading-5 text-gray-600">
        Bu YouTube uslubidagi namoyish loyihasi. Videolar sinov ma&apos;lumotlaridan
        olinadi.
      </p>
    </aside>
  );
}

export default Sidebar;

import CategoryBar from '../components/video/CategoryBar';
import VideoGrid from '../components/video/VideoGrid';

function Home({
  videos,
  searchQuery,
  selectedCategory,
  onCategorySelect,
  onVideoSelect,
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === 'All' || video.category === selectedCategory;
    const searchableText = `${video.title} ${video.channel} ${video.category}`.toLowerCase();

    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  return (
    <section className="px-4 py-5 md:px-6">
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
      <VideoGrid videos={visibleVideos} onVideoSelect={onVideoSelect} />
    </section>
  );
}

export default Home;

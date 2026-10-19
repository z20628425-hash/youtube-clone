import { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import videos from './mockData/videos';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const openVideo = (video) => {
    setSelectedVideo(video);
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setSelectedVideo(null);
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-white text-[#0f0f0f]">
      <Header
        onHome={goHome}
        onMenuToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex">
        {!selectedVideo && (
          <Sidebar
            isOpen={isSidebarOpen}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
        <main className="min-w-0 flex-1">
          {selectedVideo ? (
            <Watch
              video={selectedVideo}
              videos={videos}
              onBack={goHome}
              onVideoSelect={openVideo}
            />
          ) : (
            <Home
              videos={videos}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onVideoSelect={openVideo}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

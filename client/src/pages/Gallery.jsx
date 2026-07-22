import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Image as ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/Gallery.css";

const Gallery = () => {
  useScrollReveal();
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stories`,
        );
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const filteredStories =
    filter === "all" ? stories : stories.filter((s) => s.type === filter);
  const latestHeadlines = stories.slice(0, 3);

  const types = ["all", "story", "event", "video", "blog"];

  return (
    <div className="gallery-page">
      <Navbar />

      <section className="gallery-hero scroll-reveal">
        <div className="container gallery-hero-content">
          <div>
            <span className="gallery-badge">Stories & impact</span>
            <h1>Gallery</h1>
            <p>
              A closer look at the stories, events, and moments that reflect
              hope, dignity, and community impact.
            </p>
            <div className="gallery-stats">
              <div className="gallery-stat">
                <strong>{stories.length}</strong>
                <span>shared stories</span>
              </div>
              <div className="gallery-stat">
                <strong>{new Set(stories.map((story) => story.type).filter(Boolean)).size}</strong>
                <span>content types</span>
              </div>
            </div>
          </div>

          <div className="gallery-highlight" aria-label="Latest story updates">
            <div className="news-header">
              <span className="news-live">LIVE</span>
              <span className="news-label">Latest updates</span>
            </div>
            <div className="news-stack">
              {latestHeadlines.length > 0 ? (
                latestHeadlines.map((story, index) => (
                  <div key={story._id || index} className={`news-card ${index % 2 === 1 ? "alt" : ""}`}>
                    <strong>{story.title}</strong>
                    <p>{story.excerpt || story.content?.slice(0, 90) || "New story published"}</p>
                  </div>
                ))
              ) : (
                <div className="news-card">
                  <strong>No updates yet</strong>
                  <p>New stories will appear here as soon as they are published.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section scroll-reveal">
        <div className="container">
          <div className="gallery-filter-row">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`gallery-filter-btn ${filter === type ? "active" : ""}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <Link to={`/story/${story._id}`} key={story._id} className="gallery-card">
                  <div className="gallery-card-media">
                    {story.image ? (
                      <img src={story.image} alt={story.title} />
                    ) : (
                      <div className="gallery-card-placeholder">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    {story.videoUrl && (
                      <div className="gallery-card-play">
                        <PlayCircle size={56} />
                      </div>
                    )}
                    <div className="gallery-card-tag">{story.type || "story"}</div>
                  </div>
                  <div className="gallery-card-content">
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                    <span className="gallery-card-link">View story →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="gallery-empty-state">
                <h3>No stories yet</h3>
                <p>No stories are available for this selection right now.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;

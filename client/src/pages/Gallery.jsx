import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Image as ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gallery = () => {
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

  const types = ["all", "story", "event", "video", "blog"];

  return (
    <div className="gallery-page" style={{ paddingTop: "120px" }}>
      <Navbar />

      <section
        style={{
          background: "linear-gradient(135deg, #0f2f44 0%, #16664d 100%)",
          color: "white",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>Gallery</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Stories of hope, transformation, and community impact
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 0", background: "#F8F4F0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "50px",
                  border:
                    filter === type ? "2px solid #16664d" : "2px solid #ddd",
                  background: filter === type ? "#16664d" : "white",
                  color: filter === type ? "white" : "#333",
                  cursor: "pointer",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  transition: "all 0.3s ease",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
            }}
          >
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <Link
                  to={`/story/${story._id}`}
                  key={story._id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-8px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div
                    style={{
                      height: "250px",
                      background: "#f0f0f0",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          background: "#e0e0e0",
                        }}
                      >
                        <ImageIcon size={48} color="#999" />
                      </div>
                    )}
                    {story.videoUrl && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                        }}
                      >
                        <PlayCircle size={60} />
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "#8B1A4A",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {story.type || "story"}
                    </div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                      {story.title}
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {story.excerpt}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "60px 0",
                }}
              >
                <p style={{ color: "#666", fontSize: "1.2rem" }}>
                  No stories available yet. Check back soon!
                </p>
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

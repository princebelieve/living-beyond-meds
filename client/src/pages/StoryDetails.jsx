import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stories/${id}`,
        );
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center", padding: "120px 20px 60px" }}>
        <div className="container">Loading...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center", padding: "120px 20px 60px" }}>
        <div className="container">
          <h2>Story not found</h2>
          <Link to="/gallery" style={{ color: "#16664d", textDecoration: "none", fontWeight: 600 }}>
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "120px" }}>
      <Navbar />

      <section
        style={{
          background: "linear-gradient(135deg, #0f2f44 0%, #16664d 100%)",
          color: "white",
          padding: "60px 0",
        }}
      >
        <div className="container">
          <Link
            to="/gallery"
            style={{
              color: "white",
              opacity: 0.8,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowLeft size={20} /> Back to Gallery
          </Link>
        </div>
      </section>

      <section style={{ padding: "40px 0 60px", background: "#F8F4F0" }}>
        <div className="container">
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {story.image && (
              <div style={{ height: "400px", overflow: "hidden" }}>
                <img
                  src={story.image}
                  alt={story.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <div style={{ padding: "40px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    background: "#16664d",
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {story.type || "story"}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#666",
                  }}
                >
                  <Calendar size={16} /> {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "20px",
                  color: "#1A1A1A",
                }}
              >
                {story.title}
              </h1>

              <div
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#444",
                  whiteSpace: "pre-wrap",
                }}
              >
                {story.content}
              </div>

              {story.videoUrl && (
                <div
                  style={{
                    marginTop: "30px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <video
                    controls
                    style={{ width: "100%", maxHeight: "500px" }}
                    poster={story.thumbnail}
                  >
                    <source src={story.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoryDetails;

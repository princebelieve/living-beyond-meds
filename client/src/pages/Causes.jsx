import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Globe, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Causes = () => {
  const causes = [
    {
      id: 1,
      title: "Widows Empowerment",
      description:
        "Providing financial support, counseling, and community for widows rebuilding their lives.",
      icon: Heart,
      color: "#8B1A4A",
    },
    {
      id: 2,
      title: "Mental Health Support",
      description:
        "Offering professional counseling and support groups for those dealing with grief and trauma.",
      icon: Users,
      color: "#6B1238",
    },
    {
      id: 3,
      title: "Skills Training",
      description:
        "Empowering women with practical skills for financial independence and self-sufficiency.",
      icon: BookOpen,
      color: "#C9A87C",
    },
    {
      id: 4,
      title: "Community Outreach",
      description:
        "Reaching vulnerable communities with essential support and resources.",
      icon: Globe,
      color: "#A82E62",
    },
  ];

  return (
    <div className="causes-page" style={{ paddingTop: "120px" }}>
      <Navbar />

      <section
        style={{
          background: "linear-gradient(135deg, #8B1A4A 0%, #6B1238 100%)",
          color: "white",
          padding: "60px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>Our Causes</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Every cause we support brings hope and dignity to those who need it
            most
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "#F8F4F0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "30px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {causes.map((cause) => {
              const Icon = cause.icon;
              return (
                <div
                  key={cause.id}
                  style={{
                    background: "white",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    textAlign: "center",
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
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: cause.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Icon size={40} color="white" />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "12px",
                      color: "#1A1A1A",
                    }}
                  >
                    {cause.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.8",
                      marginBottom: "20px",
                    }}
                  >
                    {cause.description}
                  </p>
                  <Link
                    to="/donate"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: cause.color,
                      fontWeight: "600",
                      textDecoration: "none",
                    }}
                  >
                    Support This Cause <ArrowRight size={18} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        style={{ padding: "60px 0", background: "white", textAlign: "center" }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
            Make a Difference Today
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Your support helps us continue our mission of bringing compassion
            and dignity to widows and vulnerable individuals.
          </p>
          <Link
            to="/donate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #C9A87C 0%, #DCC4A0 100%)",
              color: "#1A1A1A",
              padding: "16px 40px",
              borderRadius: "50px",
              fontWeight: "700",
              textDecoration: "none",
              fontSize: "1.1rem",
            }}
          >
            <Heart size={20} /> Donate Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Causes;

import { useState, useEffect } from "react";

export default function StoryForm({ onSubmit, editingStory, onCancelEdit }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    type: "story",
    videoUrl: "",
    media: null,
    published: true,
  });

  useEffect(() => {
    if (editingStory) {
      setForm({
        title: editingStory.title || "",
        excerpt: editingStory.excerpt || "",
        content: editingStory.content || "",
        type: editingStory.type || "story",
        videoUrl: editingStory.videoUrl || "",
        media: null,
        published: editingStory.published !== undefined,
      });
    } else {
      setForm({
        title: "",
        excerpt: "",
        content: "",
        type: "story",
        videoUrl: "",
        media: null,
        published: true,
      });
    }
  }, [editingStory]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = new FormData();
    body.append("title", form.title);
    body.append("excerpt", form.excerpt);
    body.append("content", form.content);
    body.append("type", form.type);
    body.append("videoUrl", form.videoUrl);
    body.append("published", form.published ? "true" : "false");

    if (form.media) {
      body.append("media", form.media);
    }

    onSubmit({ formData: body, id: editingStory?._id });
    setForm({
      title: "",
      excerpt: "",
      content: "",
      type: "story",
      videoUrl: "",
      media: null,
      published: true,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 600 }}>
      <h2>{editingStory ? "Edit Story" : "Add Story"}</h2>

      <input
        name="title"
        placeholder="Story title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="excerpt"
        placeholder="Short excerpt"
        value={form.excerpt}
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        placeholder="Full story content"
        value={form.content}
        onChange={handleChange}
        rows={6}
        required
        style={{ minHeight: 140, resize: "vertical" }}
      />

      <label style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ minWidth: 95 }}>Story type</span>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="story">Story</option>
          <option value="event">Event</option>
          <option value="video">Video</option>
          <option value="blog">Blog</option>
        </select>
      </label>

      <input
        name="videoUrl"
        placeholder="Video URL (optional)"
        value={form.videoUrl}
        onChange={handleChange}
      />

      <label style={{ display: "block", marginTop: 10, color: "#5c677d" }}>
        Upload photo or video
      </label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) =>
          setForm({ ...form, media: e.target.files?.[0] || null })
        }
      />

      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={handleChange}
        />
        Publish now
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingStory ? "Update Story" : "Publish Story"}
        </button>

        {editingStory && (
          <button type="button" onClick={onCancelEdit} className="btn-danger">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

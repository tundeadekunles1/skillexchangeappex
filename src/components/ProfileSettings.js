import { useState, useEffect } from "react";
import "../styles/profile-settings.css";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const SKILL_OPTIONS = [
  "Software Development",
  "Graphic Design",
  "Data Science",
  "Digital Marketing",
  "Writing",
  "Photography",
  "Video Production",
  "Mobile App Development",
  "Data Analysis",
  "Cybersecurity",
  "AI/Machine Learning",
  "Frontend Web Dev.",
  "Backend Web Dev.",
  "Bussiness and Finance",
  "UI/UX",
  "Public Speaking ",
];

function ProfileSettings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skillsOffered: [],
    skillsWanted: [],
    qualification: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load existing profile data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setFormData({
          skillsOffered: data.skillsOffered || [],
          skillsWanted: data.skillsWanted || [],
          qualification: data.qualification || "",
          bio: data.bio || "",
        });
        setPreview(data.profilePicUrl || "");
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          setMessage("Failed to load profile data");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeSkill = (skill, type) => {
    setFormData((prev) => ({
      ...prev,
      [type === "offered" ? "skillsOffered" : "skillsWanted"]: prev[
        type === "offered" ? "skillsOffered" : "skillsWanted"
      ].filter((s) => s !== skill),
    }));
  };

  const addSkill = (skill, type) => {
    if (
      skill &&
      !formData[type === "offered" ? "skillsOffered" : "skillsWanted"].includes(
        skill
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        [type === "offered" ? "skillsOffered" : "skillsWanted"]: [
          ...prev[type === "offered" ? "skillsOffered" : "skillsWanted"],
          skill,
        ],
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    formDataToSend.append(
      "skillsOffered",
      JSON.stringify(formData.skillsOffered)
    );
    formDataToSend.append(
      "skillsWanted",
      JSON.stringify(formData.skillsWanted)
    );
    formDataToSend.append("qualification", formData.qualification);
    formDataToSend.append("bio", formData.bio);
    if (profilePic) formDataToSend.append("profilePic", profilePic);

    try {
      const res = await api.patch("/users/update-profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully!");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage("Session expired. Please login again.");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMessage(err.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !message) {
    return (
      <div className="profile-settings-container">
        <h2>Profile Settings</h2>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSave} className="profile-settings-form">
        {/* Skills Offered */}
        <div className="form-group">
          <label>Skills Offered:</label>
          <select
            value=""
            onChange={(e) => addSkill(e.target.value, "offered")}
            disabled={isLoading}
          >
            <option value="">-- Select a Skill --</option>
            {SKILL_OPTIONS.filter(
              (skill) => !formData.skillsOffered.includes(skill)
            ).map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <div className="selected-skills">
            {formData.skillsOffered.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill, "offered")}
                  disabled={isLoading}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="form-group">
          <label>Skills Wanted:</label>
          <select
            value=""
            onChange={(e) => addSkill(e.target.value, "wanted")}
            disabled={isLoading}
          >
            <option value="">-- Select a Skill --</option>
            {SKILL_OPTIONS.filter(
              (skill) => !formData.skillsWanted.includes(skill)
            ).map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <div className="selected-skills">
            {formData.skillsWanted.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill, "wanted")}
                  disabled={isLoading}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Qualification */}
        <div className="form-group">
          <label>Academic Qualification:</label>
          <input
            type="text"
            value={formData.qualification}
            onChange={(e) =>
              setFormData({ ...formData, qualification: e.target.value })
            }
            placeholder="e.g., B.Sc. Computer Science"
            disabled={isLoading}
          />
        </div>

        {/* Bio */}
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            disabled={isLoading}
          />
        </div>

        {/* Profile Picture */}
        <div className="form-group">
          <label>Profile Picture:</label>
          {preview && (
            <img src={preview} alt="Preview" className="profile-preview" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePicChange}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="save-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {message && (
        <p
          className={`message ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ProfileSettings;

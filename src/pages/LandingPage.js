import "../styles/landingpage.css";
import section2Image from "../assets/3mtt3.png";
import rightImage from "../assets/rightImage.png";
import leftImage from "../assets/leftImage.png";
import section2image from "../assets/section2image.jpg";
import Engineer from "../assets/Engineer.png";
import chef from "../assets/chef.png";
import language from "../assets/language.jpg";
import photographer from "../assets/photographer.png";
import FAQSection from "../components/Faq";
import { useEffect, useState } from "react";

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  return (
    <div className={`slide-in ${isVisible ? "animate" : ""}`}>
      <section className="section1" id="Home">
        <div className="overlay-text">
          <div className="overall-texts">
            <h1>
              Learn Something New,
              <span style={{ color: "#3283DE" }}>
                Teach
                <br />
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  What You Know.
                </span>
              </span>
            </h1>
            <h3 style={{ display: "block", textAlign: "center" }}>
              Join a global skill sharing community where learning and teaching
              <br />
              goes hand in hand. Become a pro in what you love! <br /> Your
              skills have value. Share them
            </h3>
            <div>
              <p>FIND & SHARE SKILLS</p>
            </div>
          </div>
          <div className="section1Image">
            <img src={rightImage} alt="right-image" className="rightImage" />
            <img src={leftImage} alt="left-Image" className="leftImage" />
          </div>
        </div>
      </section>

      <section className="section2">
        <div className="section2imagecontainer">
          <img src={section2image} alt="left-Image" className="section2Image" />
        </div>
        <div className="section2content">
          <div className="section2subcontainer">
            <h1>
              Uniting Talents Through Our
              <br /> Digital Skill Exchange Network
            </h1>
            <h3>
              Welcome to our community of skill exchange
              <br /> platform where collaboration drive growth,
              <br /> knowledge is shared freely, and every connected
              <br /> is an opportunity to learn and grow. Our
              <br /> platform is designed to connect individuals
              <br /> worldwide willing to expand their knowledge,
              <br /> share their expertise and learning from others in <br />a
              supportive community environment.
            </h3>
          </div>

          <span>
            <button>Get Started</button>
          </span>
        </div>
      </section>

      <section className="section3">
        <div className="section3div1">
          <h1>Learn, Teach and Connect Seamlessly</h1>
          <h4>
            <p>
              SkillBridge is designed to foster meaningful skill exchange
              through interactive <br />
              and collaborative learning.
            </p>
            <p>
              Built on proven learning principles, our platform helps you
              connect with like- <br />
              minded individuals.
            </p>
            <p>
              Share your expertise, and gain new skills in an engaging and fun
              way.
            </p>
          </h4>
          <h2>
            Transform Online Learning Into Real-World
            <span style={{ color: "#3283DE" }}> Impact.</span>
          </h2>
        </div>
        <div>
          <img
            src={section2Image}
            alt="section3Image"
            className="section3Image"
          />
        </div>
      </section>
      <section className="section4" id="section4">
        <h1>How It Works</h1>
        <div className="section4div1">
          <div className="card">
            <h1>1</h1>
            <div className="card-item">
              <h2>Sign up to Register</h2>
              <h4>
                Register to create an <br />
                account on SkillBridge
                <br /> and become a member .
              </h4>
            </div>
          </div>
          <div className="card">
            <h1>2</h1>
            <div className="card-item">
              <h2>Post Your Skill</h2>
              <h4>
                Give details of what you
                <br /> have to offer and what <br />
                you wish to exchange in
                <br /> return.
              </h4>
            </div>
          </div>
          <div className="card">
            <h1>3</h1>
            <div className="card-item">
              <h2>Find An Exchange</h2>
              <h4>
                Browse through various
                <br /> categories of talent offers
                <br /> and connect with others to
                <br /> exchange skills.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="section5">
        <h1>Popular Skills</h1>
        <div class="carousel-container">
          <div class="carousel">
            {/* <!-- Original cards --> */}
            <div class="card">
              <div>
                <img src={Engineer} alt="software Developer" />
              </div>
              <h3>software Development</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Computer IT
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Esther
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={chef} alt="chef" />
              </div>
              <h3>Baking</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Cooking
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Miss Chef
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={language} alt="language" />
              </div>
              <h3>French Language</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Language
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Bethel
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={photographer} alt="software Developer" />
              </div>
              <h3>Photographer</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Creative Art
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Joe
                </span>
              </div>
            </div>

            {/* <!-- Duplicated cards for seamless looping --> */}

            <div class="card">
              <div>
                <img src={Engineer} alt="software Developer" />
              </div>
              <h3>software Development</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Computer IT
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Esther
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={chef} alt="chef" />
              </div>
              <h3>Baking</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Cooking
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Miss Chef
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={language} alt="language" />
              </div>
              <h3>French Language</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Language
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Bethel
                </span>
              </div>
            </div>
            <div class="card">
              <div>
                <img src={photographer} alt="software Developer" />
              </div>
              <h3>Photographer</h3>
              <div className="card-sub-items">
                <span style={{ color: "#3283DE" }}>
                  <i class="bi bi-grid"></i> Creative Art
                </span>
                <span>
                  <i class="bi bi-pin-map"></i> Nigeria
                </span>
                <span>
                  <i class="bi bi-person"></i> Joe
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section6">
        <FAQSection />
      </section>
      <section className="section7">
        <nav class="container" role="navigation">
          <a href="/signup" class="link-item">
            Content Skills
          </a>
          <a href="/signup" class="link-item">
            UI/UX Design
          </a>
          <a href="/signup" class="link-item">
            Music
          </a>
          <a href="/signup" class="link-item">
            Content Creator
          </a>
          <a href="/signup" class="link-item">
            Video Editting
          </a>
          <a href="/signup" class="link-item">
            Copy Writting
          </a>
          <a href="/signup" class="link-item">
            Coding
          </a>
          <a href="/signup" class="link-item">
            Digital Marketing
          </a>
          <a href="/signup" class="link-item">
            Data Analysis
          </a>
          <a href="/signup" class="link-item">
            Interior Design
          </a>
          <a href="/signup" class="link-item">
            Branding
          </a>
          <a href="/signup" class="link-item">
            Consultancy
          </a>
          <a href="/signup" class="link-item">
            Cyber Security
          </a>
          <a href="/signup" class="link-item">
            Quality Assurance
          </a>
          <a href="/signup" class="link-item">
            Gardening
          </a>
          <a href="/signup" class="link-item">
            Photography
          </a>
          <a href="/signup" class="link-item">
            French Language
          </a>
          <a href="/signup" class="link-item">
            Creative Writting
          </a>
          <a href="/signup" class="link-item">
            Backend Developer
          </a>
          <a href="/signup" class="link-item">
            Frontend Developer
          </a>
        </nav>
      </section>
    </div>
  );
}

export default LandingPage;

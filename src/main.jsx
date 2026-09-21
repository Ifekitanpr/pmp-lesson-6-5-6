import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
  Scale,
  Cpu,
  Globe,
  TrendingUp,
  Radar,
  LineChart,
  GitFork,
  Landmark,
  Repeat,
  Sparkles,
  HelpCircle,
  Compass,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";

const illustrationFiles = import.meta.glob("./assets/illustrations/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (n) => illustrationFiles[`./assets/illustrations/${n}.png`];

const tabs = [
  "Road trip weather",
  "Four categories",
  "Why monitoring matters",
  "Monitoring system",
  "Governance vs. Agile",
  "Exam lens",
];

const categories = [
  {
    title: "1. Regulations & Compliance",
    description:
      "Laws, industry standards, statutory requirements, or tax changes that mandate project adjustments.",
    image: "category-regulations",
    icon: Scale,
  },
  {
    title: "2. Technological Advances",
    description:
      "New tools, platforms, architectural capabilities, or disruptive innovations that alter feasibility or user expectations.",
    image: "category-technology",
    icon: Cpu,
  },
  {
    title: "3. Geopolitical Events",
    description:
      "Trade restrictions, regional instability, tariffs, sanctions, or international policies reshaping supply chains.",
    image: "category-geopolitical",
    icon: Globe,
  },
  {
    title: "4. Market Shifts",
    description:
      "Competitor moves, customer preferences, supply-demand balances, or macroeconomic fluctuations that redefine product value.",
    image: "category-market-shifts",
    icon: TrendingUp,
  },
];

const systemSteps = [
  {
    title: "1. Implement Continuous Monitoring Processes",
    description:
      "Environmental scanning (industry reports, regulatory feeds, competitor alerts), SWOT analysis to evaluate impact, and dashboards for real-time tracking.",
    image: "system-monitoring-process",
    icon: Radar,
  },
  {
    title: "2. Analyze Emerging Trends",
    description:
      "Use predictive analytics, impact modeling, and trend analysis tools to identify which external patterns will reshape project scope or backlog priorities.",
    image: "system-analyze-trends",
    icon: LineChart,
  },
  {
    title: "3. Adapt Scope or Backlog",
    description:
      "Agile: collaborate to reprioritize backlog items and adjust sprint plans. Traditional: submit change requests, revise scope documents, and update baselines.",
    image: "system-adapt-scope",
    icon: GitFork,
  },
];

const governanceModels = [
  {
    title: "1. Traditional Governance",
    description:
      "Steering Committees or governance bodies review external changes at defined intervals. Any adjustments to scope, cost, or schedule baselines must be formally analyzed, costed, and approved before implementation. Example: a new international tariff requires the steering committee to approve alternative supplier arrangements and updated cost baselines.",
    image: "governance-traditional",
    icon: Landmark,
  },
  {
    title: "2. Agile Approach",
    description:
      "Change is addressed continuously. The Product Owner actively monitors external conditions and collaborates with the team to adjust the Product Backlog as new information emerges. Sprint planning and retrospectives ensure external realities are regularly reflected in delivery decisions. Example: a new data privacy law triggers immediate backlog reprioritization to introduce compliance-related user stories.",
    image: "governance-agile",
    icon: Repeat,
  },
];

const quizzes = [
  {
    q: "A project manager reads industry news and receives alerts about a competitor's product launch, but never formally evaluates what impact this might have on the project, nor updates any dashboard or scope document as a result. What step in establishing a monitoring system is missing?",
    a: [
      "Implementing continuous monitoring processes, since the news and alerts weren't real environmental scanning",
      "Analyzing emerging trends and adapting scope or backlog — awareness of the event alone doesn't evaluate impact or translate into an actual scope/backlog adjustment",
      "Nothing is missing — reading news and receiving alerts is sufficient to establish a monitoring system",
      "The governance model, since agile and traditional approaches handle this differently",
    ],
    correct: 1,
    explain:
      "Correct! Environmental scanning (the news and alerts) is only the first step — without analyzing what the trend actually means and then adapting scope or backlog accordingly, awareness alone changes nothing about the project.",
    fail:
      "Reconsider — the scanning step (reading news, receiving alerts) was actually happening; the gap is in the analysis and adaptation steps that should follow it, not the governance model, which doesn't change what's missing here.",
  },
  {
    q: "A new data privacy law is announced mid-project. The project is being run using an agile approach with a Product Owner and regular sprint cycles. What is the most appropriate way to respond, based on this lesson?",
    a: [
      "Wait for the next formally scheduled steering committee meeting before making any changes to the backlog",
      "The Product Owner monitors the change and collaborates with the team to reprioritize the backlog promptly, introducing compliance-related user stories as needed",
      "Continue with the current sprint plan unchanged, since external regulatory changes don't affect backlog priority",
      "Formally analyze and approve the change through a governance body before any backlog adjustment can occur",
    ],
    correct: 1,
    explain:
      "Correct! In agile environments, the Product Owner actively monitors external conditions and adjusts the backlog continuously — waiting for a scheduled committee meeting or formal governance approval is the traditional pattern, not the agile one.",
    fail:
      "Reconsider — waiting for a scheduled meeting or formal governance approval describes the traditional governance pattern, not agile; and a new data privacy law is exactly the kind of external factor that should prompt backlog reprioritization, not be ignored.",
  },
];

function App() {
  const [tab, setTab] = useState(0);
  const [sound, setSound] = useState(true);
  const [revealed, setRevealed] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});

  useLessonAudio(sound);

  const toggleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  const handleQuizAnswer = (quizIdx, optionIdx) => {
    setQuizAnswers((prev) => ({ ...prev, [quizIdx]: optionIdx }));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="badge-wrapper">
            <span className="badge">Lesson 6.5.6</span>
            <span className="badge-meta">CertSprints PMP · Module 6</span>
          </div>
          <h1 className="main-title">Continually Review the External Business Environment</h1>
          <p className="subtitle">
            Scanning external forces, analyzing emerging market and regulatory trends, and adapting project scope and backlog.
          </p>
        </div>
        <div className="audio-toggle">
          <button
            onClick={() => setSound(!sound)}
            className="icon-button"
            title={sound ? "Mute audio feedback" : "Enable audio feedback"}
          >
            {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="tabs-nav" aria-label="Lesson screens">
        {tabs.map((name, i) => (
          <button
            key={name}
            onClick={() => setTab(i)}
            className={`tab-btn ${tab === i ? "tab-btn-active" : ""}`}
          >
            <span className="tab-number">{i + 1}</span>
            <span className="tab-name">{name}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        {/* SCREEN 1: HOOK */}
        {tab === 0 && (
          <div className="screen-card">
            <div className="card-badge">Screen 1 · Hook</div>
            <h2 className="screen-heading">The Road Trip: Weather Never Waits for Scheduled Stops</h2>
            <div className="intro-prose">
              <p>
                Think of it like keeping an eye on the weather during a road trip. If you don't monitor the forecast, you may suddenly find yourself driving straight into a storm.
              </p>
            </div>

            {!revealed.hook ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("hook")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the Environmental Risk</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Scope Never Lives in a Vacuum</h3>
                    <p>
                      One of the biggest mistakes in project management is assuming that once scope is set, it stays fixed. The external business environment is constantly evolving — new regulations are introduced, markets shift, technologies disrupt, and geopolitical events reshape supply chains overnight.
                    </p>
                    <p>
                      <strong>Continual review ensures you're never caught off guard</strong> — you adapt early, realign scope, and keep the project safe.
                    </p>
                    <div className="highlight-pill">
                      <span>Key Takeaway:</span> Project success requires an outward-facing radar as much as internal control.
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("road-trip-weather")}
                      alt="Early warning radar scanning continuously along a project timeline"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Environmental Radar Scanning",
                          image: "road-trip-weather",
                          text: "Active radar scanning along the project journey detects environmental storms early, giving leadership time to adjust routes before impact.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <div></div>
              <button onClick={() => setTab(1)} className="nav-btn next-btn">
                <span>Next: Four categories</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: FOUR CATEGORIES */}
        {tab === 1 && (
          <div className="screen-card">
            <div className="card-badge">Screen 2 · External Factor Taxonomy</div>
            <h2 className="screen-heading">Four Categories of External Factors</h2>
            <div className="intro-prose">
              <p>
                This is not a one-off activity — it's continuous environmental scanning across four categories. Click each to explore.
              </p>
            </div>

            <div className="accordion-list">
              {categories.map((cat, index) => {
                const IconComponent = cat.icon;
                const isOpen = openAccordion === index;
                return (
                  <div
                    key={cat.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : index)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{cat.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{cat.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(cat.image)}
                              alt={cat.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: cat.title,
                                  image: cat.image,
                                  text: cat.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(0)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(2)} className="nav-btn next-btn">
                <span>Next: Why monitoring matters</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: WHY CONTINUOUS MONITORING MATTERS */}
        {tab === 2 && (
          <div className="screen-card">
            <div className="card-badge">Screen 3 · Proactive Value</div>
            <h2 className="screen-heading">Why Continuous Monitoring Matters</h2>
            <div className="intro-prose">
              <p>
                External conditions don't change once — they evolve. Continuous monitoring allows project managers to stay ahead rather than react late.
              </p>
            </div>

            {!revealed.matters ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("matters")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the Strategic Benefits</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Four Proactive Advantages</h3>
                    <p>
                      Ongoing monitoring produces four vital organizational outcomes:
                    </p>
                    <ul className="bullet-list">
                      <li>
                        <strong>Early Risk Detection:</strong> Catches potential disruptions before they escalate into costly project issues.
                      </li>
                      <li>
                        <strong>Captured Opportunities:</strong> Capitalizes on emerging technologies, favorable market windows, or cost-saving innovations.
                      </li>
                      <li>
                        <strong>Regulatory Compliance:</strong> Ensures continuous alignment with evolving laws, preventing penalties and work stoppages.
                      </li>
                      <li>
                        <strong>Strategic Alignment:</strong> Keeps deliverable value synchronized with organizational strategy and real-world customer demand.
                      </li>
                    </ul>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("scanning-outcomes-radar")}
                      alt="Continuous environmental radar delivering risk detection and strategic alignment"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Outcomes of Environmental Scanning",
                          image: "scanning-outcomes-radar",
                          text: "Active environmental scanning delivers protection against emerging risks while uncovering timely opportunities for added business value.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(1)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(3)} className="nav-btn next-btn">
                <span>Next: Monitoring system</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: MONITORING SYSTEM & KNOWLEDGE CHECK */}
        {tab === 3 && (
          <div className="screen-card">
            <div className="card-badge">Screen 4 · System Architecture</div>
            <h2 className="screen-heading">How to Establish a Monitoring System</h2>
            <div className="intro-prose">
              <p>
                Three disciplined steps turn "keeping an eye on things" into an operational system. Click each to explore.
              </p>
            </div>

            <div className="accordion-list">
              {systemSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isOpen = openAccordion === `sys-${index}`;
                return (
                  <div
                    key={step.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : `sys-${index}`)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{step.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{step.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(step.image)}
                              alt={step.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: step.title,
                                  image: step.image,
                                  text: step.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro Knowledge Check 1 */}
            <div className="quiz-section">
              <div className="quiz-header">
                <HelpCircle className="quiz-badge-icon" size={20} />
                <span>Micro Knowledge Check</span>
              </div>
              <p className="quiz-scenario">{quizzes[0].q}</p>
              <div className="quiz-options">
                {quizzes[0].a.map((opt, optIdx) => {
                  const isSelected = quizAnswers[0] === optIdx;
                  const isCorrect = optIdx === quizzes[0].correct;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(0, optIdx)}
                      className={`quiz-option ${
                        isSelected
                          ? isCorrect
                            ? "quiz-option-correct"
                            : "quiz-option-wrong"
                          : ""
                      }`}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizAnswers[0] !== undefined && (
                <div
                  className={`quiz-feedback ${
                    quizAnswers[0] === quizzes[0].correct
                      ? "feedback-correct"
                      : "feedback-wrong"
                  } animate-fade-in`}
                >
                  {quizAnswers[0] === quizzes[0].correct
                    ? quizzes[0].explain
                    : quizzes[0].fail}
                </div>
              )}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(2)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(4)} className="nav-btn next-btn">
                <span>Next: Governance vs. Agile</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: GOVERNANCE VS. AGILE APPROACHES & KNOWLEDGE CHECK */}
        {tab === 4 && (
          <div className="screen-card">
            <div className="card-badge">Screen 5 · Governance Models</div>
            <h2 className="screen-heading">Governance vs. Agile Approaches</h2>
            <div className="intro-prose">
              <p>
                How external changes get handled depends heavily on the project's governance model. Click each to explore.
              </p>
            </div>

            <div className="accordion-list">
              {governanceModels.map((gov, index) => {
                const IconComponent = gov.icon;
                const isOpen = openAccordion === `gov-${index}`;
                return (
                  <div
                    key={gov.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : `gov-${index}`)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{gov.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{gov.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(gov.image)}
                              alt={gov.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: gov.title,
                                  image: gov.image,
                                  text: gov.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro Knowledge Check 2 */}
            <div className="quiz-section">
              <div className="quiz-header">
                <HelpCircle className="quiz-badge-icon" size={20} />
                <span>Micro Knowledge Check</span>
              </div>
              <p className="quiz-scenario">{quizzes[1].q}</p>
              <div className="quiz-options">
                {quizzes[1].a.map((opt, optIdx) => {
                  const isSelected = quizAnswers[1] === optIdx;
                  const isCorrect = optIdx === quizzes[1].correct;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(1, optIdx)}
                      className={`quiz-option ${
                        isSelected
                          ? isCorrect
                            ? "quiz-option-correct"
                            : "quiz-option-wrong"
                          : ""
                      }`}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizAnswers[1] !== undefined && (
                <div
                  className={`quiz-feedback ${
                    quizAnswers[1] === quizzes[1].correct
                      ? "feedback-correct"
                      : "feedback-wrong"
                  } animate-fade-in`}
                >
                  {quizAnswers[1] === quizzes[1].correct
                    ? quizzes[1].explain
                    : quizzes[1].fail}
                </div>
              )}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(3)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(5)} className="nav-btn next-btn">
                <span>Next: Exam lens</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 6: SYNTHESIS (EXAM LENS) */}
        {tab === 5 && (
          <div className="screen-card">
            <div className="card-badge">Screen 6 · Synthesis & Exam Lens</div>
            <h2 className="screen-heading">Proactive Environmental Alignment</h2>
            <div className="intro-prose">
              <p>
                Back to that road trip one more time — because the storm was never going to wait for a scheduled check-in.
              </p>
            </div>

            {!revealed.exam ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("exam")}
                  className="primary-btn"
                >
                  <Award size={18} />
                  <span>Reveal Key Exam Takeaways</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Exam-Relevant Enablers</h3>
                    <ul className="bullet-list">
                      <li>
                        <strong>Four external factor categories:</strong> Regulations and compliance, technological advances, geopolitical events, market shifts.
                      </li>
                      <li>
                        <strong>Continuous scanning:</strong> Environmental scanning is an ongoing discipline, never a one-off planning activity.
                      </li>
                      <li>
                        <strong>Three-step monitoring system:</strong> Implement continuous monitoring processes, analyze emerging trends, adapt scope or backlog.
                      </li>
                      <li>
                        <strong>Traditional governance:</strong> Formal steering committee review and approval of baseline adjustments at defined intervals.
                      </li>
                      <li>
                        <strong>Agile governance:</strong> Product Owner continually monitors external conditions and reprioritizes the product backlog as new information emerges.
                      </li>
                    </ul>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("exam-external-review")}
                      alt="Project actively protected by continuous environmental scanning"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Continual External Review",
                          image: "exam-external-review",
                          text: "Maintaining an outward-looking radar ensures the project navigates environmental shifts cleanly, preserving value and compliance.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>

                <div className="completion-card">
                  <Award size={32} className="completion-icon" />
                  <div>
                    <h4>Lesson 6.5.6 Completed</h4>
                    <p>You have mastered continual review of the external business environment and scope/backlog adaptation.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(4)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <div></div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Lightbox Portal */}
      {modalData &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setModalData(null)}>
            <div
              className="modal-content animate-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{modalData.title}</h3>
                <button
                  className="close-btn"
                  onClick={() => setModalData(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={img(modalData.image)}
                  alt={modalData.title}
                  className="modal-image"
                />
                <p className="modal-caption">{modalData.text}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

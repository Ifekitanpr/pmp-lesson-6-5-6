import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  Volume2,
  VolumeX,
  X,
  Target,
  Scale,
  Cpu,
  Globe,
  TrendingUp,
  Radar,
  LineChart,
  GitFork,
  Landmark,
  Repeat,
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

const reveals = {
  hook: {
    title: "Scope Never Lives in a Vacuum",
    text: "Think of it like keeping an eye on the weather during a road trip. If you don't monitor the forecast, you may suddenly find yourself driving straight into a storm. One of the biggest mistakes in project management is assuming that once scope is set, it stays fixed. The external business environment is constantly evolving — new regulations are introduced, markets shift, technologies disrupt, and geopolitical events reshape supply chains overnight. Continual review ensures you adapt early, realign scope, and keep the project safe.",
    image: "road-trip-weather",
  },
  matters: {
    title: "Four Proactive Strategic Outcomes",
    text: "External conditions don't change once — they evolve continuously. Ongoing environmental scanning delivers four vital organizational advantages: 1) Early Risk Detection catches potential disruptions before they escalate into costly issues; 2) Captured Opportunities capitalize on emerging technologies, favorable market windows, or cost-saving innovations; 3) Regulatory Compliance ensures continuous alignment with evolving laws, preventing penalties and work stoppages; 4) Strategic Alignment keeps deliverable value synchronized with organizational strategy and real-world customer demand.",
    image: "scanning-outcomes-radar",
  },
  exam: {
    title: "Proactive Environmental Alignment",
    text: "Back to that road trip one more time — because the storm was never going to wait for a scheduled check-in. Maintaining an outward-looking radar ensures the project navigates environmental shifts cleanly, preserving value and compliance.",
    image: "exam-external-review",
    bullets: [
      "Four external factor categories: Regulations and compliance, technological advances, geopolitical events, market shifts",
      "Continuous scanning: Environmental scanning is an ongoing discipline, never a one-off planning activity",
      "Three-step monitoring system: Implement continuous monitoring processes, analyze emerging trends, adapt scope or backlog",
      "Traditional governance: Formal steering committee review and approval of baseline adjustments at defined intervals",
      "Agile governance: Product Owner continually monitors external conditions and reprioritizes the product backlog as new information emerges",
    ],
  },
};

const categories = [
  {
    title: "1. Regulations & Compliance",
    text: "Laws, industry standards, statutory requirements, or tax changes that mandate project adjustments. Non-compliance risks severe penalties, work stoppages, or total project invalidation.",
    image: "category-regulations",
    icon: Scale,
  },
  {
    title: "2. Technological Advances",
    text: "New tools, platforms, architectural capabilities, or disruptive innovations that alter feasibility or user expectations. Leveraging emerging tech protects product competitiveness.",
    image: "category-technology",
    icon: Cpu,
  },
  {
    title: "3. Geopolitical Events",
    text: "Trade restrictions, regional instability, tariffs, sanctions, or international policies reshaping supply chains and vendor availability. Proactive sourcing mitigates sudden disruptions.",
    image: "category-geopolitical",
    icon: Globe,
  },
  {
    title: "4. Market Shifts",
    text: "Competitor moves, customer preferences, supply-demand balances, or macroeconomic fluctuations that redefine product value. Keeps deliverables aligned with real market demand.",
    image: "category-market-shifts",
    icon: TrendingUp,
  },
];

const systemSteps = [
  {
    title: "1. Implement Monitoring Processes",
    text: "Environmental scanning (industry reports, regulatory feeds, competitor alerts), SWOT analysis to evaluate impact, and dashboards for real-time tracking.",
    image: "system-monitoring-process",
    icon: Radar,
  },
  {
    title: "2. Analyze Emerging Trends",
    text: "Use predictive analytics, impact modeling, and trend analysis tools to identify which external patterns will reshape project scope or backlog priorities.",
    image: "system-analyze-trends",
    icon: LineChart,
  },
  {
    title: "3. Adapt Scope or Backlog",
    text: "Agile: collaborate to reprioritize backlog items and adjust sprint plans. Traditional: submit change requests, revise scope documents, and update baselines.",
    image: "system-adapt-scope",
    icon: GitFork,
  },
];

const governanceModels = [
  {
    title: "1. Traditional Governance",
    text: "Steering Committees or governance bodies review external changes at defined intervals. Any adjustments to scope, cost, or schedule baselines must be formally analyzed, costed, and approved before implementation. Example: a new international tariff requires the steering committee to approve alternative supplier arrangements and updated cost baselines.",
    image: "governance-traditional",
    icon: Landmark,
  },
  {
    title: "2. Agile Approach",
    text: "Change is addressed continuously. The Product Owner actively monitors external conditions and collaborates with the team to adjust the Product Backlog as new information emerges. Sprint planning and retrospectives ensure external realities are regularly reflected in delivery decisions. Example: a new data privacy law triggers immediate backlog reprioritization to introduce compliance-related user stories.",
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
    c: 1,
    g: "Correct! Environmental scanning (the news and alerts) is only the first step — without analyzing what the trend actually means and then adapting scope or backlog accordingly, awareness alone changes nothing about the project.",
    b: "Reconsider — the scanning step (reading news, receiving alerts) was actually happening; the gap is in the analysis and adaptation steps that should follow it, not the governance model, which doesn't change what's missing here.",
  },
  {
    q: "A new data privacy law is announced mid-project. The project is being run using an agile approach with a Product Owner and regular sprint cycles. What is the most appropriate way to respond, based on this lesson?",
    a: [
      "Wait for the next formally scheduled steering committee meeting before making any changes to the backlog",
      "The Product Owner monitors the change and collaborates with the team to reprioritize the backlog promptly, introducing compliance-related user stories as needed",
      "Continue with the current sprint plan unchanged, since external regulatory changes don't affect backlog priority",
      "Formally analyze and approve the change through a governance body before any backlog adjustment can occur",
    ],
    c: 1,
    g: "Correct! In agile environments, the Product Owner actively monitors external conditions and adjusts the backlog continuously — waiting for a scheduled committee meeting or formal governance approval is the traditional pattern, not the agile one.",
    b: "Reconsider — waiting for a scheduled meeting or formal governance approval describes the traditional governance pattern, not agile; and a new data privacy law is exactly the kind of external factor that should prompt backlog reprioritization, not be ignored.",
  },
];

function Modal({ d, close, done }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close} aria-label="Close modal">
          <X size={20} />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(d.image)} alt="" />
            <h3>{d.title}</h3>
            <div className="modal-copy">
              <p>{d.text}</p>
            </div>
          </>
        ) : (
          <div className="modal-summary">
            <h3>Key Takeaways</h3>
            <ul>
              {d.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {d.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              done();
              close();
            }}
          >
            Mark as read <Check size={18} />
          </button>
        )}
      </section>
    </div>,
    document.body
  );
}

function Quiz({ d, finish }) {
  const [p, setP] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target size={18} /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{d.q}</h3>
        <div className="answers">
          {d.a.map((x, i) => (
            <button
              key={x}
              onClick={() => setP(i)}
              className={p === i ? (i === d.c ? "correct" : "wrong") : ""}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {x}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === d.c ? "good" : "bad"}`}>
              {p === d.c ? d.g : d.b}
            </p>
            <button className="finish-check" onClick={finish}>
              Finish check <ArrowRight size={18} />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function App() {
  const [s, setS] = useState(0);
  const [done, setDone] = useState(Array(6).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);
  const [catRead, setCatRead] = useState(Array(4).fill(false));
  const [sysRead, setSysRead] = useState(Array(3).fill(false));
  const [govRead, setGovRead] = useState(Array(2).fill(false));

  useLessonAudio(sound);

  const mark = (i = s) =>
    setDone((d) => d.map((x, j) => (j === i ? true : x)));
  const go = (i) => i >= 0 && i < 6 && (i <= s + 1 || done[i - 1]) && setS(i);

  useEffect(() => {
    if (s === 1 && catRead.every(Boolean)) mark(1);
  }, [catRead, s]);

  let c;

  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">LESSON 6.5.6 · CONTINUALLY REVIEW EXTERNAL ENVIRONMENT</p>
          <h1>
            Weather never waits for scheduled <span>stops.</span>
          </h1>
          <p className="lead">
            Think of it like keeping an eye on the weather during a road trip. If you don't monitor the forecast, you may suddenly find yourself driving straight into a storm. Scope never lives in a vacuum — continuous external scanning keeps you ahead of disruptions.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && setModal("hook")}
          >
            {done[0] ? "Environmental radar reviewed" : "Reveal environmental radar"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("road-trip-weather")} alt="" />
      </div>
    );

  if (s === 1)
    c = (
      <div className="wide-page">
        <h2>Four Categories of External Factors</h2>
        <p className="lead">
          Environmental scanning is not a one-off planning activity — it is continuous vigilance across four vital categories. Click each category to explore.
        </p>
        <div className="card-grid four">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isRead = catRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setCatRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: cat.title,
                    text: cat.text,
                    image: cat.image,
                  });
                }}
                key={cat.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{cat.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

  if (s === 2)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">STRATEGIC VALUE</p>
          <h2>Four Strategic Scanning Outcomes</h2>
          <p className="lead">
            External conditions evolve continuously. Active scanning delivers four vital organizational advantages: early risk detection, captured opportunities, continuous regulatory compliance, and sustained strategic alignment.
          </p>
          <button
            className="primary-cta"
            disabled={done[2]}
            onClick={() => !done[2] && setModal("matters")}
          >
            {done[2] ? "Strategic outcomes reviewed" : "Reveal strategic scanning outcomes"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("scanning-outcomes-radar")} alt="" />
      </div>
    );

  if (s === 3)
    c = (
      <div className="wide-page">
        <h2>How to Establish a Monitoring System</h2>
        <p className="lead">
          Three disciplined steps turn casual awareness into an operational monitoring system. Click each step to explore.
        </p>
        <div className="card-grid three">
          {systemSteps.map((step, i) => {
            const Icon = step.icon;
            const isRead = sysRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setSysRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: step.title,
                    text: step.text,
                    image: step.image,
                  });
                }}
                key={step.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{step.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {sysRead.every(Boolean) && (
          <button
            className="knowledge-cta centered"
            disabled={done[3]}
            onClick={() => setQuiz(0)}
          >
            {done[3] ? (
              <>
                <Check size={18} /> Knowledge check completed
              </>
            ) : (
              <>
                <Target size={18} /> Start knowledge check <ArrowRight size={18} />
              </>
            )}
          </button>
        )}
      </div>
    );

  if (s === 4)
    c = (
      <div className="wide-page">
        <h2>Governance vs. Agile Approaches</h2>
        <p className="lead">
          How external changes get handled depends heavily on the project's governance framework. Click each approach to explore.
        </p>
        <div className="card-grid two">
          {governanceModels.map((gov, i) => {
            const Icon = gov.icon;
            const isRead = govRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setGovRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: gov.title,
                    text: gov.text,
                    image: gov.image,
                  });
                }}
                key={gov.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{gov.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {govRead.every(Boolean) && (
          <button
            className="knowledge-cta centered"
            disabled={done[4]}
            onClick={() => setQuiz(1)}
          >
            {done[4] ? (
              <>
                <Check size={18} /> Knowledge check completed
              </>
            ) : (
              <>
                <Target size={18} /> Start knowledge check <ArrowRight size={18} />
              </>
            )}
          </button>
        )}
      </div>
    );

  if (s === 5)
    c = (
      <div className="exam-layout">
        <p className="eyebrow">MODULE 6 SYNTHESIS</p>
        <h2>Proactive Environmental Alignment</h2>
        <div className="exam-two-col">
          <div>
            <p className="lead">
              Back to that road trip one more time — because the storm was never going to wait for a scheduled check-in.
            </p>
            <p>
              Maintaining an outward-looking radar ensures the project navigates environmental shifts cleanly, preserving value and compliance across adaptive and predictive lifecycles.
            </p>
            <button
              className="primary-cta"
              disabled={done[5]}
              onClick={() => setModal("exam")}
            >
              {done[5] ? "Exam takeaway review complete" : "Review key exam takeaways"}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
          <img className="lesson-art" src={img("exam-external-review")} alt="" />
        </div>
      </div>
    );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="course-select">
          <span className="crumb">Module 6</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Lesson 6.5.6</span>
        </div>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${
                  i < 9 ? "done" : i === 9 ? "active" : ""
                }`}
                key={i}
              >
                {i < 9 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X size={16} />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 6</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${
                      s === i ? "active" : ""
                    }`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check size={14} />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check size={16} /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 5 && go(s + 1)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          d={typeof modal === "string" ? reveals[modal] : modal}
          close={() => setModal(null)}
          done={() => {
            if (typeof modal === "string") mark();
          }}
        />
      )}
      {quiz !== null && (
        <Quiz
          d={quizzes[quiz]}
          finish={() => {
            mark(quiz === 0 ? 3 : 4);
            setQuiz(null);
          }}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
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
    title: "Lesson 6.5.6 — Continually Review the External Business Environment for Impacts on Project Scope/Backlog",
    text: "One of the biggest mistakes in project management is assuming that once scope is set, it stays fixed. The external business environment is constantly evolving — new regulations are introduced, markets shift, technologies disrupt, and geopolitical events reshape supply chains overnight. Continual review ensures you're never caught off guard — you adapt early, realign scope, and keep the project safe.",
    image: "road-trip-weather",
  },
  matters: {
    title: "Why Continuous Monitoring Matters",
    text: "It helps teams identify risks early, catching potential issues before they escalate into major problems. It also enables them to capitalize on opportunities, such as emerging technologies or market shifts that can create added value. Ongoing monitoring ensures regulatory compliance, reducing the risk of costly violations, and keeps the project strategically aligned with business objectives and external realities as conditions change.",
    image: "scanning-outcomes-radar",
  },
  exam: {
    title: "Synthesis (Exam Lens)",
    text: "Continually reviewing the external business environment means maintaining an ongoing process of scanning, analyzing, and responding to regulations and compliance, technological advances, geopolitical events, and market shifts. It's continuous environmental scanning, not a one-off activity — helping teams catch risks early, capitalize on opportunities, stay compliant, and remain strategically aligned. Establishing a monitoring system means implementing continuous monitoring processes, analyzing emerging trends, and adapting scope or backlog accordingly. How that adaptation happens depends on governance model: traditional projects route changes through formal steering committee approval at defined intervals, while agile teams let the Product Owner monitor and reprioritize the backlog continuously.",
    image: "exam-external-review",
    bullets: [
      "Four external factor categories: regulations and compliance, technological advances, geopolitical events, market shifts",
      "This is continuous environmental scanning, never a one-off activity",
      "Three-step monitoring system: implement continuous monitoring processes, analyze emerging trends, adapt scope or backlog",
      "Traditional governance: formal steering committee review and approval at defined intervals. Agile: Product Owner monitors continuously and reprioritizes the backlog as new information emerges",
    ],
  },
};

const categories = [
  {
    title: "1. Regulations and Compliance",
    text: "Laws, industry standards, or tax changes.",
    image: "category-regulations",
    icon: Scale,
  },
  {
    title: "2. Technological Advances",
    text: "New tools, platforms, or disruptive innovations.",
    image: "category-technology",
    icon: Cpu,
  },
  {
    title: "3. Geopolitical Events",
    text: "Trade restrictions, instability, or new policies.",
    image: "category-geopolitical",
    icon: Globe,
  },
  {
    title: "4. Market Shifts",
    text: "Competitor moves, customer preferences, or economic changes.",
    image: "category-market-shifts",
    icon: TrendingUp,
  },
];

const systemSteps = [
  {
    title: "1. Implement Continuous Monitoring Processes",
    text: "Environmental scanning (reports, news, alerts), SWOT analysis to evaluate impact, and dashboards for real-time monitoring.",
    image: "system-monitoring-process",
    icon: Radar,
  },
  {
    title: "2. Analyze Emerging Trends",
    text: "Use predictive analytics and trend analysis tools to identify which patterns could reshape scope or backlog.",
    image: "system-analyze-trends",
    icon: LineChart,
  },
  {
    title: "3. Adapt Scope or Backlog",
    text: "Agile: reprioritize backlog, adjust sprint planning. Traditional: update baselines, revise scope documents.",
    image: "system-adapt-scope",
    icon: GitFork,
  },
];

const governanceModels = [
  {
    title: "1. Traditional Governance",
    text: "Steering Committees or governance bodies review external changes at defined intervals. Any adjustments to scope, cost, or schedule baselines must be formally analyzed and approved before implementation. Example: a new international tariff requires the steering committee to approve alternative supplier arrangements and updated cost baselines.",
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
    q: "Scenario: A project manager reads industry news and receives alerts about a competitor's product launch, but never formally evaluates what impact this might have on the project, nor updates any dashboard or scope document as a result. What step in establishing a monitoring system is missing?",
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
    q: "Scenario: A new data privacy law is announced mid-project. The project is being run using an agile approach with a Product Owner and regular sprint cycles. What is the most appropriate way to respond, based on this lesson?",
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

function Modal({ d, close, onComplete }) {
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
            <h3>Exam-Relevant Enablers to Remember</h3>
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
              if (onComplete) onComplete();
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
          <p className="eyebrow">Lesson 6.5.6 — Continually Review the External Business Environment for Impacts on Project Scope/Backlog</p>
          <h1>Think of it like keeping an eye on the weather during a road trip.</h1>
          <p className="lead">
            Think of it like keeping an eye on the weather during a road trip. If you don't monitor the forecast, you may suddenly find yourself driving straight into a storm.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && setModal("hook")}
          >
            {done[0] ? "External risk revealed" : "Reveal external risk"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("road-trip-weather")} alt="Road trip weather monitoring" />
      </div>
    );

  if (s === 1)
    c = (
      <div className="wide-page">
        <h2>Four Categories of External Factors</h2>
        <p className="lead">
          This is not a one-off activity — it's continuous environmental scanning across four categories. Click each to explore.
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
          <h2>Why Continuous Monitoring Matters</h2>
          <p className="lead">
            External conditions don't change once — they evolve. Continuous monitoring allows project managers to stay ahead rather than react late.
          </p>
          <button
            className="primary-cta"
            disabled={done[2]}
            onClick={() => !done[2] && setModal("matters")}
          >
            {done[2] ? "Strategic outcomes revealed" : "Reveal strategic outcomes"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("scanning-outcomes-radar")} alt="Strategic scanning radar" />
      </div>
    );

  if (s === 3)
    c = (
      <div className="wide-page">
        <h2>How to Establish a Monitoring System</h2>
        <p className="lead">
          Three steps turn "keeping an eye on things" into an actual system. Click each to explore.
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
            onClick={() => setQuiz(0)}
          >
            <Target size={18} /> {done[3] ? "Retake knowledge check" : "Start knowledge check"}{" "}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    );

  if (s === 4)
    c = (
      <div className="wide-page">
        <h2>Governance vs. Agile Approaches</h2>
        <p className="lead">
          How external changes get handled depends heavily on the project's governance model. Click each to explore.
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
            onClick={() => setQuiz(1)}
          >
            <Target size={18} /> {done[4] ? "Retake knowledge check" : "Start knowledge check"}{" "}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    );

  if (s === 5)
    c = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={img("exam-external-review")} alt="Road trip synthesis" />
        </div>
        <div>
          <h2>Synthesis (Exam Lens)</h2>
          <p className="lead">
            Back to that road trip one more time — because the storm was never going to wait for a scheduled check-in.
          </p>
          <button
            className="primary-cta"
            disabled={done[5]}
            onClick={() => setModal("exam")}
          >
            {done[5] ? "Exam review complete" : "Reveal exam enablers"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="course-select">
          <span className="crumb">Module 6</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Lesson 6.5.6 — Continually Review the External Business Environment for Impacts on Project Scope/Backlog</span>
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
                <Check size={16} /> Section complete — continue when ready.
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
          onComplete={() => {
            if (modal === "hook") mark(0);
            if (modal === "matters") mark(2);
            if (modal === "exam") mark(5);
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

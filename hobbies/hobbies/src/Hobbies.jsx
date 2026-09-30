import "./Hobbies.css";

const hobbies = [
  {
    id: 1,
    icon: "🏏",
    title: "Playing Cricket",
    description:
      "Playing cricket helps me stay active, focused, and enjoy time with friends.",
  },
  {
    id: 2,
    icon: "🎵",
    title: "Listening to Music",
    description:
      "Music helps me relax, refresh my mind, and stay motivated throughout the day.",
  },
  {
    id: 3,
    icon: "💻",
    title: "Coding",
    description:
      "Coding allows me to solve problems, build projects, and explore new technologies.",
  },
  {
    id: 4,
    icon: "🎬",
    title: "Watching Movies",
    description:
      "Watching movies is one of my favorite ways to relax and enjoy my free time.",
  },
];

function Hobbies() {
  return (
    <section className="hobbies-section">
      <div className="hobbies-wrapper">
        <div className="hobbies-header">
          <span className="section-label">PERSONAL INTERESTS</span>

          <h1>
            My <span>Hobbies</span>
          </h1>

          <p>
            A few things I enjoy doing in my free time that keep me
            creative, active, and motivated.
          </p>
        </div>

        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <article className="hobby-card" key={hobby.id}>
              <div className="hobby-icon">
                {hobby.icon}
              </div>

              <div className="hobby-content">
                <h2>{hobby.title}</h2>
                <p>{hobby.description}</p>
              </div>

              <div className="card-arrow">→</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hobbies;

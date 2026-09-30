import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home page">
      <div className="home-content">
        <h1>Hello, I'm dheepak</h1>

        <h2>cse student </h2>

        <p>
          Welcome to my portfolio. I am interested
          in web development, programming and
          creating innovative projects.
        </p>

        <Link to="/projects" className="button">
          View Projects
        </Link>
      </div>
    </div>
  );
}

export default Home;

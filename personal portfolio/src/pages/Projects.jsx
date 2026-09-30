function Projects() {
  return (
    <div className="page">
      <div className="content-box">
        <h1>My Projects</h1>

        <div className="projects">
          <div className="project-card">
            <h2>College Website</h2>

            <p>
              A responsive college website created
              using HTML, CSS and JavaScript.
            </p>

            <p>
              Technologies: HTML, CSS, JavaScript
            </p>
          </div>

          <div className="project-card">
            <h2>Portfolio Website</h2>

            <p>
              A personal portfolio website created
              using React and React Router.
            </p>

            <p>
              Technologies: React, React Router, CSS
            </p>
          </div>

          <div className="project-card">
            <h2>Titanic EDA</h2>

            <p>
              A data analysis project exploring
              the Titanic dataset using Python.
            </p>

            <p>
              Technologies: Python, Pandas, Matplotlib
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;

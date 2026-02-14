import '../App.css'

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                </div>
                <div className="project-buttons">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-small"
                        >
                            View Live
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-small"
                        >
                            Repo
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard

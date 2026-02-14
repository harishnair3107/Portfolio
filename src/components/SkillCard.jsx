import '../App.css'

function SkillCard({ skill }) {
    return (
        <div className="skill-card fade-in">
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-name">{skill.name}</h3>
        </div>
    )
}

export default SkillCard

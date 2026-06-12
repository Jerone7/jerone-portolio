import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';

const skills = [
  { name: 'HTML/CSS', percentage: 95 },
  { name: 'JavaScript', percentage: 90 },
  { name: 'Bootstrap', percentage:90 },
  { name: 'React / Next.js', percentage: 88 },
  { name: 'Node.js / Express', percentage: 85 },
  { name: 'Database (MySQL/MongoDB)', percentage: 82 },
];

export default function SkillsSection() {
  const leftSkills = skills.slice(0, 3);
  const rightSkills = skills.slice(3);

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-card-alt)' }}
    >
      <div className="container-custom">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with daily."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          <div>
            {leftSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                delay={i * 0.1}
              />
            ))}
          </div>
          <div>
            {rightSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

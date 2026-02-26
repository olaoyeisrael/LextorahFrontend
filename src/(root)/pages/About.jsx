
import styles from "../../components/sections/AboutHero/AboutHero.module.css";
import {
  AboutHero,
  VisionMission,
  WhatWeDo,
  LearningTech,
  GlobalPartnerships,
  WhoWeServe,
  OurCommitment,
  OurIdentity,
} from "../../components/sections";
import {
  aboutHeroContent,
  visionMission,
  whatWeDo,
  learningTechnologies,
  globalPartnerships,
  whoWeServe,
  ourCommitment,
  ourIdentity,
} from "../../data/about";

export default function AboutPage() {
  return (
   <section>
      {/* Hero Section */}
      <AboutHero
        title={aboutHeroContent.title}
        subtitle={aboutHeroContent.subtitle}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            {aboutHeroContent.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission
        vision={visionMission.vision}
        mission={visionMission.mission}
      />

      {/* What We Do */}
      <WhatWeDo
        title={whatWeDo.title}
        subtitle={whatWeDo.subtitle}
        items={whatWeDo.items}
      />

      {/* Learning Technologies */}
      <LearningTech
        title={learningTechnologies.title}
        description={learningTechnologies.description}
        subtitle={learningTechnologies.subtitle}
        features={learningTechnologies.features}
        note={learningTechnologies.note}
        image={learningTechnologies.image}
      />

      {/* Global Alignment & Partnerships */}
      <GlobalPartnerships
        title={globalPartnerships.title}
        subtitle={globalPartnerships.subtitle}
        partners={globalPartnerships.partners}
        note={globalPartnerships.note}
      />

      {/* Who We Serve */}
      <WhoWeServe
        title={whoWeServe.title}
        subtitle={whoWeServe.subtitle}
        audiences={whoWeServe.audiences}
      />

      {/* Our Commitment */}
      <OurCommitment
        title={ourCommitment.title}
        items={ourCommitment.items}
      />

      {/* Our Identity */}
      <OurIdentity
        title={ourIdentity.title}
        description={ourIdentity.description}
        statement={ourIdentity.statement}
        brandName={ourIdentity.brandName}
        tagline={ourIdentity.tagline}
      />
   </section>
  );
}

import {
  GrangeNavbar,
  GrangeHero,
  GrangeForStudents,
  GrangeForTeachers,
  GrangeLeadership,
  GrangePlatformUsage,
  GrangeIntegrity,
  GrangeSupport,
  // GrangeFooter,
} from "../../components/grange";
import GrangeFooter from "../../components/grange/GrangeFooter/GrangeFooter";
import { grangeSchoolsData } from "../../data/grangeSchoolsData";

export default function GrangeSchoolsPage() {
  const {
    navbar,
    hero,
    forStudents,
    forTeachers,
    leadership,
    platformUsage,
    integrity,
    support,
    footer,
  } = grangeSchoolsData;

  return (
    <>
      <GrangeNavbar
        logo={navbar.logo}
        loginHref={navbar.loginHref}
        helpHref={navbar.helpHref}
      />
      <main>
        <GrangeHero
          title={hero.title}
          highlight={hero.highlight}
          subtitle={hero.subtitle}
          badge={hero.badge}
          description={hero.description}
          primaryButtonText={hero.primaryButtonText}
          primaryButtonHref={hero.primaryButtonHref}
          secondaryButtonText={hero.secondaryButtonText}
          secondaryButtonHref={hero.secondaryButtonHref}
        />
        <GrangeForStudents
          title={forStudents.title}
          subtitle={forStudents.subtitle}
          benefits={forStudents.benefits}
          image={forStudents.image}
        />
        <GrangeForTeachers
          title={forTeachers.title}
          subtitle={forTeachers.subtitle}
          benefits={forTeachers.benefits}
          image={forTeachers.image}
        />
        <GrangeLeadership
          title={leadership.title}
          description={leadership.description}
          features={leadership.features}
        />
        <GrangePlatformUsage
          title={platformUsage.title}
          subtitle={platformUsage.subtitle}
          features={platformUsage.features}
        />
        <GrangeIntegrity
          title={integrity.title}
          items={integrity.items}
        />
        <GrangeSupport
          title={support.title}
          subtitle={support.subtitle}
          items={support.items}
          ctaText={support.ctaText}
          ctaLink={support.ctaLink}
        />
      </main>
        <GrangeFooter
          logo={footer.logo}
          description={footer.description}
          quickLinks={footer.quickLinks}
          poweredByText={footer.poweredBy}
          copyright={footer.copyright}
        />
    </>
  );
}

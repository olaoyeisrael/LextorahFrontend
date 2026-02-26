import {
  LagoonNavbar,
  LagoonHero,
  LagoonForStudents,
  LagoonForTeachers,
  LagoonLeadership,
  LagoonPlatformUsage,
  LagoonIntegrity,
  LagoonSupport,
  LagoonFooter,
} from "../../components/lagoon";
import { lagoonSchoolsData } from "../../data/lagoonSchoolsData";

export default function LagoonSchoolsPage() {
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
  } = lagoonSchoolsData;

  return (
    <>
      <LagoonNavbar
        logo={navbar.logo}
        brandName={navbar.brandName}
        loginHref={navbar.loginHref}
        helpHref={navbar.helpHref}
      />
      <main>
        <LagoonHero
          title={hero.title}
          highlight={hero.highlight}
          subtitle={hero.subtitle}
          badge={hero.badge}
          description={hero.description}
          primaryButtonText={hero.primaryButtonText}
          primaryButtonHref={hero.primaryButtonHref}
          secondaryButtonText={hero.secondaryButtonText}
          secondaryButtonHref={hero.secondaryButtonHref}
          image={hero.image}
          supportBadge={hero.supportBadge}
        />
        <LagoonForStudents
          badge={forStudents.badge}
          title={forStudents.title}
          subtitle={forStudents.subtitle}
          benefits={forStudents.benefits}
          image={forStudents.image}
        />
        <LagoonForTeachers
          badge={forTeachers.badge}
          title={forTeachers.title}
          subtitle={forTeachers.subtitle}
          benefits={forTeachers.benefits}
          image={forTeachers.image}
        />
        <LagoonLeadership
          badge={leadership.badge}
          title={leadership.title}
          description={leadership.description}
          features={leadership.features}
        />
        <LagoonPlatformUsage
          badge={platformUsage.badge}
          title={platformUsage.title}
          features={platformUsage.features}
        />
        <LagoonIntegrity
          title={integrity.title}
          subtitle={integrity.subtitle}
          items={integrity.items}
        />
        <LagoonSupport
          badge={support.badge}
          title={support.title}
          subtitle={support.subtitle}
          items={support.items}
          footerText={support.footerText}
        />
      </main>
      <LagoonFooter
        logo={footer.logo}
        description={footer.description}
        quickLinks={footer.quickLinks}
        poweredByText={footer.poweredBy}
        copyright={footer.copyright}
      />
    </>
  );
}

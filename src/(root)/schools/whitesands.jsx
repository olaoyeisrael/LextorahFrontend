import {
  WhitesandsNavbar,
  WhitesandsHero,
  WhitesandsForStudents,
  WhitesandsForTeachers,
  WhitesandsLeadership,
  WhitesandsPlatformUsage,
  WhitesandsIntegrity,
  WhitesandsSupport,
  WhitesandsFooter,
} from "../../components/whitesands";
import { whitesandsSchoolsData } from "../../data/whitesandsSchoolsData";

export default function WhitesandsSchoolsPage() {
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
  } = whitesandsSchoolsData;

  return (
    <>
      <WhitesandsNavbar
        logo={navbar.logo}
        loginHref={navbar.loginHref}
        helpHref={navbar.helpHref}
      />
      <main>
        <WhitesandsHero
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
        <WhitesandsForStudents
          title={forStudents.title}
          subtitle={forStudents.subtitle}
          benefits={forStudents.benefits}
          image={forStudents.image}
        />
        <WhitesandsForTeachers
          title={forTeachers.title}
          subtitle={forTeachers.subtitle}
          benefits={forTeachers.benefits}
          image={forTeachers.image}
        />
        <WhitesandsLeadership
          title={leadership.title}
          description={leadership.description}
          features={leadership.features}
        />
        <WhitesandsPlatformUsage
          title={platformUsage.title}
          subtitle={platformUsage.subtitle}
          features={platformUsage.features}
        />
        <WhitesandsIntegrity
          title={integrity.title}
          subtitle={integrity.subtitle}
          items={integrity.items}
        />
        <WhitesandsSupport
          title={support.title}
          subtitle={support.subtitle}
          items={support.items}
          ctaText={support.ctaText}
          ctaLink={support.ctaLink}
        />
      </main>
      <WhitesandsFooter
        logo={footer.logo}
        description={footer.description}
        quickLinks={footer.quickLinks}
        poweredByText={footer.poweredByText}
        copyright={footer.copyright}
      />
    </>
  );
}

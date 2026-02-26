import {
  UnilagNavbar,
  UnilagHero,
  UnilagForStudents,
  UnilagForTeachers,
  UnilagLeadership,
  UnilagPlatformUsage,
  UnilagIntegrity,
  UnilagSupport,
} from "../../components/unilag";
import UnilagFooter from "../../components/unilag/UnilagFooter";
import { unilagData } from "../../data/unilagSchoolsData";

export default function UnilagSchoolsPage() {
  const {
      navbarData,
      hero,
      forStudents,
      forTeachers,
      leadership,
      platformUsage,
      integrity,
      support,
      footerData,
    } = unilagData;
    
  return (
    <>
      <UnilagNavbar
        logo={navbarData.logo}
        loginHref={navbarData.loginHref}
        helpHref={navbarData.helpHref}
      />

      <main>
        <UnilagHero
          title={hero.title}
          highlight={hero.highlight}
          subtitle={hero.subtitle}
          badge={hero.badge}
          description={hero.description}
          primaryButtonText={hero.primaryButton.text}
          primaryButtonHref={hero.primaryButton.href}
          secondaryButtonText={hero.secondaryButton.text}
          secondaryButtonHref={hero.secondaryButton.href}
        />
        <UnilagForStudents
          title={forStudents.title}
          description={forStudents.description}
          benefits={forStudents.features}
          image={forStudents.image}
        />
        <UnilagForTeachers
          title={forTeachers.title}
          description={forTeachers.description}
          benefits={forTeachers.features}
          image={forTeachers.image}
        />
        <UnilagLeadership
          title={leadership.title}
          description={leadership.description}
          features={leadership.cards}
        />
        <UnilagPlatformUsage
          title={platformUsage.title}
          description={platformUsage.description}
          features={platformUsage.cards}
        />
        <UnilagIntegrity
          title={integrity.title}
          items={integrity.items}
        />
        <UnilagSupport
          title={support.title}
          description={support.description}
          items={support.cards}
          ctaText={support.buttonText}
          ctaLink={"#"}
        />
      </main>
        
      <UnilagFooter
        logo={footerData.logo}
        description={footerData.description}
        quickLinks={footerData.quickLinks}
        poweredByText={footerData.poweredBy}
        copyright={footerData.copyright}
      />
    </>
  );
}
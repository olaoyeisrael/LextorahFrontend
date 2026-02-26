import {
  ChrislandNavbar,
  ChrislandHero,
  ChrislandForStudents,
  ChrislandForTeachers,
  ChrislandLeadership,
  ChrislandPlatformUsage,
  ChrislandIntegrity,
  ChrislandSupport,
  ChrislandFooter,
} from "../../components/chrisland";

import {
  chrislandHero,
  chrislandForStudentsData,
  chrislandForTeachersData,
  chrislandLeadershipData,
  chrislandPlatformUsageData,
  chrislandIntegrityData,
  chrislandSupportData,
  chrislandFooterData,
} from "../../data/chrislandSchoolsData";

export default function ChrislandSchoolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ChrislandNavbar />
      
      <main className="flex-1">
        <ChrislandHero
          title={chrislandHero.title}
          highlight={chrislandHero.highlight}
          subtitle={chrislandHero.subtitle}
          badge={chrislandHero.badge}
          description={chrislandHero.description}
          schoolNameBold={chrislandHero.schoolNameBold}
          subDescription={chrislandHero.subDescription}
        />

        <ChrislandForStudents
          badge={chrislandForStudentsData.badge}
          title={chrislandForStudentsData.title}
          benefits={chrislandForStudentsData.benefits}
          image={chrislandForStudentsData.image}
        />

        <ChrislandForTeachers
          badge={chrislandForTeachersData.badge}
          title={chrislandForTeachersData.title}
          benefits={chrislandForTeachersData.benefits}
          image={chrislandForTeachersData.image}
        />

        <ChrislandLeadership
          badge={chrislandLeadershipData.badge}
          title={chrislandLeadershipData.title}
          description={chrislandLeadershipData.description}
          features={chrislandLeadershipData.features}
        />

        <ChrislandPlatformUsage
          title={chrislandPlatformUsageData.title}
          features={chrislandPlatformUsageData.features}
        />

        <ChrislandIntegrity
          title={chrislandIntegrityData.title}
          points={chrislandIntegrityData.points}
        />

        <ChrislandSupport
          title={chrislandSupportData.title}
          description={chrislandSupportData.description}
          options={chrislandSupportData.options}
        />
      </main>

      <ChrislandFooter
        logo={chrislandFooterData.logo}
        tagline={chrislandFooterData.tagline}
        quickLinks={chrislandFooterData.quickLinks}
        poweredBy={chrislandFooterData.poweredBy}
        copyright={chrislandFooterData.copyright}
      />
    </div>
  );
}

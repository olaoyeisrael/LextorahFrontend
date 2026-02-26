import {
  CoronaNavbar,
  CoronaHero,
  CoronaForStudents,
  CoronaForTeachers,
  CoronaSchoolLeadership,
  CoronaPlatformUsage,
  CoronaAcademicIntegrity,
  CoronaNeedSupport,
  CoronaFooter,
} from "../../components/corona";

import {
  coronaHero,
  forStudentsData,
  forTeachersData,
  schoolLeadershipData,
  platformUsageData,
  academicIntegrityData,
  needSupportData,
  coronaFooterData,
} from "../../data/coronaSchoolsData";

export default function CoronaSchoolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CoronaNavbar />
      
      <main className="flex-1">
        <CoronaHero {...coronaHero} />
        
        <CoronaForStudents {...forStudentsData} />
        
        <CoronaForTeachers {...forTeachersData} />
        
        <CoronaSchoolLeadership {...schoolLeadershipData} />
        
        <CoronaPlatformUsage {...platformUsageData} />
        
        <CoronaAcademicIntegrity {...academicIntegrityData} />
        
        <CoronaNeedSupport {...needSupportData} />
      </main>
      
      <CoronaFooter {...coronaFooterData} />
    </div>
  );
}

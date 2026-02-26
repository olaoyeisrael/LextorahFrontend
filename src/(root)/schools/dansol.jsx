import React from "react";
import {
  DansolNavbar,
  DansolHero,
  DansolForStudents,
  DansolForTeachers,
  DansolLeadership,
  DansolPlatformUsage,
  DansolIntegrity,
  DansolSupport,
  DansolFooter,
} from "../../components/dansol";

const DansolSchoolsPage= () => {
  return (
    <>
      <DansolNavbar />
      <main>
        <DansolHero />
        <DansolForStudents />
        <DansolForTeachers />
        <DansolLeadership />
        <DansolPlatformUsage />
        <DansolIntegrity />
        <DansolSupport />
      </main>
      <DansolFooter />
    </>
  );
};

export default DansolSchoolsPage;

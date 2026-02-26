import React from "react";
import {
  BasilNavbar,
  BasilHero,
  BasilForStudents,
  BasilForTeachers,
  BasilLeadership,
  BasilPlatformUsage,
  BasilIntegrity,
  BasilSupport,
  BasilFooter,
} from "../../components/basil";

const BasilSchoolsPage = () => {
  return (
    <>
      <BasilNavbar />
      <main>
        <BasilHero />
        <BasilForStudents />
        <BasilForTeachers />
        <BasilLeadership />
        <BasilPlatformUsage />
        <BasilIntegrity />
        <BasilSupport />
      </main>
      <BasilFooter />
    </>
  );
};

export default BasilSchoolsPage;

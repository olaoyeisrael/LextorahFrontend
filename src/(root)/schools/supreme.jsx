import {
  SupremeNavbar,
  SupremeHero,
  SupremeForStudents,
  SupremeForTeachers,
  SupremeLeadership,
  SupremePlatformUsage,
  SupremeIntegrity,
  SupremeSupport,
  SupremeFooter,
} from "../../components/supreme";

export default function SupremeSchoolsPage() {
  return (
    <main>
      <SupremeNavbar />
      <SupremeHero />
      <SupremeForStudents />
      <SupremeForTeachers />
      <SupremeLeadership />
      <SupremePlatformUsage />
      <SupremeIntegrity />
      <SupremeSupport />
      <SupremeFooter />
    </main>
  );
}

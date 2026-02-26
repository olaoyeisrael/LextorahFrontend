import { Link } from "react-router-dom";

import {
  LearnerHero,
  LearnerFeatures,
  ResponsibleUseBanner,
  LearnerSubjectsSupported,
  ExamPreparation,
  FAQSection,
  LearnerCTA,
} from "../../components/sections";
import {
  msLexiLearnerDescription,
  howLextorahHelpsLearn,
  learnTheRightWay,
  responsibleUseSupportLearners,
  academicSubjectsGrid,
  languageLearningGrid,
  subjectCategories,
  examPrepCategories,
  examPrepFeatures,
  learnerFAQs,
  learnerCtaSection,
} from "../../data/learnerData";
export default function LearnersPage() {
  return (
        <section>
      {/* Hero Section */}
      <LearnerHero
        badge="For Learners & Students"
        title="Learn Better. Practise Smarter. Build Confidence."
        primaryButtonText="Try Ms. Lexi® Now"
        primaryButtonHref="/chat"
        secondaryButtonText="Request Access"
        secondaryButtonHref="/request-access"
        backgroundImage="/images/student-hero.png"
        align="center"
      />

      {/* Powerful Features for Effective Learning */}
      <LearnerFeatures
        msLexiInfo={msLexiLearnerDescription}
        howItHelps={howLextorahHelpsLearn}
        learnRightWay={learnTheRightWay}
      />

      {/* Responsible Use Banner */}
      <ResponsibleUseBanner items={responsibleUseSupportLearners} />

      {/* Subjects, Languages & Exams Supported */}
      <LearnerSubjectsSupported
        subjects={academicSubjectsGrid}
        languages={languageLearningGrid}
        categories={subjectCategories}
      />

      {/* Exam Preparation Support */}
      <ExamPreparation
        categories={examPrepCategories}
        features={examPrepFeatures}
      />

      {/* Frequently Asked Questions */}
      <section className="bg-[var(--white)]">
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about Lextorah AI and Ms Lexi®"
          faqs={learnerFAQs}
        />
        <div className="text-center px-[var(--spacing-lg)] pb-[var(--spacing-2xl)]">
          <p className="mb-8 text-[var(--text-secondary)]">Lextorah AI is here to support your learning — your effort, honesty, and curiosity make the difference</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-[var(--spacing-xl)] py-[var(--spacing-md)] bg-[var(--primary)] text-[var(--white)] text-[var(--font-size-sm)] font-semibold rounded-[var(--radius-md)] transition-all hover:bg-[var(--primary-dark)] hover:text-[var(--white)]"
          >
            Still Have Questions? Contact Us
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <LearnerCTA
        title={learnerCtaSection.title}
        description={learnerCtaSection.description}
        buttons={learnerCtaSection.buttons}
      />
      </section>
   
  );
}

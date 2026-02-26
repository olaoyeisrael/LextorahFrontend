
import { LegalHero, LegalContent, LegalCTA } from "../../components/sections";
import { termsOfUseData } from "../../data/legal";

export default function TermsOfUsePage() {
  return (
    <section>
      {/* Hero Section */}
      <LegalHero
        title={termsOfUseData.title}
        lastUpdated={termsOfUseData.lastUpdated}
      />

      {/* Content */}
      <LegalContent
        intro={termsOfUseData.intro}
        sections={termsOfUseData.sections}
        disclaimer={termsOfUseData.disclaimer}
      />

      {/* CTA */}
      <LegalCTA
        title={termsOfUseData.cta.title}
        subtitle={termsOfUseData.cta.subtitle}
        buttonText={termsOfUseData.cta.buttonText}
        buttonHref={termsOfUseData.cta.buttonHref}
      />
   </section>
  );
}

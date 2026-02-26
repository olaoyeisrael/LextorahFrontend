
import {
  ContactHero,
  ContactCards,
  ContactForm,
  StayConnected,
  BrandBanner,
} from "../../components/sections";
import {
  contactHeroContent,
  contactCards,
  contactFormData,
  stayConnectedData,
  brandBannerData,
} from "../../data/contact";

export default function ContactPage() {
  return (
    <section>
      {/* Hero Section */}
      <ContactHero
        title={contactHeroContent.title}
        subtitle={contactHeroContent.subtitle}
      />

      {/* Contact Cards */}
      <ContactCards cards={contactCards} />

      {/* Contact Form */}
      <ContactForm
        title={contactFormData.title}
        subtitle={contactFormData.subtitle}
        fields={contactFormData.fields}
        submitButton={contactFormData.submitButton}
      />

      {/* Stay Connected */}
      <StayConnected
        title={stayConnectedData.title}
        subtitle={stayConnectedData.subtitle}
        socialLinks={stayConnectedData.socialLinks}
      />

      {/* Brand Banner */}
      <BrandBanner
        title={brandBannerData.title}
        tagline={brandBannerData.tagline}
      />
   </section>
  );
}

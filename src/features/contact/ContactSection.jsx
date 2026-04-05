import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import waveVideo from "../../assets/generic/wave.mp4";
import { CONTACT_CONTENT } from "../../constants";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 relative flex min-h-dvh items-center overflow-hidden bg-black py-16 md:py-24">
      <Container className="relative z-10 w-full">
        <div className="rounded-3xl bg-black p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title={CONTACT_CONTENT.headline}
                subtitle={CONTACT_CONTENT.description}
                className="[&_h2]:text-white [&_p]:text-white"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  as="a"
                  href={`mailto:${CONTACT_CONTENT.email}`}
                  className="bg-accent !text-white hover:bg-accent-hover"
                >
                  Start a conversation
                </Button>
                {CONTACT_CONTENT.socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.ariaLabel}
                      className="rounded-xl border border-white/25 bg-white/5 p-2.5 text-white [&_svg]:fill-current [&_svg]:text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-white"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-white">{CONTACT_CONTENT.email}</p>
              <p className="mt-8 text-sm text-white">{CONTACT_CONTENT.footerText}</p>
              <div className="mt-4">
                <Button as="a" href="#work" variant="ghost" className="border-white/40 bg-white/5 !text-white hover:border-accent">
                  Back to top
                </Button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl shadow-sm lg:max-w-sm">
              <video
                className="h-full w-full object-cover"
                src={waveVideo}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

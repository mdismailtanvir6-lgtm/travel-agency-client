import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { ArrowRight } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

import { buttonVariants } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contactLinks = [
  { label: "786 901 1622", href: "tel:+17869011622" },
  { label: "info@wanderlast.com", href: "mailto:info@wanderlast.com" },
];

const socialLinks = [
  {
    label: "Wanderlast on X",
    href: "https://x.com/wanderlast",
    icon: FaXTwitter,
  },
  {
    label: "Wanderlast on LinkedIn",
    href: "https://www.linkedin.com/company/wanderlast",
    icon: FaLinkedinIn,
  },
  {
    label: "Wanderlast on Instagram",
    href: "https://www.instagram.com/wanderlast",
    icon: FaInstagram,
  },
];

// Request-time copyright year
async function CopyrightYear() {
  await connection();

  const year = new Date().getFullYear();

  return (
    <p className="text-xs text-neutral-500">
      © {year} Wanderlast. All rights reserved.
    </p>
  );
}

function FooterHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="text-xs font-medium tracking-[0.18em] text-neutral-300 uppercase"
    >
      {children}
    </h2>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm text-neutral-400 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function FooterColumn({ title, links }) {
  const headingId = `footer-${title.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <nav aria-labelledby={headingId}>
      <FooterHeading id={headingId}>{title}</FooterHeading>

      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="max-w-2xl">
          <Link
            href="/"
            className="inline-block font-heading text-5xl leading-none font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            Wanderlast
          </Link>

          <p className="mt-4 text-sm text-neutral-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <section aria-labelledby="footer-newsletter">
            <FooterHeading id="footer-newsletter">Newsletter</FooterHeading>

            <p
              id="footer-newsletter-description"
              className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-400"
            >
              Subscribe for exclusive travel deals and inspiration
            </p>

            <form className="mt-4 max-w-xs">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>

              <InputGroup className="h-11 rounded-none border-white/15 bg-white/10 transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-white/40 has-[[data-slot=input-group-control]:focus-visible]:ring-white/15 dark:bg-white/10">
                <InputGroupInput
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  aria-describedby="footer-newsletter-description"
                  required
                  className="h-11 px-3 text-sm text-white placeholder:text-neutral-400"
                />

                <InputGroupAddon align="inline-end" className="pr-1">
                  <InputGroupButton
                    type="submit"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Subscribe to newsletter"
                    className="rounded-none text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10"
                  >
                    <ArrowRight className="size-4" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </section>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Contact Us" links={contactLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Suspense
            fallback={
              <p className="text-xs text-neutral-500">
                © Wanderlast. All rights reserved.
              </p>
            }
          >
            <CopyrightYear />
          </Suspense>

          <div className="flex items-center gap-0.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon-sm" }),
                  "size-8 text-neutral-400 hover:bg-white/10 hover:text-white dark:hover:bg-white/10",
                )}
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

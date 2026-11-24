import Link from "next/link";
import { Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const accountLinks = [
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

function NavLink({ href, label, icon: Icon, isActive = false, className }) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand",
        isActive ? "text-brand" : "text-foreground",
        className
      )}
    >
      {Icon ? <Icon className="size-4" /> : null}
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="relative z-40 w-full border-b border-border/60 bg-background">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={link.href === "/"}
            />
          ))}
        </div>

        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tight text-brand lg:justify-self-center"
        >
          Wanderlast
        </Link>

        <div className="hidden items-center justify-end gap-6 lg:flex">
          {accountLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 gap-0 p-0">
              <SheetHeader className="border-b px-5 py-4 pr-12">
                <SheetTitle className="text-xl font-bold tracking-tight text-brand">
                  Wanderlast
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={link.href === "/"}
                    className="rounded-md px-3 py-2.5 hover:bg-muted"
                  />
                ))}

                <div className="my-2 h-px bg-border" />

                {accountLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    icon={link.icon}
                    className="rounded-md px-3 py-2.5 hover:bg-muted"
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

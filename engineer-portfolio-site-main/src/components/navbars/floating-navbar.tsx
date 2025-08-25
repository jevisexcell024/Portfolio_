"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <section className="absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2" title="John Smith Portfolio">
          <span className="text-xl font-semibold text-primary font-[var(--font-display)]">John Smith</span>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) => (
              <NavigationMenuItem key={link.label} className="">
                <a
                  href={link.href}
                  className={cn(
                    "relative bg-transparent px-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                  )}
                >
                  {link.label}
                </a>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Resume Button */}
        <div className="flex items-center gap-2.5">
          <a href="/resume.pdf" download className="max-lg:hidden">
            <Button variant="outline">
              <span className="relative z-10">Resume</span>
            </Button>
          </a>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="relative flex size-8 text-muted-foreground lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-background p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-1 flex-col divide-y divide-border">
          {ITEMS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className={cn(
              "py-4 text-base font-medium text-primary transition-colors last:pb-0 hover:text-primary/80",
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </a>
        </nav>
      </div>
    </section>
  );
};

export { FloatingNavbar };
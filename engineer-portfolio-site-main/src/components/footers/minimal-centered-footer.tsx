import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

const MinimalCenteredFooter = () => {
  const navigation = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const social = [
    { name: "GitHub", href: "https://github.com/johnsmith", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/johnsmith", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/johnsmith", icon: Twitter },
    { name: "Email", href: "mailto:john@example.com", icon: Mail },
  ];

  return (
    <section className="flex flex-col items-center gap-14 py-32 bg-background">
      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium text-text-primary transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-2 font-medium text-text-primary transition-opacity hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon className="size-4" />
                {item.name}
                <ArrowUpRight className="size-3" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            © 2024 John Smith. All rights reserved.
          </p>
        </div>
      </nav>
    </section>
  );
};

export { MinimalCenteredFooter };
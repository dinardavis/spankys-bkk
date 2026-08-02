import "./SocialIcons.css";

const links = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    scale: 1.1,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="16.9" cy="7.1" r="1.1" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    filled: true,
    scale: 1,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 20v-7h2.3l.4-2.8h-2.7V8.4c0-.8.3-1.4 1.5-1.4h1.3V4.5c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.6v2.2H8.7V13h2.2v7h2.6Z" />
      </svg>
    ),
  },
  {
    href: "https://x.com",
    label: "X",
    filled: true,
    scale: 0.76,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function SocialIcons({ className = "" }) {
  return (
    <div className={`social-icons ${className}`.trim()} aria-label="Social links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={link.filled ? "social-icons__link--filled" : undefined}
          style={{ "--icon-scale": link.scale }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;

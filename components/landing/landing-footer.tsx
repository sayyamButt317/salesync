import Link from "next/link";
import {
  FOOTER_DESCRIPTION,
  FOOTER_LINK_GROUPS,
  FOOTER_SOCIAL_LINKS,
} from "@/lib/landing/data";
import { SalesyncLogo } from "./salesync-logo";

export function LandingFooter() {
  return (
    <footer className="bg-[#0f172a] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SalesyncLogo dark href="/" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              {FOOTER_DESCRIPTION}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {FOOTER_SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-bold text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Salesync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

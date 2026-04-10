import { useState } from 'react';
import { useSiteStore } from '@/store/siteStore';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { nav } = useSiteStore((s) => s.data);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
      <div className="flex items-center gap-2">
        <span className="font-heading text-foreground text-lg tracking-wide">Wood on Wood</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-10">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-nav-label text-xs tracking-[0.2em] font-body hover:opacity-70 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm p-8 flex flex-col gap-6 md:hidden">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-nav-label text-sm tracking-[0.2em] font-body"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

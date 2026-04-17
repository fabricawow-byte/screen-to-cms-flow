import { useState } from 'react';
import { useSiteStore } from '@/store/siteStore';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const { contact } = useSiteStore((s) => s.data);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission handler placeholder — do not log PII to the console.
    // TODO: integrate with a backend (edge function / email provider) to deliver messages.
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacto" className="py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-5xl mx-auto bg-contact-bg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Info */}
          <div className="p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-foreground text-3xl md:text-4xl font-light mb-4">
                {contact.title}
              </h2>
              <p className="text-muted-foreground font-body text-sm mb-10">
                {contact.subtitle}
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-foreground" />
                  </div>
                  <div>
                    <span className="text-section-label font-body text-[10px] tracking-[0.2em] block mb-1">
                      TELEFONE
                    </span>
                    <span className="text-foreground font-body text-sm">{contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-foreground" />
                  </div>
                  <div>
                    <span className="text-section-label font-body text-[10px] tracking-[0.2em] block mb-1">
                      EMAIL
                    </span>
                    <span className="text-foreground font-body text-sm">{contact.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-foreground" />
                  </div>
                  <div>
                    <span className="text-section-label font-body text-[10px] tracking-[0.2em] block mb-1">
                      LOCALIZAÇÃO
                    </span>
                    <span className="text-foreground font-body text-sm">{contact.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="mt-10">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:opacity-70 transition-opacity"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-10 md:p-14 border-l border-border/30">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-muted-foreground font-body text-xs tracking-[0.15em]">
                    NOME
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-transparent border-b border-border/50 pb-2 text-foreground font-body text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-muted-foreground font-body text-xs tracking-[0.15em]">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-transparent border-b border-border/50 pb-2 text-foreground font-body text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-muted-foreground font-body text-xs tracking-[0.15em]">
                  MENSAGEM
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-transparent border-b border-border/50 pb-2 text-foreground font-body text-sm outline-none focus:border-primary transition-colors flex-1 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-foreground text-background font-body text-xs tracking-[0.2em] py-4 rounded-full hover:opacity-90 transition-opacity mt-4"
              >
                {contact.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

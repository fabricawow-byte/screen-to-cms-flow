import { useSiteStore } from '@/store/siteStore';

const ContactEditor = () => {
  const { contact } = useSiteStore((s) => s.data);
  const updateContact = useSiteStore((s) => s.updateContact);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Contacto</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Título</label>
          <input type="text" value={contact.title} onChange={(e) => updateContact({ title: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Subtítulo</label>
          <input type="text" value={contact.subtitle} onChange={(e) => updateContact({ subtitle: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Telefone</label>
          <input type="text" value={contact.phone} onChange={(e) => updateContact({ phone: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input type="text" value={contact.email} onChange={(e) => updateContact({ email: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Morada</label>
          <textarea value={contact.address} onChange={(e) => updateContact({ address: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm resize-none" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Texto do Botão</label>
          <input type="text" value={contact.buttonText} onChange={(e) => updateContact({ buttonText: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Instagram URL</label>
          <input type="text" value={contact.instagramUrl} onChange={(e) => updateContact({ instagramUrl: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm" />
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;

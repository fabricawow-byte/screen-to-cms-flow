import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Image, FileText, Folder, Phone, Save } from 'lucide-react';
import HeroEditor from '@/components/admin/HeroEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import PortfolioEditor from '@/components/admin/PortfolioEditor';
import CategoriesEditor from '@/components/admin/CategoriesEditor';
import ContactEditor from '@/components/admin/ContactEditor';
import { useSiteStore } from '@/store/siteStore';
import { useToast } from '@/hooks/use-toast';

type Tab = 'hero' | 'about' | 'portfolio' | 'categories' | 'contact';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'hero', label: 'Hero', icon: <LayoutDashboard size={18} /> },
  { id: 'about', label: 'Sobre', icon: <FileText size={18} /> },
  { id: 'portfolio', label: 'Projetos', icon: <Image size={18} /> },
  { id: 'categories', label: 'Categorias', icon: <Folder size={18} /> },
  { id: 'contact', label: 'Contacto', icon: <Phone size={18} /> },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const data = useSiteStore((s) => s.data);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Alterações guardadas com sucesso!', description: 'As alterações são salvas automaticamente a cada edição.' });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        </div>

        <h2 className="font-heading text-xl text-foreground">Admin Panel</h2>

        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleSave}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={16} />
          Salvar Alterações
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl">
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'portfolio' && <PortfolioEditor />}
          {activeTab === 'categories' && <CategoriesEditor />}
          {activeTab === 'contact' && <ContactEditor />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

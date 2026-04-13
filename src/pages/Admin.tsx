import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Image, FileText, Folder, Phone, Save, LogOut } from 'lucide-react';
import HeroEditor from '@/components/admin/HeroEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import PortfolioEditor from '@/components/admin/PortfolioEditor';

import ContactEditor from '@/components/admin/ContactEditor';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

type Tab = 'hero' | 'about' | 'portfolio' | 'contact';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'hero', label: 'Hero', icon: <LayoutDashboard size={18} /> },
  { id: 'about', label: 'Sobre', icon: <FileText size={18} /> },
  { id: 'portfolio', label: 'Projetos', icon: <Image size={18} /> },
  
  { id: 'contact', label: 'Contacto', icon: <Phone size={18} /> },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const { user, loading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">A carregar...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <p className="text-foreground text-lg">Sem permissão de administrador.</p>
        <p className="text-muted-foreground text-sm">Contacte o administrador para obter acesso.</p>
        <button onClick={signOut} className="text-primary text-sm hover:underline">Sair</button>
      </div>
    );
  }

  const handleSave = () => {
    toast({ title: 'Alterações guardadas!', description: 'Os dados foram salvos no banco de dados.' });
  };

  return (
    <div className="min-h-screen bg-background flex">
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
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={16} />
          Salvar Alterações
        </button>

        <button
          onClick={signOut}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-muted-foreground rounded-lg text-sm hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl">
          {activeTab === 'hero' && <HeroEditor />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'portfolio' && <PortfolioEditor />}
          
          {activeTab === 'contact' && <ContactEditor />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

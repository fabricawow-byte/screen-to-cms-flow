import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import heroBg from '@/assets/hero-bg.jpg';
import logoImg from '@/assets/logo.png';
import aboutImage from '@/assets/about-image.jpg';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import category1 from '@/assets/category-1.jpg';
import category2 from '@/assets/category-2.jpg';

export interface LogoSettings {
  image: string;
  x: number; // percentage from left
  y: number; // percentage from top
  size: number; // percentage width
}

export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: string;
  logo: LogoSettings;
}

export interface AboutData {
  label: string;
  title: string;
  paragraphs: string[];
  tagline: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  images: string[];
  title?: string;
}

export interface PortfolioData {
  title: string;
  description: string;
  items: PortfolioItem[];
}

export interface CategoryItem {
  id: string;
  label: string;
  title: string;
  images: string[];
}

export interface ContactData {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  buttonText: string;
  instagramUrl: string;
}

export interface NavData {
  links: { label: string; href: string }[];
}

export interface SiteData {
  nav: NavData;
  hero: HeroData;
  about: AboutData;
  portfolio: PortfolioData;
  categories: CategoryItem[];
  contact: ContactData;
}

interface SiteStore {
  data: SiteData;
  loaded: boolean;
  loadFromDB: () => Promise<void>;
  updateHero: (hero: Partial<HeroData>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  updatePortfolio: (portfolio: Partial<PortfolioData>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  removePortfolioItem: (id: string) => void;
  updateCategory: (id: string, category: Partial<CategoryItem>) => void;
  addCategory: (category: CategoryItem) => void;
  removeCategory: (id: string) => void;
  updateContact: (contact: Partial<ContactData>) => void;
  updateNav: (nav: Partial<NavData>) => void;
  saveSection: (key: string, content: any) => Promise<void>;
}

const defaultData: SiteData = {
  nav: {
    links: [
      { label: 'INÍCIO', href: '#inicio' },
      { label: 'SOBRE', href: '#sobre' },
      { label: 'PROJETOS', href: '#projetos' },
      { label: 'CONTACTO', href: '#contacto' },
    ],
  },
  hero: {
    title: 'Joinery Solutions',
    subtitle: 'Marcenaria & Design',
    buttonText: 'Ver Projetos',
    backgroundImage: heroBg,
    logo: {
      image: logoImg,
      x: 50,
      y: 30,
      size: 15,
    },
  },
  about: {
    label: 'SOBRE NÓS',
    title: 'Paixão pelo detalhe, respeito pela matéria-prima.',
    paragraphs: [
      'Somos uma empresa dedicada ao fabrico de mobiliário, vocacionada para acompanhar projetos e dar suporte a quem procure um parceiro para a produção de mobiliário de qualidade.',
      'Com décadas no ramo do fabrico de móveis, a wood on wood surge da experiência passada de pai para filha, onde a excelência da arte de marceneiro se conjuga ao talento de criar.',
      'A paixão em produzir e criar soluções para os desafios que nos são propostos, fazem da wood on wood o parceiro que procura para dar corpo ao seu projeto.',
    ],
    tagline: 'Como nos definimos, "joinery solutions" é o que fazemos.',
    image: aboutImage,
  },
  portfolio: {
    title: 'O Nosso Trabalho.',
    description: 'Valorizamos os nossos clientes! Os móveis e designs apresentados são exclusivos destes, servindo apenas para fins ilustrativos do trabalho realizado pela Wood on Wood.',
    items: [
      { id: '1', images: [portfolio1, portfolio2], title: 'Mesa de Jantar' },
      { id: '2', images: [portfolio2, portfolio1], title: 'Restaurante' },
    ],
  },
  categories: [
    { id: '1', label: 'Peças de Mobiliário', title: 'Projetos Personalizados', images: [category1] },
    { id: '2', label: 'Madeira Maciça', title: 'Espaços Profissionais', images: [category2] },
  ],
  contact: {
    title: 'Vamos Conversar?',
    subtitle: 'Entre em contacto para discutirmos o seu próximo projeto.',
    phone: '+351 964858297',
    email: 'geral@woodonwood.pt',
    address: 'Rua São Mamede de Seroa Nº115 4595-456 Seroa Paços de Ferreira',
    buttonText: 'ENVIAR MENSAGEM',
    instagramUrl: 'https://instagram.com/woodonwood',
  },
};

const saveSectionToDB = async (key: string, content: any) => {
  const { error } = await supabase
    .from('site_content')
    .upsert(
      { section_key: key, content, updated_at: new Date().toISOString() },
      { onConflict: 'section_key' }
    );
  if (error) console.error('Error saving section', key, error);
};

export const useSiteStore = create<SiteStore>()((set, get) => ({
  data: defaultData,
  loaded: false,

  loadFromDB: async () => {
    const { data: rows } = await supabase
      .from('site_content')
      .select('section_key, content');

    if (rows && rows.length > 0) {
      const current = { ...get().data };
      for (const row of rows) {
        const key = row.section_key as keyof SiteData;
        if (key in current) {
          if (key === 'hero') {
            const dbHero = row.content as any;
            // Preserve bundled logo image if DB has a non-URL path or "default"
            if (dbHero?.logo?.image && (dbHero.logo.image === 'default' || dbHero.logo.image.startsWith('/src/'))) {
              dbHero.logo.image = defaultData.hero.logo.image;
            }
            (current as any)[key] = { ...current.hero, ...dbHero };
          } else {
            (current as any)[key] = row.content;
          }
        }
      }
      set({ data: current, loaded: true });
    } else {
      set({ loaded: true });
    }
  },

  saveSection: async (key: string, content: any) => {
    await saveSectionToDB(key, content);
  },

  updateHero: (hero) =>
    set((s) => {
      const newHero = { ...s.data.hero, ...hero };
      // For DB persistence, replace bundled asset paths with "default" marker
      let heroForDB = { ...newHero };
      if (heroForDB.logo?.image === defaultData.hero.logo.image) {
        heroForDB = { ...heroForDB, logo: { ...heroForDB.logo, image: 'default' } };
      }
      if (heroForDB.backgroundImage === defaultData.hero.backgroundImage) {
        heroForDB = { ...heroForDB, backgroundImage: 'default' };
      }
      saveSectionToDB('hero', heroForDB);
      return { data: { ...s.data, hero: newHero } };
    }),
  updateAbout: (about) =>
    set((s) => {
      const newAbout = { ...s.data.about, ...about };
      saveSectionToDB('about', newAbout);
      return { data: { ...s.data, about: newAbout } };
    }),
  updatePortfolio: (portfolio) =>
    set((s) => {
      const newPortfolio = { ...s.data.portfolio, ...portfolio };
      saveSectionToDB('portfolio', newPortfolio);
      return { data: { ...s.data, portfolio: newPortfolio } };
    }),
  updatePortfolioItem: (id, item) =>
    set((s) => {
      const newPortfolio = {
        ...s.data.portfolio,
        items: s.data.portfolio.items.map((i) => (i.id === id ? { ...i, ...item } : i)),
      };
      saveSectionToDB('portfolio', newPortfolio);
      return { data: { ...s.data, portfolio: newPortfolio } };
    }),
  addPortfolioItem: (item) =>
    set((s) => {
      const newPortfolio = { ...s.data.portfolio, items: [...s.data.portfolio.items, item] };
      saveSectionToDB('portfolio', newPortfolio);
      return { data: { ...s.data, portfolio: newPortfolio } };
    }),
  removePortfolioItem: (id) =>
    set((s) => {
      const newPortfolio = {
        ...s.data.portfolio,
        items: s.data.portfolio.items.filter((i) => i.id !== id),
      };
      saveSectionToDB('portfolio', newPortfolio);
      return { data: { ...s.data, portfolio: newPortfolio } };
    }),
  updateCategory: (id, category) =>
    set((s) => {
      const newCats = s.data.categories.map((c) => (c.id === id ? { ...c, ...category } : c));
      saveSectionToDB('categories', newCats);
      return { data: { ...s.data, categories: newCats } };
    }),
  addCategory: (category) =>
    set((s) => {
      const newCats = [...s.data.categories, category];
      saveSectionToDB('categories', newCats);
      return { data: { ...s.data, categories: newCats } };
    }),
  removeCategory: (id) =>
    set((s) => {
      const newCats = s.data.categories.filter((c) => c.id !== id);
      saveSectionToDB('categories', newCats);
      return { data: { ...s.data, categories: newCats } };
    }),
  updateContact: (contact) =>
    set((s) => {
      const newContact = { ...s.data.contact, ...contact };
      saveSectionToDB('contact', newContact);
      return { data: { ...s.data, contact: newContact } };
    }),
  updateNav: (nav) =>
    set((s) => {
      const newNav = { ...s.data.nav, ...nav };
      saveSectionToDB('nav', newNav);
      return { data: { ...s.data, nav: newNav } };
    }),
}));

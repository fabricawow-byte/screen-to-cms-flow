import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import heroBg from '@/assets/hero-bg.jpg';
import aboutImage from '@/assets/about-image.jpg';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import category1 from '@/assets/category-1.jpg';
import category2 from '@/assets/category-2.jpg';

export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: string;
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

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      data: defaultData,
  updateHero: (hero) =>
    set((s) => ({ data: { ...s.data, hero: { ...s.data.hero, ...hero } } })),
  updateAbout: (about) =>
    set((s) => ({ data: { ...s.data, about: { ...s.data.about, ...about } } })),
  updatePortfolio: (portfolio) =>
    set((s) => ({ data: { ...s.data, portfolio: { ...s.data.portfolio, ...portfolio } } })),
  updatePortfolioItem: (id, item) =>
    set((s) => ({
      data: {
        ...s.data,
        portfolio: {
          ...s.data.portfolio,
          items: s.data.portfolio.items.map((i) => (i.id === id ? { ...i, ...item } : i)),
        },
      },
    })),
  addPortfolioItem: (item) =>
    set((s) => ({
      data: {
        ...s.data,
        portfolio: { ...s.data.portfolio, items: [...s.data.portfolio.items, item] },
      },
    })),
  removePortfolioItem: (id) =>
    set((s) => ({
      data: {
        ...s.data,
        portfolio: {
          ...s.data.portfolio,
          items: s.data.portfolio.items.filter((i) => i.id !== id),
        },
      },
    })),
  updateCategory: (id, category) =>
    set((s) => ({
      data: {
        ...s.data,
        categories: s.data.categories.map((c) => (c.id === id ? { ...c, ...category } : c)),
      },
    })),
  addCategory: (category) =>
    set((s) => ({ data: { ...s.data, categories: [...s.data.categories, category] } })),
  removeCategory: (id) =>
    set((s) => ({
      data: { ...s.data, categories: s.data.categories.filter((c) => c.id !== id) },
    })),
  updateContact: (contact) =>
    set((s) => ({ data: { ...s.data, contact: { ...s.data.contact, ...contact } } })),
  updateNav: (nav) =>
    set((s) => ({ data: { ...s.data, nav: { ...s.data.nav, ...nav } } })),
}));

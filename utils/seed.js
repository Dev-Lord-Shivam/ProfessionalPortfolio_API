import Portfolio from '../models/Portfolio.js';
import Visitor from '../models/Visitor.js';

/* ------------------------------------------------------------------ */
/*  Default seed data                                                   */
/* ------------------------------------------------------------------ */
const DEFAULT_PORTFOLIO = {
  home: {
    welcomeText: 'WELCOME TO MY WORLD',
    name: 'I am Shivam',
    subtitle: 'Software Engineering',
    rotatingTexts: [
      'Full Stack .NET Developer',
      'Backend Architect',
      'C# Developer',
      'Database Design',
      'System Design',
    ],
    description:
      'Crafting high-performance digital experiences with modern technologies and a focus on user-centric design.',
    resumeUrl: '#',
    projectUrl: '#',
    socials: [
      { label: 'Instagram', iconName: 'Instagram', color: '#E4405F', link: '#' },
      { label: 'LinkedIn', iconName: 'LinkedIn', color: '#0A66C2', link: '#' },
      { label: 'GitHub', iconName: 'GitHub', color: '#ffffff', link: '#' },
      { label: 'Mail', iconName: 'Mail', color: '#EA4335', link: 'mailto:hello@shivam.dev' },
    ],
  },
  about: {
    title: 'Transforming Code into Business Solutions',
    bio: 'As a Full Stack .NET Developer and Backend Architect, I specialize in building scalable, high-availability systems. My passion lies in solving complex architectural challenges while delivering seamless user experiences. With a deep foundation in C#, System Design, and Modern Web Frameworks, I bridge the gap between technical complexity and business value.',
    beyondTitle: 'What I Love to Do',
    beyondBio:
      "When I'm not architecting backends or crafting pixels, you'll find me exploring new horizons. I'm a passionate Traveler who loves discovering hidden gems and diverse cultures. I'm also a huge Foodie, always on the hunt for the perfect meal, and a Cinephile who appreciates the art of storytelling through movies.",
    stats: [
      { iconName: 'WorkspacePremium', label: 'Experience', value: '5+ Years' },
      { iconName: 'RocketLaunch', label: 'Projects', value: '25+ Completed' },
      { iconName: 'Terminal', label: 'Back-end', value: '.NET / C#' },
      { iconName: 'Code', label: 'Front-end', value: 'React / Preact' },
    ],
    images: [
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
      'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format',
    ],
  },
  experiences: [
    {
      company: 'Full Stack Developer (Freelance)',
      logo: 'https://cdn-icons-png.flaticon.com/512/1063/1063376.png',
      location: 'Remote',
      roles: [
        {
          title: 'Senior Full Stack Engineer',
          period: '2023 - Present',
          description: [
            'Lead architect for .NET & React applications.',
            'Implemented microservices reducing downtime by 40%.',
          ],
          techStack: ['.NET 8', 'React', 'Azure'],
          certifications: ['Azure Architect'],
        },
        {
          title: 'Full Stack Developer',
          period: '2021 - 2022',
          description: ['Optimized SQL queries (30% speedup).', 'Integrated payment gateways.'],
          techStack: ['React', 'Node.js', 'SQL'],
        },
      ],
    },
    {
      company: 'Software Solutions Inc.',
      logo: 'https://logo.clearbit.com/microsoft.com',
      location: 'Bengaluru',
      roles: [
        {
          title: 'Junior Developer',
          period: '2020 - 2021',
          description: [
            'Contributed to high-traffic e-commerce platform.',
            'Fixed critical bugs and added features.',
          ],
          techStack: ['C#', 'ASP.NET', 'JS'],
          certifications: ['MTA Fundamentals'],
        },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Enterprise',
      description:
        'A full-scale e-commerce solution built with .NET Core and React. It features a robust microservices architecture, real-time inventory management, and integrated payment gateways.',
      images: [
        'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556742049-04ffbd36b57b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      ],
      techStack: ['.NET Core 8', 'React', 'PostgreSQL', 'Redis', 'Azure'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
    },
    {
      id: 2,
      title: 'AI Analytics Dashboard',
      description:
        'An advanced data visualization platform that leverages machine learning to provide predictive insights for business operations.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      ],
      techStack: ['Python', 'FastAPI', 'React', 'D3.js', 'Docker'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
    },
    {
      id: 3,
      title: 'Modern Portfolio Pro',
      description:
        'A high-performance portfolio template designed for developers. Features glassmorphism UI, smooth GSAP animations, and a responsive design.',
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      ],
      techStack: ['React', 'Material UI', 'GSAP', 'Vite', 'Framer Motion'],
      githubLink: 'https://github.com',
      liveLink: 'https://example.com',
    },
  ],
  skills: [
    {
      title: 'Languages',
      iconName: 'Terminal',
      skills: [
        { name: 'C#', icon: 'cs' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'TypeScript', icon: 'ts' },
        { name: 'SQL', icon: 'mysql' },
        { name: 'HTML', icon: 'html' },
        { name: 'CSS', icon: 'css' },
      ],
      color: '#4CAF50',
    },
    {
      title: 'Backend',
      iconName: 'Dns',
      skills: [
        { name: '.NET Core', icon: 'dotnet' },
        { name: 'ASP.NET', icon: 'dotnet' },
        { name: 'Entity Framework', icon: 'dotnet' },
        { name: 'Microservices', icon: 'kubernetes' },
        { name: 'LINQ', icon: 'cs' },
      ],
      color: '#9C27B0',
    },
    {
      title: 'Frontend',
      iconName: 'Web',
      skills: [
        { name: 'React', icon: 'react' },
        { name: 'Preact', icon: 'react' },
        { name: 'GSAP', icon: 'js' },
        { name: 'Material UI', icon: 'materialui' },
        { name: 'Vite', icon: 'vite' },
      ],
      color: '#00E5FF',
    },
    {
      title: 'Database',
      iconName: 'Storage',
      skills: [
        { name: 'SQL Server', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgres' },
        { name: 'Redis', icon: 'redis' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'NoSQL', icon: 'mongodb' },
      ],
      color: '#FF9800',
    },
    {
      title: 'Tools',
      iconName: 'Build',
      skills: [
        { name: 'Postman', icon: 'postman' },
        { name: 'Git', icon: 'git' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Azure', icon: 'azure' },
        { name: 'Jenkins', icon: 'jenkins' },
      ],
      color: '#F44336',
    },
    {
      title: 'Design',
      iconName: 'Brush',
      skills: [
        { name: 'Figma', icon: 'figma' },
        { name: 'Adobe AI', icon: 'ai' },
        { name: 'UI/UX', icon: 'figma' },
        { name: 'Responsive', icon: 'html' },
        { name: 'Prototyping', icon: 'figma' },
      ],
      color: '#E91E63',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Seed Function                                                       */
/* ------------------------------------------------------------------ */
export async function seedDatabase() {
  try {
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      console.log('🌱 Seeding default portfolio dataset...');
      await Portfolio.create(DEFAULT_PORTFOLIO);
      console.log('✅ Portfolio seeding complete!');
    }

    const visitorCount = await Visitor.countDocuments();
    if (visitorCount === 0) {
      console.log('🌱 Seeding initial visitor statistics...');
      const today = new Date();
      const mockHistory = [];
      const baseHits = [142, 168, 155, 190, 210, 245, 274];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
        mockHistory.push({
          date: dayLabel,
          visitors: baseHits[6 - i] + Math.floor(Math.random() * 20),
        });
      }
      await Visitor.create({ totalCount: 1384, history: mockHistory });
      console.log('✅ Visitor seeding complete!');
    }
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  }
}

export { DEFAULT_PORTFOLIO };

import type { PortfolioContent } from '../types';

export const content: PortfolioContent = {
  aboutMe: {
    OS: 'Debian, Windows, Windows Server',
    name: 'noQuli',
    languages: ['English - B2', 'Polish - C1', 'Russian - Native'],
    experience: "3 years",
    title: 'DevOps',
    bio: `I have experience in Linux system administration, containerization with Docker, building CI/CD pipelines,
and a strong understanding of networking. I am highly comfortable working in terminal environments, for a long time, 
I have been writing Python and TypeScript code integrated with DevOps practices and configuring deployment automation tools. 
On a daily basis, I work within Linux systems to manage and optimize environments.`,
    location: 'Bialystok, Poland',
    interests: [
      'IT Administration',
      'Automation',
      'Cybersecurity',
      'Open Source',
      'Python',
      'Selenium'
    ],
  },

  projects: [
    {
      name: 'CLI Portfolio',
      description: 'An interactive terminal-themed portfolio website built with React and TypeScript.',
      github: 'https://github.com/noQuli/cli-portfolio',
      featured: true,
    },
    {
      name: 'Perplexity CLI',
      description: 'Interactive CLI for perplexity',
      github: 'https://github.com/noQuli/perplexity-cli',
      featured: true,
    },
    {
      name: 'Pracuj.pl auto job applier',
      description: 'Auto job appplier for pracuj.pl',
      github: 'https://github.com/noQuli/pracuj.pl_auto_job_applier',
      featured: false,
    },
    {
      name: 'Youtube feed',
      description: 'Feed Purifier automates YouTube Home feed cleanup with Zendriver ',
      github: 'https://github.com/noQuli/youtube-feed',
      featured: true,
    },
    {
      name: 'Vetty',
      description: 'Security sandbox that runs untrusted code inside Firecracker micro-VMs while monitoring all syscalls, file access, network activity, and HTTP traffic in real time',
      github: 'https://github.com/noQuli/vetty',
      featured: false,
    },
  ],

  experience: [
    { 
  company: 'Freelance/Github projects',
  role: 'DevOps/Software Enginneer',
  period: '2 years',
  description: 'Developed and deployed automation tools, AI integrations, and cloud infrastructure for commercial clients and open-source projects.',
  highlights: [
    'Configured commercial VPS servers across AWS, GCP, and Azure, and automated deployment pipelines using GitHub Actions and GitLab CI/CD.',
    'Designed and implemented AI Agents and LLM integrations utilizing LangChain, OpenAI, Claude, and Gemini.',
    'Built advanced web scraping solutions and workflow automations using Python, Selenium, Playwright, and n8n.',
  ],
}
    // {
    //   company: 'Digital Agency Co.',
    //   role: 'Full Stack Developer',
    //   period: '2020 - 2022',
    //   description: 'Built custom web applications for enterprise clients.',
    //   highlights: [
    //     'Delivered 15+ client projects on time and within budget',
    //     'Introduced automated testing increasing code coverage to 85%',
    //     'Optimized database queries improving page load times by 50%',
    //   ],
    // },
    // {
    //   company: 'Freelance',
    //   role: 'Web Developer',
    //   period: '2018 - 2020',
    //   description: 'Self-employed developer working with small businesses and startups.',
    //   highlights: [
    //     'Built e-commerce solutions for 10+ clients',
    //     'Created custom WordPress themes and plugins',
    //     'Maintained long-term client relationships',
    //   ],
    // },
  ],

  education: [
    {
      institution: 'Technikum Elektryczne | Białystok',
      degree: 'Middle',
      field: 'IT Administrattion',
      period: '3rd grade',
    }
  ],

  skills: [
    {
      name: 'Languages',
      items: ['Python', 'TypeScript', 'Bash'],
    },
    {
      name: 'DevOps & Cloud',
      items: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI/CD', 'AWS', 'GCP', 'Azure', 'Linux'],
    },
    {
      name: 'Automation & Scraping',
      items: ['Selenium', 'Playwright', 'Zendriver', 'Scrapy', 'n8n'],
    },
    {
      name: 'Backend',
      items: ['Node.js', 'FastAPI', 'REST', 'LangChain', 'OpenAI', 'Claude', 'Gemini'],
    },
    {
      name: 'Tools',
      items: ['Git', 'Vim', 'VS Code', 'Figma', 'Postman'],
    },
    {
      name: 'Operating Systems',
      items: ['Debian', 'Windows', 'Windows Server'],
    },
  ],

  cv: {
    summary: `I specialize in business process automation (web scraping, n8n) and integrating large language models (LLMs, LangChain) into production environments. I bring hands-on experience in Linux/Windows systems administration and designing DevOps and Cloud solutions (Docker, AWS/GCP, CI/CD), blending these skills with writing efficient code in Python and TypeScript. I am actively seeking projects that offer opportunities for further growth in DevOps and AI Engineering.`,
    experience: [], // Will reference the experience array
    education: [], // Will reference the education array
    skills: [], // Will reference the skills array
  },

  contacts: {
    email: 'noquli.contact@gmail.com',
    location: 'Poland / Bialystok',
  },

  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/noQuli',
      username: '',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/noQuli',
      username: '',
    }
  ],
};

// Link CV sections to main arrays
content.cv.experience = content.experience;
content.cv.education = content.education;
content.cv.skills = content.skills;

export default content;

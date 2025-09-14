export const CVData = {
    // Personal information
    personal: {
        name: "Nihad",
        title: "Full Stack Developer",
        location: "Remote",
        email: "contact@nihad.dev",
        website: "https://nihad.dev"
    },

    // Skills data
    skills: [
        {
            name: "React",
            category: "Frontend",
            level: "Expert",
            description: "Building modern, responsive user interfaces with React and its ecosystem."
        },
        {
            name: "Next.js",
            category: "Frontend",
            level: "Advanced",
            description: "Full-stack React framework for production-grade applications."
        },
        {
            name: "Django",
            category: "Backend",
            level: "Advanced",
            description: "Python web framework for rapid development of secure applications."
        },
        {
            name: "Express.js",
            category: "Backend",
            level: "Advanced",
            description: "Node.js web application framework for APIs and web services."
        },
        {
            name: "PostgreSQL",
            category: "Database",
            level: "Intermediate",
            description: "Relational database management and query optimization."
        },
        {
            name: "AWS",
            category: "Cloud",
            level: "Intermediate",
            description: "Cloud infrastructure, deployment, and serverless solutions."
        }
    ],

    // Work experience
    experience: [
        {
            id: "current_role",
            company: "TechCorp Solutions",
            position: "Senior Full Stack Developer",
            period: "2023 - Present",
            location: "Remote",
            description: "Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices.",
            achievements: [
                "Reduced application load time by 60% through optimization",
                "Led team of 4 developers on major product launch",
                "Implemented CI/CD pipeline reducing deployment time by 80%"
            ],
            skills: ["React", "Next.js", "Express.js", "AWS", "PostgreSQL"]
        },
        {
            id: "previous_role",
            company: "StartupXYZ",
            position: "Full Stack Developer",
            period: "2021 - 2023",
            location: "San Francisco, CA",
            description: "Developed MVP and scaled platform to handle 10k+ daily active users. Built both frontend and backend systems from scratch.",
            achievements: [
                "Built complete e-commerce platform in 6 months",
                "Integrated payment systems and third-party APIs",
                "Implemented real-time features using WebSockets"
            ],
            skills: ["Django", "React", "PostgreSQL", "Docker"]
        }
    ],

    // Projects
    projects: [
        {
            id: "cv_game",
            name: "Interactive CV Game",
            description: "A gamified portfolio website built with Phaser 3, featuring Undertale-inspired gameplay mechanics.",
            technologies: ["Phaser 3", "JavaScript", "Vite", "Canvas API"],
            status: "In Development",
            highlights: [
                "Responsive design for mobile and desktop",
                "Custom pathfinding and dialogue system",
                "Modular architecture for easy content updates"
            ]
        },
        {
            id: "task_manager",
            name: "Collaborative Task Manager",
            description: "Real-time project management tool with team collaboration features.",
            technologies: ["React", "Express.js", "Socket.io", "MongoDB"],
            status: "Completed",
            highlights: [
                "Real-time updates across team members",
                "Drag-and-drop kanban interface",
                "Advanced filtering and search capabilities"
            ]
        }
    ],

    // NPC data for the game
    getNPCs() {
        return [
            {
                id: 'experience_npc',
                name: 'Career Guide',
                sprite: 'npc',
                dialogue: `Welcome to my professional journey! I've been coding for over 3 years, working with companies from startups to enterprises. 
                
I specialize in full-stack development, building scalable web applications that serve thousands of users daily. 

My current role at TechCorp has me leading development teams and optimizing performance - we recently achieved a 60% reduction in load times!

Want to know more about my specific experiences?`,
                skill: 'Career Experience',
                quest: 'Meet the Career Guide',
                area: 'experience'
            },
            {
                id: 'skills_npc',
                name: 'Tech Mentor',
                sprite: 'npc',
                dialogue: `Ah, you want to know about my technical skills! I'm passionate about modern web development.

My frontend expertise includes React and Next.js - I love creating responsive, interactive user interfaces that users enjoy.

On the backend, I work with Django and Express.js to build robust APIs and server-side applications.

I'm also experienced with cloud platforms like AWS and database design with PostgreSQL.

Each project teaches me something new!`,
                skill: 'React',
                quest: 'Learn About Technical Skills',
                area: 'skills'
            },
            {
                id: 'projects_npc',
                name: 'Project Showcase',
                sprite: 'npc',
                dialogue: `Let me tell you about some exciting projects I've built!

This very game you're playing is one of them - an interactive CV built with Phaser 3! It features custom pathfinding, dialogue systems, and responsive design.

I've also created a collaborative task manager with real-time updates, drag-and-drop interfaces, and team collaboration features.

Every project is an opportunity to solve interesting problems and learn new technologies.

Which type of project interests you most?`,
                skill: 'Project Management',
                quest: 'Explore Project Portfolio',
                area: 'projects'
            },
            {
                id: 'contact_npc',
                name: 'Networking Hub',
                sprite: 'npc',
                dialogue: `Ready to connect and discuss potential opportunities?

You can reach me at contact@nihad.dev for any inquiries about collaboration, job opportunities, or just to chat about technology!

I'm always open to interesting conversations about web development, game development, or innovative project ideas.

I'm also active on professional networks and love contributing to the developer community.

Looking forward to hearing from you!`,
                skill: 'Communication',
                quest: 'Make Professional Contact',
                area: 'contact'
            },
            {
                id: 'achievements_npc',
                name: 'Achievement Keeper',
                sprite: 'npc',
                dialogue: `Here are some of my proudest professional achievements:

🚀 Led a team of 4 developers to successfully launch a major product feature
⚡ Optimized application performance, reducing load times by 60%
🔄 Implemented CI/CD pipeline that cut deployment time by 80%
📈 Scaled platform to handle 10,000+ daily active users
💰 Built complete e-commerce platform in just 6 months

Each achievement represents learning, growth, and the impact of good engineering practices!`,
                skill: 'Leadership',
                quest: 'Discover Key Achievements',
                area: 'achievements'
            }
        ];
    },

    // Quest system data
    getQuests() {
        return [
            {
                id: 'explore_cv',
                title: 'Explore the CV World',
                description: 'Meet all the NPCs and learn about different aspects of my professional journey.',
                requirements: ['Meet the Career Guide', 'Learn About Technical Skills', 'Explore Project Portfolio', 'Make Professional Contact'],
                reward: 'Complete Professional Overview',
                status: 'active'
            },
            {
                id: 'collect_skills',
                title: 'Skill Collector',
                description: 'Collect all available skills by talking to NPCs.',
                requirements: ['React', 'Project Management', 'Communication', 'Leadership', 'Career Experience'],
                reward: 'Master of All Trades',
                status: 'active'
            }
        ];
    },

    // Get skill by name
    getSkill(name) {
        return this.skills.find(skill => skill.name === name);
    },

    // Get experience by id
    getExperience(id) {
        return this.experience.find(exp => exp.id === id);
    },

    // Get project by id
    getProject(id) {
        return this.projects.find(project => project.id === id);
    }
};

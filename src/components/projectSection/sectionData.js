import electionImg from "../../assets/projects/election-app.png";
import learningAssistantImg from "../../assets/projects/learning-assistant.png";
import beanClassificationImg from "../../assets/projects/bean-classification.png";

const projects = [
  {
    id: 0,
    num: "01",
    name: "Portfolio Website",
    category: "Frontend",
    description:
      "A personal portfolio website designed to showcase my skills, projects, and professional experience. It features smooth animations, responsive design, and a modern UI/UX experience.",
    stack: [
      { name: "React.js" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
    links: { live: "#", github: "#" },
    image: "#",
  },
  {
    id: 1,
    num: "02",
    name: "AI Learning Assistant",
    category: "AI / Backend",
    description:
      "Developed an AI learning assistant with document upload, semantic routing, YouTube video summarization, and chat history. Integrated Retrieval-Augmented Generation (RAG) using LangChain, Groq LLM, and Streamlit.",
    stack: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "Streamlit" },
      { name: "Groq LLM API" },
    ],
    links: {
      live: "#",
      github:
        "https://github.com/DejusDevspace/Personal-Leaning-Assistant-Q-A-Conversational-Chatbot",
    },
    image: learningAssistantImg,
  },
  {
    id: 2,
    num: "03",
    name: "Beans Disease Classifier",
    category: "Deep Learning",
    description:
      "Built an image classification system for identifying beans plant diseases using Vanilla CNN and Transfer Learning techiques. Used pretrained VGG16 for feature extraction and trained an SVM for accurate classification of leaf diseases.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "Numpy" },
    ],
    links: {
      live: "#",
      github: "https://github.com/DejusDevspace/bean-disease-classification",
    },
    image: beanClassificationImg,
  },
  {
    id: 3,
    num: "04",
    name: "Election Web App",
    category: "Full Stack",
    description:
      "Built a simple and secure election platform for student voting in my college. Enabled students to vote online with an intuitive UI which included live voting poll, and backend validation to ensure election integrity.",
    stack: [
      { name: "Python" },
      { name: "Flask" },
      { name: "JavaScript" },
      { name: "Supabase" },
      { name: "Vercel" },
    ],
    links: {
      live: "https://baes-senate-election.vercel.app/",
      github: "https://github.com/DejusDevspace/baes-senate-election",
    },
    image: electionImg,
  },
  {
    id: 4,
    num: "05",
    name: "CV Summarizer App",
    category: "Generative AI",
    description:
      "Created an application that takes a CV document and generates a concise summary using LLMs. Utilized RAG pipeline and Streamlit UI for easy interaction.",
    stack: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "Streamlit" },
      { name: "LLM (Google Gemini)" },
    ],
    links: {
      live: "#",
      github: "https://github.com/DejusDevspace/CV-upload-CV-summarize-RAG-app",
    },
    image: "../../assets/projects/election-app.png",
  },
];

export { projects };

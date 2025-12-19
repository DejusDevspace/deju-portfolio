// Learning assistant project
import learningAssistantStreamlit from "../../assets/projects/learning-assistant/learning-assistant.png";
import learningAssistantLangSmith1 from "../../assets/projects/learning-assistant/langsmith1.png";
import learningAssistantLangSmith2 from "../../assets/projects/learning-assistant/langsmith2.png";
// Beans classification project
import beanClassificationImg from "../../assets/projects/bean-classification/bean-classification.png";
import beanTrainingCurves from "../../assets/projects/bean-classification/training-curves.png";
import beanConfusionMatrix from "../../assets/projects/bean-classification/confusion-matrix.png";
// BAES elections website
import electionLandingPg from "../../assets/projects/baeselections/election-app.png";
import electionLoginPg from "../../assets/projects/baeselections/login.png";
import electionVoting from "../../assets/projects/baeselections/voting.png";
import electionLivePoll from "../../assets/projects/baeselections/live-poll.png";
import electionEnd from "../../assets/projects/baeselections/election-end.png";
// FPL Gaffer project
import gafferDashboard from "../../assets/projects/fpl-gaffer/gaffer-dashboard.png";
import gafferChat from "../../assets/projects/fpl-gaffer/gaffer-chat.png";
import gafferWhatsapp1 from "../../assets/projects/fpl-gaffer/gaffer-whatsapp1.jpeg";
import gafferWhatsapp2 from "../../assets/projects/fpl-gaffer/gaffer-whatsapp2.jpeg";

const projects = [
  {
    id: 0,
    name: "FPL Gaffer",
    category: "Generative AI | Agentic AI | Full Stack",
    description:
      "FPL Gaffer is an intelligent agentic AI system designed to assist Fantasy Premier League (FPL) managers with informed decision-making. Built using LangGraph, it combines real-time data retrieval, intelligent tool orchestration, and response validation to provide accurate, hallucination-free advice for your FPL team.",
    stack: [
      { name: "Python" },
      { name: "LangGraph" },
      { name: "LangChain" },
      { name: "FastAPI" },
      { name: "Groq" },
      { name: "Twilio" },
    ],
    links: {
      live: "#",
      github: "https://github.com/DejusDevspace/fpl-gaffer",
    },
    image: gafferDashboard,
    docImages: [gafferWhatsapp1, gafferChat, gafferWhatsapp2, gafferDashboard],
  },
  {
    id: 1,
    name: "AI Learning Assistant",
    category: "AI | Backend",
    description:
      "Developed an AI learning assistant with document upload, semantic routing, YouTube video summarization, and chat history. Integrated Retrieval-Augmented Generation (RAG) using LangChain, Groq LLM, and Streamlit.",
    stack: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "LangSmith" },
      { name: "Streamlit" },
      { name: "Groq LLM API" },
    ],
    links: {
      live: "#",
      github:
        "https://github.com/DejusDevspace/Personal-Leaning-Assistant-Q-A-Conversational-Chatbot",
    },
    image: learningAssistantStreamlit,
    docImages: [
      learningAssistantStreamlit,
      learningAssistantLangSmith1,
      learningAssistantLangSmith2,
    ],
  },
  {
    id: 2,
    name: "Beans Disease Classifier",
    category: "Deep Learning",
    description:
      "Built an image classification system for identifying beans plant diseases using Vanilla CNN and Transfer Learning techiques. Used pretrained VGG16 for feature extraction and trained an SVM for accurate classification of leaf diseases.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "Flask" },
      { name: "Numpy" },
    ],
    links: {
      live: "#",
      github: "https://github.com/DejusDevspace/bean-disease-classification",
    },
    image: beanClassificationImg,
    docImages: [beanClassificationImg, beanTrainingCurves, beanConfusionMatrix],
  },
  {
    id: 3,
    name: "BAES Election Website",
    category: "Full Stack",
    description:
      "Built a web application for the 2025/2026 executives election process across the engineering departments in BAES (Bowen Association of Engineering Students). Created a simple UI and provided a live poll for voting results. Secure authentication for a free and fair election process.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Render" },
    ],
    links: {
      live: "https://baeselections.vercel.app/",
      github: "https://github.com/DejusDevspace/baes-election-website",
    },
    image: electionLandingPg,
    docImages: [
      electionLandingPg,
      electionLoginPg,
      electionLivePoll,
      electionVoting,
      electionEnd,
    ],
  },
  // {
  //   id: 2,
  //   num: "03",
  //   name: "BAES Senate Elections",
  //   category: "Full Stack",
  //   description:
  //     "Built a simple and secure election platform for student voting in my college. Enabled students to vote online with an intuitive UI which included live voting poll, and backend validation to ensure election integrity.",
  //   stack: [
  //     { name: "Python" },
  //     { name: "Flask" },
  //     { name: "JavaScript" },
  //     { name: "Supabase" },
  //     { name: "Vercel" },
  //   ],
  //   links: {
  //     live: "https://baes-senate-election.vercel.app/",
  //     github: "https://github.com/DejusDevspace/baes-senate-election",
  //   },
  //   image: electionLandingPg,
  // },
  {
    id: 4,
    name: "CV Summarizer RAG App",
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
    image: learningAssistantStreamlit,
  },
];

export { projects };

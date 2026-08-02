import type { Project } from "@/types";

export const projects: Project[] = [
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
		image: "/images/projects/fpl-gaffer/gaffer-dashboard.png",
		docImages: [
			"/images/projects/fpl-gaffer/gaffer-whatsapp1.jpeg",
			"/images/projects/fpl-gaffer/gaffer-chat.png",
			"/images/projects/fpl-gaffer/gaffer-whatsapp2.jpeg",
			"/images/projects/fpl-gaffer/gaffer-dashboard.png",
		],
	},
	{
		id: 1,
		name: "Ledga",
		category: "Full Stack",
		description:
			"Ledga is a modern, brutalist-style finance tracker that uses Google Sheets as its primary database and Supabase for secure authentication. It provides real-time insights into your spending, savings, and income directly extracted from your spreadsheet data.",
		stack: [
			{ name: "Next.js" },
			{ name: "Google Cloud Console" },
			{ name: "Google Sheets API" },
			{ name: "Supabase" },
		],
		links: {
			live: "https://ledga.vercel.app",
			github: "https://github.com/DejusDevspace/ledga",
		},
		image: "/images/projects/ledga/ledga-login.png",
		docImages: [
			"/images/projects/ledga/ledga-login.png",
			"/images/projects/ledga/ledga-guide1.png",
			"/images/projects/ledga/ledga-guide4.png",
			"/images/projects/ledga/ledga-guide5.png",
			"/images/projects/ledga/ledga-guide6.png",
			"/images/projects/ledga/ledga-settings.png",
		],
	},
	{
		id: 2,
		name: "Mindease AI",
		category: "AI | Backend",
		description:
			"MindEase AI Integration is an empathetic AI companion backend built to support students with academic stress and emotional well-being, serving as the chatbot engine for the MindEase platform. Developed with FastAPI and Groq's Llama 3.3 70B model, it delivers multi-turn conversations via a REST API with SQLite-persisted conversation history, conversation management endpoints, configurable model parameters, and production-ready Docker deployment with health checks.",
		stack: [
			{ name: "Python" },
			{ name: "FastAPI" },
			{ name: "Groq API" },
			{ name: "Docker" },
			{ name: "Chainlit" },
			{ name: "SQLite" },
			{ name: "Render" },
		],
		links: {
			live: "https://mindeaseproject.vercel.app/",
			github: "https://github.com/DejusDevspace/MindEase-AI-Integration",
		},
		image: "/images/projects/mindease/mindease-chatbot-typing.png",
		docImages: [
			"/images/projects/mindease/mindease-chatbot-typing.png",
			"/images/projects/mindease/mindease-landing.png",
			"/images/projects/mindease/mindease-time-mgmt.png",
			"/images/projects/mindease/mindease-features.png",
			"/images/projects/mindease/mindease-sleep.png",
		],
	},
	{
		id: 3,
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
		image: "/images/projects/learning-assistant/learning-assistant.png",
		docImages: [
			"/images/projects/learning-assistant/learning-assistant.png",
			"/images/projects/learning-assistant/langsmith1.png",
			"/images/projects/learning-assistant/langsmith2.png",
		],
	},
	{
		id: 4,
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
		image: "/images/projects/baeselections/election-app.png",
		docImages: [
			"/images/projects/baeselections/election-app.png",
			"/images/projects/baeselections/login.png",
			"/images/projects/baeselections/live-poll.png",
			"/images/projects/baeselections/voting.png",
			"/images/projects/baeselections/election-end.png",
		],
	},
	{
		id: 5,
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
		image: "/images/projects/learning-assistant/learning-assistant.png",
	},
];

// Brain Tumor MRI Classifier
import mriScanImg from "../../assets/projects/brain-tumor/mri-scan.png";
import beanTrainingCurves from "../../assets/projects/bean-classification/training-curves.png";
import beanConfusionMatrix from "../../assets/projects/bean-classification/confusion-matrix.png";

// CineMatch API
import cineMatchImg from "../../assets/projects/cinematch/cinematch.png";
import gafferDashboard from "../../assets/projects/fpl-gaffer/gaffer-dashboard.png";

// Legal Doc Analyzer
import legalDocImg from "../../assets/projects/legal-doc/legal-doc.png";

// Bank Churn
import bankChurnImg from "../../assets/projects/bank-churn/churn-dashboard.png";

// Credit Card Fraud
import creditCardFraudImg from "../../assets/projects/credit-card-fraud/fraud-detection.png";

const projects = [
  {
    id: 0,
    name: "Brain Tumor MRI Classifier",
    category: "Deep Learning",
    description:
      "End-to-end deep learning project classifying brain tumor types (Glioma, Meningioma, Pituitary, No Tumor) from MRI scans using Transfer Learning (EfficientNetB0). Deployed as an interactive Streamlit web app.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "Streamlit" },
      { name: "EfficientNetB0" },
      { name: "NumPy" },
    ],
    links: {
      live: "https://mri-scan.streamlit.app/",
      github: "https://github.com/Jaykay73/MRI-Scan",
    },
    image: mriScanImg,
    docImages: [mriScanImg, beanTrainingCurves, beanConfusionMatrix],
  },
  {
    id: 1,
    name: "CineMatch API",
    category: "AI | Recommendation System",
    description:
      "Intelligent, content-based movie recommendation engine powered by semantic search (MiniLM-L6-v2) and vector embeddings (FAISS). This system constantly learns and recommends new movies by automatically pulling data from TMDB. Features vibe-based and personalized recommendations via a FastAPI backend.",
    stack: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "FAISS" },
      { name: "SentenceTransformers" },
      { name: "Pandas" },
    ],
    links: {
      live: "https://aether-match.vercel.app",
      github: "https://github.com/Jaykay73/CineMatch",
    },
    image: cineMatchImg,
    docImages: [cineMatchImg],
  },
  {
    id: 2,
    name: "Legal Document Analyzer",
    category: "NLP | RAG",
    description:
      "Interactive Streamlit app for analyzing contracts. Uses NLP embeddings (SentenceTransformers) to extract clauses and perform semantic search. Features PDF text extraction and cosine similarity ranking.",
    stack: [
      { name: "Python" },
      { name: "Streamlit" },
      { name: "SentenceTransformers" },
      { name: "PyPDF" },
      { name: "Pandas" },
    ],
    links: {
      live: "#",
      github: "https://github.com/Jaykay73/Legal-Document-Analyser",
    },
    image: legalDocImg,
    docImages: [legalDocImg],
  },
  {
    id: 3,
    name: "Bank Customer Churn Prediction",
    category: "Machine Learning | Web App",
    description:
      "A Streamlit web application that predicts whether a bank customer will churn using a trained machine learning model (Gradient Boosting). Features interactive UI, hyperparameter tuning, and feature scaling.",
    stack: [
      { name: "Python" },
      { name: "Streamlit" },
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "Gradient Boosting" },
    ],
    links: {
      live: "https://jaykay-bank-churn.streamlit.app/",
      github: "https://github.com/Jaykay73/Bank-Customer-Churn-Prediction",
    },
    image: bankChurnImg,
    docImages: [bankChurnImg],
  },
  {
    id: 4,
    name: "Credit Card Fraud Detection",
    category: "Machine Learning | Anomaly Detection",
    description:
      "Detects fraudulent transactions using unsupervised anomaly detection (Isolation Forest, Autoencoders) on highly imbalanced data. Features dimensionality reduction (PCA, t-SNE) for visualization.",
    stack: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "Pandas" },
      { name: "Matplotlib" },
    ],
    links: {
      live: "#",
      github: "https://github.com/jaykay73/credit-card-fraud-detection",
    },
    image: creditCardFraudImg,
    docImages: [creditCardFraudImg],
  },
];

export { projects };

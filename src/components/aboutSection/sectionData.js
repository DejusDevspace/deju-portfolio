import {
  FaPython,
  FaReact,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaLinux,
  FaRaspberryPi,
  FaAws,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiPytorch,
  SiFlask,
  SiTailwindcss,
  SiFastapi,
  SiPandas,

  SiScikitlearn,
  SiPostgresql,
  SiJupyter,
  SiGooglecloud,
  SiJavascript,
  SiArduino,
  SiCplusplusbuilder,
  SiDart,
  SiFlutter,
  SiHuggingface,
  SiOpencv,
  SiKeras,
  SiNumpy,
  SiKubernetes,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const tools = [
  // Languages
  { name: "Python", icon: FaPython },
  { name: "C++", icon: SiCplusplusbuilder },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Dart", icon: SiDart },

  // Web & Mobile
  { name: "React", icon: FaReact },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Flutter", icon: SiFlutter },

  // ML & AI
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "OpenCV", icon: SiOpencv },
  { name: "PyTorch", icon: SiPytorch },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Keras", icon: SiKeras },
  { name: "Scikit-learn", icon: SiScikitlearn },

  // Data Science
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
  // { name: "Matplotlib", icon: SiMatplotlib }, // Icon might not exist in all packs, checking imports later
  { name: "Jupyter", icon: SiJupyter },
  { name: "SQL", icon: SiPostgresql }, // Using Postgres icon for SQL generic if specific not found

  // DevOps & Hardware
  { name: "Docker", icon: FaDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "AWS", icon: FaAws },
  { name: "GCP", icon: SiGooglecloud },
  { name: "Linux", icon: FaLinux },
  { name: "Git", icon: FaGitAlt },
  { name: "Raspberry Pi", icon: FaRaspberryPi },
  { name: "Arduino", icon: SiArduino },
];

export { tools };

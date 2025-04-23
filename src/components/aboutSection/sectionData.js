import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiLangchain,
  SiPytorch,
  SiFlask,
  SiTailwindcss,
  SiFastapi,
  SiPandas,
  SiScikitlearn,
  SiStreamlit,
  SiPostgresql,
  SiJupyter,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const tools = [
  { name: "Python", icon: FaPython },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "LangChain", icon: SiLangchain },
  { name: "Docker", icon: FaDocker },
  { name: "Linux", icon: FaLinux },
  { name: "Azure", icon: VscAzure },
  { name: "Git", icon: FaGitAlt },
  { name: "React", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "GitHub", icon: FaGithub },
  { name: "Flask", icon: SiFlask },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Pandas", icon: SiPandas },
  { name: "Streamlit", icon: SiStreamlit },
  { name: "Jupyter", icon: SiJupyter },
];

export { tools };

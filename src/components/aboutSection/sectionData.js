import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaLinux,
  FaRaspberryPi,
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
  SiGooglecloud,
  SiSupabase,
  SiTypescript,
  SiJavascript,
  SiArduino,
  SiCplusplusbuilder,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const tools = [
  { name: "Python", icon: FaPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "C++", icon: SiCplusplusbuilder },

  { name: "PyTorch", icon: SiPytorch },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Scikit-learn", icon: SiScikitlearn },

  { name: "Azure", icon: VscAzure },
  { name: "LangChain", icon: SiLangchain },
  { name: "GCP", icon: SiGooglecloud },

  { name: "Node.js", icon: FaNodeJs },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Supabase", icon: SiSupabase },

  // { name: "JavaScript", icon: SiJavascript },

  { name: "Git", icon: FaGitAlt },
  { name: "Docker", icon: FaDocker },
  { name: "Linux", icon: FaLinux },

  { name: "Arduino", icon: SiArduino },
  { name: "RaspberryPi", icon: FaRaspberryPi },
  { name: "React.js", icon: FaReact },

  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "GitHub", icon: FaGithub },
  { name: "Flask", icon: SiFlask },
  // { name: "TailwindCSS", icon: SiTailwindcss },
  // { name: "Pandas", icon: SiPandas },
  // { name: "Streamlit", icon: SiStreamlit },
  // { name: "Jupyter", icon: SiJupyter },
];

export { tools };

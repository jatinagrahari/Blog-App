import { Link } from "react-router-dom";
import {
  PenSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  BookOpen,
  Database,
  Image as ImageIcon,
  FileText,
  UserPlus,
  Upload,
  Globe,
  Code2,
  Blocks,
  Feather,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <PenSquare className="w-8 h-8 text-green-600" />,
      title: "Rich Editor",
      desc: "Create beautiful articles with TinyMCE, formatting, images and code blocks.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Secure Storage",
      desc: "Authentication, database and cloud storage powered by Appwrite.",
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Fast Experience",
      desc: "Built using React, Redux Toolkit and Tailwind CSS for a smooth UI.",
    },
  ];

  const tech = [
    "React",
    "Redux Toolkit",
    "React Router",
    "React Hook Form",
    "Tailwind CSS",
    "TinyMCE",
    "Appwrite",
    "JavaScript",
  ];

  const platform = [
    { icon: <UserPlus size={20} />, title: "Authentication" },
    { icon: <FileText size={20} />, title: "Create & Edit Posts" },
    { icon: <ImageIcon size={20} />, title: "Image Uploads" },
    { icon: <Database size={20} />, title: "Cloud Database" },
    { icon: <BookOpen size={20} />, title: "Read Articles" },
    { icon: <Globe size={20} />, title: "Responsive Design" },
  ];

  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          About BlogApp
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
          A Place Where
          <span className="block text-green-600">Ideas Become Stories.</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-slate-600 text-lg">
          BlogApp is a modern blogging platform where writers can publish,
          manage and share articles using a clean writing experience and a
          production-ready full-stack architecture.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/all-posts"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Explore Articles
          </Link>

          <Link
            to="/add-post"
            className="border px-6 py-3 rounded-xl hover:bg-slate-100"
          >
            Write Your First Post
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">Our Mission</h2>
        </div>

        <div className="text-slate-600 leading-8">
          We believe publishing knowledge should be simple. Whether you're
          documenting your learning journey, writing tutorials or sharing
          technical insights, BlogApp gives you everything needed to focus on
          writing instead of managing complex tools.
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-center text-4xl font-bold">
          What Makes BlogApp Different?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((item) => (
            <div
              key={item.title}
              className="border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="font-bold text-xl mt-5">{item.title}</h3>
              <p className="text-slate-600 mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold">How It Works</h2>

          <div className="grid md:grid-cols-5 gap-6 mt-14 text-center">
            {[
              ["Create", <UserPlus />],
              ["Write", <Feather />],
              ["Upload", <Upload />],
              ["Publish", <BookOpen />],
              ["Share", <Globe />],
            ].map(([label, icon], i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex justify-center text-green-600">{icon}</div>
                <p className="mt-4 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-center text-4xl font-bold">Technology Stack</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {tech.map((item) => (
            <div
              key={item}
              className="border rounded-xl p-6 text-center hover:border-green-600 transition"
            >
              <Code2 className="mx-auto text-green-600" />
              <h3 className="mt-4 font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold">Why This Project?</h2>
            <p className="mt-6 text-slate-600 leading-8">
              This application was built to understand real-world frontend
              architecture. It combines authentication, protected routes,
              database operations, cloud storage, state management and rich text
              editing into one production-style project.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {platform.map((item) => (
              <div key={item.title} className="bg-white rounded-xl border p-5">
                <div className="text-green-600">{item.icon}</div>
                <p className="mt-3 font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-green-600 rounded-3xl p-14 text-center text-white">
          <h2 className="text-5xl font-bold">Ready to Share Your Story?</h2>

          <p className="mt-5 max-w-2xl mx-auto text-green-100">
            Start writing today and publish articles that inspire, educate and
            help others learn something new.
          </p>

          <Link
            to="/add-post"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-7 py-3 rounded-xl mt-10 font-semibold"
          >
            Create Your First Post
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

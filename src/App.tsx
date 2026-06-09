import { FileText, Swords } from "lucide-react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Workspace from "@/pages/Workspace";

const navItems = [
  { to: "/", label: "试卷", icon: FileText },
  { to: "/workspace", label: "成绩单", icon: Swords },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-4 md:px-6">
          <header className="sticky top-4 z-20 mb-6 rounded-[24px] border border-stone-200 bg-white/95 px-5 py-4 backdrop-blur">
            <div className="flex justify-end">
              <nav className="flex flex-wrap gap-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                        isActive
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 text-stone-700 hover:bg-stone-100"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <main className="pb-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workspace" element={<Workspace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

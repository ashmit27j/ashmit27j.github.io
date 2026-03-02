import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = ["Projects", "Experience", "About Me"];

const Header = ({ onNavigate }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background"
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <button
            onClick={() => handleNavigate("hero")}
            className="text-2xl font-bold tracking-tighter text-foreground hover:opacity-70 transition-opacity"
          >
            Aj
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item.toLowerCase().replace(" ", "-"))}
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("contact")}
              className="text-sm uppercase tracking-widest brutalist-border px-4 py-2 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Contact me
            </button>
          </nav>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item.toLowerCase().replace(" ", "-"))}
                className="text-2xl uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavigate("contact")}
              className="text-2xl uppercase tracking-widest brutalist-border px-6 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Contact me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

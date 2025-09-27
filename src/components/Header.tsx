import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, TrendingUp, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-info to-secondary group-hover:shadow-glow transition-all duration-300">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FinLearn
              </h1>
              <p className="text-xs text-muted-foreground">Demo Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Dashboard
              </Button>
            </Link>
            <Link to="/instruments">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Instrumente
              </Button>
            </Link>
            
            <Link to="/quiz">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Quiz
              </Button>
            </Link>
            <Link to="/glossary">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Glossar
              </Button>
            </Link>
            <Link to="/calculator">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Rechner
              </Button>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="hidden sm:flex h-9 w-9 p-0">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="md:hidden h-9 w-9 p-0">
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-1 py-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
              <Link to="/instruments" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Instrumente
                </Button>
              </Link>
              <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Portfolio
                </Button>
              </Link>
              <Link to="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Quiz
                </Button>
              </Link>
              <Link to="/glossary" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Glossar
                </Button>
              </Link>
              <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Rechner
                </Button>
              </Link>
              <div className="px-4 pt-2">
                <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="w-full justify-start">
                  {isDarkMode ? <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </> : <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>}
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
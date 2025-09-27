import { DashboardCard } from "@/components/DashboardCard";
import { InstrumentCard } from "@/components/InstrumentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, Brain, BookOpen, Calculator, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import instrumentsData from "@/data/instruments.json";

const Index = () => {
  // Take first few instruments for preview
  const featuredInstruments = instrumentsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4" />
              Vollständig offline & datenschutzfreundlich
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Börse verstehen —{" "}
              <span className="bg-gradient-to-r from-primary via-info to-secondary bg-clip-text text-transparent">
                simulieren, üben, erklären
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Lerne die Grundlagen von Aktien, ETFs und Anleihen mit interaktiven Beispielen — 
              komplett offline und ohne Live-Daten. Perfekt für Studierende, Lehrkräfte und Finanz-Einsteiger.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio">
                <Button size="lg" className="bg-gradient-to-r from-primary to-info hover:shadow-glow transition-all duration-300">
                  <PieChart className="mr-2 h-5 w-5" />
                  Demo-Portfolio starten
                </Button>
              </Link>
              <Link to="/instruments">
                <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Instrumente entdecken
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Alles was du brauchst zum Lernen
            </h2>
            <p className="text-muted-foreground text-lg">
              Interaktive Tools und umfassende Lerninhalte für den perfekten Einstieg in die Finanzwelt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <DashboardCard
              title="Aktien verstehen"
              description="Lerne Fundamentalanalyse, KGVs und Unternehmensbewertung mit praktischen Beispielen."
              icon={TrendingUp}
              action={{
                label: "Instrumente ansehen",
                onClick: () => window.location.href = "/instruments",
                variant: "outline"
              }}
            />
            
            <DashboardCard
              title="Portfolio-Simulator"
              description="Baue virtuelle Portfolios und verstehe Diversifikation, Risiko und Rendite."
              icon={PieChart}
              action={{
                label: "Portfolio erstellen",
                onClick: () => window.location.href = "/portfolio"
              }}
            />
            
            <DashboardCard
              title="Quiz: Grundlagen"
              description="Teste dein Wissen mit interaktiven Quizzen und erhalte detaillierte Erklärungen."
              icon={Brain}
              action={{
                label: "Quiz starten",
                onClick: () => window.location.href = "/quiz",
                variant: "secondary"
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Instruments */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Beispiel-Instrumente
              </h2>
              <p className="text-muted-foreground">
                Entdecke verschiedene Anlageklassen mit realistischen Beispieldaten.
              </p>
            </div>
            <Link to="/instruments">
              <Button variant="outline">
                Alle ansehen
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInstruments.map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Tools */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Weitere Lernhilfen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info group-hover:bg-info group-hover:text-info-foreground transition-all duration-300">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    Finanz-Glossar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Umfassendes Lexikon mit allen wichtigen Finanzbegriffen, verständlich erklärt.
                  </p>
                  <Link to="/glossary">
                    <Button variant="outline" className="w-full">
                      Glossar öffnen
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <Calculator className="h-5 w-5" />
                    </div>
                    Finanzrechner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Berechne Renditen, Zinseszins und andere wichtige Kennzahlen interaktiv.
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Bald verfügbar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

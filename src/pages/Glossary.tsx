import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, FileText } from "lucide-react";
import { useState } from "react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample glossary entries - in a real app this would come from data/glossary.json
  const glossaryEntries = [
    {
      id: "kgv",
      term: "KGV (Kurs-Gewinn-Verhältnis)",
      definition: "Das KGV zeigt das Verhältnis zwischen dem Aktienkurs und dem Gewinn je Aktie. Es gibt an, mit welchem Vielfachen des Jahresgewinns eine Aktie bewertet wird.",
      category: "Aktienanalyse"
    },
    {
      id: "dividende",
      term: "Dividende",
      definition: "Die Dividende ist ein Teil des Gewinns einer Aktiengesellschaft, der an die Aktionäre ausgeschüttet wird. Sie wird meist einmal jährlich gezahlt.",
      category: "Aktien"
    },
    {
      id: "etf",
      term: "ETF (Exchange Traded Fund)",
      definition: "Ein ETF ist ein Investmentfonds, der an der Börse gehandelt wird und einen Index nachbildet. ETFs bieten eine kostengünstige Möglichkeit zur Diversifikation.",
      category: "Fonds"
    },
    {
      id: "volatilitat",
      term: "Volatilität",
      definition: "Die Volatilität misst die Schwankungsbreite eines Wertpapiers oder Marktes. Eine hohe Volatilität bedeutet starke Kursschwankungen.",
      category: "Risiko"
    },
    {
      id: "diversifikation",
      term: "Diversifikation",
      definition: "Diversifikation bedeutet die Verteilung von Investments auf verschiedene Anlageklassen, Branchen oder Regionen zur Risikoreduktion.",
      category: "Portfolio"
    }
  ];

  const filteredEntries = glossaryEntries.filter(entry =>
    entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-info to-primary text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanz-Glossar</h1>
            <p className="text-muted-foreground">
              Umfassendes Lexikon mit allen wichtigen Finanzbegriffen, verständlich erklärt
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Nach Begriffen, Definitionen oder Kategorien suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-6">
        <span className="text-sm text-muted-foreground">
          {filteredEntries.length} von {glossaryEntries.length} Begriffen
        </span>
      </div>

      {/* Glossary Entries */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{entry.term}</span>
                  <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded">
                    {entry.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {entry.definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Keine Begriffe gefunden
                </h3>
                <p className="text-muted-foreground mb-4">
                  Versuche andere Suchbegriffe oder entferne den Suchfilter.
                </p>
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Suche zurücksetzen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coming Soon */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Erweiterte Glossar-Features
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-info/10">
              <BookOpen className="h-8 w-8 text-info" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Vollständiges Finanz-Lexikon geplant
              </h3>
              <p className="text-muted-foreground mb-6">
                Das Glossar wird erweitert mit hunderten von Begriffen, Kategorien-Filter, 
                Querverweisen und Export-Funktionen.
              </p>
            </div>
            <Button disabled className="mt-4">
              Bald verfügbar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Glossary;
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
    },
    {
      id: "marktkapitalisierung",
      term: "Marktkapitalisierung",
      definition: "Die Marktkapitalisierung ergibt sich aus dem Aktienkurs multipliziert mit der Anzahl aller Aktien. Sie zeigt den Börsenwert eines Unternehmens.",
      category: "Aktienanalyse"
    },
    {
      id: "liquiditat",
      term: "Liquidität",
      definition: "Liquidität beschreibt, wie schnell ein Vermögenswert zu einem fairen Preis in Bargeld umgewandelt werden kann. Aktien großer Unternehmen haben typischerweise hohe Liquidität.",
      category: "Trading"
    },
    {
      id: "rendite",
      term: "Rendite",
      definition: "Die Rendite ist der Ertrag einer Geldanlage in Prozent des eingesetzten Kapitals. Sie umfasst Kursgewinne und Ausschüttungen wie Dividenden oder Zinsen.",
      category: "Portfolio"
    },
    {
      id: "spread",
      term: "Spread (Geld-Brief-Spanne)",
      definition: "Der Spread ist die Differenz zwischen Kauf- und Verkaufspreis eines Wertpapiers. Ein enger Spread deutet auf hohe Liquidität hin.",
      category: "Trading"
    },
    {
      id: "ter",
      term: "TER (Total Expense Ratio)",
      definition: "Die TER gibt die Gesamtkostenquote eines Fonds in Prozent an. Sie umfasst Verwaltungsgebühren und weitere laufende Kosten, die die Rendite mindern.",
      category: "Fonds"
    },
    {
      id: "zinseszins",
      term: "Zinseszinseffekt",
      definition: "Der Zinseszinseffekt beschreibt, wie Zinsen oder Erträge reinvestiert werden und selbst wieder Erträge generieren. Dies führt zu exponentiell wachsendem Vermögen.",
      category: "Grundlagen"
    },
    {
      id: "anleihe",
      term: "Anleihe (Bond)",
      definition: "Eine Anleihe ist ein festverzinsliches Wertpapier, bei dem der Anleger einem Emittenten Geld leiht. Der Emittent zahlt regelmäßige Zinsen und am Ende die Rückzahlung.",
      category: "Anleihen"
    },
    {
      id: "kupon",
      term: "Kupon (Coupon)",
      definition: "Der Kupon ist der jährliche Zinssatz einer Anleihe in Prozent des Nennwerts. Ein Kupon von 3% bedeutet 30€ Zinsen pro Jahr bei 1.000€ Nennwert.",
      category: "Anleihen"
    },
    {
      id: "kurs-buchwert",
      term: "Kurs-Buchwert-Verhältnis (KBV)",
      definition: "Das KBV setzt den Aktienkurs ins Verhältnis zum Buchwert pro Aktie. Ein niedriges KBV kann auf eine Unterbewertung hindeuten.",
      category: "Aktienanalyse"
    },
    {
      id: "sharpe-ratio",
      term: "Sharpe Ratio",
      definition: "Die Sharpe Ratio misst das Verhältnis von Rendite zu Risiko eines Investments. Ein höherer Wert bedeutet bessere risikobereinigte Performance.",
      category: "Risiko"
    },
    {
      id: "drawdown",
      term: "Drawdown",
      definition: "Der Drawdown zeigt den maximalen Wertverlust vom höchsten zum niedrigsten Punkt eines Investments. Er ist ein wichtiges Risikomaß.",
      category: "Risiko"
    },
    {
      id: "blue-chip",
      term: "Blue Chip",
      definition: "Blue Chips sind Aktien großer, etablierter Unternehmen mit stabilen Gewinnen und hoher Marktkapitalisierung. Sie gelten als relativ sicher.",
      category: "Aktien"
    },
    {
      id: "rebalancing",
      term: "Rebalancing",
      definition: "Rebalancing bedeutet die regelmäßige Anpassung eines Portfolios zur ursprünglichen Gewichtung. So wird verhindert, dass einzelne Positionen zu dominant werden.",
      category: "Portfolio"
    },
    {
      id: "depot",
      term: "Depot (Wertpapierdepot)",
      definition: "Ein Depot ist ein Konto zur Verwahrung von Wertpapieren wie Aktien, ETFs oder Anleihen. Es wird bei einer Bank oder einem Broker geführt.",
      category: "Grundlagen"
    },
    {
      id: "order",
      term: "Order (Wertpapierorder)",
      definition: "Eine Order ist ein Auftrag zum Kauf oder Verkauf von Wertpapieren. Es gibt verschiedene Orderarten wie Market-Order, Limit-Order oder Stop-Loss.",
      category: "Trading"
    },
    {
      id: "index",
      term: "Index (Aktienindex)",
      definition: "Ein Index bildet die Wertentwicklung einer Gruppe von Wertpapieren ab, z.B. DAX oder S&P 500. Er dient als Marktbarometer und Benchmark.",
      category: "Grundlagen"
    },
    {
      id: "eps",
      term: "EPS (Earnings Per Share)",
      definition: "Der Gewinn je Aktie zeigt, wie viel Gewinn ein Unternehmen pro ausstehender Aktie erwirtschaftet. Er ist wichtig für die Bewertung von Aktien.",
      category: "Aktienanalyse"
    },
    {
      id: "ausschuettend",
      term: "Ausschüttender Fonds",
      definition: "Ein ausschüttender Fonds zahlt Erträge wie Dividenden oder Zinsen direkt an die Anleger aus. Im Gegensatz dazu reinvestiert ein thesaurierender Fonds die Erträge.",
      category: "Fonds"
    },
    {
      id: "emittent",
      term: "Emittent",
      definition: "Der Emittent ist der Herausgeber von Wertpapieren, z.B. ein Unternehmen bei Aktien oder ein Staat bei Staatsanleihen. Er erhält das Kapital aus der Emission.",
      category: "Grundlagen"
    },
    {
      id: "bonitaet",
      term: "Bonität (Credit Rating)",
      definition: "Die Bonität bewertet die Kreditwürdigkeit eines Emittenten durch Rating-Agenturen. AAA ist die beste, D die schlechteste Bewertung.",
      category: "Anleihen"
    },
    {
      id: "zinsaenderungsrisiko",
      term: "Zinsänderungsrisiko",
      definition: "Das Zinsänderungsrisiko betrifft besonders Anleihen: Steigen die Marktzinsen, fallen die Kurse bestehender Anleihen und umgekehrt.",
      category: "Risiko"
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
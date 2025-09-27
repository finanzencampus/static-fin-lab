import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { PortfolioBuilder } from "@/components/PortfolioBuilder";

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-success text-white">
            <PieChart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio-Simulator</h1>
            <p className="text-muted-foreground">
              Baue virtuelle Portfolios und verstehe Diversifikation, Risiko und Rendite
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Builder */}
      <PortfolioBuilder />

      {/* Educational Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance-Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verfolge die Entwicklung deines virtuellen Portfolios über verschiedene Zeiträume 
              und verstehe die wichtigsten Performance-Kennzahlen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risiko-Analyse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verstehe Sharpe Ratio, Maximum Drawdown und Volatilitätskennzahlen 
              zur besseren Bewertung deiner Anlagestrategie.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diversifikation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lerne wie verschiedene Anlageklassen das Gesamtrisiko reduzieren können 
              und optimiere deine Asset-Allocation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
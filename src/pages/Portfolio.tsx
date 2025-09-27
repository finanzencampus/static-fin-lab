import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, TrendingUp, Calculator, Download } from "lucide-react";

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

      {/* Coming Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Portfolio-Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Portfolio-Simulator in Entwicklung
                </h3>
                <p className="text-muted-foreground mb-6">
                  Hier wirst du bald virtuelle Portfolios erstellen, Risiko-Rendite-Profile analysieren 
                  und verschiedene Anlagestrategien testen können.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    CAGR & Volatilitäts-Berechnungen
                  </div>
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Asset-Allocation Visualisierung
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Portfolio-Export als PDF/CSV
                  </div>
                </div>
              </div>
              <Button disabled className="mt-4">
                Bald verfügbar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance-Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verfolge die Entwicklung deines virtuellen Portfolios über verschiedene Zeiträume.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risiko-Analyse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verstehe Sharpe Ratio, Maximum Drawdown und Volatilitätskennzahlen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diversifikation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lerne wie verschiedene Anlageklassen das Gesamtrisiko reduzieren können.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
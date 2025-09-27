import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalculatorIcon, TrendingUp, Percent } from "lucide-react";
import { CompoundInterestCalculator } from "@/components/CompoundInterestCalculator";
import { ReturnsCalculator } from "@/components/ReturnsCalculator";

const Calculator = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-warning text-white">
            <CalculatorIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanz-Rechner</h1>
            <p className="text-muted-foreground">
              Berechne Zinseszinseffekte, Renditen und plane deine Finanzstrategie
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Compound Interest Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Zinseszinsrechner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CompoundInterestCalculator />
          </CardContent>
        </Card>

        {/* Returns Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Renditenrechner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReturnsCalculator />
          </CardContent>
        </Card>
      </div>

      {/* Educational Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Zinseszinseffekt verstehen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Der Zinseszinseffekt beschreibt die Verzinsung bereits erhaltener Zinsen. 
              Dadurch wächst dein Kapital nicht linear, sondern exponentiell. Je länger 
              die Laufzeit und je höher der Zinssatz, desto stärker wirkt sich dieser 
              Effekt aus.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rendite richtig berechnen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Es gibt verschiedene Arten von Rendite-Berechnungen: einfache Rendite, 
              annualisierte Rendite (CAGR) und inflationsbereinigte Rendite. Jede 
              Methode hat ihre Anwendungsbereiche und hilft bei verschiedenen 
              Finanzentscheidungen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
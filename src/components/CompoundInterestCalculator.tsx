import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { calculateCompoundInterest, formatCurrency, formatPercentage } from "@/lib/calculations";

export const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [annualRate, setAnnualRate] = useState<string>("7");
  const [years, setYears] = useState<string>("20");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
    breakdown: Array<{
      year: number;
      balance: number;
      totalContributions: number;
      totalInterest: number;
    }>;
  } | null>(null);

  const handleCalculate = () => {
    const principalAmount = parseFloat(principal) || 0;
    const monthlyAmount = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualRate) || 0;
    const time = parseFloat(years) || 0;

    if (principalAmount >= 0 && rate > 0 && time > 0) {
      const calculation = calculateCompoundInterest(
        principalAmount,
        monthlyAmount,
        rate,
        time
      );
      setResult(calculation);
    }
  };

  const handleReset = () => {
    setPrincipal("10000");
    setMonthlyContribution("500");
    setAnnualRate("7");
    setYears("20");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="principal" className="text-sm font-semibold">Startkapital (€)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="10000"
            min="0"
            step="100"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">Deine anfängliche Investition</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly" className="text-sm font-semibold">Monatliche Einzahlung (€)</Label>
          <Input
            id="monthly"
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="500"
            min="0"
            step="50"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">Regelmäßiger Sparbetrag</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate" className="text-sm font-semibold">Jährlicher Zinssatz (%)</Label>
          <Input
            id="rate"
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="7"
            min="0"
            max="50"
            step="0.1"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">Erwartete durchschnittliche Rendite</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="years" className="text-sm font-semibold">Laufzeit (Jahre)</Label>
          <Input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="20"
            min="1"
            max="50"
            step="1"
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">Zeitraum der Investition</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleCalculate} className="flex-1 h-11 font-semibold">
          Berechnen
        </Button>
        <Button onClick={handleReset} variant="outline" className="h-11">
          Zurücksetzen
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Endkapital</p>
                  <p className="text-lg font-bold text-success">
                    {formatCurrency(result.finalAmount)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Eingezahlt</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(result.totalContributions)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Zinserträge</p>
                  <p className="text-lg font-bold text-warning">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Yearly Breakdown */}
          <Card>
            <CardContent className="pt-4">
              <h4 className="font-semibold mb-3">Entwicklung über die Jahre</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {result.breakdown.map((year) => (
                  <div key={year.year} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <span className="text-sm font-medium">Jahr {year.year}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {formatCurrency(year.balance)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        +{formatCurrency(year.totalInterest)} Zinsen
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
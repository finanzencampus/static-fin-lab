import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  calculateSimpleReturn, 
  calculateCAGR, 
  calculateRealReturn, 
  formatCurrency, 
  formatPercentage 
} from "@/lib/calculations";

export const ReturnsCalculator = () => {
  // Simple Return Calculator
  const [initialValue, setInitialValue] = useState<string>("10000");
  const [finalValue, setFinalValue] = useState<string>("12500");
  const [simpleResult, setSimpleResult] = useState<number | null>(null);

  // CAGR Calculator
  const [cagrInitial, setCagrInitial] = useState<string>("10000");
  const [cagrFinal, setCagrFinal] = useState<string>("16105");
  const [cagrYears, setCagrYears] = useState<string>("5");
  const [cagrResult, setCagrResult] = useState<number | null>(null);

  // Real Return Calculator
  const [realInitial, setRealInitial] = useState<string>("10000");
  const [realFinal, setRealFinal] = useState<string>("15000");
  const [inflationRate, setInflationRate] = useState<string>("2.5");
  const [realYears, setRealYears] = useState<string>("5");
  const [realResult, setRealResult] = useState<{
    nominalReturn: number;
    realReturn: number;
    inflationImpact: number;
  } | null>(null);

  const handleSimpleReturn = () => {
    const initial = parseFloat(initialValue) || 0;
    const final = parseFloat(finalValue) || 0;
    
    if (initial > 0 && final > 0) {
      const result = calculateSimpleReturn(initial, final);
      setSimpleResult(result);
    }
  };

  const handleCAGR = () => {
    const initial = parseFloat(cagrInitial) || 0;
    const final = parseFloat(cagrFinal) || 0;
    const years = parseFloat(cagrYears) || 0;
    
    if (initial > 0 && final > 0 && years > 0) {
      const result = calculateCAGR(initial, final, years);
      setCagrResult(result);
    }
  };

  const handleRealReturn = () => {
    const initial = parseFloat(realInitial) || 0;
    const final = parseFloat(realFinal) || 0;
    const inflation = parseFloat(inflationRate) || 0;
    const years = parseFloat(realYears) || 0;
    
    if (initial > 0 && final > 0 && years > 0) {
      const result = calculateRealReturn(initial, final, inflation, years);
      setRealResult(result);
    }
  };

  const resetAll = () => {
    setInitialValue("10000");
    setFinalValue("12500");
    setCagrInitial("10000");
    setCagrFinal("16105");
    setCagrYears("5");
    setRealInitial("10000");
    setRealFinal("15000");
    setInflationRate("2.5");
    setRealYears("5");
    setSimpleResult(null);
    setCagrResult(null);
    setRealResult(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="simple" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simple">Einfache Rendite</TabsTrigger>
          <TabsTrigger value="cagr">CAGR</TabsTrigger>
          <TabsTrigger value="real">Realrendite</TabsTrigger>
        </TabsList>

        {/* Simple Return */}
        <TabsContent value="simple" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial-simple">Anfangswert (€)</Label>
              <Input
                id="initial-simple"
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                placeholder="10000"
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final-simple">Endwert (€)</Label>
              <Input
                id="final-simple"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="12500"
                min="0"
                step="100"
              />
            </div>
          </div>
          
          <Button onClick={handleSimpleReturn} className="w-full">
            Einfache Rendite berechnen
          </Button>

          {simpleResult !== null && (
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Einfache Rendite</p>
                  <p className="text-2xl font-bold text-success">
                    {formatPercentage(simpleResult)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Gewinn: {formatCurrency(parseFloat(finalValue) - parseFloat(initialValue))}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* CAGR */}
        <TabsContent value="cagr" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial-cagr">Anfangswert (€)</Label>
              <Input
                id="initial-cagr"
                type="number"
                value={cagrInitial}
                onChange={(e) => setCagrInitial(e.target.value)}
                placeholder="10000"
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final-cagr">Endwert (€)</Label>
              <Input
                id="final-cagr"
                type="number"
                value={cagrFinal}
                onChange={(e) => setCagrFinal(e.target.value)}
                placeholder="16105"
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years-cagr">Laufzeit (Jahre)</Label>
              <Input
                id="years-cagr"
                type="number"
                value={cagrYears}
                onChange={(e) => setCagrYears(e.target.value)}
                placeholder="5"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
          
          <Button onClick={handleCAGR} className="w-full">
            CAGR berechnen
          </Button>

          {cagrResult !== null && (
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Jährliche Wachstumsrate (CAGR)</p>
                  <p className="text-2xl font-bold text-success">
                    {formatPercentage(cagrResult)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Bei gleichmäßigem jährlichen Wachstum
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Real Return */}
        <TabsContent value="real" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial-real">Anfangswert (€)</Label>
              <Input
                id="initial-real"
                type="number"
                value={realInitial}
                onChange={(e) => setRealInitial(e.target.value)}
                placeholder="10000"
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final-real">Endwert (€)</Label>
              <Input
                id="final-real"
                type="number"
                value={realFinal}
                onChange={(e) => setRealFinal(e.target.value)}
                placeholder="15000"
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inflation">Inflationsrate (% p.a.)</Label>
              <Input
                id="inflation"
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="2.5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years-real">Laufzeit (Jahre)</Label>
              <Input
                id="years-real"
                type="number"
                value={realYears}
                onChange={(e) => setRealYears(e.target.value)}
                placeholder="5"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
          
          <Button onClick={handleRealReturn} className="w-full">
            Realrendite berechnen
          </Button>

          {realResult !== null && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Nominalrendite</p>
                    <p className="text-lg font-bold text-primary">
                      {formatPercentage(realResult.nominalReturn)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Realrendite</p>
                    <p className="text-lg font-bold text-success">
                      {formatPercentage(realResult.realReturn)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Inflationsverlust</p>
                    <p className="text-lg font-bold text-destructive">
                      {formatPercentage(realResult.inflationImpact)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Button onClick={resetAll} variant="outline" className="w-full">
        Alle Rechner zurücksetzen
      </Button>
    </div>
  );
};
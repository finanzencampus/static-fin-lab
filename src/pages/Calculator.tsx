import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator as CalculatorIcon, TrendingUp, Percent, Info } from "lucide-react";
import { CompoundInterestCalculator } from "@/components/CompoundInterestCalculator";
import { ReturnsCalculator } from "@/components/ReturnsCalculator";
import { Alert, AlertDescription } from "@/components/ui/alert";
const Calculator = () => {
  return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-primary text-white shadow-lg">
            <CalculatorIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanzrechner</h1>
            <p className="text-muted-foreground">
              Professionelle Tools zur Berechnung von Zinseszins, Renditen und Investment-Performance
            </p>
          </div>
        </div>
        
        
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Compound Interest Calculator */}
        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <CardTitle>Zinseszinsrechner</CardTitle>
            </div>
            <CardDescription>
              Berechne das Wachstum deiner Geldanlage mit regelmäßigen Einzahlungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CompoundInterestCalculator />
          </CardContent>
        </Card>

        {/* Returns Calculator */}
        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10">
                <Percent className="h-4 w-4 text-info" />
              </div>
              <CardTitle>Renditenrechner</CardTitle>
            </div>
            <CardDescription>
              Analysiere die Performance deiner Investments mit verschiedenen Kennzahlen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReturnsCalculator />
          </CardContent>
        </Card>
      </div>

      {/* Educational Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-success/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Was ist Zinseszins?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Der Zinseszinseffekt ist einer der mächtigsten Mechanismen beim Vermögensaufbau. 
              Dabei werden nicht nur die ursprünglichen Einlagen verzinst, sondern auch die bereits 
              erhaltenen Zinsen. Je länger der Anlagezeitraum, desto stärker wirkt dieser Effekt.
            </p>
            <div className="bg-background/50 rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-2">Beispiel:</p>
              <p className="text-sm text-muted-foreground">
                Bei 10.000€ Startkapital mit 7% jährlicher Rendite hast du nach 30 Jahren nicht 
                31.000€ (einfache Verzinsung), sondern 76.123€ - mehr als das doppelte durch Zinseszins!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-info" />
              Rendite verstehen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Die Rendite zeigt den Ertrag deiner Geldanlage in Prozent. Bei der Berechnung 
              solltest du zwischen verschiedenen Rendite-Arten unterscheiden:
            </p>
            <div className="space-y-3">
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm font-semibold">Einfache Rendite</p>
                <p className="text-sm text-muted-foreground">Gesamtertrag ohne Berücksichtigung der Zeit</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm font-semibold">CAGR (Compound Annual Growth Rate)</p>
                <p className="text-sm text-muted-foreground">Durchschnittliche jährliche Wachstumsrate</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-border">
                <p className="text-sm font-semibold">Realrendite</p>
                <p className="text-sm text-muted-foreground">Nach Abzug der Inflation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Calculator;
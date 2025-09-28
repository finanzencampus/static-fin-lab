import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceChart } from "@/components/PriceChart";
import { ArrowLeft, TrendingUp, Building, Globe, Calendar, DollarSign, BarChart3, PieChart } from "lucide-react";
import instrumentsData from "@/data/instruments.json";

const InstrumentDetail = () => {
  const { id } = useParams();
  const instrument = instrumentsData.find(item => item.id === id);

  if (!instrument) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Instrument nicht gefunden</h1>
          <Link to="/instruments">
            <Button variant="outline">Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: instrument.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}Mrd ${instrument.currency}`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}Mio ${instrument.currency}`;
    }
    return `${value.toLocaleString('de-DE')} ${instrument.currency}`;
  };

  const getTypeName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock': return 'Aktie';
      case 'etf': return 'ETF';
      case 'bond': return 'Anleihe';
      case 'crypto': return 'Kryptowährung';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'etf': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'bond': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'crypto': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const currentPrice = instrument.priceHistory[instrument.priceHistory.length - 1]?.close || 0;
  const previousPrice = instrument.priceHistory[instrument.priceHistory.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/instruments">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Button>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={getTypeColor(instrument.type)}>
                {getTypeName(instrument.type)}
              </Badge>
              <Badge variant="outline">{instrument.ticker}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{instrument.name}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{instrument.description}</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">
              {formatPrice(currentPrice)}
            </div>
            <div className={`text-lg flex items-center gap-1 ${
              priceChange >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {priceChange >= 0 ? "+" : ""}{formatPrice(priceChange)} ({priceChangePercent >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2">
          <PriceChart 
            data={instrument.priceHistory} 
            currency={instrument.currency}
            instrumentName={instrument.name}
          />
        </div>

        {/* Key Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Kennzahlen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sektor</span>
                <span className="font-medium">{instrument.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Währung</span>
                <span className="font-medium">{instrument.currency}</span>
              </div>
              
              <Separator />
              
              {/* Stock specific metrics */}
              {instrument.type === 'stock' && (
                <>
                  {'marketCap' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marktkapitalisierung</span>
                      <span className="font-medium">{formatMarketCap(instrument.marketCap as number)}</span>
                    </div>
                  )}
                  {'peRatio' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KGV</span>
                      <span className="font-medium">{instrument.peRatio}</span>
                    </div>
                  )}
                </>
              )}
              
              {/* ETF specific metrics */}
              {instrument.type === 'etf' && (
                <>
                  {'aum' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fondsvolumen (AUM)</span>
                      <span className="font-medium">{formatMarketCap(instrument.aum as number)}</span>
                    </div>
                  )}
                  {'expenseRatio' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TER</span>
                      <span className="font-medium">{instrument.expenseRatio}%</span>
                    </div>
                  )}
                </>
              )}
              
              {/* Bond specific metrics */}
              {instrument.type === 'bond' && (
                <>
                  {'maturity' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Laufzeit</span>
                      <span className="font-medium">{new Date(instrument.maturity as string).toLocaleDateString('de-DE')}</span>
                    </div>
                  )}
                  {'coupon' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Zinssatz</span>
                      <span className="font-medium">{instrument.coupon}%</span>
                    </div>
                  )}
                </>
              )}
              
              {/* Crypto specific metrics */}
              {instrument.type === 'crypto' && (
                <>
                  {'marketCap' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marktkapitalisierung</span>
                      <span className="font-medium">{formatMarketCap(instrument.marketCap as number)}</span>
                    </div>
                  )}
                  {'circulatingSupply' in instrument && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Umlaufende Menge</span>
                      <span className="font-medium">{(instrument.circulatingSupply as number).toLocaleString('de-DE')}</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Detaillierte Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {instrument.type === 'stock' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Was ist das Kurs-Gewinn-Verhältnis (KGV)?</h4>
                    <p className="text-sm text-muted-foreground">
                      Das KGV zeigt, wie viele Jahre es theoretisch dauern würde, den Kaufpreis einer Aktie 
                      über den aktuellen Jahresgewinn zurückzuverdienen. Ein niedriges KGV kann auf eine 
                      unterbewertete Aktie hinweisen.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Marktkapitalisierung erklärt</h4>
                    <p className="text-sm text-muted-foreground">
                      Die Marktkapitalisierung ist der Gesamtwert aller ausgegebenen Aktien eines Unternehmens. 
                      Sie wird berechnet als Aktienkurs multipliziert mit der Anzahl der Aktien.
                    </p>
                  </div>
                </div>
              )}
              
              {instrument.type === 'etf' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Was ist die Total Expense Ratio (TER)?</h4>
                    <p className="text-sm text-muted-foreground">
                      Die TER gibt die jährlichen Gesamtkosten des ETFs in Prozent an. 
                      Sie umfasst Verwaltungsgebühren, Depotbankgebühren und weitere Betriebskosten.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Fondsvolumen (AUM)</h4>
                    <p className="text-sm text-muted-foreground">
                      Das Assets Under Management (AUM) zeigt das gesamte verwaltete Vermögen des ETFs. 
                      Ein höheres AUM deutet oft auf bessere Liquidität und Stabilität hin.
                    </p>
                  </div>
                </div>
              )}
              
              {instrument.type === 'bond' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Was sind Anleihen?</h4>
                    <p className="text-sm text-muted-foreground">
                      Anleihen sind Schuldverschreibungen, bei denen der Anleger dem Emittenten (Staat oder Unternehmen) 
                      Geld leiht und dafür regelmäßige Zinszahlungen sowie die Rückzahlung am Laufzeitende erhält.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Zinssatz (Kupon)</h4>
                    <p className="text-sm text-muted-foreground">
                      Der Kupon ist der feste Zinssatz, den die Anleihe jährlich zahlt. 
                      Er wird meist halbjährlich ausgeschüttet.
                    </p>
                  </div>
                </div>
              )}
              
              {instrument.type === 'crypto' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Umlaufende Menge</h4>
                    <p className="text-sm text-muted-foreground">
                      Die Anzahl der aktuell im Umlauf befindlichen Einheiten der Kryptowährung. 
                      Diese kann sich je nach Protokoll ändern.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Volatilität bei Kryptowährungen</h4>
                    <p className="text-sm text-muted-foreground">
                      Kryptowährungen sind bekannt für ihre hohe Volatilität und können starken Kursschwankungen unterliegen.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDetail;
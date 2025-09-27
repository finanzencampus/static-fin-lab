import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  PieChart, 
  TrendingUp, 
  Download,
  Calculator as CalculatorIcon
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import instrumentsData from "@/data/instruments.json";
import { calculatePortfolioMetrics, formatCurrency, formatPercentage } from "@/lib/calculations";

interface PortfolioPosition {
  id: string;
  instrumentId: string;
  shares: number;
  weight?: number;
}

interface PortfolioPerformance {
  date: string;
  value: number;
  totalReturn: number;
}

export const PortfolioBuilder = () => {
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string>("");
  const [shares, setShares] = useState<string>("100");
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioPerformance[]>([]);
  const [metrics, setMetrics] = useState<ReturnType<typeof calculatePortfolioMetrics> | null>(null);

  // Load portfolio from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('finlearn-portfolio');
    if (savedPortfolio) {
      try {
        const portfolio = JSON.parse(savedPortfolio);
        setPositions(portfolio);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    }
  }, []);

  // Save portfolio to localStorage and recalculate when positions change
  useEffect(() => {
    localStorage.setItem('finlearn-portfolio', JSON.stringify(positions));
    calculatePortfolioPerformance();
  }, [positions]);

  const addPosition = () => {
    if (!selectedInstrument || !shares || parseFloat(shares) <= 0) return;
    
    const newPosition: PortfolioPosition = {
      id: Date.now().toString(),
      instrumentId: selectedInstrument,
      shares: parseFloat(shares),
    };
    
    setPositions([...positions, newPosition]);
    setSelectedInstrument("");
    setShares("100");
  };

  const removePosition = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id));
  };

  const updateShares = (id: string, newShares: string) => {
    const shares = parseFloat(newShares) || 0;
    if (shares < 0) return;
    
    setPositions(positions.map(pos => 
      pos.id === id ? { ...pos, shares } : pos
    ));
  };

  const calculatePortfolioPerformance = () => {
    if (positions.length === 0) {
      setPortfolioHistory([]);
      setMetrics(null);
      return;
    }

    // Get all unique dates from all instruments
    const allDates = new Set<string>();
    positions.forEach(position => {
      const instrument = instrumentsData.find(inst => inst.id === position.instrumentId);
      if (instrument) {
        instrument.priceHistory.forEach(price => allDates.add(price.date));
      }
    });

    const sortedDates = Array.from(allDates).sort();
    
    // Calculate portfolio value for each date
    const portfolioHistory: PortfolioPerformance[] = [];
    let initialValue = 0;

    sortedDates.forEach((date, index) => {
      let totalValue = 0;
      let hasAllPrices = true;

      positions.forEach(position => {
        const instrument = instrumentsData.find(inst => inst.id === position.instrumentId);
        if (instrument) {
          const priceEntry = instrument.priceHistory.find(p => p.date === date);
          if (priceEntry) {
            totalValue += priceEntry.close * position.shares;
          } else {
            hasAllPrices = false;
          }
        }
      });

      if (hasAllPrices && totalValue > 0) {
        if (index === 0) {
          initialValue = totalValue;
        }
        
        const totalReturn = initialValue > 0 ? ((totalValue - initialValue) / initialValue) * 100 : 0;
        
        portfolioHistory.push({
          date,
          value: totalValue,
          totalReturn,
        });
      }
    });

    setPortfolioHistory(portfolioHistory);

    // Calculate metrics using portfolio history
    if (portfolioHistory.length > 0) {
      const priceHistory = portfolioHistory.map(p => ({
        date: p.date,
        close: p.value
      }));
      const calculatedMetrics = calculatePortfolioMetrics(priceHistory);
      setMetrics(calculatedMetrics);
    }
  };

  const getTotalValue = () => {
    return positions.reduce((total, position) => {
      const instrument = instrumentsData.find(inst => inst.id === position.instrumentId);
      if (instrument && instrument.priceHistory.length > 0) {
        const latestPrice = instrument.priceHistory[instrument.priceHistory.length - 1].close;
        return total + (latestPrice * position.shares);
      }
      return total;
    }, 0);
  };

  const getPositionValue = (position: PortfolioPosition) => {
    const instrument = instrumentsData.find(inst => inst.id === position.instrumentId);
    if (instrument && instrument.priceHistory.length > 0) {
      const latestPrice = instrument.priceHistory[instrument.priceHistory.length - 1].close;
      return latestPrice * position.shares;
    }
    return 0;
  };

  const getInstrumentName = (instrumentId: string) => {
    const instrument = instrumentsData.find(inst => inst.id === instrumentId);
    return instrument ? instrument.name : 'Unbekannt';
  };

  const getInstrumentTicker = (instrumentId: string) => {
    const instrument = instrumentsData.find(inst => inst.id === instrumentId);
    return instrument ? instrument.ticker : '';
  };

  const exportPortfolio = () => {
    const totalValue = getTotalValue();
    const data = {
      generatedAt: new Date().toISOString(),
      totalValue,
      positions: positions.map(position => ({
        instrument: getInstrumentName(position.instrumentId),
        ticker: getInstrumentTicker(position.instrumentId),
        shares: position.shares,
        value: getPositionValue(position),
        weight: totalValue > 0 ? (getPositionValue(position) / totalValue * 100) : 0,
      })),
      metrics,
      performance: portfolioHistory,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearPortfolio = () => {
    setPositions([]);
  };

  const totalValue = getTotalValue();
  const availableInstruments = instrumentsData.filter(inst => 
    !positions.some(pos => pos.instrumentId === inst.id)
  );

  return (
    <div className="space-y-6">
      {/* Add Position Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Instrument hinzufügen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instrument">Instrument auswählen</Label>
              <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
                <SelectTrigger>
                  <SelectValue placeholder="Instrument wählen..." />
                </SelectTrigger>
                <SelectContent>
                  {availableInstruments.map((instrument) => (
                    <SelectItem key={instrument.id} value={instrument.id}>
                      {instrument.ticker} - {instrument.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shares">Anzahl Anteile</Label>
              <Input
                id="shares"
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="100"
                min="0.01"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                onClick={addPosition} 
                className="w-full"
                disabled={!selectedInstrument || !shares || parseFloat(shares) <= 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Hinzufügen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Positions */}
      {positions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Portfolio-Positionen
              </span>
              <div className="flex gap-2">
                <Button onClick={exportPortfolio} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={clearPortfolio} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Löschen
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.map((position) => {
                const value = getPositionValue(position);
                const weight = totalValue > 0 ? (value / totalValue * 100) : 0;
                
                return (
                  <div key={position.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">
                          {getInstrumentTicker(position.instrumentId)}
                        </h4>
                        <Badge variant="secondary">
                          {formatPercentage(weight)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getInstrumentName(position.instrumentId)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Input
                          type="number"
                          value={position.shares}
                          onChange={(e) => updateShares(position.id, e.target.value)}
                          className="w-24 text-right"
                          min="0.01"
                          step="0.01"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Anteile</p>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="font-semibold">{formatCurrency(value)}</p>
                        <p className="text-xs text-muted-foreground">Wert</p>
                      </div>
                      
                      <Button
                        onClick={() => removePosition(position.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              <Separator />
              
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Gesamtwert:</span>
                <span className="text-success">{formatCurrency(totalValue)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {metrics && portfolioHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Gesamtrendite</p>
                <p className="text-lg font-bold text-success">
                  {formatPercentage(metrics.totalReturn)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">CAGR</p>
                <p className="text-lg font-bold text-primary">
                  {formatPercentage(metrics.cagr)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Volatilität</p>
                <p className="text-lg font-bold text-warning">
                  {formatPercentage(metrics.volatility)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Max Drawdown</p>
                <p className="text-lg font-bold text-destructive">
                  -{formatPercentage(metrics.maxDrawdown)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Sharpe Ratio</p>
                <p className="text-lg font-bold text-info">
                  {metrics.sharpeRatio.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance Chart */}
      {portfolioHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Portfolio-Entwicklung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={portfolioHistory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', year: '2-digit' })}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Rendite']}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalReturn" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {positions.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <CalculatorIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Portfolio leer
                </h3>
                <p className="text-muted-foreground mb-4">
                  Füge Finanzinstrumente hinzu, um dein Portfolio zu erstellen und 
                  die Performance zu analysieren.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

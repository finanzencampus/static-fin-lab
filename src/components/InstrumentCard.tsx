import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PriceData {
  date: string;
  close: number;
}

interface Instrument {
  id: string;
  type: string;
  ticker: string;
  name: string;
  currency: string;
  sector: string;
  description: string;
  priceHistory: PriceData[];
  marketCap?: number;
  peRatio?: number;
  aum?: number;
  expenseRatio?: number;
}

interface InstrumentCardProps {
  instrument: Instrument;
}

export const InstrumentCard = ({ instrument }: InstrumentCardProps) => {
  const currentPrice = instrument.priceHistory[instrument.priceHistory.length - 1]?.close || 0;
  const previousPrice = instrument.priceHistory[instrument.priceHistory.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? ((priceChange / previousPrice) * 100) : 0;
  const isPositive = priceChange >= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: instrument.currency,
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B ${instrument.currency}`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M ${instrument.currency}`;
    }
    return `${value.toLocaleString('de-DE')} ${instrument.currency}`;
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock':
        return 'bg-primary text-primary-foreground';
      case 'etf':
        return 'bg-secondary text-secondary-foreground';
      case 'bond':
        return 'bg-info text-info-foreground';
      case 'crypto':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock': return 'Aktie';
      case 'etf': return 'ETF';
      case 'bond': return 'Anleihe';
      case 'crypto': return 'Krypto';
      default: return type;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getTypeColor(instrument.type)} text-xs font-medium`}>
                {getTypeName(instrument.type)}
              </Badge>
              <span className="text-sm font-mono text-muted-foreground">
                {instrument.ticker}
              </span>
            </div>
            <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {instrument.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {instrument.description}
            </p>
          </div>
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-lg font-bold text-foreground">
              {formatPrice(currentPrice)}
            </div>
            <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{instrument.sector}</span>
            {instrument.marketCap && (
              <span>MK: {formatMarketCap(instrument.marketCap)}</span>
            )}
            {instrument.peRatio && (
              <span>KGV: {instrument.peRatio}</span>
            )}
            {instrument.expenseRatio && (
              <span>TER: {instrument.expenseRatio}%</span>
            )}
          </div>
          <Link to={`/instruments/${instrument.id}`}>
            <Button 
              variant="ghost" 
              size="sm"
              className="group/button hover:text-primary"
            >
              Details
              <ArrowRight className="ml-1 h-3 w-3 group-hover/button:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
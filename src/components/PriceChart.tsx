import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PriceChartProps {
  data: PriceData[];
  currency: string;
  instrumentName: string;
}

export const PriceChart = ({ data, currency, instrumentName }: PriceChartProps) => {
  const [timeRange, setTimeRange] = useState<string>("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
  };

  const getFilteredData = () => {
    if (timeRange === "all") return data;
    
    const now = new Date();
    const months = parseInt(timeRange);
    const startDate = new Date(now.setMonth(now.getMonth() - months));
    
    return data.filter(item => new Date(item.date) >= startDate);
  };

  const filteredData = getFilteredData();
  const chartData = filteredData.map(item => ({
    ...item,
    dateFormatted: formatDate(item.date)
  }));

  const currentPrice = filteredData[filteredData.length - 1]?.close || 0;
  const previousPrice = filteredData[filteredData.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;

  const minPrice = Math.min(...filteredData.map(d => d.low));
  const maxPrice = Math.max(...filteredData.map(d => d.high));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Kursentwicklung</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={priceChange >= 0 ? "secondary" : "outline"} className="text-sm">
              {priceChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {priceChangePercent >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {formatPrice(currentPrice)}
            </div>
            <div className={`text-sm flex items-center gap-1 ${
              priceChange >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {priceChange >= 0 ? "+" : ""}{formatPrice(priceChange)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button
            variant={timeRange === "3" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3")}
          >
            3M
          </Button>
          <Button
            variant={timeRange === "6" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("6")}
          >
            6M
          </Button>
          <Button
            variant={timeRange === "12" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("12")}
          >
            1J
          </Button>
          <Button
            variant={timeRange === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("all")}
          >
            Alle
          </Button>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={[minPrice * 0.95, maxPrice * 1.05]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => [formatPrice(value), "Kurs"]}
                labelFormatter={(label) => `Datum: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div>
            <div className="text-xs text-muted-foreground">Tageshoch</div>
            <div className="font-medium">{formatPrice(filteredData[filteredData.length - 1]?.high || 0)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Tagestief</div>
            <div className="font-medium">{formatPrice(filteredData[filteredData.length - 1]?.low || 0)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
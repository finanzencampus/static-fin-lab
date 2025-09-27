import { useState, useMemo } from "react";
import { InstrumentCard } from "@/components/InstrumentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, BarChart3 } from "lucide-react";
import instrumentsData from "@/data/instruments.json";

const Instruments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  // Get unique types and sectors
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(instrumentsData.map(item => item.type))];
    return uniqueTypes;
  }, []);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(instrumentsData.map(item => item.sector))];
    return uniqueSectors;
  }, []);

  // Filter instruments
  const filteredInstruments = useMemo(() => {
    return instrumentsData.filter(instrument => {
      const matchesSearch = 
        instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instrument.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instrument.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === "all" || instrument.type === selectedType;
      const matchesSector = selectedSector === "all" || instrument.sector === selectedSector;
      
      return matchesSearch && matchesType && matchesSector;
    });
  }, [searchTerm, selectedType, selectedSector]);

  const getTypeName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock': return 'Aktien';
      case 'etf': return 'ETFs';
      case 'bond': return 'Anleihen';
      case 'crypto': return 'Krypto';
      default: return type;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedSector("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedType !== "all" || selectedSector !== "all";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info text-white">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanz-Instrumente</h1>
            <p className="text-muted-foreground">
              Entdecke verschiedene Anlageklassen mit realistischen Beispieldaten
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                Alle Typen
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {getTypeName(type)}
                </Button>
              ))}
            </div>

            {/* Sector Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSector === "all" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedSector("all")}
              >
                Alle Sektoren
              </Button>
              {sectors.map((sector) => (
                <Button
                  key={sector}
                  variant={selectedSector === sector ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(sector)}
                >
                  {sector}
                </Button>
              ))}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredInstruments.length} von {instrumentsData.length} Instrumenten
            </span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                Gefiltert
              </Badge>
            )}
          </div>
          
          {filteredInstruments.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Sortiert nach Relevanz
            </div>
          )}
        </div>
      </div>

      {/* Instrument Grid */}
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Keine Instrumente gefunden
                </h3>
                <p className="text-muted-foreground mb-4">
                  Versuche andere Suchbegriffe oder entferne einige Filter.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Alle Filter zurücksetzen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Instruments;
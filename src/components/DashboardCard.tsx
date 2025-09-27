import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "secondary" | "outline";
  };
  className?: string;
}

export const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  children,
  action,
  className = "" 
}: DashboardCardProps) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      {(children || action) && (
        <CardContent className="pt-0">
          {children}
          {action && (
            <div className="mt-4">
              <Button
                onClick={action.onClick}
                variant={action.variant || "default"}
                size="sm"
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
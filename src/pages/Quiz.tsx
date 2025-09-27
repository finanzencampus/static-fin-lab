import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Play, Trophy, CheckCircle } from "lucide-react";
import quizzesData from "@/data/quizzes.json";

const Quiz = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-warning text-white">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanz-Quiz</h1>
            <p className="text-muted-foreground">
              Teste dein Wissen mit interaktiven Quizzen und erhalte detaillierte Erklärungen
            </p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {quizzesData.quizzes.map((quiz) => (
          <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-accent" />
                  {quiz.title}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  {quiz.questions.length} Fragen
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {quiz.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  {quiz.questions.length * 10} Punkte möglich
                </div>
                <Button size="sm" className="group/button">
                  <Play className="mr-1 h-3 w-3 group-hover/button:translate-x-1 transition-transform duration-200" />
                  Starten
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Interaktive Quiz-Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Brain className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Quiz-System in Entwicklung
              </h3>
              <p className="text-muted-foreground mb-6">
                Hier wirst du bald interaktive Multiple-Choice-Quizze lösen können mit sofortigem 
                Feedback und detaillierten Erklärungen zu jeder Antwort.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Fortschritts-Tracking
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Punkte & Badges System
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Detaillierte Erklärungen
                </div>
              </div>
            </div>
            <Button disabled className="mt-4">
              Bald verfügbar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
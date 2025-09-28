import { useState } from "react";
import { QuizPlayer } from "@/components/QuizPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Award, ArrowLeft } from "lucide-react";
import quizzesData from "@/data/quizzes.json";

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, {score: number, total: number}>>({});

  const handleQuizComplete = (quizId: string, score: number, total: number) => {
    setCompletedQuizzes(prev => ({
      ...prev,
      [quizId]: { score, total }
    }));
  };

  const selectedQuizData = selectedQuiz ? quizzesData.quizzes.find(q => q.id === selectedQuiz) : null;

  if (selectedQuiz && selectedQuizData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedQuiz(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Quiz-Übersicht
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{selectedQuizData.title}</h1>
            <p className="text-muted-foreground">{selectedQuizData.description}</p>
          </div>
        </div>
        
        <QuizPlayer 
          quiz={selectedQuizData} 
          onComplete={(score, total) => handleQuizComplete(selectedQuiz, score, total)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info text-white">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finanz-Quiz</h1>
            <p className="text-muted-foreground">
              Teste und vertiefe dein Wissen über Finanzen und Investments
            </p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {quizzesData.quizzes.map((quiz) => {
          const completion = completedQuizzes[quiz.id];
          const hasCompleted = !!completion;
          const percentage = hasCompleted ? Math.round((completion.score / completion.total) * 100) : 0;
          
          return (
            <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      {hasCompleted && (
                        <Badge variant="secondary" className="mt-1">
                          <Award className="h-3 w-3 mr-1" />
                          {percentage}% erreicht
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {quiz.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {quiz.questions.length} Fragen
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {quiz.questions.length} Punkte möglich
                  </div>
                </div>

                {hasCompleted && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm">
                      <div className="font-medium text-foreground mb-1">Letztes Ergebnis:</div>
                      <div className="text-muted-foreground">
                        {completion.score} von {completion.total} Punkten ({percentage}%)
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={() => setSelectedQuiz(quiz.id)}
                  className="w-full"
                  variant={hasCompleted ? "outline" : "default"}
                >
                  {hasCompleted ? "Erneut starten" : "Starten"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
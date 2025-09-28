import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  options: QuizOption[];
  answer: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number) => void;
}

export const QuizPlayer = ({ quiz, onComplete }: QuizPlayerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    if (!showExplanation) {
      setSelectedAnswer(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      // Quiz completed
      const correctAnswers = quiz.questions.filter(q => 
        answers[q.id] === q.answer || 
        (q.id === currentQuestion.id && selectedAnswer === q.answer)
      ).length;
      
      setIsCompleted(true);
      onComplete(correctAnswers, quiz.questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setAnswers({});
    setIsCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (q.id === currentQuestion.id) {
        if (selectedAnswer === q.answer) correct++;
      } else if (answers[q.id] === q.answer) {
        correct++;
      }
    });
    return correct;
  };

  if (isCompleted) {
    const finalScore = getScore();
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Quiz Abgeschlossen!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {finalScore}/{quiz.questions.length}
            </div>
            <div className="text-lg text-muted-foreground">
              {percentage}% richtig beantwortet
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Punkte: {finalScore}</span>
              <span>Gesamt: {quiz.questions.length}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleRestart} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Quiz wiederholen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Frage {currentQuestionIndex + 1} von {quiz.questions.length}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {getScore()}/{currentQuestionIndex} Punkte
          </div>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-lg leading-relaxed">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.id === currentQuestion.answer;
            const showResult = showExplanation;
            
            let buttonVariant: "outline" | "default" | "secondary" = "outline";
            let iconColor = "";
            let icon = null;
            
            if (showResult) {
              if (isCorrect) {
                buttonVariant = "secondary";
                iconColor = "text-green-600";
                icon = <CheckCircle className="h-4 w-4" />;
              } else if (isSelected && !isCorrect) {
                buttonVariant = "outline";
                iconColor = "text-red-600";
                icon = <XCircle className="h-4 w-4" />;
              }
            } else if (isSelected) {
              buttonVariant = "default";
            }

            return (
              <Button
                key={option.id}
                variant={buttonVariant}
                className={`w-full justify-start h-auto py-3 px-4 text-left whitespace-normal ${
                  showResult && isCorrect ? "border-green-200 bg-green-50/50" : ""
                } ${
                  showResult && isSelected && !isCorrect ? "border-red-200 bg-red-50/50" : ""
                }`}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showExplanation}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${iconColor}`}>
                    {icon}
                  </div>
                  <span className="flex-1">{option.text}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-foreground mb-1">Erklärung:</div>
                <div className="text-sm text-muted-foreground">
                  {currentQuestion.explanation}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {!showExplanation ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={!selectedAnswer}
              className="w-full"
            >
              Antwort bestätigen
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full">
              {currentQuestionIndex < quiz.questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
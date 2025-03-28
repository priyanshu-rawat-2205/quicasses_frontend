"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { API_URL } from "@/shared/api";

interface Assessment {
  uuid: string;
  title: string;
  description: string;
  questions: { title: string; options: string[] }[];
  created_at: string;
  updated_at: string;
  time_limit: number;
}

const TakeAssessment = () => {
  useAuthGuard(true);
  const router = useRouter();
  const { id } = useParams();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/assessment/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setAssessment(data);
      } catch (error) {
        console.error("Error fetching assessment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssessment();
    }
  }, [id]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (assessment?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    setShowSubmitDialog(false);
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      question_id: parseInt(questionId),
      selected_option: selectedOption,
    }));

    const payload = { uuid: id, answers: formattedAnswers };

    try {
      const response = await fetch(
        `${API_URL}/api/assessment/submit-assessment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setShowSuccessDialog(true);
      } else {
        console.error("Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center h-screen items-center">
      <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
    </div>
  );
  if (!assessment) return (
    <div className="flex justify-center h-screen items-center">
      <p>Assessment not found</p>
    </div>
  );

  const attemptedCount = Object.keys(answers).length;
  const totalQuestions = assessment.questions.length;

  return (
    <div className="flex gap-4 p-6 h-screen">
      {/* Left side - Question */}
      <div className="w-2/3">
        <Card className="p-6 h-full">
          <h2 className="text-2xl font-bold mb-6">{assessment.title}</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h3>
            <p className="text-lg mb-6">{assessment.questions[currentQuestionIndex].title}</p>
            <div className="grid gap-3">
              {assessment.questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentQuestionIndex] === index ? "default" : "outline"}
                  onClick={() => handleSelectAnswer(index)}
                  className="justify-start text-left h-auto py-3 px-4"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-auto">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Next
              </Button>
              <Button
                onClick={() => setShowSubmitDialog(true)}
                variant="destructive"
              >
                Submit Assessment
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right side - Progress and Navigation */}
      <div className="w-1/3">
        <Card className="p-4 mb-4">
          <Alert className="mb-4">
            <AlertDescription>
              Time left: {Math.floor(timeLeft! / 60)}:
              {(timeLeft! % 60).toString().padStart(2, "0")} minutes
            </AlertDescription>
          </Alert>
          <Progress
            value={(attemptedCount / totalQuestions) * 100}
            className="mb-4"
          />
          <p className="text-gray-600 mb-4">
            {attemptedCount} of {totalQuestions} questions attempted
          </p>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <Button
                key={index}
                variant={index in answers ? "default" : "outline"}
                className="w-full h-8 p-0"
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Start Assessment Dialog */}
      <Dialog open={showStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{assessment.title}</DialogTitle>
            <p>{assessment.description}</p>
            <p>Number of Questions: {assessment.questions.length}</p>
            <p>
              Time Limit: {Math.floor(assessment.time_limit / 60)} minutes
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowStartDialog(false);
                setTimeLeft(assessment.time_limit);
              }}
            >
              Start Assessment
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/admin")}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Submission Dialog */}
      <Dialog open={showSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to submit?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSubmit}>Yes, Submit</Button>
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assessment Submitted Successfully!</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push("/dashboard/admin")}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TakeAssessment;

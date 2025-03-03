// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { useAuthGuard } from "@/hooks/useAuth";

// interface Assessment {
//   uuid: string;
//   title: string;
//   description: string;
//   questions: [{title: string, options: string[]}];
//   created_at: string;
//   updated_at: string;
// }

// const TakeAssessment = () => {
//   useAuthGuard(true); // Redirect to login if user is not authenticated
//   const router = useRouter();
//   const { id } = useParams(); // Get the assessment ID from the URL

//   const [assessment, setAssessment] = useState<Assessment>();
//   const [answers, setAnswers] = useState<{ question_id: number; selected_option: number }[]>([]); // Store selected answers
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the assessment details
//     const fetchAssessment = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/assessment/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         setAssessment(data);
//       } catch (error) {
//         console.error("Error fetching assessment:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchAssessment();
//     } else {
//       console.log("Assessment ID not found");
//     }
//   }, [id]);

//   // Handle answer selection
//   const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
//     setAnswers((prev) => {
//       const updatedAnswers = [...prev];
//       const answerIndex = updatedAnswers.findIndex(answer => answer.question_id === questionIndex);
//       if (answerIndex > -1) {
//         updatedAnswers[answerIndex].selected_option = optionIndex;
//       } else {
//         updatedAnswers.push({ question_id: questionIndex, selected_option: optionIndex });
//       }
//       return updatedAnswers;
//     });
//   };

//   // Submit the answers
//   const handleSubmit = async () => {
//     const payload = {
//       uuid: id,
//       answers: answers,
//     };

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/assessment/submit-assessment",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         alert("Assessment submitted successfully!");
//         router.push("/dashboard/admin"); // Redirect to the dashboard after submission
//       } else {
//         console.error("Failed to submit assessment");
//       }
//     } catch (error) {
//       console.error("Error submitting assessment:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!assessment) return <p>Assessment not found.</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl text-center font-bold mb-8">{assessment.title}</h2>
//       <p className="text-gray-600 mb-6">{assessment.description}</p>

//       {assessment.questions.map((question, qIndex) => (
//         <div key={qIndex} className="mb-6">
//           <h3 className="text-lg font-semibold">
//             {qIndex + 1}. {question.title}
//           </h3>
//           <div className="mt-2 grid gap-2">
//             {question.options.map((option, oIndex) => (
//               <button
//                 key={oIndex}
//                 className={`w-full text-left p-3 border rounded-md ${
//                   answers.find(answer => answer.question_id === qIndex)?.selected_option === oIndex
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//                 onClick={() => handleSelectAnswer(qIndex, oIndex)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={handleSubmit}
//         className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
//       >
//         Submit Assessment
//       </button>
//     </div>
//   );
// };

// export default TakeAssessment;























"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Assessment {
  uuid: string;
  title: string;
  description: string;
  questions: { title: string; options: string[] }[];
  created_at: string;
  updated_at: string;
  time_limit: number; // Time limit in seconds
}

const TakeAssessment = () => {
  useAuthGuard(true);
  const router = useRouter();
  const { id } = useParams();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  // const [answers, setAnswers] = useState<Record<number, number>>({});
  const [answers, setAnswers] = useState<
    { question_id: number; selected_option: number }[]
  >([]); // Store selected answers
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/assessment/${id}`,
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
        setTimeLeft(data.time_limit);
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

  // const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
  //   setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  // };

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      const answerIndex = updatedAnswers.findIndex(answer => answer.question_id === questionIndex);
      if (answerIndex > -1) {
        updatedAnswers[answerIndex].selected_option = optionIndex;
      } else {
        updatedAnswers.push({ question_id: questionIndex, selected_option: optionIndex });
      }
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    const payload = {
      uuid: id,
      answers,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/assessment/submit-assessment",
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
        alert("Assessment submitted successfully!");
        router.push("/dashboard/admin");
      } else {
        console.error("Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!assessment) return <p>Assessment not found.</p>;

  const attemptedCount = Object.keys(answers).length;
  const totalQuestions = assessment.questions.length;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-4">
        {assessment.title}
      </h2>
      <p className="text-gray-600 mb-4">{assessment.description}</p>

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
      <p className="text-gray-600 mb-6">
        {attemptedCount} of {totalQuestions} questions attempted
      </p>

      {assessment.questions.map((question, qIndex) => (
        <Card key={qIndex} className="mb-4 p-4">
          <h3 className="text-lg font-semibold mb-2">
            {qIndex + 1}. {question.title}
          </h3>
          <div className="grid gap-2">
            {question.options.map((option, oIndex) => (
              <Button
                key={oIndex}
                variant={
                  answers.find((answer) => answer.question_id === qIndex)
                    ?.selected_option === oIndex
                    ? "default"
                    : "outline"
                }
                onClick={() => handleSelectAnswer(qIndex, oIndex)}
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      ))}

      <Button onClick={handleSubmit} className="mt-6 w-full">
        Submit Assessment
      </Button>
    </div>
  );
};

export default TakeAssessment;

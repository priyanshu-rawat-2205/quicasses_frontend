"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Assessment {
  uuid: string;
  title: string;
  description: string;
  questions: [{title: string, options: string[]}];
  created_at: string;
  updated_at: string;
}

const TakeAssessment = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the assessment ID from the URL

  const [assessment, setAssessment] = useState<Assessment>();
  const [answers, setAnswers] = useState([{}]); // Store selected answers
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the assessment details
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/assessment/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
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
    } else {
      console.log("Assessment ID not found");
    }
  }, [id]);

  // Handle answer selection
  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex, // Store selected option index for each question
    }));
  };

  // Submit the answers
  const handleSubmit = async () => {
    const payload = {
      uuid: id,
      answers: answers,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/assessment/submit-assessment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Assessment submitted successfully!");
        router.push("/dashboard/admin"); // Redirect to the dashboard after submission
      } else {
        console.error("Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!assessment) return <p>Assessment not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-8">{assessment.title}</h2>
      <p className="text-gray-600 mb-6">{assessment.description}</p>

      {assessment.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6">
          <h3 className="text-lg font-semibold">
            {qIndex + 1}. {question.title}
          </h3>
          <div className="mt-2 grid gap-2">
            {question.options.map((option, oIndex) => (
              <button
                key={oIndex}
                className={`w-full text-left p-3 border rounded-md ${
                  answers[qIndex] === oIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleSelectAnswer(qIndex, oIndex)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit Assessment
      </button>
    </div>
  );
};

export default TakeAssessment;

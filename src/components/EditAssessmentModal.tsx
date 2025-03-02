// 'use client'

// import { useState } from "react";
// import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";
// import { useEffect } from "react";

// interface Question {
//   title: string;
//   options: string[];
//   correct_option: number;
// }

// interface Assessment {
//   uuid: string;
//   title: string;
//   description: string;
//   created_at: string;
//   questions: Question[];
// }

// interface EditAssessmentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   onSubmit: (data: any) => void;
//   // assessmentId: string;
//   assessment: Assessment | null;
// }

// export default function EditAssessmentModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   assessment,
// }: EditAssessmentModalProps) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [questions, setQuestions] = useState([
//     { title: "", options: ["", "", "", ""], correct_option: 0 },
//   ]);

//   useEffect(() => {
//     if (isOpen && assessment) {
//       setTitle(assessment.title);
//       setDescription(assessment.description);
//       setQuestions(assessment.questions);
//     }
//   }, [isOpen, assessment]);

  
//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { title: "", options: ["", "", "", ""], correct_option: 0 },
//     ]);
//   };

//   const removeQuestion = (index: number) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleQuestionChange = (
//     index: number,
//     field: string,
//     value: string | number
//   ) => {
//     const newQuestions = [...questions];
//     if (field === "title") {
//       newQuestions[index].title = value as string;
//     } else if (field === "correct_option") {
//       newQuestions[index].correct_option = value as number;
//     } else {
//       newQuestions[index].options[Number(field)] = value as string;
//     }
//     setQuestions(newQuestions);
//   };

//   const handleSubmit = async () => {
//     if (!assessment) {
//       console.error("Assessment not found");
//       return;
//     }

//     const updatedAssessment = {
//       uuid: assessment.uuid, // Ensure uuid is included
//       title,
//       description,
//       questions,
//     };

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:5000/api/assessment/${assessment.uuid}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(updatedAssessment),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update assessment");
//       }

//       const responseData = await response.json(); // Get the updated data from the API
//       onSubmit(responseData); // Pass the full updated object to the parent component
//       onClose();
//     } catch (error) {
//       console.error("Error saving assessment", error);
//     }
//   };


//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white max-h-[90%] rounded-lg shadow-lg p-6 w-full max-w-3xl overflow-scroll">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Edit Assessment</h2>
//           <FaTimes className="text-gray-600 cursor-pointer" onClick={onClose} />
//         </div>

//         {/* Title Input */}
//         <label className="block mb-2 font-semibold">Title</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded-md mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter assessment title"
//         />

//         {/* Description Input */}
//         <label className="block mb-2 font-semibold">Description</label>
//         <textarea
//           className="w-full p-2 border rounded-md mb-4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter assessment description"
//         ></textarea>

//         {/* Questions Section */}
//         <h3 className="text-lg font-bold mb-2">Questions</h3>
//         {questions.map((q, index) => (
//           <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-100">
//             {/* Question Title */}
//             <label className="block font-semibold">Question {index + 1}</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md mb-2"
//               value={q.title}
//               onChange={(e) =>
//                 handleQuestionChange(index, "title", e.target.value)
//               }
//               placeholder="Enter question title"
//             />

//             {/* Options */}
//             {q.options.map((opt, optIndex) => (
//               <div key={optIndex} className="flex items-center space-x-2 mb-2">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-md"
//                   value={opt}
//                   onChange={(e) =>
//                     handleQuestionChange(
//                       index,
//                       String(optIndex),
//                       e.target.value
//                     )
//                   }
//                   placeholder={`Option ${optIndex + 1}`}
//                 />
//                 <input
//                   type="radio"
//                   // name={`correct-${index}`}
//                   name={`correct-option`}
//                   checked={q.correct_option == optIndex}
//                   onChange={() =>
//                     handleQuestionChange(index, "correct_option", optIndex)
//                   }
//                 />
//               </div>
//             ))}

//             {/* Remove Question */}
//             <button
//               onClick={() => removeQuestion(index)}
//               className="text-red-600 flex items-center mt-2 hover:underline"
//             >
//               <FaTrash className="mr-2" /> Remove Question
//             </button>
//           </div>
//         ))}

//         {/* Add Question Button */}
//         <button
//           onClick={addQuestion}
//           className="flex items-center bg-gray-300 px-4 py-2 rounded-md mt-2 hover:bg-gray-400"
//         >
//           <FaPlus className="mr-2" /> Add Question
//         </button>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md font-semibold hover:bg-blue-700 mt-4 w-full"
//         >
//           Update Assessment
//         </button>
//       </div>
//     </div>
//   );
// }




















"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


interface Question {
  title: string;
  options: string[];
  correct_option: number;
}

interface Assessment {
  uuid: string;
  title: string;
  description: string;
  created_at: string;
  questions: Question[];
}

interface EditAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Assessment) => void;
  assessment: Assessment | null;
}

export default function EditAssessmentModal({
  isOpen,
  onClose,
  onSubmit,
  assessment,
}: EditAssessmentModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (isOpen && assessment) {
      setTitle(assessment.title);
      setDescription(assessment.description);
      setQuestions(assessment.questions);
    }
  }, [isOpen, assessment]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { title: "", options: ["", "", "", ""], correct_option: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newQuestions = [...questions];
    if (field === "title") {
      newQuestions[index].title = value as string;
    } else if (field === "correct_option") {
      newQuestions[index].correct_option = value as number;
    } else {
      newQuestions[index].options[Number(field)] = value as string;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!assessment) return;
    const updatedAssessment = {
      uuid: assessment.uuid,
      title,
      description,
      questions,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/assessment/${assessment.uuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedAssessment),
        }
      );
      if (!response.ok) throw new Error("Failed to update assessment");
      const responseData = await response.json();
      onSubmit(responseData);
      onClose();
    } catch (error) {
      console.error("Error saving assessment", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[85%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Edit Assessment</DialogTitle>
        </DialogHeader>

        <Label>Title</Label>
        <Input
          placeholder="Enter assessment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Label>Description</Label>
        <Textarea
          placeholder="Enter assessment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Label>Questions</Label>
        {questions.map((q, index) => (
          <Card key={index} className="p-4 rounded-lg bg-gray-100">
            <Input
              placeholder="Question Title"
              value={q.title}
              onChange={(e) =>
                handleQuestionChange(index, "title", e.target.value)
              }
            />
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2 mt-2">
                <Input
                  value={opt}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      String(optIndex),
                      e.target.value
                    )
                  }
                  placeholder={`Option ${optIndex + 1}`}
                />
                <RadioGroup
                  value={q.correct_option.toString()}
                  onValueChange={(value) =>
                    handleQuestionChange(index, "correct_option", Number(value))
                  }
                >
                  <RadioGroupItem value={optIndex.toString()} />
                </RadioGroup>
              </div>
            ))}
            <Button
              variant="destructive"
              onClick={() => removeQuestion(index)}
              className="mt-2"
            >
              <FaTrash className="mr-2" /> Remove Question
            </Button>
          </Card>
        ))}

        <Button variant="secondary" onClick={addQuestion} className="mt-4">
          <FaPlus className="mr-2" /> Add Question
        </Button>

        <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          <Button onClick={handleSubmit}>
            Update Assessment
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

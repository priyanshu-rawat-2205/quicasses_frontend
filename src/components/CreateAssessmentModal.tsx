// 'use client'

// import { useState } from "react";
// import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";

// interface CreateAssessmentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   onSubmit: (data: any) => void;
// }

// export default function CreateAssessmentModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: CreateAssessmentModalProps) {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false)
// //   const [assessment, setAssessment] = useState(null);
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [questions, setQuestions] = useState([
//     { title: "", options: ["", "", "", ""], correct_option: 0 },
//   ]);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     // if (event.target.files && event.target.files.length > 0) {
//     //   setFile(event.target.files[0]);
//     // }

//     if(event.target.files && event.target.files.length > 0) {
//         const selectedFile = event.target.files[0]
//         setFile(selectedFile)
//         setLoading(true)

//         const formData = new FormData();
//         formData.append("file", selectedFile);

//         try {
//             const response = await fetch('http://127.0.0.1:5000/api/file-upload/', {
//                 method: 'POST',
//                 body: formData,
//             })

//             if(!response.ok){
//                 throw new Error('Failed to process file')
//             }

//             const data = await response.json()
//             setTitle(data.title || '')
//             setDescription(data.description || '')
//             setQuestions(data.questions || [])
//         } catch(error) {
//             console.error('error uploading file', error);
//         } finally {
//             setLoading(false)
//         }

//     } else {
//         return
//     }
//   };

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
//     const assessmentData = { title, description, file, questions };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/assessment/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "authorization": `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(assessmentData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create assessment");
//       }
//       const responseData = await response.json();

//       onSubmit(responseData);
//       onClose();
//     } catch (error) {
//       console.error("Error saving assement", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white max-h-[90%] rounded-lg shadow-lg p-6 w-full max-w-3xl overflow-scroll">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Create Assessment</h2>
//           <FaTimes className="text-gray-600 cursor-pointer" onClick={onClose} />
//         </div>

//         {/* File Upload */}
//         <label className="block mb-2 font-semibold">
//           Upload File (Optional)
//         </label>
//         <input
//           type="file"
//           onChange={handleFileUpload}
//           className="w-full mb-4"
//         />

//         {/* Title Input */}
//         <label className="block mb-2 font-semibold">Title</label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded-md mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter assessment title"
//           disabled={loading}
//         />

//         {/* Description Input */}
//         <label className="block mb-2 font-semibold">Description</label>
//         <textarea
//           className="w-full p-2 border rounded-md mb-4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter assessment description"
//           disabled={loading}
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
//               disabled={loading}
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
//                   disabled={loading}
//                 />
//                 <input
//                   type="radio"
//                   name={`correct-${index}`}
//                   checked={q.correct_option === optIndex}
//                   onChange={() =>
//                     handleQuestionChange(index, "correct_option", optIndex)
//                   }
//                   disabled={loading}
//                 />
//               </div>
//             ))}

//             {/* Remove Question */}
//             <button
//               onClick={() => removeQuestion(index)}
//               className="text-red-600 flex items-center mt-2 hover:underline"
//               disabled={loading}
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
//           Create Assessment
//         </button>
//       </div>
//     </div>
//   );
// }





















"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

export default function CreateAssessmentModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateAssessmentModalProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([
    { title: "", options: ["", "", "", ""], correct_option: 0 },
  ]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("http://127.0.0.1:5000/api/file-upload/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to process file");

        const data = await response.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
        setQuestions(data.questions || []);
      } catch (error) {
        toast({
          title: error,
          description: "File upload failed",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    const assessmentData = { title, description, file, questions, time_limit: timeLimit ? parseInt(timeLimit, 10) * 60 : null, };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/assessment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) throw new Error("Failed to create assessment");
      const responseData = await response.json();

      onSubmit(responseData);
      onClose();
      toast({
        title: "Success",
        description: "Assessment created successfully",
      });
    } catch (error) {
      toast({
        title: error,
        description: "Failed to create assessment",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[85%] min-h-[85%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create Assessment</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        ) : (
          <div className="space-y-4">
            <Label>Upload File (Optional)</Label>
            <Input type="file" onChange={handleFileUpload} disabled={loading} />

            <Label>Title</Label>
            <Input
              placeholder="Enter assessment title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />

            <Label>Description</Label>
            <Textarea
              placeholder="Enter assessment description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />

            <Label>Time Limit (Minutes)</Label>
            <Input
              placeholder="Enter time limit in minutes"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              disabled={loading}
            />

            {questions.map((q, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg space-y-2 bg-gray-100"
              >
                <Label>Question {index + 1}</Label>
                <Input
                  placeholder="Enter question title"
                  type="text"
                  value={q.title}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].title = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  disabled={loading}
                />

                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <Input
                      placeholder="option"
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options[optIndex] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      disabled={loading}
                    />
                    <Input
                      className="max-w-[20px]"
                      type="radio"
                      name={`correct-${index}`}
                      checked={q.correct_option === optIndex}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[index].correct_option = optIndex;
                        setQuestions(newQuestions);
                      }}
                      disabled={loading}
                    />
                  </div>
                ))}

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    setQuestions(questions.filter((_, i) => i !== index))
                  }
                  disabled={loading}
                >
                  <FaTrash /> Remove
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() =>
                setQuestions([
                  ...questions,
                  { title: "", options: ["", "", "", ""], correct_option: 0 },
                ])
              }
            >
              <FaPlus className="mr-2" /> Add Question
            </Button>

            <DialogFooter>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                Create Assessment
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}







'use client'

import { useState } from "react";
import { FaShareAlt, FaPen, FaTrash, FaEllipsisV, FaSearch, FaHome } from "react-icons/fa";
import CreateAssessmentModal from "@/components/CreateAssessmentModal";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateAssessment = (data: any) => {
    console.log(data)
  }
  const assessments = [
    { title: "Assessment Title", questions: 12, date: "20/02/2025", time: "21:53" },
    { title: "Assessment Title", questions: 12, date: "20/02/2025", time: "21:53" },
    { title: "Assessment Title", questions: 12, date: "20/02/2025", time: "21:53" },
    { title: "Assessment Title", questions: 12, date: "20/02/2025", time: "21:53" },
    { title: "Assessment Title", questions: 12, date: "20/02/2025", time: "21:53" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
      {/* Navbar */}
      <div className="flex items-center w-full max-w-4xl">
        <FaHome className="text-2xl cursor-pointer" />
        <h1 className="text-2xl font-bold text-center flex-1">
          My Assessments
        </h1>
      </div>

      {/* Search & Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-3 mt-4 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        {/* Buttons */}
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md font-semibold hover:bg-yellow-600 ml-4 ">
          Take
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md font-semibold hover:bg-blue-700 ml-2"
        >
          Create
        </button>
      </div>
      <CreateAssessmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAssessment}
      />

      {/* Assessments List */}
      <div className="mt-6 w-full max-w-4xl">
        {assessments.map((assessment, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 rounded-lg shadow-md p-4 mb-3"
          >
            <div>
              <h3 className="text-lg font-semibold">{assessment.title}</h3>
              <p className="text-sm text-gray-600">
                {assessment.questions} questions
              </p>
              <p className="text-sm text-gray-500">
                {assessment.date} &nbsp; {assessment.time}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaShareAlt className="text-green-500 cursor-pointer hover:scale-110 transition" />
              <FaPen className="text-black cursor-pointer hover:scale-110 transition" />
              <FaTrash className="text-black cursor-pointer hover:scale-110 transition" />
              <FaEllipsisV className="text-gray-600 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
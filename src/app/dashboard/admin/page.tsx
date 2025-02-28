'use client'

import { useEffect, useState } from "react";
import { FaShareAlt, FaPen, FaTrash, FaEllipsisV, FaSearch, FaHome } from "react-icons/fa";
import CreateAssessmentModal from "@/components/CreateAssessmentModal";
import EditAssessmentModal from "@/components/EditAssessmentModal"
import { useRouter } from "next/navigation";

interface Assessment {
  uuid: string
  title: string;
  description: string
  questions: [];
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token){
      router.push('/login')
      return
    } else {
      setLoading(false)
    };

    const fetchAssessments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/assessment/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          router.push('/login')
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if(Array.isArray(data)) {
          setAssessments(data)
        } else {
          setAssessments([])
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();

  },[router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateAssessment = (data: any) => {
    console.log(data)
  }

  const handleDelete = async (uuid: string) => {
    if (!confirm("Are you sure you want to delete this assessment?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/assessment/${uuid}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      })

      if(!response.ok){
        throw new Error(response.statusText);
      } else {
        setAssessments((prevAssessments) =>
          prevAssessments.filter((assessment) => assessment.uuid !== uuid)
        );
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
        setError(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if(loading) {
    return (
      <div className="flex justify-center align-middle h-screen">
        <p> Loading... </p>
      </div>
    );  
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
      {error && <p className="text-red-500">{error}</p>}
      {/* Navbar */}
      <div className="flex items-center w-full max-w-4xl">
        <FaHome className="text-2xl cursor-pointer" />
        <h1 className="text-2xl font-bold text-center flex-1">
          My Assessments
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md font-semibold hover:bg-red-600 ml-4 "
        >
          Logout
        </button>
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
        {assessments.length === 0 ? (
          <p className="text-center mt-4 text-gray-500">No assessments found</p>
        ) : (
          assessments.map((assessment) => (
            <div
              key={assessment.uuid}
              className="flex items-center justify-between bg-gray-100 rounded-lg shadow-md p-4 mb-3"
            >
              <div>
                <h3
                  onClick={() => {
                    router.replace(`/assessment/${assessment.uuid}`);
                  }}
                  className="text-lg font-semibold cursor-pointer hover:underline"
                >
                  {assessment.title}
                </h3>
                {/* <p className="text-sm text-gray-600">
                {assessment.questions} questions
              </p> */}
                <p className="text-sm text-gray-500">
                  {/* {assessment.created_at} &nbsp; {assessment.updated_at} */}
                  {assessment.created_at} &nbsp;
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaShareAlt className="text-green-500 cursor-pointer hover:scale-110 transition" />
                <button onClick={() => setShowEditModal(true)}>
                  <FaPen className="text-black cursor-pointer hover:scale-110 transition" />
                </button>
                <button
                  onClick={() => handleDelete(assessment.uuid)}
                  className="focus:outline-none"
                >
                  <FaTrash className="text-black cursor-pointer hover:scale-110 transition" />
                </button>

                <button onClick={() => router.push(`/assessment/result/${assessment.uuid}`)}>
                  <FaEllipsisV className="text-gray-600 cursor-pointer hover:scale-110 transition" />
                </button>
              </div>
              <EditAssessmentModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSubmit={() => console.log("Assessment Edited")}
                assessmentId={assessment.uuid}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
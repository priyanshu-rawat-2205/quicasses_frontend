"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssessmentResult {
  assessment_uuid: string;
  assessment_title: string;
  submitted_by: string;
  user_id: string;
  total_questions: number;
  correct_answers: number;
  score: number;
  submitted_at: string;
  answers: Record<string, string>; // Stores answers in JSON format
}

export default function AssessmentResults() {
  const { id } = useParams(); // Get assessment UUID from the route
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchResults() {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
        const res = await fetch(
          `http://127.0.0.1:5000/api/assessment/results/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await res.json();
        setResults(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [id]);

  // Calculate total submissions and average score
  const totalSubmissions = results.length;
  const averageScore =
    totalSubmissions > 0
      ? (
          results.reduce((acc, r) => acc + r.score, 0) / totalSubmissions
        ).toFixed(2)
      : "0.00";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              {/* Summary Section */}
              <div className="flex justify-between bg-gray-100 p-4 rounded-lg mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {results[0]?.assessment_title}
                  </h2>
                  <p className="text-gray-500">
                    {totalSubmissions} Total Submissions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Avg. Score: {averageScore}%
                  </p>
                </div>
              </div>

              {/* Results Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Score (%)</TableHead>
                    <TableHead>Correct Answers</TableHead>
                    <TableHead>Total Questions</TableHead>
                    <TableHead>Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.submitted_by}</TableCell>
                      <TableCell>{result.score}%</TableCell>
                      <TableCell>{result.correct_answers}</TableCell>
                      <TableCell>{result.total_questions}</TableCell>
                      <TableCell>
                        {new Date(result.submitted_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>

      {/* Back to Dashboard Button */}
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/dashboard/admin")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

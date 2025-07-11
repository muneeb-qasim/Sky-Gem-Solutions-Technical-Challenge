"use client";

import { useState } from "react";

interface FormData {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: "Low" | "Medium" | "High";
}

interface Recommendation {
  type: string;
  coverage: string;
  duration: string;
  explanation: string;
}

export default function InsuranceRecommendationForm() {
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    income: 0,
    dependents: 0,
    riskTolerance: "Low",
  });

  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const res = await fetch("http://localhost:4000/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to get recommendation"
        );
      }

      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
        setIsSubmitted(true);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendation(null);
    setIsSubmitted(false);
    setError(null);
    setFormData({
      age: 0,
      income: 0,
      dependents: 0,
      riskTolerance: "Low",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Insurance Recommendation
            </h1>
            <p className="text-gray-600">
              Get personalized insurance recommendations based on your profile
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  min="18"
                  max="80"
                  value={formData.age || ""}
                  onChange={(e) =>
                    handleInputChange("age", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label
                  htmlFor="income"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Annual Income ($)
                </label>
                <input
                  type="number"
                  id="income"
                  min="20000"
                  step="1000"
                  value={formData.income || ""}
                  onChange={(e) =>
                    handleInputChange("income", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter your annual income"
                />
              </div>

              <div>
                <label
                  htmlFor="dependents"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Dependents
                </label>
                <input
                  type="number"
                  id="dependents"
                  min="0"
                  max="10"
                  value={formData.dependents || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "dependents",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter number of dependents"
                />
              </div>

              <div>
                <label
                  htmlFor="riskTolerance"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Risk Tolerance
                </label>
                <select
                  id="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={(e) =>
                    handleInputChange(
                      "riskTolerance",
                      e.target.value as "Low" | "Medium" | "High"
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Recommendation"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Your Personalized Recommendation
                </h2>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {recommendation?.type} – {recommendation?.coverage}
                    </div>
                    <div className="text-xl text-gray-600">
                      for {recommendation?.duration}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Why this recommendation?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {recommendation?.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Start Over
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Modify Inputs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

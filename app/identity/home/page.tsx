"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { evofastApiUrl, identityServerUrl } from "@/utils/api-links";

type AiQuestion = {
  id: string;
  title: string;
  description?: string;
  thinkingTimeSeconds?: number;
  recordingTimeSeconds?: number;
};

type AiSection = {
  id: string;
  sectionOrder: number;
  title: string;
  totalQuestion?: number;
  evaluationCriteria?: string;
  description?: string;
  aiTestSectionQuestions: AiQuestion[];
};

type AiTest = {
  id: string;
  title: string;
  description?: string;
  descriptionFinish?: string;
  aiTestSections: AiSection[];
};

type ApiResponse = {
  aiTests: {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: AiTest[];
  };
};

export default function WorkStartPage() {
  const [data, setData] = useState<AiTest[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${evofastApiUrl}/AiTests`, {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`, // hoặc accessToken
        },
      });

      const json = (await res.json()) as ApiResponse;
      setData(json.aiTests?.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${identityServerUrl}/Auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Error logging out from Identity server:", err);
    } finally {
      signOut({ callbackUrl: "/identity/login" });
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">AI Tests</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchData}
              className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              Refresh
            </button>
            <button
              onClick={() => handleLogout()}
              className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {loading && (
          <div className="rounded border bg-white p-6 shadow-sm">
            <p>Loading data…</p>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && !data && (
          <div className="rounded border bg-white p-6 shadow-sm">
            <p>No tests returned from gateway.</p>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-6">
            {data.map((test) => (
              <article key={test.id} className="rounded bg-white p-6 shadow">
                <h2 className="text-xl font-bold">{test.title}</h2>
                {test.description && (
                  <p className="mt-2 whitespace-pre-wrap text-gray-700">
                    {test.description}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div>Sections: {test.aiTestSections?.length ?? 0}</div>
                </div>

                <div className="mt-6 space-y-4">
                  {test.aiTestSections
                    .slice()
                    .sort((a, b) => a.sectionOrder - b.sectionOrder)
                    .map((section) => (
                      <section
                        key={section.id}
                        className="rounded border p-4 bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {section.sectionOrder}. {section.title}
                            </h3>
                            {section.evaluationCriteria && (
                              <div className="mt-1 text-sm text-gray-600">
                                <strong>Criteria:</strong>{" "}
                                {section.evaluationCriteria}
                              </div>
                            )}
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            Questions:{" "}
                            {section.totalQuestion ??
                              section.aiTestSectionQuestions.length}
                          </div>
                        </div>

                        {section.description && (
                          <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                            {section.description}
                          </p>
                        )}

                        <div className="mt-4 space-y-3">
                          {section.aiTestSectionQuestions.map((q, idx) => (
                            <div
                              key={q.id}
                              className="rounded border bg-white p-3 shadow-sm"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="text-sm text-gray-500">
                                    Q{idx + 1}
                                  </div>
                                  <div className="mt-1 font-medium">
                                    {q.title}
                                  </div>
                                  {q.description && (
                                    <div className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                                      {q.description}
                                    </div>
                                  )}
                                </div>

                                <div className="ml-4 text-right text-sm text-gray-600">
                                  <div>
                                    Thinking:{" "}
                                    <strong>
                                      {q.thinkingTimeSeconds ?? 0}s
                                    </strong>
                                  </div>
                                  <div>
                                    Recording:{" "}
                                    <strong>
                                      {q.recordingTimeSeconds ?? 0}s
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
                </div>

                {test.descriptionFinish && (
                  <p className="mt-6 italic text-gray-600 whitespace-pre-wrap">
                    {test.descriptionFinish}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        <footer className="mt-8 text-sm text-gray-500"></footer>
      </div>
    </div>
  );
}

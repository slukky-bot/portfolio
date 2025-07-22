import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const pagesize = 12;

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPage = useCallback(
    async (pageNum) => {
      setLoading(true);
      try {
        const params = {
          q: "latest",
          apiKey: API_KEY,
          page: pageNum,
          pageSize: pagesize,
        };
        const res = await axios.get(NEWS_API_URL, { params });
        setArticles(res.data.articles);
        setTotalResults(res.data.totalResults);
      } catch {
        setArticles([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  const totalPages = Math.max(1, Math.ceil(totalResults / pagesize));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
        News Results (Page {page} of {totalPages})
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No articles found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, idx) => (
            <article
              key={a.url || idx}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {a.urlToImage ? (
                <img
                  src={a.urlToImage}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  No image available
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200 line-clamp-2"
                  title={a.title}
                >
                  {a.title}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
                  {a.description || "No description available."}
                </p>
                <footer className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  {a.source.name} &middot;{" "}
                  {a.publishedAt
                    ? new Date(a.publishedAt).toLocaleDateString()
                    : "Unknown date"}
                </footer>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50 shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const FILTER_OPTIONS = [
  "Bitcoin",
  "Ethereum",
  "DeFi",
  "NFTs",
  "Altcoins",
  "Blockchain",
  "Crypto",
];

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("de");

  const fetchNews = async (queries: string[], lang: string) => {
    try {
      setLoading(true);
      setError(null);

      const searchTerms = queries.length
        ? queries.join(" OR ")
        : "cryptocurrency";

      const res = await fetch(
        `/api/news?searchQuery=${encodeURIComponent(searchTerms)}&language=${lang}`
      );
      if (!res.ok) throw new Error("Fehler beim Abrufen der Nachrichten.");

      const data = await res.json();
      const validArticles = data.articles.filter(
        (article: Article) =>
          article.title &&
          article.description &&
          article.url &&
          article.urlToImage
      );

      setArticles(validArticles);
    } catch (error) {
      setError((error as Error).message || "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queries = searchQuery
      ? searchQuery.split(",").map((q) => q.trim())
      : [];
    fetchNews([...queries, ...filters], language);
  };

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    fetchNews(filters, language);
  }, [filters, language]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-800 dark:text-white">
        Krypto-Nachrichten
      </h1>

      {/* Suchformular */}
      <motion.form
        onSubmit={handleSearch}
        className="mb-6 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Suche (z.B. Bitcoin, Ethereum)"
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-500 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-2 py-2 text-gray-800 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <option value="de">DE</option>
          <option value="en">EN</option>
        </select>
        <motion.button
          type="submit"
          className="rounded-xl bg-yellow-400 px-4 py-2 font-bold text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Suchen
        </motion.button>
      </motion.form>

      {/* Filter-Schaltflächen */}
      <motion.div
        className="mb-4 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {FILTER_OPTIONS.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
              filters.includes(filter)
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            } hover:shadow-md`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      {/* Nachrichten-Anzeige */}
      {loading ? (
        <p className="text-center text-xl">Lade Nachrichten...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-500">Fehler: {error}</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          Keine Nachrichten gefunden.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
        >
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-gray-200 p-4 shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="mb-4 h-48 w-full rounded object-cover"
              />
              <h2 className="mb-2 text-xl font-bold">{article.title}</h2>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString("de-DE")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {article.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
}

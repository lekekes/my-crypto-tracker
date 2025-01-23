import { motion } from 'framer-motion';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface ArticleListProps {
  loading: boolean;
  error: string | null;
  articles: Article[];
}

export default function ArticleList({
  loading,
  error,
  articles,
}: ArticleListProps) {
  if (loading)
    return <p className="text-center text-xl">Lade Nachrichten...</p>;

  if (error)
    return <p className="text-center text-xl text-red-500">Fehler: {error}</p>;

  if (articles.length === 0)
    return (
      <p className="text-center text-xl text-gray-500">
        Keine Nachrichten gefunden.
      </p>
    );

  return (
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
          className="block overflow-hidden rounded-md border border-gray-200 p-4 shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          <img
            src={article.urlToImage}
            alt={article.title}
            className="mb-4 h-48 w-full rounded-md object-cover"
          />
          <h2 className="mb-2 text-xl font-bold">{article.title}</h2>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString('de-DE')}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {article.description}
          </p>
        </motion.a>
      ))}
    </motion.div>
  );
}

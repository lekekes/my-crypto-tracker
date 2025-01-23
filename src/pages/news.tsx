import React, { useState, useEffect } from 'react';
import FilterList from '../components/news/FilterList';
import ArticleList from '../components/news/ArticleList';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Select from '@/components/Select';

const FILTER_OPTIONS = [
  'Bitcoin',
  'Ethereum',
  'DeFi',
  'NFTs',
  'Altcoins',
  'Blockchain',
  'Crypto',
];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('de');
  const [showModal, setShowModal] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const fetchNews = async (queries: string[], lang: string) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = process.env.NEWSAPI_API_KEY;
      if (!apiKey) throw new Error('API-Schlüssel fehlt.');

      const searchTerms = queries.length ? queries.join(' OR ') : 'crypto';

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchTerms,
        )}&sortBy=popularity&pageSize=10&language=${lang}&apiKey=${apiKey}`,
      );

      if (!res.ok) throw new Error('Fehler beim Abrufen der Nachrichten.');

      const data = await res.json();
      const validArticles = data.articles.filter(
        (article: any) =>
          article.title &&
          article.description &&
          article.url &&
          article.urlToImage,
      );

      setArticles(validArticles);
    } catch (error) {
      setError((error as Error).message || 'Unbekannter Fehler.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queries = searchQuery
      ? searchQuery.split(',').map((q) => q.trim())
      : [];
    fetchNews([...queries, ...filters], language);
  };

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const handleResetFilters = () => setShowModal(true);

  const confirmResetFilters = () => {
    setSearchQuery('');
    setFilters([]);
    setLanguage('de');
    localStorage.removeItem('savedNewsSearch');
    fetchNews([], 'de');
    setShowModal(false);
  };

  const handleSaveSearch = () => {
    localStorage.setItem(
      'savedNewsSearch',
      JSON.stringify({ searchQuery, filters, language }),
    );

    setShowSavedMessage(true);

    setTimeout(() => {
      setShowSavedMessage(false);
    }, 2500); // Fade-out nach 2,5 Sekunden
  };

  useEffect(() => {
    const savedData = localStorage.getItem('savedNewsSearch');
    if (savedData) {
      const { searchQuery, filters, language } = JSON.parse(savedData);
      setSearchQuery(searchQuery || '');
      setFilters(filters || []);
      setLanguage(language || 'de');
      fetchNews([...filters, searchQuery].filter(Boolean), language);
    } else {
      fetchNews([], language);
    }
  }, []);

  const languageOptions = [
    { label: 'Deutsch', value: 'de' },
    { label: 'Englisch', value: 'en' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <title>News</title>
      <h1 className="mb-6 text-4xl font-extrabold text-gray-800 dark:text-white">
        Krypto-Nachrichten
      </h1>

      <form onSubmit={handleSearch} className="mb-6 flex items-center gap-4">
        <Input
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Suche (z.B. Bitcoin, Ethereum)"
        />

        <Select
          options={languageOptions}
          value={language}
          onChange={(value) => setLanguage(value)}
          placeholder="Sprache auswählen"
          className="w-40"
        />

        <Button
          type="submit"
          onClick={(e) => handleSearch(e)}
          className="h-[40px] bg-yellow-400 px-4 py-2 hover:bg-yellow-500 focus:ring-yellow-300"
        >
          Suchen
        </Button>
      </form>

      <FilterList
        filters={filters}
        options={FILTER_OPTIONS}
        toggleFilter={toggleFilter}
      />

      <div className="mb-6 flex gap-4">
        <Button
          onClick={handleSaveSearch}
          className="bg-green-500 hover:bg-green-600 focus:ring-green-300"
        >
          Speichern
        </Button>

        <Button
          onClick={handleResetFilters}
          className="bg-red-500 hover:bg-red-600 focus:ring-red-400"
        >
          Filter löschen
        </Button>
      </div>

      <ArticleList loading={loading} error={error} articles={articles} />

      {/* Bestätigungsmeldung */}
      <div
        className={`fade-in-out fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md bg-green-100 px-6 py-4 text-green-800 shadow-lg ${
          showSavedMessage ? 'visible' : ''
        }`}
      >
        Suchkriterien gespeichert!
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmResetFilters}
        title="Filter zurücksetzen"
        description="Sind Sie sicher, dass Sie alle gespeicherten Filter löschen möchten?"
        confirmText="Löschen"
        cancelText="Abbrechen"
      />
    </div>
  );
}

const News = () => {
  const dummyNews = [
    {
      id: 1,
      title: "Bitcoin erreicht neues Hoch!",
      description: "Bitcoin steigt über $30,000.",
      date: "2024-11-27",
    },
    {
      id: 2,
      title: "Ethereum-Upgrade angekündigt",
      description: "Das neue Upgrade bringt viele Verbesserungen.",
      date: "2024-11-26",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Krypto-Nachrichten</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyNews.map((news) => (
          <div
            key={news.id}
            className="p-4 bg-white shadow rounded-lg flex flex-col"
          >
            <h2 className="font-semibold text-lg mb-2">{news.title}</h2>
            <p className="text-gray-500 mb-4">{news.description}</p>
            <p className="text-sm text-gray-400">{news.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

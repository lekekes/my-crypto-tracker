const About = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">About CryptoTrack</h1>
      <p className="text-gray-700">
        CryptoTrack is your all-in-one platform for tracking cryptocurrencies.
        Our mission is to provide users with real-time data, powerful analytics,
        and personalized tools like watchlists and price alerts. Whether you are
        a seasoned trader or a beginner, CryptoTrack is designed to make your
        cryptocurrency journey easier and more informed.
      </p>
      <p className="mt-4 text-gray-700">
        Built with modern technologies like{" "}
        <span className="font-semibold">Next.js</span>,{" "}
        <span className="font-semibold">TypeScript</span>, and{" "}
        <span className="font-semibold">TailwindCSS</span>, CryptoTrack ensures
        a fast and responsive user experience.
      </p>
    </div>
  );
};

export default About;

import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: (params?: any) => Promise<T>,
  autoFetch = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // General fetch function (used for search or specific queries)
  const fetchData = useCallback(
    async (params?: any) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(params);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction],
  );

  const getTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const results = await fetchFunction();

      if (Array.isArray(results)) {
        const sortedByVote = [...(results as any[])].sort(
          (a, b) => b.vote_average - a.vote_average,
        );

        setTrendingMovies(sortedByVote as unknown as T);
      } else {
        setTrendingMovies(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    trendingMovies,
    loading,
    error,
    refetch: fetchData,
    getTrendingMovies,
  };
};

export default useFetch;

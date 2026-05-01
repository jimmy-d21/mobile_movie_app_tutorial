import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const {
    data: movies,
    trendingMovies,
    loading,
    error,
    getTrendingMovies,
  } = useFetch(() => fetchMovies({ query: "" }));

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const renderHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      <SearchBar
        onPress={() => router.push("/search")}
        placeholder="Search for a movie"
      />

      {/* Trending Movies Horizontal Section */}
      {trendingMovies && trendingMovies.length > 0 && (
        <View className="mt-8 flex-1">
          <Text className="text-lg text-white font-bold mb-4">
            Trending Movies
          </Text>
          <FlatList
            data={trendingMovies.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `trending-${item.id}`}
            renderItem={({ item }) => (
              <View className="mr-4 w-30">
                <MovieCard {...item} />
              </View>
            )}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>
      )}

      <Text className="text-lg text-white font-bold mt-8 mb-3">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full z-0" />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ab8bff" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-red-500 text-center">
            Error: {error.message}
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          ListHeaderComponent={renderHeader}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 12,
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

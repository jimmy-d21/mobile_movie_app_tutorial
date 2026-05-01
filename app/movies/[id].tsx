import MovieInfo from "@/components/MovieInfo";
import { icons } from "@/constants/icons";
import { fetchMovieDetailes } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id: movieId } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetailes(movieId as string));

  // Loading State
  if (movieLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size={"large"} className="text-accent" />
      </View>
    );
  }

  // Error or Empty State
  if (movieError || !movieData) {
    return (
      <View className="flex-1 items-center justify-center bg-primary px-5">
        <Text className="text-white text-center">
          {movieError ? movieError.message : "Movie details not found."}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-5 bg-accent px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Poster Image */}
        <View className="w-full">
          <Image
            source={{
              uri: movieData?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        </View>

        {/* Content Section */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-2xl">
            {movieData?.title}
          </Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movieData?.release_date?.split("-")[0] || "N/A"}
            </Text>
          </View>

          {/* Rating Badge */}
          <View className="flex-row items-center bg-dark-200 px-3 py-1.5 rounded-md gap-x-1 mt-3">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movieData?.vote_average ?? 0)} / 10
            </Text>
            <Text className="text-light-200 text-sm ml-1">
              ({movieData?.vote_count || 0} votes)
            </Text>
          </View>

          {/* Detailed Info Components */}
          <MovieInfo label={"Overview"} value={movieData?.overview} />

          <MovieInfo
            label="Genres"
            value={
              movieData?.genres?.map((g: any) => g.name).join(" • ") || "N/A"
            }
          />

          {/* Budget & Revenue Row */}
          <View className="flex-row items-center justify-between w-full mt-2">
            <View className="flex-1">
              <MovieInfo
                label="Budget"
                value={
                  movieData?.budget
                    ? `$${(movieData.budget / 1_000_000).toFixed(1)}M`
                    : "N/A"
                }
              />
            </View>
            <View className="flex-1">
              <MovieInfo
                label="Revenue"
                value={
                  movieData?.revenue
                    ? `$${(movieData.revenue / 1_000_000).toFixed(1)}M`
                    : "N/A"
                }
              />
            </View>
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movieData?.production_companies
                ?.map((c: any) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      {/* Floating Back Button */}
      <View className="absolute bottom-5 left-0 right-0 px-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-accent rounded-xl py-4 flex flex-row items-center justify-center shadow-lg"
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-2 rotate-180"
            tintColor={"#fff"}
          />
          <Text className="text-white font-bold text-base">Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDetails;

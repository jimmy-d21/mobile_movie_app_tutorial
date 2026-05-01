import React from "react";
import { Text, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 text-sm font-normal">{label}</Text>
      <Text className="text-light-200 text-sm font-normal mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

export default MovieInfo;

import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-3">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#ab8bff"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;

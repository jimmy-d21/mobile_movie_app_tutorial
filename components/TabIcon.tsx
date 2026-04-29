import { TabIconProps } from "@/interfaces/interfaces";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ bgImage, icon, title, focused }: TabIconProps) => {
  return focused ? (
    <ImageBackground
      source={bgImage}
      className="flex flex-row w-full flex-1 min-w-[112px] min-h-15 mt-4 justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor={"#151312"} className="size-5" />
      {focused && (
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      )}
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor={"#A8B5DB"} className="size-5" />
    </View>
  );
};

export default TabIcon;

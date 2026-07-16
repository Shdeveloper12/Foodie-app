import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#E7DFD3]">
      <StatusBar barStyle="dark-content" backgroundColor="#E7DFD3" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow px-5 pb-8 pt-4">
        <View className="flex-1 justify-between rounded-[32px] bg-[#E7DFD3] px-3 py-3">
          <View className="items-center pt-8">
            <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-sm">
              <Image
                source={require("../../assets/images/icon-256x256.png")}
                className="h-16 w-16 rounded-[20px]"
                resizeMode="cover"
              />
            </View>

            <Text className="mt-6 text-center text-[34px] font-semibold tracking-[-1px] text-[#171511]">
              Travel smarter.
            </Text>
            <Text className="mt-3 max-w-[290px] text-center text-[15px] leading-[22px] text-[#6F685F]">
              Sign in or create an account to explore hotels, flights, and car hire in one place.
            </Text>

            <View className="mt-8 w-full gap-3 px-2">
              <View className="rounded-[28px] bg-white px-4 py-4 shadow-sm">
                <Text className="text-[13px] font-semibold uppercase tracking-[1.6px] text-[#7A7268]">
                  What you get
                </Text>
                <Text className="mt-2 text-[15px] leading-[22px] text-[#1B1916]">
                  Live location, curated stays, and a fast search flow designed for travel planning.
                </Text>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 rounded-[24px] bg-white px-4 py-4">
                  <Text className="text-[22px] font-semibold text-[#1B1916]">120+</Text>
                  <Text className="mt-1 text-[12px] text-[#6F685F]">destinations</Text>
                </View>
                <View className="flex-1 rounded-[24px] bg-white px-4 py-4">
                  <Text className="text-[22px] font-semibold text-[#1B1916]">24/7</Text>
                  <Text className="mt-1 text-[12px] text-[#6F685F]">trip support</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-3 px-2 pb-3">
            <Pressable
              onPress={() => router.push("/login")}
              className="items-center justify-center rounded-full bg-[#111111] px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#F5EFE4]">Login</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/register")}
              className="items-center justify-center rounded-full border border-[#1f1a17] bg-transparent px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#1B1916]">Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useState } from "react";
import { Image, Pressable, ScrollView, StatusBar, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "none"];

  return (
    <SafeAreaView className="flex-1 bg-[#E7DFD3]">
      <StatusBar barStyle="dark-content" backgroundColor="#E7DFD3" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow px-5 pb-8 pt-4">
        <View className="flex-1 justify-between rounded-[32px] bg-[#E7DFD3] px-3 py-3">
          <View className="pb-5">
            <Pressable onPress={() => router.back()} className="mb-6 self-start rounded-full bg-white px-4 py-2">
              <Text className="text-[13px] font-semibold text-[#1B1916]">Back</Text>
            </Pressable>

            <View className="items-center">
              <Image
                source={require("../../assets/images/icon-256x256.png")}
                className="h-20 w-20 rounded-[22px]"
                resizeMode="cover"
              />
              <Text className="mt-6 text-center text-[32px] font-semibold text-[#171511]">Create account</Text>
              <Text className="mt-2 max-w-[280px] text-center text-[15px] leading-[22px] text-[#6F685F]">
                Join to unlock the hotel, tour, and flight experience in one place.
              </Text>
            </View>

            <View className="mt-8 gap-3">
              <View className="rounded-[24px] bg-white px-4 py-4 border-[2px] border-[#e6cfac]">
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">Full name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Agnes Carter"
                  placeholderTextColor="#8E867B"
                  className="mt-2 text-[15px] text-[#1B1916]"
                />
              </View>
              <View className="rounded-[24px] border-[2px] border-[#e6cfac] bg-white px-4 py-4">
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">
                  Blood Group
                </Text>

                <View className="mt-3 flex-row flex-wrap gap-2">
                  {bloodGroups.map((group) => {
                    const isSelected = bloodGroup === group;

                    return (
                      <Pressable
                        key={group}
                        onPress={() => setBloodGroup(group)}
                        className={
                          isSelected
                            ? "rounded-full bg-[#111111] px-4 py-2"
                            : "rounded-full border border-[#e6cfac] bg-[#fffaf3] px-4 py-2"
                        }
                      >
                        <Text
                          className={
                            isSelected
                              ? "text-[13px] font-semibold text-[#F5EFE4]"
                              : "text-[13px] font-semibold text-[#1B1916]"
                          }
                        >
                          {group}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Text className="mt-3 text-[12px] text-[#6F685F]">
                  Selected: {bloodGroup || "Choose your blood group"}
                </Text>
              </View>

              <View className="rounded-[24px] bg-white px-4 py-4 border-[2px] border-[#e6cfac]">
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#8E867B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="mt-2 text-[15px] text-[#1B1916]"
                />
              </View>

              <View className="rounded-[24px] bg-white px-4 py-4 border-[2px] border-[#e6cfac]">
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#8E867B"
                  secureTextEntry
                  className="mt-2 text-[15px] text-[#1B1916]"
                />
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Pressable
              onPress={() => router.replace("/home")}
              className="items-center justify-center rounded-full bg-[#111111] px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#F5EFE4]">Register</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/login")}
              className="items-center justify-center rounded-full border border-[#1f1a17] bg-transparent px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#1B1916]">I already have an account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

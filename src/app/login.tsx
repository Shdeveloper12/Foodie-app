import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required *");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required *");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      Alert.alert("Success", "Logging in...");
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E7DFD3]">
      <StatusBar barStyle="dark-content" backgroundColor="#E7DFD3" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow px-5 pb-8 pt-4">
        <View className="flex-1 justify-between rounded-[32px] bg-[#E7DFD3] px-3 py-3">
          <View>
            <Pressable onPress={() => router.back()} className="mb-6 self-start rounded-full bg-white px-4 py-2">
              <Text className="text-[13px] font-semibold text-[#1B1916]">Back</Text>
            </Pressable>

            <View className="items-center">
              <Image
                source={require("../../assets/images/icon-256x256.png")}
                className="h-20 w-20 rounded-[22px]"
                resizeMode="cover"
              />
              <Text className="mt-6 text-center text-[32px] font-semibold text-[#171511]">Welcome back</Text>
              <Text className="mt-2 max-w-[280px] text-center text-[15px] leading-[22px] text-[#6F685F]">
                Sign in to continue exploring hotels, flights, and places around you.
              </Text>
            </View>

            <View className="mt-8 gap-3">
              <View className={emailError ? "rounded-[24px] border border-[#D97757] bg-white px-4 py-4" : "rounded-[24px] border-[2px] border-[#e6cfac] bg-white px-4 py-4"}>
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">
                  Email
                </Text>
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
              {emailError ? <Text className="-mt-2 px-1 text-[12px] font-medium text-[#D97757]">{emailError}</Text> : null}

              <View className={passwordError ? "rounded-[24px] border border-[#D97757] bg-white px-4 py-4" : "rounded-[24px] border-[2px] border-[#e6cfac] bg-white px-4 py-4"}>
                <Text className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#7e7263]">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#8E867B"
                  secureTextEntry
                  autoCapitalize="none"
                  className="mt-2 text-[15px] text-[#1B1916]"
                />
              </View>
              {passwordError ? <Text className="-mt-2 px-1 text-[12px] font-medium text-[#D97757]">{passwordError}</Text> : null}

              <Pressable className="self-end px-1 py-1">
                <Text className="text-[13px] font-semibold text-[#1B1916]">Forgot password?</Text>
              </Pressable>
            </View>
          </View>

          <View className="gap-3">
            <Pressable
              onPress={handleLogin}
              className="items-center justify-center rounded-full bg-[#111111] px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#F5EFE4]">Login</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/register")}
              className="items-center justify-center rounded-full border border-[#1f1a17] bg-transparent px-5 py-4 active:opacity-90"
            >
              <Text className="text-[15px] font-semibold text-[#1B1916]">Create account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

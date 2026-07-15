import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [highlightsY, setHighlightsY] = useState(0);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const scrollToHighlights = () => {
    scrollViewRef.current?.scrollTo({ y: Math.max(0, highlightsY - 20), animated: true });
  };

  const closeScanner = () => {
    setScannerVisible(false);
    setHasScanned(false);
    setScanResult(null);
  };

  const openScanner = async () => {
    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: "Verify with fingerprint to scan food",
      cancelLabel: "Cancel",
      fallbackLabel: "Use device lock",
      disableDeviceFallback: false,
    });

    if (!authResult.success) {
      Alert.alert("Verification needed", "Fingerprint verification is required before scanning food.");
      return;
    }

    const permission = cameraPermission ?? (await requestCameraPermission());

    if (!permission.granted) {
      Alert.alert("Camera permission", "Allow camera access to scan food labels and QR codes.");
      return;
    }

    setHasScanned(false);
    setScanResult(null);
    setScannerVisible(true);
  };

  const handleBarcodeScanned = ({ data, type }: { data: string; type: string }) => {
    if (hasScanned) {
      return;
    }

    setHasScanned(true);
    setScanResult(`Matched ${type.toUpperCase()}: ${data}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#100B0A]">
      <StatusBar barStyle="light-content" backgroundColor="#100B0A" />
      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="flex-grow bg-[#100B0A]"
        showsVerticalScrollIndicator={false}
      >
        <View className="absolute -right-[90px] -top-10 h-[260px] w-[260px] rounded-full bg-[rgba(255,167,38,0.18)]" />
        <View className="absolute left-[-110px] top-[220px] h-[280px] w-[280px] rounded-full bg-[rgba(231,111,81,0.14)]" />

        <View className="flex-1 gap-6 px-5 pb-9 pt-4">
          <View className="self-start flex-row items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-2.5">
            <View className="h-5 w-5 rounded-full bg-[#FFB703]" />
            <Text className="text-[13px] font-semibold tracking-[0.2px] text-[#F6EDE8]">
              Fresh meals, fast delivery
            </Text>
          </View>

          <View
            className={
              isWide
                ? "gap-6 lg:flex-row lg:items-center lg:gap-6"
                : "gap-5"
            }
          >
            <View className={isWide ? "gap-4 lg:flex-[1.15]" : "gap-4"}>
              <Text className="text-sm font-bold uppercase tracking-[2.2px] text-[#FFB703]">
                Foodie App
              </Text>
              <Text className="text-[46px] font-extrabold leading-[50px] tracking-[-1.2px] text-[#FFF8F2]">
                Discover dishes worth craving.
              </Text>
              <Text className="max-w-[560px] text-base leading-6 text-[#D8CBC4]">
                Curated menus, chef-level presentation, and a smooth delivery
                flow designed for hungry people who want the good stuff fast.
              </Text>

              <View
                className={
                  isWide ? "gap-3 lg:flex-row lg:flex-wrap" : "gap-3"
                }
              >
                <Pressable
                  onPress={scrollToHighlights}
                  className="items-center justify-center rounded-[18px] bg-[#FFB703] px-[18px] py-[15px] active:scale-[0.98] active:opacity-90"
                >
                  <Text className="text-[15px] font-extrabold text-[#1A120E]">
                    Explore the menu
                  </Text>
                </Pressable>

                <Pressable
                  className="items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] px-[18px] py-[15px] active:scale-[0.98] active:opacity-90"
                  onPress={openScanner}
                >
                  <Text className="text-[15px] font-bold text-[#FFF8F2]">
                    Scan food
                  </Text>
                  <Text className="mt-1 text-[11px] font-medium text-[#D8CBC4]">
                    Fingerprint required
                  </Text>
                </Pressable>
              </View>

              <View className="flex-row flex-wrap gap-3">
                <View className="min-w-[108px] flex-1 rounded-[20px] border border-white/[0.08] bg-white/[0.07] p-4">
                  <Text className="mb-1 text-[22px] font-extrabold text-[#FFF8F2]">
                    4.9
                  </Text>
                  <Text className="text-[13px] leading-[18px] text-[#D8CBC4]">
                    average rating
                  </Text>
                </View>
                <View className="min-w-[108px] flex-1 rounded-[20px] border border-white/[0.08] bg-white/[0.07] p-4">
                  <Text className="mb-1 text-[22px] font-extrabold text-[#FFF8F2]">
                    25 min
                  </Text>
                  <Text className="text-[13px] leading-[18px] text-[#D8CBC4]">
                    delivery time
                  </Text>
                </View>
                <View className="min-w-[108px] flex-1 rounded-[20px] border border-white/[0.08] bg-white/[0.07] p-4">
                  <Text className="mb-1 text-[22px] font-extrabold text-[#FFF8F2]">
                    120+
                  </Text>
                  <Text className="text-[13px] leading-[18px] text-[#D8CBC4]">
                    chef picks
                  </Text>
                </View>
              </View>
            </View>

            <View className="relative flex-1 min-h-[430px] items-center justify-center">
              <View className="absolute h-[280px] w-[280px] rounded-full bg-[rgba(255,183,3,0.15)] [transform:scaleX(1.1)]" />
              <View className="w-full max-w-[420px] rounded-[30px] border border-white/10 bg-[rgba(20,14,12,0.92)] p-[18px] shadow-[0_18px_28px_rgba(0,0,0,0.24)]">
                <View className="mb-3.5 flex-row items-center justify-between">
                  <Text className="text-xs font-bold uppercase tracking-[1.4px] text-[#CDBFB6]">
                    Tonight&apos;s feature
                  </Text>
                  <Text className="text-2xl font-extrabold text-[#FFB703]">
                    $18
                  </Text>
                </View>

                <View className="flex h-[250px] items-center justify-center overflow-hidden rounded-[24px] bg-white/[0.04]">
                  <Image
                    source={require("../../assets/images/logo-glow.png")}
                    className="h-[220px] w-[220px] opacity-[0.98]"
                    resizeMode="contain"
                  />
                </View>

                <Text className="mt-4 text-[22px] font-extrabold text-[#FFF8F2]">
                  Crispy bowl deluxe
                </Text>
                <Text className="mt-2 text-sm leading-[21px] text-[#D8CBC4]">
                  Warm grains, roasted vegetables, citrus glaze, and a final
                  hit of herbs for the last bite.
                </Text>

                <View className="mt-4 flex-row flex-wrap gap-2.5">
                  <View className="rounded-full bg-white/[0.08] px-3 py-2">
                    <Text className="text-xs font-bold text-[#FFF8F2]">
                      Chef curated
                    </Text>
                  </View>
                  <View className="rounded-full bg-white/[0.08] px-3 py-2">
                    <Text className="text-xs font-bold text-[#FFF8F2]">
                      Delivery ready
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            onLayout={(event) => setHighlightsY(event.nativeEvent.layout.y)}
            className="gap-4"
          >
            <View className="gap-2">
              <Text className="text-2xl font-extrabold tracking-[-0.4px] text-[#FFF8F2]">
                Why people keep coming back
              </Text>
              <Text className="max-w-[600px] text-[15px] leading-[22px] text-[#D8CBC4]">
                Built around speed, taste, and a clean ordering experience.
              </Text>
            </View>

            <View
              className={
                isWide ? "gap-3 lg:flex-row" : "gap-3"
              }
            >
              <View className="flex-1 gap-2.5 rounded-[24px] border border-white/[0.08] bg-white/[0.06] p-[18px]">
                <Text className="text-[13px] font-extrabold tracking-[2px] text-[#FFB703]">
                  01
                </Text>
                <Text className="text-[18px] font-extrabold text-[#FFF8F2]">
                  Smart curation
                </Text>
                <Text className="text-sm leading-[21px] text-[#D8CBC4]">
                  The best dishes are surfaced first, so the menu feels focused
                  instead of overwhelming.
                </Text>
              </View>
              <View className="flex-1 gap-2.5 rounded-[24px] border border-white/[0.08] bg-white/[0.06] p-[18px]">
                <Text className="text-[13px] font-extrabold tracking-[2px] text-[#FFB703]">
                  02
                </Text>
                <Text className="text-[18px] font-extrabold text-[#FFF8F2]">
                  Fast checkout
                </Text>
                <Text className="text-sm leading-[21px] text-[#D8CBC4]">
                  Clean calls to action, clear pricing, and a flow that gets you
                  from craving to order in seconds.
                </Text>
              </View>
              <View className="flex-1 gap-2.5 rounded-[24px] border border-white/[0.08] bg-white/[0.06] p-[18px]">
                <Text className="text-[13px] font-extrabold tracking-[2px] text-[#FFB703]">
                  03
                </Text>
                <Text className="text-[18px] font-extrabold text-[#FFF8F2]">
                  Polished delivery
                </Text>
                <Text className="text-sm leading-[21px] text-[#D8CBC4]">
                  Status, timing, and presentation stay visible so the whole
                  experience feels dependable.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={scannerVisible} animationType="slide" onRequestClose={closeScanner}>
        <SafeAreaView className="flex-1 bg-black">
          <StatusBar barStyle="light-content" />

          <View className="flex-1 px-5 pb-6 pt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-[22px] font-extrabold text-white">
                  Food Scanner
                </Text>
                <Text className="mt-1 text-[13px] text-[#C9C3BE]">
                  Fingerprint verified before scan
                </Text>
              </View>

              <Pressable
                onPress={closeScanner}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2"
              >
                <Text className="text-sm font-semibold text-white">Close</Text>
              </Pressable>
            </View>

            <View className="flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-[#130D0B]">
              {cameraPermission?.granted ? (
                <CameraView
                  className="flex-1"
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "code128"],
                  }}
                  onBarcodeScanned={handleBarcodeScanned}
                >
                  <View className="flex-1 items-center justify-between bg-black/35 px-5 py-6">
                    <View className="w-full rounded-[20px] border border-white/10 bg-black/45 px-4 py-3">
                      <Text className="text-center text-sm font-semibold text-white">
                        Point the camera at a food label or QR code
                      </Text>
                    </View>

                    <View className="h-[240px] w-[240px] rounded-[30px] border-2 border-[#FFB703] bg-transparent" />

                    <View className="w-full gap-3 rounded-[24px] border border-white/10 bg-black/45 p-4">
                      <View className="flex-row items-center gap-3">
                        <ActivityIndicator color="#FFB703" />
                        <Text className="flex-1 text-[13px] leading-[18px] text-[#D8CBC4]">
                          {hasScanned ? "Scan captured" : "Ready to scan"}
                        </Text>
                      </View>

                      <Text className="text-[18px] font-extrabold text-white">
                        {scanResult ?? "Waiting for a barcode or QR code..."}
                      </Text>
                    </View>
                  </View>
                </CameraView>
              ) : (
                <View className="flex-1 items-center justify-center gap-4 px-6">
                  <Text className="text-center text-lg font-semibold text-white">
                    Camera permission is needed to scan food.
                  </Text>
                  <Pressable
                    onPress={async () => {
                      const permission = await requestCameraPermission();
                      if (!permission.granted) {
                        Alert.alert("Camera permission", "You need to allow the camera to use the scanner.");
                      }
                    }}
                    className="rounded-[18px] bg-[#FFB703] px-5 py-3"
                  >
                    <Text className="text-sm font-bold text-[#1A120E]">
                      Grant camera access
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>

            {scanResult ? (
              <View className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.06] p-4">
                <Text className="text-[13px] font-semibold uppercase tracking-[1.6px] text-[#FFB703]">
                  Verified scan
                </Text>
                <Text className="mt-2 text-[16px] leading-[22px] text-white">
                  {scanResult}
                </Text>
              </View>
            ) : null}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

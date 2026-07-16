import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";

import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowUpRight,
  Bell,
  Building2,
  CarFront,
  Heart,
  MapPin,
  Plane,
  Search,
  Star,
} from "lucide-react-native";

const categories = [
  { label: "Flight", icon: Plane, active: false },
  { label: "Hotel", icon: Building2, active: true },
  { label: "Car Hire", icon: CarFront, active: false },
  { label: "Bike", icon: MapPin, active: false },
];

const featuredPlaces = [
  {
    rating: "4.9",
    name: "Pine Ridge Retreat",
    price: "$220",
    unit: "/night",
    details: "1 room, 2 adults, 1 children",
    tint: "#D6C3A3",
  },
  {
    rating: "5.0",
    name: "Harbor Line Suites",
    price: "$180",
    unit: "/night",
    details: "2 rooms, 3 adults, breakfast included",
    tint: "#8A6A43",
  },
];

type LiveLocation = {
  label: string;
  details: string;
};

const locationFallback: LiveLocation = {
  label: "Locating your stay...",
  details: "Waiting for device location",
};

function CategoryChip({
  label,
  icon: Icon,
  active,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  active: boolean;
}) {
  return (
    <Pressable
      className={
        active
          ? "flex-row items-center gap-2 rounded-full border border-[#111111] bg-[#111111] px-4 py-2.5"
          : "flex-row items-center gap-2 rounded-full border border-[#1f1a17] bg-[#f5efe4] px-4 py-2.5"
      }
    >
      <Icon size={16} color={active ? "#F5EFE4" : "#1f1a17"} />
      <Text
        className={
          active
            ? "text-[13px] font-semibold text-[#F5EFE4]"
            : "text-[13px] font-semibold text-[#1f1a17]"
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}

function HotelCard({
  rating,
  name,
  price,
  unit,
  details,
  tint,
  index,
}: {
  rating: string;
  name: string;
  price: string;
  unit: string;
  details: string;
  tint: string;
  index: number;
}) {
  return (
    <View className="overflow-hidden rounded-[28px] bg-white">
      <View className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#2B2B2B]">
        <View className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-2">
          <View className="flex-row items-center gap-1">
            <Star size={15} fill="#111111" color="#111111" />
            <Text className="text-[15px] font-semibold text-[#111111]">
              {rating}
            </Text>
          </View>
        </View>

        <Pressable className="absolute right-3 top-3 z-10 h-11 w-11 items-center justify-center rounded-full bg-white">
          <Heart size={17} color="#111111" fill="#111111" />
        </Pressable>

        <View className="absolute inset-x-0 bottom-0 h-[150px] bg-[rgba(0,0,0,0.05)]" />
        <View className="absolute left-[-20px] top-16 h-24 w-24 rounded-[18px] bg-[#111111]" />
        <View className="absolute left-[70px] top-12 h-40 w-40 rounded-[20px] bg-[#4A4A4A]" />
        <View className="absolute right-[-4px] top-24 h-28 w-28 rounded-[20px] bg-[#5B5B5B]" />
        <View className="absolute bottom-16 left-8 h-14 w-44 rounded-[18px] bg-[#1A1A1A]" />
        <View
          className="absolute bottom-8 right-9 h-24 w-20 rounded-[18px] border-[5px] bg-[#2E2E2E]"
          style={{ borderColor: tint }}
        />
        <View className="absolute bottom-10 left-24 h-9 w-9 rounded-full bg-white" />
        <View className="absolute left-32 top-8 h-16 w-16 rounded-[16px] bg-[#2A2A2A]" />
        <Image
          source={require("../../assets/images/logo-glow.png")}
          resizeMode="contain"
          className="absolute left-[40px] top-[40px] h-[150px] w-[150px] opacity-[0.14]"
        />
      </View>

      <View className="-mt-8 rounded-[26px] bg-[rgba(214,195,163,0.72)] px-4 pb-4 pt-4">
        <Text className="text-[22px] font-semibold text-white">{name}</Text>
        <View className="mt-2 flex-row items-end gap-1">
          <Text className="text-[28px] font-semibold tracking-[-0.7px] text-white">
            {price}
          </Text>
          <Text className="pb-1 text-[14px] font-medium text-white/90">
            {unit}
          </Text>
        </View>
        <Text className="mt-3 text-[13px] font-medium text-white/90">
          {details}
        </Text>

        <View className="mt-4 flex-row items-center justify-end">
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white">
            <ArrowUpRight size={18} color="#111111" />
          </Pressable>
        </View>
      </View>

      {index === 1 ? (
        <View className="-mt-2 h-[160px] overflow-hidden rounded-b-[28px] bg-[#5a5148]">
          <View className="absolute left-6 top-6 h-24 w-44 rounded-t-[18px] bg-[#8a5f33]" />
          <View className="absolute left-12 top-16 h-12 w-32 rounded-t-[10px] bg-[#E6D6BD]" />
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-[#2c2320]" />
        </View>
      ) : null}
    </View>
  );
}

export default function Index() {
  const [liveLocation, setLiveLocation] = useState<LiveLocation>(locationFallback);

  useEffect(() => {
    let active = true;
    let subscription: Location.LocationSubscription | null = null;

    const updateLiveLocation = async (position: Location.LocationObject) => {
      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const placeLabel =
        [place?.city, place?.region].filter(Boolean).join(", ") ||
        [place?.subregion, place?.region].filter(Boolean).join(", ") ||
        [place?.district, place?.country].filter(Boolean).join(", ") ||
        "Current location";

      const detailLabel = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;

      if (active) {
        setLiveLocation({
          label: placeLabel,
          
        });
      }
    };

    const startLocationTracking = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        if (active) {
          setLiveLocation({
            label: "Location unavailable",
            details: "Enable location permission to show where you are now",
          });
        }

        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      await updateLiveLocation(currentPosition);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 20,
          timeInterval: 10000,
        },
        updateLiveLocation,
      );
    };

    void startLocationTracking();

    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#E7DFD3]">
      <StatusBar barStyle="dark-content" backgroundColor="#E7DFD3" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-6 pt-2"
      >
        <View className="rounded-[32px] bg-[#E7DFD3] px-2 pb-6 pt-2">
          <View className="flex-row items-center justify-between px-2">
            <View className="flex-row items-center gap-3">
              <Image
                source={require("../../assets/images/react-logo.png")}
                className="h-12 w-12 rounded-full"
                resizeMode="cover"
              />
              <View>
                <Text className="text-[22px] font-semibold text-[#1B1916]">
                  Hello, Agnes
                </Text>
                <Text className="mt-1 text-[13px] text-[#6F685F]">
                  Where to today, Agnes?
                </Text>
              </View>
            </View>

            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Bell size={20} color="#111111" />
            </Pressable>
          </View>

          <View className="mt-5 flex-row items-center gap-3 px-2">
            <View className="flex-1 flex-row items-center gap-2 rounded-full bg-white px-4 py-4">
              <MapPin size={18} color="#111111" />
              <View className="flex-1">
               
                <Text className="text-[14px] font-medium text-[#1B1916]">
                  {liveLocation.label}
                </Text>
               
              </View>
            </View>
            <Pressable className="h-[58px] w-[58px] items-center justify-center rounded-full bg-white">
              <Search size={20} color="#111111" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 px-2 pt-5"
          >
            {categories.map((category) => (
              <CategoryChip
                key={category.label}
                label={category.label}
                icon={category.icon}
                active={category.active}
              />
            ))}
          </ScrollView>

          <View className="mt-6 flex-row items-center justify-between px-2">
            <Text className="text-[22px] font-semibold text-[#171511]">
              Top Rated Hotels
            </Text>
            <Pressable className="rounded-full bg-white px-4 py-2">
              <Text className="text-[12px] font-medium text-[#171511]">
                View all ↗
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 gap-4 px-1">
            {featuredPlaces.map((place, index) => (
              <HotelCard key={place.name} {...place} index={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

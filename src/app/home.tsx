import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

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

type Category = {
  label: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  active: boolean;
};

type Place = {
  rating: string;
  name: string;
  location: string;
  price: string;
  unit: string;
  details: string;
  tint: string;
};

type LiveLocation = {
  label: string;
  details: string;
};

const categories: Category[] = [
  { label: "Flight", icon: Plane, active: false },
  { label: "Hotel", icon: Building2, active: true },
  { label: "Car Hire", icon: CarFront, active: false },
  { label: "Bike", icon: MapPin, active: false },
];

const featuredPlaces: Place[] = [
  {
    rating: "4.9",
    name: "Pine Ridge Retreat",
    location: "Paris, France",
    price: "$220",
    unit: "/night",
    details: "1 room, 2 adults, 1 children",
    tint: "#D6C3A3",
  },
  {
    rating: "5.0",
    name: "Harbor Line Suites",
    location: "Barcelona, Spain",
    price: "$180",
    unit: "/night",
    details: "2 rooms, 3 adults, breakfast included",
    tint: "#8A6A43",
  },
];

const locationFallback: LiveLocation = {
  label: "Locating your stay...",
  details: "Waiting for device location",
};

function CategoryChip({ label, icon: Icon, active }: Category) {
  return (
    <Pressable
      className={
        active
          ? "flex-row items-center gap-2 rounded-full border border-[#111111] bg-[#111111] px-4 py-2.5"
          : "flex-row items-center gap-2 rounded-full border border-[#1f1a17] bg-[#f5efe4] px-4 py-2.5"
      }
    >
      <Icon size={16} color={active ? "#F5EFE4" : "#1f1a17"} />
      <Text className={active ? "text-[13px] font-semibold text-[#F5EFE4]" : "text-[13px] font-semibold text-[#1f1a17]"}>
        {label}
      </Text>
    </Pressable>
  );
}

function HotelCard({ place, index }: { place: Place; index: number }) {
  return (
    <View className="overflow-hidden rounded-[28px] bg-white">
      <View className="relative h-[230px] overflow-hidden rounded-[28px] bg-[#2B2B2B]">
       

      

     
       
      </View>

      <View className="-mt-64 rounded-[26px] bg-[rgba(214,195,163,0.72)] px-4 pb-4 pt-4">
         <View className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-2">
          <View className="flex-row items-center gap-1">
            <Star size={15} fill="#111111" color="#111111" />
            <Text className="text-[15px] font-semibold text-[#111111] ">{place.rating}</Text>
          </View>
        </View>
          <Pressable className="absolute right-3 top-3 z-10 h-11 w-11 items-center justify-center rounded-full bg-white">
          <Heart size={17} color="#111111" fill="#111111" />
        </Pressable>
        <Text className="text-[22px] font-semibold text-white mt-10">{place.name}</Text>
        <Text className="mt-1 text-[13px] font-medium text-white/90">{place.location}</Text>
        <View className="mt-2 flex-row items-end gap-1">
          <Text className="text-[28px] font-semibold tracking-[-0.7px] text-white">{place.price}</Text>
          <Text className="pb-1 text-[14px] font-medium text-white/90">{place.unit}</Text>
        </View>
        <Text className="mt-3 text-[13px] font-medium text-white/90">{place.details}</Text>
        

        <View className="flex-row items-center justify-end">
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white">
            <ArrowUpRight size={18} color="#111111" />
          </Pressable>
        </View>
      </View>

     
    </View>
  );
}

export default function HomeScreen() {
  const [liveLocation, setLiveLocation] = useState<LiveLocation>(locationFallback);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchAnim = useRef(new Animated.Value(0)).current;

  const filteredPlaces = featuredPlaces.filter((place) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return [place.name, place.location, place.details].some((value) =>
      value.toLowerCase().includes(query),
    );
  });

  const openSearch = () => {
    setSearchVisible(true);
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const closeSearch = () => {
    Animated.timing(searchAnim, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setSearchVisible(false);
        setSearchQuery("");
      }
    });
  };

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
          details: detailLabel,
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-4 pb-6 pt-2">
        <View className="rounded-[32px] bg-[#E7DFD3] px-2 pb-6 pt-2">
          <View className="flex-row items-center justify-between px-2">
            <View className="flex-row items-center gap-3">
              <Image
                source={require("../../assets/images/icon-256x256.png")}
                className="h-12 w-12 rounded-full"
                resizeMode="cover"
              />
              <View>
                <Text className="text-[22px] font-semibold text-[#1B1916]">Hello, Agnes</Text>
                <Text className="mt-1 text-[13px] text-[#6F685F]">Where to today, Agnes?</Text>
              </View>
            </View>

            <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Bell size={20} color="#111111" />
            </Pressable>
          </View>

          <View className="mt-5 flex-row items-center gap-3 px-2">
            <View className="flex-1 flex-row items-start gap-2 rounded-full bg-white px-4 py-4">
              <MapPin size={18} color="#111111" />
              <View className="flex-1">
                
                <Text className="text-[14px] font-medium text-[#1B1916]">{liveLocation.label}</Text>
               
              </View>
            </View>

            <Pressable
              onPress={searchVisible ? closeSearch : openSearch}
              className="h-[58px] w-[58px] items-center justify-center rounded-full bg-white"
            >
              <Search size={20} color="#111111" />
            </Pressable>
          </View>

          <Animated.View
            className="px-2"
            style={{
              opacity: searchAnim,
              maxHeight: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 68] }),
              transform: [
                {
                  translateY: searchAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }),
                },
              ],
            }}
          >
            {searchVisible ? (
              <View className="mt-3 flex-row items-center gap-3 rounded-full border border-[#E0D5C6] bg-white px-4 py-3.5">
                <Search size={18} color="#111111" />
                <TextInput
                  autoFocus
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search any tour place"
                  placeholderTextColor="#8E867B"
                  className="flex-1 py-2 text-[14px] text-[#1B1916]"
                />
                <Pressable onPress={closeSearch} hitSlop={10}>
                  <Text className="text-[13px] font-semibold text-[#1B1916]">Close</Text>
                </Pressable>
              </View>
            ) : null}
          </Animated.View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 px-2 pt-5">
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
            <Text className="text-[22px] font-semibold text-[#171511]">Top Rated Hotels</Text>
            <Pressable className="rounded-full bg-white px-4 py-2">
              <Text className="text-[12px] font-medium text-[#171511]">View all ↗</Text>
            </Pressable>
          </View>

          <View className="mt-4 gap-4 px-1">
            {filteredPlaces.map((place, index) => (
              <HotelCard key={place.name} place={place} index={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useRouter } from "expo-router"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import logo from "../assets/images/logo.png"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Index() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token")

        if (token) {
          router.replace("/(tabs)/home")
        }

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    };

    checkToken()
  }, [router])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image source={logo} className="w-32 h-32 mb-6" />
      <Text className="text-black text-6xl font-semibold mb-3">PetHelper</Text>
      <Text className="text-gray-400 text-2xl font-bold">Забота о ваших питомцев</Text>
      <Text className="text-gray-400 text-center text-sm mt-2 w-9/12">
        Приложение для управления здоровьем и благополучием ваших любимых питомцев.
      </Text>

      <TouchableOpacity
        className="bg-black w-9/12 py-3 rounded-2xl shadow-md shadow-black/20 active:opacity-80 my-6"
        onPress={() => router.push("login")}
      >
        <Text className="text-white text-center text-lg font-semibold">Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-200 w-9/12 py-3 rounded-2xl border border-gray-300 shadow-sm shadow-gray-300 active:bg-gray-100"
        onPress={() => router.push("register")}
      >
        <Text className="text-black text-center text-lg font-semibold">Зарегистрироваться</Text>
      </TouchableOpacity>

      <Text className="text-gray-400 text-center text-sm mt-4">
        Нажимая "Войти" или "Зарегистрироваться", вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности.
      </Text>
    </View>
  );
}

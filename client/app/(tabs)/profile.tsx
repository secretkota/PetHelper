import { TuserResponse } from '@/types/form.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import React, { use, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function profile() {
  const router = useRouter()
  const logout = async () => {
    await AsyncStorage.removeItem('token')
    router.replace('/')
  }

const [userInfo, setUserInfo] = useState<TuserResponse | null>(null);

useEffect(() => {
  const fetchName = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) return router.replace('/');

      const decoded = jwtDecode(token) as TuserResponse
      setUserInfo(decoded);
    } catch (error) {
      console.error("Ошибка декодирования токена:", error)
    }
  };

  fetchName();
}, []);

  return (
    <View className="flex-1 bg-white px-6 pt-16">

      <View className="items-center mb-5">
        <Image
          source={{ uri: "https://i.pravatar.cc/200" }}
          className="w-48 h-48 rounded-full mb-4"
        />
        <Text className="text-2xl font-semibold">{userInfo?.name}</Text>
        <Text className="text-gray-500 text-base mt-1">@{userInfo?.username}</Text>
      </View>

      <View className="bg-gray-100 rounded-2xl p-5 mb-6">
        <Text className="text-lg font-semibold mb-3">Информация</Text>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-700">Email:</Text>
          <Text className="font-medium">{userInfo?.email}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-700">Телефон:</Text>
          <Text className="font-medium">+ (373) *** ***</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-700">Дата регистрации:</Text>
          <Text className="font-medium">12.03.2025</Text>
        </View>
      </View>

      <View className="bg-gray-100 rounded-2xl p-5 mb-10">
        <Text className="text-lg font-semibold mb-3">Настройки</Text>

        <TouchableOpacity className="py-3">
          <Text className="text-blue-600 font-medium">Изменить профиль</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-3">
          <Text className="text-blue-600 font-medium">Сменить пароль</Text>
        </TouchableOpacity>

        <TouchableOpacity className="py-3">
          <Text className="text-blue-600 font-medium">Уведомления</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-red-500 py-5 rounded-2xl shadow shadow-black/20 active:opacity-80 mt-auto mb-10"
        onPress={logout}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Выйти из аккаунта
        </Text>
      </TouchableOpacity>
    </View>
  )
}
import Advice from '@/components/Advice'
import { TuserResponse } from '@/types/form.types'
import getTime from '@/utils/getTime'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import 'jwt-decode'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

export default function home() {
const router = useRouter()
const [userInfo, setUserInfo] = useState<TuserResponse | null>(null);

useEffect(() => {
  const fetchName = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return router.replace('/'); 

      const decoded = jwtDecode(token) as TuserResponse;
      setUserInfo(decoded);
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
    }
  };

  fetchName();
}, []);


  return (
    <View className='flex-1 bg-gray-100'>
      <View className='ml-6 mt-16'>
        <Text className='text-left text-3xl'>Добро пожаловать, {userInfo?.name}!</Text>
        <Text className='text-left text-1.xl'>Сегодня {getTime()}</Text>
      </View>
      <View>
        <Advice />
      </View>
    </View>
  )
}
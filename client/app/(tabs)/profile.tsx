import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function profile() {
    const router = useRouter()
    const logout = async () => {
        await AsyncStorage.removeItem('token')
        router.replace('/')
    }

  return (
    <View>
      <Text className='text-6xl mt-14' onPress={() => logout()}>Logout</Text>
    </View>
  )
}
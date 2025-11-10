import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function pets() {
  const router = useRouter()
  return (
    <View className='bg-gray-100'>
      <View className='ml-6 mt-16 flex-row items-center'>
        <Text className='text-left text-3xl'>Мои питомцы</Text>
        <TouchableOpacity onPress={() => router.push('/pets_form')}>
          <View className='w-14 h-14 bg-black rounded-full ml-40 items-center justify-center'>
              <Text className='z-2 color-white text-3xl'>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
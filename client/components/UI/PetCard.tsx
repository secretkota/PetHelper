import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tpet } from '@/types/form.types';
import formatAge from '@/utils/formatAge';

type PetTypeKey = 1 | 2 | 3 | 4 | 5

const petTypes: Record<PetTypeKey, string> = {
    1: "Кот/Кошка",
    2: "Собака",
    3: "Птица",
    4: "Рыбка",
    5: "Черепаха",
}



export default function PetCard({ name, breed, type, age, photo_path }: Tpet) {
    const typeNum = Number(type) as unknown as PetTypeKey
    const typeName = petTypes[typeNum] ?? "Неизвестный тип"
    return (
        <View className="w-48 bg-white rounded-3xl shadow-lg p-5 m-3 items-center">
            <Image
                source={{ uri: photo_path }}
                className="w-40 h-40 rounded-2xl mb-4"
                resizeMode="cover"
            />

            <Text className="text-2xl font-bold text-gray-800 mb-2">{name}</Text>
            <Text className="text-sm text-gray-500 mb-2">{breed} • {typeName}</Text>

            <View className="bg-gray-200 px-4 py-2 rounded-full">
                <Text className="text-sm text-gray-700">{formatAge(age)}</Text>
            </View>
        </View>
    )
}
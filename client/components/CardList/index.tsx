import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import PetCard from '../UI/PetCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllPets } from '@/api/api'
import { Tpet } from '@/types/form.types'
import { router } from 'expo-router'

export default function CardList() {

    const [pet, setPet] = useState<Tpet[]>([])

    useEffect(() => {
        const fetchPet = async () => {
            const token = await AsyncStorage.getItem('token')
            const data = await getAllPets(token)
            setPet(data)
        }

        fetchPet()
    }, [])

    const handleCard = (id: any) => {
        router.push({
            pathname: '/petDetail',
            params: {id: id}
        })
    }

    return (
        <FlatList
            data={pet}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCard(item.id)}>
                    <PetCard
                        name={item.name}
                        breed={item.breed}
                        photo_path={item.photo_path}
                        age={item.age}
                        type={item.type}
                    />
                </TouchableOpacity>
            )}
        />

    )
}
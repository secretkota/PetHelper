import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Tpet } from '@/types/form.types'
import { deletePet, getPetByID } from '@/api/api'

type PetTypeKey = 1 | 2 | 3 | 4 | 5
const petTypes: Record<PetTypeKey, string> = {
  1: "Кот/Кошка",
  2: "Собака",
  3: "Птица",
  4: "Рыбка",
  5: "Черепаха",
}


export default function PetDetail() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const [pet, setPet] = useState<Tpet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const data = await getPetByID(token, id);

        setPet(data);
      } catch (err) {
        console.log('Ошибка загрузки питомца:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, []);


  const confirmDelete = () => {
    Alert.alert(
      "Подтверждение",
      "Вы действительно хотите удалить этого питомца?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: handleDelete
        }
      ]
    );
  };


  const handleDelete = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return Alert.alert(
      "Ошибка авторизации",
      "Вам необходимо заново авторизоваться",
      [
        { text: "Зайти в аккаунт", onPress: () => router.replace('/login') }
      ]
    )
    try {
      const success = await deletePet(token, id);

      if (success) {
        console.log("УДАЛЕНО → ПЕРЕХОД");
        router.replace("/pets");
      }
    } catch (error) {
      Alert.alert("Ошибка удаления", "Ошибка при удалении питомца, попробуйте позже");
    }
  };


  const handleEdit = () => {
    router.push(`/pets_form?id=${id}`)
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-xl font-semibold text-center">Питомец не найден</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-black px-6 py-3 rounded-xl"
        >
          <Text className="text-white text-lg">Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const typeNum = Number(pet.type) as PetTypeKey
  const typeName = petTypes[typeNum] ?? "Неизвестный тип"

  return (
    <ScrollView className="flex-1 px-4 bg-white">
      <View
        className="flex-row items-center mb-4"
        style={{
          paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
        }}
      >
        <TouchableOpacity onPress={() => router.replace('/pets')}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>

        <Text className="text-3xl flex-1 text-center pr-10">
          Информация питомца
        </Text>
      </View>

      {pet.photo_path ? (
        <Image
          source={{ uri: pet.photo_path }}
          className="w-full h-64 rounded-2xl mb-6"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-64 bg-gray-200 rounded-2xl items-center justify-center mb-6">
          <Ionicons name="image-outline" size={64} color="gray" />
        </View>
      )}

      <View className="bg-white rounded-2xl shadow px-4 py-6 mb-10">

        <Text className="text-xl font-semibold mb-2">Имя:</Text>
        <Text className="text-lg mb-4">{pet.name}</Text>

        <Text className="text-xl font-semibold mb-2">Тип:</Text>
        <Text className="text-lg mb-4">{typeName}</Text>

        <Text className="text-xl font-semibold mb-2">Порода:</Text>
        <Text className="text-lg mb-4">{pet.breed}</Text>

        <Text className="text-xl font-semibold mb-2">Возраст:</Text>
        <Text className="text-lg">{pet.age} лет</Text>

        <Text className="text-xl font-semibold mb-2 mt-1">Описание:</Text>
        <Text className="text-lg">{pet.desc}</Text>


        <TouchableOpacity
          className="bg-black py-5 rounded-2xl shadow shadow-black/20 active:opacity-80 mt-4 mb-4"
          onPress={() => handleEdit()}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Редактировать
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 py-5 rounded-2xl shadow shadow-black/20 active:opacity-80 mt-auto mb-10"
          onPress={() => confirmDelete()}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Удалить питомца
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

import { View, Text, TouchableOpacity, TextInput, Platform, ScrollView, StatusBar, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import { TCategories, Tpet } from '@/types/form.types'
import { Picker } from '@react-native-picker/picker'
import { getCategories } from '@/api/api'

export default function pets_form() {
  const router = useRouter()
  const scrollRef = useRef<ScrollView>(null)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Tpet>({
    defaultValues: {
      name: '',
      breed: '',
      type: '',
      age: 0,
      photo_path: '',
      desc: ''
    }
  })

  const [category, setCategory] = useState<TCategories[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategory(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()
  }, [])

  const onSubmit = (data: Tpet) => {
    console.log(data)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View
        className='flex-row items-center mb-4 px-4'
        style={{
          paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
        }}
      >
        <TouchableOpacity onPress={() => router.replace('/pets')}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <Text className='text-3xl flex-1 text-center'>Добавить питомца</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity className='self-center mb-10'>
          <View className='w-36 h-36 rounded-full bg-gray-400 justify-center items-center relative'>
            <View className='w-12 h-12 bg-black rounded-full flex justify-center items-center absolute bottom-0 left-24'>
              <Text className='text-white text-center text-3xl'>+</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text className="mb-2 text-lg">Имя питомца:</Text>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Имя обязательно',
            minLength: { value: 3, message: "Имя должно быть более 3-х символов" },
            maxLength: { value: 20, message: "Имя должно быть менее 20-ти символов" }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="Doby"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="none"
            />
          )}
        />
        {errors.name && <Text className='text-red-700 font-bold text-1xl'>{errors.name.message}</Text>}

        <Text className="mb-2 text-lg">Тип питомца:</Text>
        <Controller
          control={control}
          name="type"
          rules={{ required: "Тип питомца обязателен" }}
          render={({ field: { value, onChange } }) => (
            <View className="border border-gray-300 rounded-2xl mb-2">
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label="Выберите тип" value="" />
                {category.map(cat => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
              </Picker>
            </View>
          )}
        />
        {errors.type && <Text className='text-red-700 font-bold text-1xl'>{errors.type.message}</Text>}

        <Text className="mb-2 text-lg">Порода питомца:</Text>
        <Controller
          control={control}
          name="breed"
          rules={{
            required: 'Порода обязательна',
            minLength: { value: 3, message: "Порода должна быть более 3-х символов" },
            maxLength: { value: 20, message: "Порода должна быть менее 20-ти символов" }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="Labrador"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="none"
            />
          )}
        />
        {errors.breed && <Text className='text-red-700 font-bold text-1xl'>{errors.breed.message}</Text>}

        <Text className="mb-2 text-lg">Возраст питомца:</Text>
        <Controller
          control={control}
          name="age"
          rules={{
            required: 'Возраст обязателен',
            min: { value: 0, message: "Возраст не может быть отрицательным" },
            max: { value: 100, message: "Возраст слишком большой" }
          }}
          render={({ field: { value, onChange } }) => (
            <View className="flex-row items-center mb-4">
              <TouchableOpacity
                className="p-3 bg-gray-200 rounded"
                onPress={() => onChange(Math.max(value - 1, 0))}
              >
                <Text className="text-2xl">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 text-lg">{value}</Text>
              <TouchableOpacity
                className="p-3 bg-gray-200 rounded"
                onPress={() => onChange(value + 1)}
              >
                <Text className="text-2xl">+</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.age && <Text className='text-red-700 font-bold text-1xl'>{errors.age.message}</Text>}

        <Text className="mb-2 text-lg">Описание питомца:</Text>
        <Controller
          control={control}
          name="desc"
          rules={{
            required: "Описание обязательно",
            maxLength: { value: 200, message: "Описание не может быть больше 200 символов" }
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="Напишите что-то о питомце..."
              value={value ?? ""}
              style={{
                height: 160,
                padding: 12,
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 12,
                textAlignVertical: 'top',
                marginBottom: 20
              }}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              maxLength={200}
              onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
            />
          )}
        />
        {errors.desc && <Text className='text-red-700 font-bold text-1xl mb-2'>{errors.desc.message}</Text>}
        <TouchableOpacity
          className="bg-black rounded-xl p-4 mb-4"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-bold text-lg">Сохранить</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

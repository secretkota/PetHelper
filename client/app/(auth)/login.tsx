import { loginUser } from '@/api/api';
import { TuserForm } from '@/types/form.types';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TuserForm>(
    {
      defaultValues: {
        email: '',
        password: '',
        name: ''
      }
    }
  )


  const handleLogin = async (data: TuserForm) => {
    try {
      const response = await loginUser(data)
      AsyncStorage.setItem('token', response.token)
      router.push('/home')
    } catch(err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <TouchableOpacity
        className="mb-6 flex-row items-center"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>

      <View className="mt-32 ml-2">
        <Text className="text-4xl">Вход</Text>
        <Text className="text-gray-400 mt-2 text-1xl mb-6">Войдите в свой аккаунт</Text>

        <Text className="mt- mb-2 text-lg">Ваш логин:</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Логин обязателен' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="ivanov123"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="none"
            />
          )}
        />
        <Text className="mt-6 mb-2 text-lg">Ваш пароль:</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Пароль обязателен' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              autoCapitalize="none"
            />
          )}
        />
      </View>
      <TouchableOpacity>
        <Text className='text-right mt-4 text-1xl underline'>Забыли пароль?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-black w-auto py-5 rounded-2xl shadow-md shadow-black/20 active:opacity-80 my-6 mb-8"
        onPress={handleSubmit(handleLogin)}
      >
        <Text className="text-white text-center text-lg font-semibold">Войти</Text>

      </TouchableOpacity>
      <TouchableOpacity 
      className='items-center'
      onPress={() => {router.push('/register')}}
      >
        <Text>Нет аккаунта? <Text className='underline'>Зарегистрируйтесь</Text></Text>
      </TouchableOpacity>

    </View >
  );
}

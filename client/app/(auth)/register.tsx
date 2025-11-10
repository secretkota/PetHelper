import { TuserForm } from '@/types/form.types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../../api/api';



export default function RegisterScreen() {
  const router = useRouter();

  const [errorList, setErrorList] = useState<string | null>(null)

  const { control, handleSubmit, formState: { errors } } = useForm<TuserForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });


  const onSubmit = async (data: TuserForm) => {
    console.log(data);
    try {
      await registerUser(data)
      router.push('/login')
    } catch (error) {
      setErrorList(`Ошибка при регистрации ${error}`)

    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <TouchableOpacity
        className="mb-6 flex-row items-center"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>

      <View className="mt-32 ml-2">
        <Text className="text-4xl">Регистрация</Text>
        <Text className="text-gray-400 mt-2 text-1xl mb-6">Создайте новый аккаунт</Text>

        <Text className="mt- mb-2 text-lg">Ваше имя:</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Имя обязательно', minLength: { value: 3, message: 'Минимальная длина логина 3 символа' }, maxLength: { value: 20, message: 'Максимальная длина имени 20 символов' } }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="ivanivanov"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="none"
            />
          )}
        />
        {errors.name?.message && (
          <Text className="text-red-500">{errors.name.message}</Text>
        )}

        <Text className="mt- mb-2 text-lg">Ваш логин:</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Логин обязателен', minLength: { value: 3, message: 'Минимальная длина логина 3 символа' }, maxLength: { value: 20, message: 'Максимальная длина логина 20 символов' } }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="ivanivanov"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="default"
              autoCapitalize="none"
            />
          )}
        />
        {errors.username?.message && (
          <Text className="text-red-500">{errors.username.message}</Text>
        )}
        <Text className="mt-6 mb-2 text-lg">Ваш email:</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Пароль обязателен' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              className="border border-gray-300 rounded-xl p-3 mb-2"
              placeholder="email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType={'email-address'}
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

      <Text className='text-red-500'>{errorList}</Text>
      <TouchableOpacity
        className="bg-black w-auto py-5 rounded-2xl shadow-md shadow-black/20 active:opacity-80 my-6 mb-8"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center text-lg font-semibold">Создать аккаунт</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='items-center'
        onPress={() => { router.push('/login') }}
      >
        <Text>Есть аккаунт? <Text className='underline'>Войти</Text></Text>
      </TouchableOpacity>
    </View >
  );
}

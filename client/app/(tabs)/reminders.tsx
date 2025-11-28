import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'



export default function reminders() {
    const onDayPress = (day: any) => {
        console.log("Вы выбрали дату:", day.dateString);
    };

    return (
        <View className='bg-gray-100 flex-1'>
            <View className='ml-6 mt-16 flex-row items-center justify-between mr-6'>
                <Text className='text-3xl'>Мои напоминания</Text>
                <TouchableOpacity onPress={() => console.log("tetetetet")}>
                    <View className='w-14 h-14 bg-black rounded-full items-center justify-center'>
                        <Text className='text-white text-3xl'>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Calendar
                onDayPress={onDayPress}
                markedDates={{
                    "2025-01-01": { selected: true, marked: true }
                }}
            />
        </View>
    )
}
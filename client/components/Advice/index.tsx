import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import idea from '../../assets/images/idea.png';
import quotes from '../../utils/quotes';

export default function Advice() {

    const [quote, setQuote] = useState<string>('');

    useEffect(() => {
        const today = new Date();
        const dayOfYear = Math.floor(
            (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        const index = dayOfYear % quotes.length;
        setQuote(quotes[index]);
    }, []);

    return (
        <View className='bg-white mx-4 my-6 rounded-3xl border border-gray-300'>
            <View className="flex-row items-center my-6 mx-3">
                <Image source={idea} className="w-9 h-9 mr-2" />
                <Text>Совет дня!</Text>
            </View>
            <Text className='mx-6 mb-6 text-base/6'>{quote}</Text>
        </View>
    )
}
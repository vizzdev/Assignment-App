import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';
import { COLORS, FONTS } from '../constants/theme';

interface Category {
    id: string;
    name: string;
    icon: any;
}

const CATEGORIES: Category[] = [
    { id: '1', name: 'Subscription', icon: require('../assets/images/ic_subscription.svg') },
    { id: '2', name: 'Utility', icon: require('../assets/images/ic_utility.svg') },
    { id: '3', name: 'Card Payment', icon: require('../assets/images/ic_cardpayment.svg') },
    { id: '4', name: 'Loan', icon: require('../assets/images/ic_loan.svg') },
    { id: '5', name: 'Rent', icon: require('../assets/images/ic_rent.svg') },
];

interface CategorySelectorProps {
    visible: boolean;
    onClose: () => void;
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    visible,
    onClose,
    selectedCategory,
    onSelectCategory,
}) => {
    const handleSelect = (category: Category) => {
        onSelectCategory(category.name);
        onClose();
    };

    const renderItem = ({ item, index }: { item: Category; index: number }) => (
        <>
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item)}
            >
                <View style={styles.iconContainer}>
                    <Image source={item.icon} style={styles.iconImage} contentFit="contain" />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
                {selectedCategory === item.name && (
                    <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={COLORS.primary}
                    />
                )}
            </TouchableOpacity>
            {index < CATEGORIES.length - 1 && <View style={styles.divider} />}
        </>
    );

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title="Category"
            onDone={onClose}
            height={373}
        >
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        gap: 10,
        height: 34,
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 99,
        backgroundColor: COLORS.neutral[20],
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    categoryName: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.regular,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.neutral[30],
        marginVertical: 6,
    },
});

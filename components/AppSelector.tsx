import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';
import { COLORS, FONTS } from '../constants/theme';

interface App {
    id: string;
    name: string;
    icon: any;
    color?: string;
}

const APPS: App[] = [
    { id: '1', name: 'Netflix', icon: require('../assets/images/ic_netflix.svg') },
    { id: '2', name: 'Spotify', icon: require('../assets/images/ic_spotify.png') },
    { id: '3', name: 'New York Times', icon: require('../assets/images/ic_newyork_times.png') },
    { id: '4', name: 'Wall Street Journal', icon: require('../assets/images/ic_wallstreet_journal.png') },
    { id: '5', name: 'Hulu', icon: require('../assets/images/ic_hulu.png') },
    { id: '6', name: 'Apple', icon: require('../assets/images/ic_apple.png') },
    { id: '7', name: 'Amazon', icon: require('../assets/images/ic_amazon.png') },
];

interface AppSelectorProps {
    visible: boolean;
    onClose: () => void;
    selectedApp: string;
    onSelectApp: (app: App) => void;
}

export const AppSelector: React.FC<AppSelectorProps> = ({
    visible,
    onClose,
    selectedApp,
    onSelectApp,
}) => {
    const [search, setSearch] = useState('');

    const filteredApps = APPS.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (app: App) => {
        onSelectApp(app);
        onClose();
    };

    const renderItem = ({ item, index }: { item: App; index: number }) => (
        <>
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item)}
            >
                <View style={styles.appIconContainer}>
                    <Image source={item.icon} style={styles.appIconImage} contentFit="contain" />
                </View>
                <Text style={styles.appName}>{item.name}</Text>
                {selectedApp === item.name && (
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color={COLORS.primary}
                    />
                )}
            </TouchableOpacity>
            {index < filteredApps.length - 1 && <View style={styles.divider} />}
        </>
    );

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title="App"
            onDone={onClose}
        >
            <View style={styles.searchContainer}>
                <Feather name="search" size={22} color={COLORS.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor={COLORS.placeholder}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <FlatList
                data={filteredApps}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 11,
        gap: 11,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        fontFamily: FONTS.family.regular,
        paddingVertical: 0,
        height: '100%',
    },
    list: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        gap: 10,
        minHeight: 34,
    },
    appIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 69,
        borderWidth: 0.07,
        borderColor: COLORS.neutral[30],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    appIconImage: {
        width: '100%',
        height: '100%',
    },
    appName: {
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

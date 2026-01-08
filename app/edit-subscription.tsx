import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS } from '../constants/theme';
import { BottomSheet } from '../components/BottomSheet';
import { AppSelector } from '../components/AppSelector';
import { AmountInput } from '../components/AmountInput';
import { CategorySelector } from '../components/CategorySelector';
import { FrequencySelector } from '../components/FrequencySelector';

interface App {
    id: string;
    name: string;
    icon: any;
    color?: string;
}

export default function EditSubscription() {
    const [isActive, setIsActive] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showAppSelector, setShowAppSelector] = useState(false);
    const [showAmountInput, setShowAmountInput] = useState(false);
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [startDate, setStartDate] = useState(new Date(2025, 3, 12));
    const [selectedApp, setSelectedApp] = useState<App>({
        id: '1',
        name: 'Netflix',
        icon: require('../assets/images/ic_netflix.svg'),
    });
    const [amount, setAmount] = useState('$50.00');
    const [category, setCategory] = useState('Loan');
    const [frequency, setFrequency] = useState('Weekly');
    const [showFrequencySelector, setShowFrequencySelector] = useState(false);

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const handleDateChange = (_: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowDatePicker(false);
        if (selectedDate) setStartDate(selectedDate);
    };

    const handleAppSelect = (app: App) => {
        setSelectedApp(app);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color={COLORS.neutral[100]} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Subscription</Text>
                    <TouchableOpacity>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.subscriptionCard}>
                    <View style={styles.appIcon}>
                        <Image source={selectedApp.icon} style={styles.appIconImage} contentFit="contain" />
                    </View>
                    <View style={styles.subscriptionInfo}>
                        <Text style={styles.appName}>{selectedApp.name}</Text>
                        <Text style={styles.appPrice}>{amount}</Text>
                    </View>
                </View>

                <View style={styles.detailsCard}>
                    <TouchableOpacity style={styles.listItem} onPress={() => setShowAppSelector(true)}>
                        <Text style={styles.listLabel}>App</Text>
                        <View style={styles.listValueContainer}>
                            <Text style={styles.listValue}>{selectedApp.name}</Text>
                            <MaterialIcons name="unfold-more" size={18} color={COLORS.neutral[80]} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.listItem} onPress={() => setShowAmountInput(true)}>
                        <Text style={styles.listLabel}>Amount</Text>
                        <Text style={styles.listValue}>{amount}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.listItem} onPress={() => setShowCategorySelector(true)}>
                        <Text style={styles.listLabel}>Category</Text>
                        <View style={styles.listValueContainer}>
                            <Text style={styles.listValue}>{category}</Text>
                            <MaterialIcons name="unfold-more" size={18} color={COLORS.neutral[80]} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.settingsCard}>
                    <View style={styles.listItem}>
                        <Text style={styles.listLabel}>Start Date</Text>
                        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.listItem} onPress={() => setShowFrequencySelector(true)}>
                        <Text style={styles.listLabel}>Frequency</Text>
                        <View style={styles.listValueContainer}>
                            <Text style={styles.listValue}>{frequency}</Text>
                            <MaterialIcons name="unfold-more" size={18} color={COLORS.neutral[80]} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={styles.listItem}>
                        <Text style={styles.listLabel}>Active</Text>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                        />
                    </View>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.deleteItem}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {Platform.OS === 'ios' ? (
                <BottomSheet
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    title="Start Date"
                    onDone={() => setShowDatePicker(false)}
                    height={322}
                >
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        style={styles.datePicker}
                        textColor={COLORS.neutral[100]}
                        themeVariant="light"
                    />
                </BottomSheet>
            ) : (
                showDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )
            )}

            <AppSelector
                visible={showAppSelector}
                onClose={() => setShowAppSelector(false)}
                selectedApp={selectedApp.name}
                onSelectApp={handleAppSelect}
            />

            <AmountInput
                visible={showAmountInput}
                onClose={() => setShowAmountInput(false)}
                value={amount}
                onSave={(val) => setAmount(val.startsWith('$') ? val : `$${val}`)}
            />

            <CategorySelector
                visible={showCategorySelector}
                onClose={() => setShowCategorySelector(false)}
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            <FrequencySelector
                visible={showFrequencySelector}
                onClose={() => setShowFrequencySelector(false)}
                selectedFrequency={frequency}
                onSelectFrequency={setFrequency}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 20,
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 999,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.medium,
    },
    saveText: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.primary,
        fontFamily: FONTS.family.medium,
    },
    subscriptionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 14,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 12,
        height: 90,
    },
    appIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIconImage: {
        width: '100%',
        height: '100%',
    },
    subscriptionInfo: {
        flex: 1,
        gap: 2,
    },
    appName: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.medium,
    },
    appPrice: {
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[80],
        fontFamily: FONTS.family.regular,
    },
    detailsCard: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        gap: 12,
    },
    settingsCard: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        gap: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
        minHeight: 34, // Changed from fixed height
    },
    listLabel: {
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[80],
        flex: 1,
        fontFamily: FONTS.family.regular,
    },
    listValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    listValue: {
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.regular,
    },
    dateButton: {
        backgroundColor: COLORS.neutral[20],
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    dateText: {
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.regular,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.neutral[30],
    },
    deleteItem: {
        paddingVertical: 4,
        height: 34,
        justifyContent: 'center',
    },
    deleteText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        color: COLORS.danger,
        fontFamily: FONTS.family.medium,
    },
    datePicker: {
        height: 215,
        backgroundColor: COLORS.white,
    },
});

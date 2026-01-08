import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';
import { COLORS, FONTS } from '../constants/theme';

const FREQUENCIES = [
    'Weekly',
    'Monthly',
    'Yearly',
];

interface FrequencySelectorProps {
    visible: boolean;
    onClose: () => void;
    selectedFrequency: string;
    onSelectFrequency: (frequency: string) => void;
}

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
    visible,
    onClose,
    selectedFrequency,
    onSelectFrequency,
}) => {
    const handleSelect = (frequency: string) => {
        onSelectFrequency(frequency);
        onClose();
    };

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <>
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item)}
            >
                <Text style={styles.frequencyName}>{item}</Text>
                {selectedFrequency === item && (
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color={COLORS.primary}
                    />
                )}
            </TouchableOpacity>
            {index < FREQUENCIES.length - 1 && <View style={styles.divider} />}
        </>
    );

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title="Frequency"
            onDone={onClose}
            height={250}
        >
            <FlatList
                data={FREQUENCIES}
                keyExtractor={(item) => item}
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
        height: 34,
    },
    frequencyName: {
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

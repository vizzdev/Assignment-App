import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';
import { COLORS, FONTS } from '../constants/theme';

interface AmountInputProps {
    visible: boolean;
    onClose: () => void;
    value: string;
    onSave: (amount: string) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
    visible,
    onClose,
    value,
    onSave,
}) => {
    const [amount, setAmount] = useState(value);

    const handleDone = () => {
        onSave(amount);
        onClose();
    };

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            title="Amount"
            onDone={handleDone}
            height={190}
        >
            <View style={styles.inputContainer}>
                <MaterialIcons name="attach-money" size={22} color={COLORS.neutral[80]} />
                <TextInput
                    style={styles.input}
                    value={amount.replace('$', '')}
                    onChangeText={(text) => setAmount(text)}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={COLORS.placeholder}
                    autoFocus
                />
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 11,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.neutral[100],
        fontFamily: FONTS.family.regular,
    },
});

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import { COLORS } from '../constants/theme';

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    onDone?: () => void;
    children: React.ReactNode;
    height?: number;
    contentStyle?: ViewStyle;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible,
    onClose,
    title,
    onDone,
    children,
    height = 555,
    contentStyle,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.container, { height }]}>
                            <View style={styles.handle} />
                            <View style={[styles.content, contentStyle]}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{title}</Text>
                                    {onDone && (
                                        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
                                            <Text style={styles.doneText}>Done</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {children}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 24, // Increased radius to match screenshot style usually
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    handle: {
        position: 'absolute',
        top: 6,
        alignSelf: 'center',
        width: 38,
        height: 6,
        backgroundColor: '#DBDDE2',
        borderRadius: 64,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 26,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.neutral[100],
        textAlign: 'center',
    },
    doneButton: {
        position: 'absolute',
        right: 0,
    },
    doneText: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: COLORS.primary,
    },
});

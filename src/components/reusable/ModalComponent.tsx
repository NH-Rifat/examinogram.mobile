import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { useThemedStyles } from '@/theme';

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  animationType?: 'slide' | 'fade' | 'none';
}

const ModalComponent: React.FC<PropsWithChildren<ModalComponentProps>> = ({
  isVisible,
  children,
  onClose,
  title,
  animationType = 'slide',
}) => {
  const styles = useThemedStyles((theme) =>
    StyleSheet.create({
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: theme.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '50%',
        minHeight: '25%',
      },
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.surfaceVariant,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      contentContainer: {
        flex: 1,
        padding: 20,
      },
      closeButton: {
        padding: 4,
      },
    }),
  );

  return (
    <Modal animationType={animationType} transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalOverlay} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Typography variant="h3">{title}</Typography>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </Pressable>
          </View>
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export { ModalComponent };

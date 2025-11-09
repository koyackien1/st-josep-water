import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface FieldFinding {
  id: string;
  label: string;
  icon: any;
}

interface FieldFindingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (finding: FieldFinding) => void;
}

// Field Findings Data
const fieldFindingsData: FieldFinding[] = [
  { id: '1', label: 'Blurred Meter', icon: 'eye-off' },
  { id: '2', label: 'Damaged Meter', icon: 'warning' },
  { id: '3', label: 'Meter Inside Unit', icon: 'home' },
  { id: '4', label: 'Disconnected in Actual', icon: 'link' },
  { id: '5', label: 'No Meter Found', icon: 'close-circle' },
];

export default function FieldFindingsModal({ 
  visible, 
  onClose, 
  onSelect 
}: FieldFindingsModalProps) {

  const handleSelectFinding = (finding: FieldFinding) => {
    onSelect(finding);
    onClose();
  };

  const renderFindingItem = ({ item }: { item: FieldFinding }) => (
    <TouchableOpacity
      style={styles.findingItem}
      onPress={() => handleSelectFinding(item)}
      activeOpacity={0.7}
    >
      <View style={styles.findingHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={24} color="#059669" />
        </View>
        <View style={styles.findingInfo}>
          <Text style={styles.findingName}>{item.label}</Text>
          <Text style={styles.findingHint}>Tap to open camera</Text>
        </View>
        <Ionicons name="camera" size={24} color="#059669" />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Field Findings</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Field Findings List */}
          <FlatList
            data={fieldFindingsData}
            renderItem={renderFindingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  findingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  findingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findingInfo: {
    flex: 1,
  },
  findingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  findingHint: {
    fontSize: 13,
    color: '#666',
  },
});                   
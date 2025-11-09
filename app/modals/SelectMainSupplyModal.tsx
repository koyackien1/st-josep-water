import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Project {
  id: string;
  name: string;
  zone: string;
  customerCount: number;
}

interface MainSupply {
  id: string;
  name: string;
  projects: Project[];
}

interface SelectMainSupplyModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (supply: MainSupply) => void;
}

// Sample Main Supply Data
const mainSuppliesData: MainSupply[] = [
  {
    id: '1',
    name: 'Metro Manila District 1',
    projects: [
      { id: '1', name: 'Barangay San Miguel', zone: 'Zone 1', customerCount: 150 },
      { id: '2', name: 'Barangay Santa Cruz', zone: 'Zone 2', customerCount: 200 },
    ]
  },
  {
    id: '2',
    name: 'Metro Manila District 2',
    projects: [
      { id: '3', name: 'Barangay San Jose', zone: 'Zone 3', customerCount: 175 },
      { id: '4', name: 'Barangay Del Pilar', zone: 'Zone 4', customerCount: 120 },
    ]
  },
  {
    id: '3',
    name: 'Metro Manila District 3',
    projects: [
      { id: '5', name: 'Barangay San Antonio', zone: 'Zone 5', customerCount: 180 },
    ]
  },
];

export default function SelectMainSupplyModal({ 
  visible, 
  onClose, 
  onSelect 
}: SelectMainSupplyModalProps) {

  const handleSelectSupply = (supply: MainSupply) => {
    onSelect(supply);
    onClose();
  };

  const renderSupplyItem = ({ item }: { item: MainSupply }) => (
    <TouchableOpacity
      style={styles.supplyItem}
      onPress={() => handleSelectSupply(item)}
      activeOpacity={0.7}
    >
      <View style={styles.supplyHeader}>
        <MaterialCommunityIcons name="water" size={24} color="#059669" />
        <View style={styles.supplyInfo}>
          <Text style={styles.supplyName}>{item.name}</Text>
          <Text style={styles.supplyProjects}>
            {item.projects.length} {item.projects.length === 1 ? 'Project' : 'Projects'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
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
            <Text style={styles.modalTitle}>Select Main Supply</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Main Supplies List */}
          <FlatList
            data={mainSuppliesData}
            renderItem={renderSupplyItem}
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
  supplyItem: {
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
  supplyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supplyInfo: {
    flex: 1,
  },
  supplyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  supplyProjects: {
    fontSize: 13,
    color: '#666',
  },
});
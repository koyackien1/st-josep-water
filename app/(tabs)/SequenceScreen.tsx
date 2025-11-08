import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Project {
  name: string;
  customerCount: number;
}

interface Customer {
  id: string;
  sequence: number | null;
  name: string;
  address: string;
  customerNumber: string;
  isAssigned: boolean;
}

export default function SequenceScreen() {
  // Sample data - In production, this would come from props/context/API
  const currentProject: Project = {
    name: 'Taguig Project A',
    customerCount: 1247
  };

  const sequenceRange = {
    start: 1,
    end: 400
  };

  const customers: Customer[] = [
    {
      id: '1',
      sequence: 1,
      name: 'Juan Dela Cruz',
      address: '123 Main St, Taguig City',
      customerNumber: 'ACC-001-2024',
      isAssigned: true
    },
    {
      id: '2',
      sequence: 2,
      name: 'Maria Santos',
      address: '456 BGC Avenue, Taguig City',
      customerNumber: 'ACC-002-2024',
      isAssigned: true
    },
    {
      id: '3',
      sequence: null,
      name: 'Pedro Reyes',
      address: '789 Fort Street, Taguig City',
      customerNumber: 'ACC-003-2024',
      isAssigned: false
    },
    {
      id: '4',
      sequence: 3,
      name: 'Ana Garcia',
      address: '321 Market Road, Taguig City',
      customerNumber: 'ACC-004-2024',
      isAssigned: true
    },
    {
      id: '5',
      sequence: 4,
      name: 'Roberto Cruz',
      address: '555 Park Avenue, Taguig City',
      customerNumber: 'ACC-005-2024',
      isAssigned: true
    },
    {
      id: '6',
      sequence: null,
      name: 'Linda Ramos',
      address: '777 River Street, Taguig City',
      customerNumber: 'ACC-006-2024',
      isAssigned: false
    },
    {
      id: '7',
      sequence: 5,
      name: 'Carlos Martinez',
      address: '888 Lake Drive, Taguig City',
      customerNumber: 'ACC-007-2024',
      isAssigned: true
    },
    {
      id: '8',
      sequence: 6,
      name: 'Sofia Fernandez',
      address: '999 Hill Road, Taguig City',
      customerNumber: 'ACC-008-2024',
      isAssigned: true
    },
  ];

  const handleCustomerPress = (customer: Customer) => {
    console.log('Customer pressed:', customer.name);
    // Navigate to customer details or meter reading screen
  };

  const handleEditSequence = () => {
    console.log('Edit sequence pressed');
    // Navigate to edit sequence screen
  };

  const renderCustomerItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity 
      style={styles.customerItem} 
      activeOpacity={0.7}
      onPress={() => handleCustomerPress(item)}
    >
      <View style={[
        styles.sequenceNumber,
        !item.isAssigned && styles.sequenceNumberUnassigned
      ]}>
        {item.isAssigned ? (
          <Text style={styles.sequenceNumberText}>{item.sequence}</Text>
        ) : (
          <Ionicons name="help" size={20} color="#F59E0B" />
        )}
      </View>
      <View style={styles.customerDetails}>
        <View style={styles.customerNameRow}>
          <Text style={styles.customerName}>{item.name}</Text>
          {!item.isAssigned && (
            <View style={styles.unassignedBadge}>
              <Text style={styles.unassignedBadgeText}>Unassigned</Text>
            </View>
          )}
        </View>
        <Text style={styles.customerInfo}>{item.address}, {item.customerNumber}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={28} color="#059669" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Name of the Reader</Text>
            <Text style={styles.userPosition}>Field Reader</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Project Info Bar */}
      <View style={styles.projectInfoBar}>
        <View style={styles.projectInfoLeft}>
          <Text style={styles.projectInfoLabel}>Current Project</Text>
          <Text style={styles.projectInfoName}>{currentProject.name}</Text>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={16} color="#059669" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Sequence Range */}
      <View style={styles.sequenceRangeCard}>
        <View style={styles.sequenceRangeContent}>
          <View style={styles.rangeIconContainer}>
            <Ionicons name="list-outline" size={28} color="#059669" />
          </View>
          <View style={styles.rangeTextContainer}>
            <Text style={styles.rangeLabel}>Sequence Range</Text>
            <View style={styles.rangeValueRow}>
              <View style={styles.rangeBox}>
                <Text style={styles.rangeNumber}>{sequenceRange.start}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#059669" />
              <View style={styles.rangeBox}>
                <Text style={styles.rangeNumber}>{sequenceRange.end}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.totalCustomersRow}>
          <Ionicons name="people-outline" size={18} color="#6B7280" />
          <Text style={styles.totalCustomersText}>
            {sequenceRange.end - sequenceRange.start + 1} Total Customers
          </Text>
        </View>
      </View>

      {/* Customer's List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Customer's List</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditSequence}>
          <Ionicons name="create-outline" size={18} color="#059669" />
          <Text style={styles.editButtonText}>Edit Sequence</Text>
        </TouchableOpacity>
      </View>

      {/* Customer List */}
      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#059669',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPosition: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.9,
    marginTop: 2,
  },
  menuIcon: {
    padding: 8,
  },
  projectInfoBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  projectInfoLeft: {
    flex: 1,
  },
  projectInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  projectInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '500',
  },
  sequenceRangeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sequenceRangeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  rangeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeTextContainer: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  rangeValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rangeBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  rangeNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  totalCustomersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalCustomersText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  listHeader: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0FDF4',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  customerItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  sequenceNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequenceNumberUnassigned: {
    backgroundColor: '#FFFBEB',
  },
  sequenceNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  customerDetails: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  unassignedBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  unassignedBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  customerInfo: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
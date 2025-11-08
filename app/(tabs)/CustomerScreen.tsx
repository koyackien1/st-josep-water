import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define interfaces
interface Customer {
  id: string;
  name: string;
  accountNumber: string;
  address: string;
  meterNumber: string;
  status: 'active' | 'inactive' | 'pending';
}

interface Project {
  name: string;
  customerCount: number;
}

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [block, setBlock] = useState('');
  const [lot, setLot] = useState('');
  const [extension, setExtension] = useState('');
  const [rangeStart, setRangeStart] = useState('1');
  const [rangeEnd, setRangeEnd] = useState('400');

  // Sample data - In production, this would come from props/context/API
  const currentProject: Project = {
    name: 'Taguig Project A',
    customerCount: 1247
  };

  const sampleCustomers: Customer[] = [
    {
      id: '1',
      name: 'Juan Dela Cruz',
      accountNumber: 'ACC-001-2024',
      address: '123 Main St, Taguig City',
      meterNumber: 'MTR-12345',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      accountNumber: 'ACC-002-2024',
      address: '456 BGC Avenue, Taguig City',
      meterNumber: 'MTR-12346',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Reyes',
      accountNumber: 'ACC-003-2024',
      address: '789 Fort Street, Taguig City',
      meterNumber: 'MTR-12347',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Ana Garcia',
      accountNumber: 'ACC-004-2024',
      address: '321 Market Road, Taguig City',
      meterNumber: 'MTR-12348',
      status: 'active'
    },
    {
      id: '5',
      name: 'Roberto Cruz',
      accountNumber: 'ACC-005-2024',
      address: '555 Park Avenue, Taguig City',
      meterNumber: 'MTR-12349',
      status: 'inactive'
    },
    {
      id: '6',
      name: 'Linda Ramos',
      accountNumber: 'ACC-006-2024',
      address: '777 River Street, Taguig City',
      meterNumber: 'MTR-12350',
      status: 'active'
    },
    {
      id: '7',
      name: 'Carlos Martinez',
      accountNumber: 'ACC-007-2024',
      address: '888 Lake Drive, Taguig City',
      meterNumber: 'MTR-12351',
      status: 'pending'
    },
    {
      id: '8',
      name: 'Sofia Fernandez',
      accountNumber: 'ACC-008-2024',
      address: '999 Hill Road, Taguig City',
      meterNumber: 'MTR-12352',
      status: 'active'
    },
  ];

  // Filter customers based on search query and status filter
  const filteredCustomers = sampleCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.meterNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#059669';
      case 'inactive':
        return '#DC2626';
      case 'pending':
        return '#F59E0B';
      default:
        return '#666';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#F0FDF4';
      case 'inactive':
        return '#FEF2F2';
      case 'pending':
        return '#FFFBEB';
      default:
        return '#F5F5F5';
    }
  };

  const handleCustomerPress = (customer: Customer) => {
    // Navigate to customer details or perform action
    console.log('Customer pressed:', customer.name);
  };

  const handleLoadSequence = () => {
    console.log('Load sequence pressed');
    console.log('Range:', rangeStart, '-', rangeEnd);
    // Load sequence logic here
  };

  const renderCustomerCard = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => handleCustomerPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.customerCardLeft}>
        <View style={styles.customerIcon}>
          <Ionicons name="person-outline" size={20} color="#059669" />
        </View>
        <View style={styles.customerInfo}>
          <View style={styles.customerNameRow}>
            <Text style={styles.customerName}>{item.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.status) }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          <Text style={styles.customerDetail}>
            Account: {item.accountNumber}
          </Text>
          <Text style={styles.customerDetail}>
            Meter: {item.meterNumber}
          </Text>
          <Text style={styles.customerAddress}>{item.address}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
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
          <Text style={styles.projectCustomerCount}>{currentProject.customerCount} Customers</Text>
        </View>
        <TouchableOpacity style={styles.changeProjectButton}>
          <Text style={styles.changeProjectText}>Change Project</Text>
          <Ionicons name="chevron-forward" size={16} color="#059669" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsCardsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#059669" />
            <Text style={styles.statsCardLabel}>Read Accounts</Text>
          </View>
          <Text style={styles.statsCardValue}>247</Text>
        </View>
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Ionicons name="alert-circle" size={20} color="#F59E0B" />
            <Text style={styles.statsCardLabel}>Unread Accounts</Text>
          </View>
          <Text style={styles.statsCardValue}>1000</Text>
        </View>
      </View>

      {/* Search Section - Block/Lot/Extension */}
      <View style={styles.searchSection}>
        <View style={styles.blockLotExtRow}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Block</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter block"
              placeholderTextColor="#9CA3AF"
              value={block}
              onChangeText={setBlock}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Lot</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter lot"
              placeholderTextColor="#9CA3AF"
              value={lot}
              onChangeText={setLot}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Ext</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter ext"
              placeholderTextColor="#9CA3AF"
              value={extension}
              onChangeText={setExtension}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={18} color="#FFFFFF" />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Sequence Range Section */}
      <View style={styles.sequenceSection}>
        <Text style={styles.sequenceSectionTitle}>Sequence Range</Text>
        <View style={styles.sequenceRangeRow}>
          <TextInput
            style={styles.sequenceInput}
            value={rangeStart}
            onChangeText={setRangeStart}
            keyboardType="numeric"
            textAlign="center"
          />
          <Text style={styles.rangeSeparator}>-</Text>
          <TextInput
            style={styles.sequenceInput}
            value={rangeEnd}
            onChangeText={setRangeEnd}
            keyboardType="numeric"
            textAlign="center"
          />
        </View>
      </View>
      </ScrollView>

      {/* Load Sequence Button - Fixed at bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.loadSequenceButton}
          onPress={handleLoadSequence}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="format-list-numbered" size={28} color="#FFFFFF" />
          <Text style={styles.loadSequenceText}>Load Sequence</Text>
        </TouchableOpacity>
      </View>
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
  projectCustomerCount: {
    fontSize: 13,
    color: '#059669',
    marginTop: 2,
    fontWeight: '500',
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
  changeProjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  changeProjectText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '500',
  },
  statsCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
    backgroundColor: '#F5F5F5',
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  statsCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  statsCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  searchSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  sequenceSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  loadSequenceButton: {
    backgroundColor: '#047857',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  loadSequenceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sequenceSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  sequenceRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sequenceInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 42,
    minWidth: 80,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  rangeSeparator: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
  },
  blockLotExtRow: {
    flexDirection: 'row',
    gap: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  searchInputsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 38,
    fontSize: 13,
    color: '#374151',
  },
  inputPlaceholder: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  inputPlaceholderGray: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statsBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    elevation: 0,
  },
  searchInput: {
    fontSize: 14,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#059669',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
  },
  listHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  customerCardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  customerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerInfo: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  customerDetail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  customerAddress: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
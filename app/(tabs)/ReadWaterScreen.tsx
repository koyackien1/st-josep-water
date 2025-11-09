import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldFindingsModal from '../modals/FieldFindingsModal';

export default function ReadWaterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [block, setBlock] = useState('');
  const [lot, setLot] = useState('');
  const [extension, setExtension] = useState('');
  const [currentReading, setCurrentReading] = useState('1060');
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [tempReading, setTempReading] = useState('');
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
  const [totalCustomers] = useState(400);
  const [showFieldFindingsModal, setShowFieldFindingsModal] = useState(false);

  const handleOpenModal = () => {
    setTempReading(currentReading);
    setShowReadingModal(true);
  };

  const handleSaveReading = () => {
    if (tempReading.trim()) {
      setCurrentReading(tempReading);
    }
    setShowReadingModal(false);
  };

  const handleCancelModal = () => {
    setShowReadingModal(false);
    setTempReading('');
  };

  const handlePrevious = () => {
    setCurrentCustomerIndex(Math.max(0, currentCustomerIndex - 1));
  };

  const handleNext = () => {
    setCurrentCustomerIndex(Math.min(totalCustomers - 1, currentCustomerIndex + 1));
  };

  const handleOpenFieldFindings = () => {
    setShowFieldFindingsModal(true);
  };

  const handleSelectFieldFinding = (finding: { label: any; }) => {
    // TODO: Open camera here
    console.log('Selected:', finding.label);
    console.log('Opening camera for:', finding.label);
    // You can use expo-camera or expo-image-picker here
  };

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

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search customer"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor="#666"
            inputStyle={styles.searchInput}
            elevation={0}
          />
        </View>

        {/* Search Section - Block/Lot/Extension */}
        <View style={styles.searchSection}>
          <Text style={styles.searchSectionTitle}>Search by Location</Text>
          <View style={styles.blockLotExtRow}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Block</Text>
              <View style={styles.textInput}>
                <Text style={styles.inputPlaceholder}>Enter block</Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Lot</Text>
              <View style={styles.textInput}>
                <Text style={styles.inputPlaceholder}>Enter lot</Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Extension</Text>
              <View style={styles.textInput}>
                <Text style={styles.inputPlaceholder}>Enter ext</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Information Card */}
        <View style={styles.customerCard}>
          <View style={styles.customerHeader}>
            <View style={styles.customerIconLarge}>
              <Ionicons name="person" size={28} color="#059669" />
            </View>
            <View style={styles.customerHeaderInfo}>
              <View style={styles.customerRow}>
                <Text style={styles.customerName}>Juan Dela Cruz</Text>
                <Text style={styles.customerCIN}>001-2024</Text>
              </View>
              <View style={styles.customerRow}>
                <Text style={styles.customerLocation}>Block 1 Lot 2</Text>
                <Text style={styles.customerMeter}>MTR-12345</Text>
              </View>
            </View>
          </View>

          <View style={styles.meterInfoGrid}>
            <View style={styles.meterInfoItem}>
              <Text style={styles.meterInfoLabel}>Previous</Text>
              <Text style={styles.meterInfoValue}>610</Text>
            </View>
            <TouchableOpacity 
              style={styles.meterInfoItemCurrent}
              onPress={handleOpenModal}
              activeOpacity={0.7}
            >
              <Text style={styles.meterInfoLabel}>Current</Text>
              <Text style={styles.meterInfoValueCurrent}>{currentReading}</Text>
              <Ionicons name="create-outline" size={16} color="#059669" style={styles.editIcon} />
            </TouchableOpacity>
            <View style={styles.meterInfoItem}>
              <Text style={styles.meterInfoLabel}>Consumption</Text>
              <Text style={styles.meterInfoValue}>450</Text>
            </View>
            <View style={styles.meterInfoItem}>
              <Text style={styles.meterInfoLabel}>Amount Due</Text>
              <Text style={[styles.meterInfoValue, styles.amountDue]}>₱2,250</Text>
            </View>
          </View>
        </View>

        {/* Consumption History Card */}
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Consumption History</Text>
          
          <View style={styles.historyContent}>
            <View style={styles.historyList}>
              <View style={styles.historyItem}>
                <Text style={styles.historyMonth}>Jan.</Text>
                <Text style={styles.historyValue}>25</Text>
              </View>
              <View style={styles.historyItem}>
                <Text style={styles.historyMonth}>Feb.</Text>
                <Text style={styles.historyValue}>20</Text>
              </View>
              <View style={styles.historyItem}>
                <Text style={styles.historyMonth}>Mar.</Text>
                <Text style={styles.historyValue}>20</Text>
              </View>
            </View>

            <View style={styles.historyActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="document-text-outline" size={20} color="#059669" />
                <Text style={styles.actionButtonText}>Print SOA</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleOpenFieldFindings}
              >
                <Ionicons name="search-outline" size={20} color="#059669" />
                <Text style={styles.actionButtonText}>Field Findings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Customer Navigation List */}
        <View style={styles.customerListSection}>
          {/* Customer List Title */}
          <Text style={styles.customerListTitle}>Customer's List</Text>

          <View style={styles.customerListContent}>
            <TouchableOpacity 
              style={[
                styles.customerListItem,
                currentCustomerIndex === 0 && styles.customerListItemActive
              ]} 
              activeOpacity={0.7}
              onPress={() => setCurrentCustomerIndex(0)}
            >
              <View style={styles.customerNumberBadge}>
                <Text style={styles.customerNumberText}>1</Text>
              </View>
              <View style={styles.customerListInfo}>
                <Text style={styles.customerListName}>Juan Dela Cruz</Text>
                <Text style={styles.customerListAddress}>123 Main St, Taguig City, ACC-001-2024</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.customerListItem,
                currentCustomerIndex === 1 && styles.customerListItemActive
              ]} 
              activeOpacity={0.7}
              onPress={() => setCurrentCustomerIndex(1)}
            >
              <View style={styles.customerNumberBadge}>
                <Text style={styles.customerNumberText}>2</Text>
              </View>
              <View style={styles.customerListInfo}>
                <Text style={styles.customerListName}>Maria Santos</Text>
                <Text style={styles.customerListAddress}>456 BGC Avenue, Taguig City, ACC-002-2024</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.customerListItem,
                currentCustomerIndex === 2 && styles.customerListItemActive
              ]} 
              activeOpacity={0.7}
              onPress={() => setCurrentCustomerIndex(2)}
            >
              <View style={[styles.customerNumberBadge, styles.customerNumberBadgeUnassigned]}>
                <Text style={[styles.customerNumberText, styles.customerNumberTextUnassigned]}>?</Text>
              </View>
              <View style={styles.customerListInfo}>
                <View style={styles.customerNameRow}>
                  <Text style={styles.customerListName}>Pedro Reyes</Text>
                  <View style={styles.unassignedBadge}>
                    <Text style={styles.unassignedText}>Unassigned</Text>
                  </View>
                </View>
                <Text style={styles.customerListAddress}>789 Fort Street, Taguig City, ACC-003-2024</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.customerListItem,
                currentCustomerIndex === 3 && styles.customerListItemActive
              ]} 
              activeOpacity={0.7}
              onPress={() => setCurrentCustomerIndex(3)}
            >
              <View style={styles.customerNumberBadge}>
                <Text style={styles.customerNumberText}>3</Text>
              </View>
              <View style={styles.customerListInfo}>
                <Text style={styles.customerListName}>Ana Garcia</Text>
                <Text style={styles.customerListAddress}>321 Market Road, Taguig City, ACC-004-2024</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.customerListItem,
                currentCustomerIndex === 4 && styles.customerListItemActive
              ]} 
              activeOpacity={0.7}
              onPress={() => setCurrentCustomerIndex(4)}
            >
              <View style={styles.customerNumberBadge}>
                <Text style={styles.customerNumberText}>4</Text>
              </View>
              <View style={styles.customerListInfo}>
                <Text style={styles.customerListName}>Roberto Cruz</Text>
                <Text style={styles.customerListAddress}>555 Park Avenue, Taguig City, ACC-005-2024</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Customer Count Badge - Above buttons */}
          <View style={styles.customerCountContainer}>
            <View style={styles.customerCountBadge}>
              <Text style={styles.customerCountText}>
                {currentCustomerIndex + 1} out of {totalCustomers}
              </Text>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={styles.navButton}
              activeOpacity={0.7}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={20} color="#059669" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, styles.navButtonNext]}
              activeOpacity={0.7}
              onPress={handleNext}
            >
              <Text style={[styles.navButtonText, styles.navButtonTextNext]}>Next</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Reading Input Modal */}
      <Modal
        visible={showReadingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Current Reading</Text>
              <TouchableOpacity
                onPress={handleCancelModal}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Current Reading</Text>
              <TextInput
                style={styles.modalInput}
                value={tempReading}
                onChangeText={setTempReading}
                keyboardType="numeric"
                placeholder="Enter reading"
                autoFocus
              />
              <Text style={styles.modalHint}>Enter the current meter reading</Text>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={handleCancelModal}
              >
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSave}
                onPress={handleSaveReading}
              >
                <Text style={styles.modalButtonSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Field Findings Modal */}
      <FieldFindingsModal
        visible={showFieldFindingsModal}
        onClose={() => setShowFieldFindingsModal(false)}
        onSelect={handleSelectFieldFinding}
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
  scrollContent: {
    flex: 1,
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
  searchSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  blockLotExtRow: {
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 38,
    justifyContent: 'center',
  },
  inputPlaceholder: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  customerIconLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerHeaderInfo: {
    flex: 1,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  customerCIN: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  customerLocation: {
    fontSize: 13,
    color: '#6B7280',
  },
  customerMeter: {
    fontSize: 13,
    color: '#6B7280',
  },
  meterInfoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  meterInfoItem: {
    flex: 1,
  },
  meterInfoItemCurrent: {
    flex: 1,
    position: 'relative',
  },
  meterInfoLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  meterInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  meterInfoValueCurrent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#059669',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  amountDue: {
    color: '#059669',
    fontSize: 17,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  historyList: {
    flex: 1,
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyMonth: {
    fontSize: 14,
    color: '#6B7280',
    width: 40,
  },
  historyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  historyActions: {
    justifyContent: 'center',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  customerListSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  customerListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  customerCountContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  customerCountBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  customerCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  customerListContent: {
    gap: 12,
  },
  customerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  customerListItemActive: {
    backgroundColor: '#E8F5F0',
    borderColor: '#059669',
    borderWidth: 2,
  },
  customerNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerNumberBadgeUnassigned: {
    backgroundColor: '#FEF3C7',
  },
  customerNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  customerNumberTextUnassigned: {
    color: '#F59E0B',
  },
  customerListInfo: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  customerListName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  unassignedBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  unassignedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  customerListAddress: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 0,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  navButtonNext: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  navButtonTextNext: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#059669',
    textAlign: 'center',
  },
  modalHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modalButtonCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  modalButtonCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalButtonSave: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  modalButtonSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
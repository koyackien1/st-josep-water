import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Modal,
    FlatList,
    Pressable,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define interfaces at the top
interface Project {
  name: string;
  customerCount: number;
}

interface Supply {
  id: string;
  name: string;
  projects: Project[];
}

interface Customer {
  id: string;
  name: string;
  accountNumber: string;
  address: string;
  meterNumber: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Sample supplies data
  const availableSupplies: Supply[] = [
    {
      id: '1',
      name: 'Metro Manila District 1',
      projects: [
        { name: 'Taguig Project A', customerCount: 1247 },
        { name: 'BGC Residential', customerCount: 892 },
        { name: 'Fort Bonifacio Commercial', customerCount: 456 }
      ]
    },
    {
      id: '2',
      name: 'Metro Manila District 2',
      projects: [
        { name: 'Makati Central', customerCount: 2145 },
        { name: 'Ayala Business District', customerCount: 1678 }
      ]
    },
    {
      id: '3',
      name: 'Quezon City District',
      projects: [
        { name: 'QC North Project', customerCount: 1823 },
        { name: 'QC South Project', customerCount: 1456 },
        { name: 'QC East Project', customerCount: 998 }
      ]
    }
  ];

  // Sample customers data
  const sampleCustomers: Customer[] = [
    {
      id: '1',
      name: 'Juan Dela Cruz',
      accountNumber: 'ACC-001-2024',
      address: '123 Main St, Taguig City',
      meterNumber: 'MTR-12345'
    },
    {
      id: '2',
      name: 'Maria Santos',
      accountNumber: 'ACC-002-2024',
      address: '456 BGC Avenue, Taguig City',
      meterNumber: 'MTR-12346'
    },
    {
      id: '3',
      name: 'Pedro Reyes',
      accountNumber: 'ACC-003-2024',
      address: '789 Fort Street, Taguig City',
      meterNumber: 'MTR-12347'
    },
    {
      id: '4',
      name: 'Ana Garcia',
      accountNumber: 'ACC-004-2024',
      address: '321 Market Road, Taguig City',
      meterNumber: 'MTR-12348'
    }
  ];

  const handleChangeSupply = () => {
    setShowSupplyModal(true);
  };

  const handleLoadProject = () => {
    setShowSupplyModal(true);
  };

  const handleSelectSupply = (supply: Supply) => {
    setSelectedSupply(supply);
    setSelectedProject(null);
    setShowSupplyModal(false);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleLogout = () => {
    setShowMenu(false);
    // Add logout logic here
    alert('Logout functionality');
  };

  const handleSettings = () => {
    setShowMenu(false);
    // Add settings logic here
    alert('Settings functionality');
  };

  // Filter customers based on search query
  const filteredCustomers = sampleCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.meterNumber.toLowerCase().includes(searchQuery.toLowerCase())
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
        <TouchableOpacity 
          style={styles.menuIcon}
          onPress={() => setShowMenu(true)}
        >
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Supply Section */}
      <View style={styles.mainSupplySection}>
        <View style={styles.mainSupplyLeft}>
          <Text style={styles.mainSupplyLabel}>Main Supply</Text>
          <Text style={styles.mainSupplyName}>
            {selectedSupply ? selectedSupply.name : '-'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.changeSupplyButton}
          onPress={handleChangeSupply}
        >
          <Text style={styles.changeSupplyText}>
            {selectedSupply ? 'Change Main Supply' : 'Select Main Supply'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#059669" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <Searchbar
          placeholder="Search project"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#666"
          inputStyle={styles.searchInput}
          elevation={0}
        />

        {/* Conditional Content */}
        {!selectedSupply ? (
          // No Supply Selected - Show Message and Load Button
          <>
            <View style={styles.noSupplyContainer}>
              <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
              <Text style={styles.noSupplyTitle}>No Main Supply Selected</Text>
              <Text style={styles.noSupplyMessage}>
                Please select or load a main supply to view projects and customers
              </Text>
            </View>

            {/* Spacer */}
            <View style={styles.spacer} />

            {/* Load Project Button - Only shown when no supply */}
            <TouchableOpacity
              style={styles.loadProjectButton}
              onPress={handleLoadProject}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="briefcase" size={28} color="#FFFFFF" />
              <Text style={styles.loadProjectText}>Load Main Supply</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Supply Selected - Show Project Cards and Customers
          <>
            {/* Project Cards */}
            <View style={styles.projectCardsContainer}>
              {selectedSupply.projects.map((project, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.projectCard,
                    selectedProject?.name === project.name && styles.projectCardSelected
                  ]}
                  onPress={() => handleSelectProject(project)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.projectCardName}>{project.name}</Text>
                  <Text style={styles.projectCardCustomers}>
                    Customers ({project.customerCount})
                  </Text>
                  {selectedProject?.name === project.name && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={20} color="#059669" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Info message about customers */}
            {selectedProject && (
              <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={24} color="#059669" />
                <Text style={styles.infoText}>
                  Tap on a project card to view its details. Customer list will be available in the Customer Screen.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Select Main Supply Modal */}
      <Modal
        visible={showSupplyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSupplyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Main Supply</Text>
              <TouchableOpacity
                onPress={() => setShowSupplyModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
            >
              {availableSupplies.map((supply) => (
                <TouchableOpacity
                  key={supply.id}
                  style={styles.supplyCard}
                  onPress={() => handleSelectSupply(supply)}
                  activeOpacity={0.7}
                >
                  <View style={styles.supplyCardHeader}>
                    <View style={styles.supplyIconContainer}>
                      <MaterialCommunityIcons name="office-building" size={24} color="#059669" />
                    </View>
                    <View style={styles.supplyCardInfo}>
                      <Text style={styles.supplyCardName}>{supply.name}</Text>
                      <Text style={styles.supplyCardProjects}>
                        {supply.projects.length} project{supply.projects.length !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable 
          style={styles.menuOverlay}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContent}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSettings}
            >
              <Ionicons name="settings-outline" size={22} color="#333" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#DC2626" />
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
  mainSupplySection: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mainSupplyLeft: {
    flex: 1,
  },
  mainSupplyLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  mainSupplyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  changeSupplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  changeSupplyText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '500',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    flexGrow: 1,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 14,
  },
  noSupplyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  noSupplyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noSupplyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  projectCardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  projectCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  projectCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  projectCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  projectCardCustomers: {
    fontSize: 14,
    color: '#666',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  infoCard: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#059669',
    lineHeight: 20,
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },
  loadProjectButton: {
    backgroundColor: '#059669',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  loadProjectText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  supplyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  supplyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supplyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplyCardInfo: {
    flex: 1,
  },
  supplyCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  supplyCardProjects: {
    fontSize: 14,
    color: '#666',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContent: {
    backgroundColor: '#FFFFFF',
    marginTop: 90,
    marginRight: 20,
    borderRadius: 12,
    minWidth: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  logoutText: {
    color: '#DC2626',
  },
});
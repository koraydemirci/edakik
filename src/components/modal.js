import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native'
import {Text} from '../components/styledComponents'
import _ from 'lodash'

export const ModalContainer = ({
  showModal,
  loading,
  data,
  closeModal,
  navigation,
  modalType,
}) => {
  let message, children
  if (modalType === 'followers' && !_.get(data, 'length')) {
    message = 'Takipçisi bulunmuyor.'
  } else if (!_.get(data, 'length')) {
    message = 'Takip ettiği kimse bulunmuyor.'
  }

  if (loading) {
    children = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color='#3D8EB9' />
      </View>
    )
  } else if (message) {
    children = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{message}</Text>
      </View>
    )
  } else {
    const handleProfileDetail = userName => {
      closeModal()
      navigation.navigate('Profile', {userName})
    }

    const renderItem = ({item, index}) => (
      <View key={item.id}>
        <Text fontWeight='bold' onPress={() => handleProfileDetail(item.login)}>
          <Text>{index + 1}. </Text>
          <Text textDecoration='underline'>{item.login}</Text>
        </Text>
      </View>
    )

    const getKey = item => item.id.toString()

    children = (
      <FlatList
        style={{width: '100%', padding: 15}}
        data={data}
        renderItem={renderItem}
        keyExtractor={getKey}
        ListHeaderComponent={
          <Text textAlign='center' fontWeight='bold'>
            {modalType === 'followers' ? 'TAKİPÇİLER' : 'TAKİP ETTİKLERİ'}
          </Text>
        }
      />
    )
  }

  return (
    <Modal animationType='slide' transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <View style={styles.closeButtonContainer}>
            <Text onPress={closeModal} textAlign='center' fontWeight='bold'>
              Kapat
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    height: 400,
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonContainer: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
})

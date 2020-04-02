import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  TextInput,
  Platform,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native'

export const ModalContainer = ({
  showModal,
  loading,
  data,
  closeModal,
  navigation,
}) => {
  const handleProfileDetail = userName => {
    closeModal()
    navigation.navigate('Profile', {userName})
  }
  return (
    <Modal animationType='slide' transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {data &&
            data.map(item => (
              <View key={item.id}>
                <Text onPress={() => handleProfileDetail(item.login)}>
                  {item.login}
                </Text>
              </View>
            ))}
          <View style={{width: '100%', height: 50, alignItems: 'flex-start'}}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor='#DDDDDD'
              onPress={closeModal}>
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 35,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

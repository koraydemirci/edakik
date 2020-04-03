import React from 'react'
import {StyleSheet, TextInput, Platform, View, Text} from 'react-native'

const SearchBar = ({handleChangeText, searchText}) => {
  return (
    <View style={styles.searchbarContainer}>
      <TextInput
        onChangeText={text => handleChangeText(text)}
        value={searchText}
        style={styles.textInput}
        placeholder='Ara'
      />
      <Text style={styles.searchBarText} onPress={() => handleChangeText('')}>
        {searchText.length ? 'Temizle' : ''}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  searchbarContainer: {
    ...Platform.select({
      ios: {
        height: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        margin: 10,
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      android: {
        height: 30,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
    }),
  },
  textInput: {
    ...Platform.select({
      ios: {
        height: '100%',
        width: '80%',
        fontSize: 16,
      },
      android: {
        height: 30,
        width: '80%',
        fontSize: 16,
        paddingBottom: 0,
      },
    }),
  },
  searchBarText: {
    width: '20%',
    textAlign: 'right',
    fontSize: 16,
  },
})

export default SearchBar

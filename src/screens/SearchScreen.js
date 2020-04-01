import React, {useState} from 'react'
import {
  StyleSheet,
  TextInput,
  Platform,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {fetchGithubUsers, resetGithubUsers} from '../store/actions/usersList'
import {useDebouncedEffect} from '../custom-hooks/useDebounce'

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {usersList} = useSelector(state => state)
  console.log("SearchScreen -> usersList", usersList)

  const [searchText, setSearchText] = useState('')

  useDebouncedEffect(
    () => {
      if (searchText) {
        dispatch(fetchGithubUsers(searchText))
      } else {
        dispatch(resetGithubUsers())
      }
    },
    200,
    [searchText],
  )

  const handleDetailView = userName => {
    navigation.navigate('Profile', {userName})
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleDetailView(item.login)}
      style={{
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
      }}>
      <Text>{item.login}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbarContainer}>
        <TextInput
          onChangeText={text => setSearchText(text)}
          value={searchText}
          style={styles.textInput}
          placeholder='Search'
        />
        {/* <Text
          style={[styles.searchBarText, {color: themeSubTextColor}]}
          onPress={clearSearchbar}>
          {searchbarValue.length ? i18n.t('clear') : ''}
        </Text> */}
      </View>
      {usersList && usersList.length && (
        <FlatList
          data={usersList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    ...Platform.select({
      ios: {
        height: 35,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 50,
        margin: 10,
        marginBottom: 6,
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      android: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 6,
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

export default SearchScreen

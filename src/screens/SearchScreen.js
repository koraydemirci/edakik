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
  ActivityIndicator,
  Image,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {fetchGithubUsers, resetGithubUsers} from '../store/actions/usersList'
import {useDebouncedEffect} from '../custom-hooks/useDebounce'

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {usersList} = useSelector(state => state || [])

  const [searchText, setSearchText] = useState('koraydemirc')
  const [loading, setLoading] = useState(false)

  useDebouncedEffect(
    () => {
      if (searchText) {
        const fetchUsers = async () => {
          setLoading(true)
          try {
            await dispatch(fetchGithubUsers(searchText))
          } catch (error) {
            console.log(error)
          }
          setLoading(false)
        }
        fetchUsers()
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
      }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: item.avatar_url,
        }}
      />
      <View styles={{alignItems: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{textAlign: 'center'}}>{item.login}</Text>
      </View>
    </TouchableOpacity>
  )

  const getKey = item => item.id.toString()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbarContainer}>
        <TextInput
          onChangeText={text => setSearchText(text)}
          value={searchText}
          style={styles.textInput}
          placeholder='Search'
        />
        <Text style={styles.searchBarText} onPress={() => setSearchText('')}>
          {searchText.length ? 'Clear' : ''}
        </Text>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <FlatList
          data={usersList}
          renderItem={renderItem}
          keyExtractor={getKey}
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
})

export default SearchScreen

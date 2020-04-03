import React, {useState} from 'react'
import {FlatList, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {fetchGithubUsers, resetGithubUsers} from '../store/actions/usersList'
import {useDebouncedEffect} from '../custom-hooks/useDebounce'
import Searchbar from '../components/searchbar'
import {
  SafeCenteredView,
  Text,
  FlexView,
  View
} from '../components/styledComponents'
import UserListItem from '../components/search-screen/UserListItem'
import _ from 'lodash'

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {usersList} = useSelector(state => state)

  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useDebouncedEffect(
    () => {
      if (searchText) {
        const fetchUsers = async () => {
          setLoading(true)
          setError(false)
          try {
            await dispatch(fetchGithubUsers(searchText))
          } catch (error) {
            console.log(error)
            setError(true)
          }
          setLoading(false)
        }
        fetchUsers()
      } else {
        dispatch(resetGithubUsers())
      }
    },
    500,
    [searchText],
  )

  const handleDetailView = userName => {
    navigation.navigate('Profile', {userName})
  }

  let message, children
  if (error) {
    message =
      'Arama sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
  } else if (_.get(usersList, 'length') === 0) {
    message = 'Aradığınız isimde Github kullanıcısı bulunmuyor.'
  } else if (!usersList && !loading) {
    message =
      'Bulmak istediğiniz Github kullanıcısı için arama çubuğunu kullanınız!'
  }

  if (message) {
    children = (
      <View>
        <Text textAlign='center' fontSize='18px'>{message}</Text>
      </View>
    )
  } else if (loading) {
    children = (
      <View>
        <ActivityIndicator size='large' color='#3D8EB9' />
      </View>
    )
  } else {
    const renderItem = ({item}) => (
      <UserListItem item={item} handleDetailView={handleDetailView} />
    )
    const getKey = item => item.id.toString()
  
    children = (
      <FlexView>
        <FlatList
          style={{padding: 10}}
          data={usersList}
          renderItem={renderItem}
          keyExtractor={getKey}
        />
      </FlexView>
    )
  }

  return (
    <SafeCenteredView>
      <Searchbar
        handleChangeText={searchText => setSearchText(searchText)}
        searchText={searchText}
      />
      {children}
    </SafeCenteredView>
  )
}

export default SearchScreen


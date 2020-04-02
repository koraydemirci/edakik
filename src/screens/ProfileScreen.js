import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  fetchUserProfile,
  fetchUserFollowers,
  fetchUserFollowings
} from '../store/actions/userProfile'
import {ModalContainer} from '../components/UI'

const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch()
  const {userProfile} = useSelector(state => state)
  const {userName} = route.params

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalLoader, setShowModalLoader] = useState(false)
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    if (userName) {
      const fetchProfile = async () => {
        setLoading(true)
        try {
          await dispatch(fetchUserProfile(userName))
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
      fetchProfile()
    }
  }, [userName])

  const handleModal = async (type) => {
    setShowModal(true)
    setShowModalLoader(true)
    try {
      if (type === 'followers') {
        setModalType('followers')
        await dispatch(fetchUserFollowers(userName))
      } else {
        setModalType('followings')
        await dispatch(fetchUserFollowings(userName))
      }
    } catch (error) {
      console.log(error)
    }
    setShowModalLoader(false)
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleDetailView(item.login)}
      style={{
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
      }}>
      <Text style={{textAlign: 'center'}}>{item.name}</Text>
      <Text style={{textAlign: 'center'}}>{item.description}</Text>
      <Text style={{textAlign: 'center'}}>{item.forks}</Text>
      <Text style={{textAlign: 'center'}}>{item.forks}</Text>
    </TouchableOpacity>
  )

  const getKey = item => item.id.toString()

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }

  if (!Object.keys(userProfile).length) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> No Profile</Text>
      </View>
    )
  }

  const {
    avatar_url,
    name,
    company,
    bio,
    created_at,
    followers,
    following,
    repos,
    followersList,
    followingList
  } = userProfile

  return (
    <SafeAreaView style={styles.container}>
      <ModalContainer
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        loading={showModalLoader} data={modalType === 'followers' ? followersList : followingList} navigation={navigation}>
      </ModalContainer>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: avatar_url,
          }}
        />
        <Text>{name}</Text>
        {company && <Text>{company}</Text>}
        {bio && <Text>{bio}</Text>}
        <Text>{created_at}</Text>
        <Text onPress={() => handleModal('followers')}>{followers}</Text>
        <Text onPress={() => handleModal('followings')}>{following}</Text>
      </View>
      <FlatList data={repos} renderItem={renderItem} keyExtractor={getKey} />
    </SafeAreaView>
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

export default SearchScreen

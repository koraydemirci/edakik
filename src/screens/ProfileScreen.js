import React, {useState, useEffect} from 'react'
import {FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  fetchUserProfile,
  fetchUserFollowers,
  fetchUserFollowings,
} from '../store/actions/userProfile'
import {ModalContainer} from '../components/modal'
import {SafeCenteredView, Text, View} from '../components/styledComponents'
import FlatListHeader from '../components/profile-screen/FlatListHeader'
import UserRepo from '../components/profile-screen/UserRepo'

const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch()
  const {userProfile} = useSelector(state => state)
  const {userName} = route.params

  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalLoader, setShowModalLoader] = useState(false)
  const [modalType, setModalType] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (userName) {
      const fetchProfile = async () => {
        setLoading(true)
        setError(false)
        try {
          await dispatch(fetchUserProfile(userName))
        } catch (error) {
          console.log(error)
          setError(true)
        }
        setLoading(false)
      }
      fetchProfile()
    }
  }, [userName])

  const handleModal = async type => {
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


  let message
  if (error) {
    message =
      'Profil gösterilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
  } else if (userProfile && !Object.keys(userProfile).length && !loading) {
    message = 'Bu kişiye ait bir profil bulunmuyor.'
  }

  if (message) {
    return (
      <View>
        <Text textAlign='center' fontSize='18px'>
          {message}
        </Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='#3D8EB9' />
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
    followingList,
  } = userProfile

  const listHeaderComponentProps = {
    avatar_url,
    name,
    company,
    bio,
    created_at,
    followers,
    following,
    handleModal
  }

  const renderItem = ({item}) => <UserRepo item={item} />
  const getKey = item => item.id.toString()

  return (
    <SafeCenteredView>
      <ModalContainer
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        loading={showModalLoader}
        data={modalType === 'followers' ? followersList : followingList}
        navigation={navigation}
        modalType={modalType}
      />
      <FlatList
        style={{padding: 10, width: '100%'}}
        data={repos}
        renderItem={renderItem}
        keyExtractor={getKey}
        ListHeaderComponent={<FlatListHeader {...listHeaderComponentProps} />}
      />
    </SafeCenteredView>
  )
}

export default SearchScreen

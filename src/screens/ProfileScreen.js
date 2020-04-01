import React, {useEffect} from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native'
import { useDispatch} from 'react-redux'
import {fetchUserProfile} from '../store/actions/userProfile'


const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch()
  const { userName } = route.params;
  
  useEffect(() => {
    if (userName) {
      dispatch(fetchUserProfile(userName))
    }
  }, [userName])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>koray</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SearchScreen

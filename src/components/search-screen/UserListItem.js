import React from 'react'
import {
  Text,
  TouchableListItem,
  Image,
  View,
} from '../styledComponents'

const UserListItem = ({item, handleDetailView}) => (
  <TouchableListItem onPress={() => handleDetailView(item.login)}>
    <Image
      source={{
        uri: item.avatar_url,
      }}
    />
    <View justifyContent='center' alignItems='flex-start' marginLeft='20px'>
      <Text fontSize='16px'>{item.login}</Text>
    </View>
  </TouchableListItem>
)

export default UserListItem

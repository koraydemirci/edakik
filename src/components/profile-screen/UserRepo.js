import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '../styledComponents'

const UserRepo = ({item}) => {
  const {name, description, stargazers_count, forks} = item
  return (
    <View style={styles.container}>
      <Text fontWeight='bold'>
        Repo İsmi: <Text>{name}</Text>
      </Text>
      <Text fontWeight='bold'>
        Açıklama: <Text>{description}</Text>
      </Text>
      <Text fontWeight='bold'>
        Yıldız Sayısı: <Text>{stargazers_count}</Text>
      </Text>
      <Text fontWeight='bold'>
        Fork Sayısı: <Text>{forks}</Text>
      </Text>
    </View>
  )
}

export default UserRepo

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
})

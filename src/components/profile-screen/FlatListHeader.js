import React from 'react'
import {View as ContainerView} from 'react-native'
import {View, Image, Text} from '../styledComponents'

const FlatListHeader = ({
  avatar_url,
  name,
  company,
  created_at,
  bio,
  followers,
  following,
  handleModal
}) => {
  return (
    <ContainerView style={{height: 250}}>
      <View flexDirection='row' alignItems='center'>
        <Image
          height={'100px'}
          width={'100px'}
          borderRadius={'50px'}
          source={{
            uri: avatar_url,
          }}
        />
        <View paddingLeft='20px' alignItems='flex-start'>
          <Text fontWeight='bold'>
            İSİM SOYİSİM: <Text>{name}</Text>
          </Text>
          {company && (
            <Text fontWeight='bold'>
              ŞİRKET: <Text>{company}</Text>
            </Text>
          )}
          {bio && (
            <Text fontWeight='bold'>
              BİO: <Text>{bio}</Text>
            </Text>
          )}
          <Text fontWeight='bold'>
            KATILMA TARİHİ:{' '}
            <Text>{new Date(created_at).toLocaleDateString('tr-TR')}</Text>
          </Text>

          <Text fontWeight='bold' onPress={() => handleModal('followers')}>
            TAKİPÇİLER: <Text textDecoration='underline'>{followers}</Text>
          </Text>

          <Text fontWeight='bold' onPress={() => handleModal('followings')}>
            TAKİP ETTİKLERİ: <Text textDecoration='underline'>{following}</Text>
          </Text>
        </View>
      </View>
      <Text fontWeight='bold' textAlign='center' padding='10px'>
        REPOLAR 
      </Text>
    </ContainerView>
  )
}

export default FlatListHeader

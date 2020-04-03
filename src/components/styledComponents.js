import styled from 'styled-components'

export const SafeCenteredView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const FlexView = styled.View`
  flex: 1;
`

export const View = styled.View`
  flex: ${props => props.flex || 1};
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  margin-left: ${props => props.marginLeft || 0};
  padding: ${props => props.padding || '20px'};
  padding-left: ${props => props.paddingLeft || 0};
`

export const TouchableListItem = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #ccc;
  border-bottom-width: 0.5px;
`

export const Image = styled.Image`
  width: ${props => props.width || '50px'};
  height: ${props => props.height || '50px'};
  border-radius: ${props => props.borderRadius || '25px'};
`

export const Text = styled.Text`
  text-align: ${props => props.alignText || 'left'};
  color: ${props => props.color || '#555'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '2px'};
  text-align: ${props => props.textAlign || 'left'};
  text-decoration: ${props => props.textDecoration || ''};
`
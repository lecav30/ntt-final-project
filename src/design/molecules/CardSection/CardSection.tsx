import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, Text, View } from 'react-native';
import styles from './CardSection.styles';

interface Props {
  cardStyles?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  icon: ReactNode;
  handlePress: () => void;
}

const CardSection = (props: Props) => {
  return (
    <Pressable
      onPress={props.handlePress}
      style={[styles.container, props.cardStyles]}
    >
      <View style={styles.iconContainer}>
        <Text>{props.icon}</Text>
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </Pressable>
  );
};

export default CardSection;

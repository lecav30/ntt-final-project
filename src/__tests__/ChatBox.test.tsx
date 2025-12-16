import { render } from '@testing-library/react-native';
import ChatBox from '../design/atoms/ChatBox/ChatBox';
import styles from '../design/atoms/ChatBox/ChatBox.styles';

describe('ChatBox', () => {
  it('renders assistant variant with message', () => {
    const { getByText, getByTestId } = render(
      <ChatBox
        message="Hello there"
        variant="assistant"
        testID="assistant-box"
      />
    );

    const message = getByText('Hello there');
    expect(message).toBeTruthy();
    const container = getByTestId('assistant-box');
    expect(container.props.style).toEqual(
      expect.arrayContaining([styles.assistant])
    );
  });

  it('renders user variant styles', () => {
    const { getByTestId } = render(
      <ChatBox message="Hi" variant="user" testID="user-box" />
    );

    const container = getByTestId('user-box');
    expect(container.props.style).toEqual(
      expect.arrayContaining([styles.user])
    );
  });
});

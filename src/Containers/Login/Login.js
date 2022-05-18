import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { authenticate } from '~Core/Apis/AuthApi';
import { SCREEN } from '~Core/Utils/Screens';

import Background from '~Base/Components/Background/Background';
import Header from '~Base/Components/Header/Header';
import Button from '~Base/Components/Button/Button';
import TextInput from '~Base/Components/Input/Input';
import AuthMessage from '~Core/Messages/Auth';
import { useAppDispatch } from '~Store/Hook';
import { setUser } from '~Store/Features/Auth/AuthSlice'


const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();

  const onLoginPressed = async () => {
    const data = {
      email,
      password,
    };
    // const result = await authenticate(data);

    // dispatch(setUser(result))

    if (true) {
      navigation.navigate({ name: SCREEN.HOME, params: {} });
    }
  };

  const onPress = () => {
    //Code
  }

  return (
    <Background>
      <Header>{formatMessage(AuthMessage.title)}</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity>
          <Text style={styles.forgot}>{formatMessage(AuthMessage.forgotPassword)}</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        {formatMessage(AuthMessage.login)}
      </Button>
      <View style={styles.row}>
        <Text>{formatMessage(AuthMessage.dontHaveAccount)}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>{formatMessage(AuthMessage.signUp)}</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'blue',
  },
  link: {
    fontWeight: 'bold',
    color: 'black',
  },
});

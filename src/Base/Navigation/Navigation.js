import * as React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const routeNameRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const replace = (name, params) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

export const reset = (name, params) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({ routes: [{ name: name, params: params }] })
  );
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

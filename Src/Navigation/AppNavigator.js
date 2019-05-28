import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainNavigator'
import SignIn from '../Components/Auth/SignIn'
import SinUp from '../Components/Auth/SingUp'
import Loading from '../Components/Loading'

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Loading:Loading,
  SignIn: SignIn,
  SignUp: SinUp,
  Home: MainTabNavigator
},{
  initialRouteName:'Loading'
}));
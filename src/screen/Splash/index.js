import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WithSplashScreen} from '../../components/Spash';
import Login from '../Login';

const Splash = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      {isReady ? <Login /> : null}
      {console.log(isReady)}
    </WithSplashScreen>
  );
};

export default Splash;

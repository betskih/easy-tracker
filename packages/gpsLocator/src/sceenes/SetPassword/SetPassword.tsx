import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import bcrypt from 'react-native-bcrypt';
import { Actions } from 'react-native-router-flux';
import { getGeoIdSelector, isPasswordSetSelector } from '../../App/selectors';
import { getText } from '../../constants/constants';
import { Button, ButtonTypes } from '../components/Button/Button';
import { LCheckBox } from '../components/LCheckBox/LCheckBox';
import { InputText } from '../components/InputText/InputText';
import { useAnimated } from '../../utilities/hooks';
import { setNewPassword } from '../../services/geo/actions';

interface ISetPasswordProps {}

export const SetPassword: FunctionComponent<ISetPasswordProps> = () => {
  const dispatch = useDispatch();
  const geoId = useSelector(getGeoIdSelector);
  const isPasswordSet = useSelector(isPasswordSetSelector);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const goBack = useCallback(() => {
    Actions.pop();
  }, []);

  const setPassword = useCallback(() => {
    const hash = firstPassword ? bcrypt.hashSync(firstPassword, 10) : '';
    dispatch(setNewPassword(geoId, hash));
  }, [dispatch, geoId, firstPassword]);

  const notFound = useMemo(
    () => (
      <>
        <Text style={styles.notFoundText}>{getText('noInfo')}</Text>
        <Button text={getText('close')} type={ButtonTypes.blue} onPress={goBack} />
      </>
    ),
    [goBack],
  );

  useAnimated();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {geoId ? (
          <>
            <Text style={[styles.subText, styles.firstTitle]}>{getText('yourId')}</Text>
            <Text style={styles.idText}>{geoId}</Text>
            <LCheckBox
              initial={isChecked}
              style={styles.checkBox}
              text={getText(isPasswordSet ? 'changePassword' : 'setPassword')}
              onCheck={setIsChecked}
            />
            {isChecked ? (
              <>
                <Text style={[styles.subText, styles.secondTitle]}>{getText('newPassword')}</Text>
                <InputText
                  secureTextEntry
                  maxLength={18}
                  onChangeText={setFirstPassword}
                  value={firstPassword}
                />
                <Text style={[styles.subText, styles.secondTitle]}>
                  {getText('repeatPassword')}
                </Text>
                <InputText
                  secureTextEntry
                  maxLength={18}
                  onChangeText={setSecondPassword}
                  value={secondPassword}
                />
                <View style={styles.horizontal}>
                  <Button
                    text={getText(
                      firstPassword === '' && firstPassword === secondPassword ? 'reset' : 'change',
                    )}
                    type={ButtonTypes.blue}
                    onPress={setPassword}
                    disabled={firstPassword !== secondPassword}
                  />
                  <Button text={getText('close')} type={ButtonTypes.red} onPress={goBack} />
                </View>
              </>
            ) : (
              <Button text={getText('close')} type={ButtonTypes.red} onPress={goBack} />
            )}
          </>
        ) : (
          notFound
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingLeft: 30,
    paddingRight: 30,
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: '#828282',
    fontSize: 24,
    lineHeight: 33,
    fontWeight: 'normal',
  },
  idText: {
    fontSize: 48,
    fontWeight: 'normal',
    lineHeight: 65,
    marginBottom: 7,
  },
  notFoundText: {
    color: '#B91C1C',
    fontSize: 36,
    fontWeight: 'normal',
    lineHeight: 46,
    marginTop: 45,
    marginBottom: 20,
  },
  firstTitle: {
    width: '100%',
    marginTop: 30,
    marginLeft: 56,
  },
  secondTitle: {
    marginBottom: 8,
  },
  checkBox: {
    marginBottom: 34,
  },
  horizontal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 34,
    paddingLeft: 33,
    paddingRight: 33,
    width: '100%',
  },
});

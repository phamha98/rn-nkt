import React, { useRef, useState, useEffect } from 'react';
import { Clipboard, PixelRatio, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import constants from '../../../common/constants';
import { KEYS_LOCALSTORAGE } from '../../../common/LocalStorage';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import LocalStorage from '../../../library/utils/storage';
import { dispatch, store } from '../../../store/store';
import { reducerInfos } from '../../../store/reducer';
import { palette as appColors } from '../../../themes/palette';
import { debugForceUpdate } from '../redux/debugAction';
import { navigate } from '../../../navigation/navigationService';
import deviceInfoModule from 'react-native-device-info';

const styleButton = {
  style: {
    marginLeft: 5,
    paddingVertical: 3,
    paddingHorizontal: 3
  },
  styleText: {
    fontSize: 12
  }
}
const NavigationComponent = () => {
  const navigationSteps = useSelector(state => state.debug.navigationSteps);
  const currentNavigation = useSelector(state => state.debug.currentNavigation);
  var currentStep = navigationSteps.length > 0 ? navigationSteps[navigationSteps.length - 1] : null;
  return (
    <ViewCus.Card
      title='Navigation'
      styleContainer={{
      }}
    >
      {
        currentStep != null &&
        <>
          <ViewCus.Text>
            {navigationSteps.map(e => e.routeName).join(' > ')}
          </ViewCus.Text>

          <ViewCus.Collapsible
            title='Params'
            styleContainer={{
              paddingVertical: 8
            }}
          >
            <ViewCus.Text>
              {'{0}'.format(JSON.stringify(currentStep.params, null, '\t') || 'null')}
            </ViewCus.Text>
          </ViewCus.Collapsible>
        </>
      }
      <ViewCus.ViewHorizontal
        style={{
          marginTop: 10,
          flexWrap: 'wrap'
        }}
      >
        <ViewCus.Button
          onPress={() => navigate('AUTHORIZE', {
            screen: 'HOME',
            params: {
              screen: 'HOME',
              params: {
                screen: 'TAB_NOTIFY',
              }
            }
          })}
          {...styleButton}
        >
          {'Go'}
        </ViewCus.Button>
        {
          [
            {
              label: 'Copy',
              onPress: () => {
                Clipboard.setString(JSON.stringify(navigationSteps))
              }
            },
            {
              label: 'On Start',
              onPress: () => {
                ViewCus.Alert.Confirm(() => {
                  dispatch(debugForceUpdate({
                    initNavigation: {
                      navigation: currentNavigation
                    }
                  }, true))
                }, null, 'On Start')
              }
            },
            {
              label: 'Clean on start',
              onPress: () => {
                ViewCus.Alert.Confirm(() => {
                  dispatch(debugForceUpdate({
                    initNavigation: {
                      navigation: null
                    }
                  }, true))
                }, null, 'Clean on start')
              }
            },
          ].map((e, index) => (
            <ViewCus.Button
              key={index}
              onPress={() => e.onPress()}
              {...styleButton}
            >
              {e.label}
            </ViewCus.Button>
          ))
        }
      </ViewCus.ViewHorizontal>
    </ViewCus.Card>
  )
}

const DeviceInfoComponent = () => {
  const [info, setInfo] = useState(null)
  const run = async () => {
    var AndroidId = await deviceInfoModule.getAndroidId();
    var ApiLevel = await deviceInfoModule.getApiLevel();
    var ApplicationName = deviceInfoModule.getApplicationName();
    var AvailableLocationProviders = await deviceInfoModule.getAvailableLocationProviders();
    var BuildId = await deviceInfoModule.getBuildId();
    var Brand = deviceInfoModule.getBrand();
    var BuildNumber = deviceInfoModule.getBuildNumber();
    var BundleId = deviceInfoModule.getBundleId();
    var Codename = await deviceInfoModule.getCodename();
    var Device = await deviceInfoModule.getDevice();
    var DeviceId = deviceInfoModule.getDeviceId();
    var DeviceType = deviceInfoModule.getDeviceType();
    var Display = await deviceInfoModule.getDisplay();
    var DeviceName = await deviceInfoModule.getDeviceName();

    // <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    // var IpAddress = await deviceInfoModule.getIpAddress();
    // var MacAddress = await deviceInfoModule.getMacAddress();

    var Manufacturer = await deviceInfoModule.getManufacturer();
    var Model = deviceInfoModule.getModel();
    var SystemName = deviceInfoModule.getSystemName();
    var SystemVersion = deviceInfoModule.getSystemVersion();
    var UniqueId = deviceInfoModule.getUniqueId();
    var Version = deviceInfoModule.getVersion();
    var hasNotch = deviceInfoModule.hasNotch();
    var isEmulator = await deviceInfoModule.isEmulator();
    var isLandscape = await deviceInfoModule.isLandscape();
    var isLocationEnabled = await deviceInfoModule.isLocationEnabled();
    var isTablet = deviceInfoModule.isTablet();

    setInfo({
      AndroidId,
      ApiLevel,
      ApplicationName,
      AvailableLocationProviders,
      BuildId,
      Brand,
      BuildNumber,
      BundleId,
      Codename,
      Device,
      DeviceId,
      DeviceType,
      Display,
      DeviceName,
      // IpAddress,
      // MacAddress,
      Manufacturer,
      Model,
      SystemName,
      SystemVersion,
      UniqueId,
      Version,
      hasNotch,
      isEmulator,
      isLandscape,
      isLocationEnabled,
      isTablet,
    })
  }
  useEffect(() => {
    run();
  }, [])
  return (
    <ViewCus.Card
      title='Device info'
      styleContainer={{
        marginTop: 20
      }}
    >
      {
        info != null &&
        <ViewCus.Text>
          {JSON.stringify(info, null, '\t')}
        </ViewCus.Text>
      }
    </ViewCus.Card>
  )
}

const ReduxComponent = () => {
  const refModal = useRef(null)
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null)
  return (
    <>
      <ViewCus.Modal
        ref={refModal}
        title={selected?.name}
      >
        <ScrollView
          contentContainerStyle={{
            // flexShrink: 1
          }}
        >
          <ViewCus.Text>
            {
              value == null ? 'No data' : value
            }
          </ViewCus.Text>
        </ScrollView>
        <ViewCus.Button
          onPress={() => Clipboard.setString(value || "")}
          style={{
            marginTop: 20,
            backgroundColor: appColors.materialBlue
          }}
          styleText={{
            color: appColors.white
          }}
        >
          {'Copy'}
        </ViewCus.Button>
      </ViewCus.Modal>
      <ViewCus.Card
        title='Redux'
        styleContainer={{
          marginTop: 20
        }}
      >
        <ViewCus.Selector
          options={reducerInfos}
          optionLabel={e => e.name}
          onSelected={(e, index) => setSelected(e)}
          styleButtonContainer={{
            minHeight: 10
          }}
        />
        <ViewCus.ViewHorizontal
          style={{
            marginTop: 10,
            flexWrap: 'wrap'
          }}
        >
          {
            [
              {
                label: 'View',
                onPress: async () => {
                  if (selected == null)
                    return;
                  var value = store.getState()[selected.name];
                  value = JSON.stringify(value);
                  setValue(value);
                  refModal.current.toggle();
                }
              },
              {
                label: 'Copy',
                onPress: async () => {
                  if (selected == null)
                    return;

                  var value = store.getState()[selected.name];
                  value = JSON.stringify(value);
                  Clipboard.setString(value || '')
                }
              },
            ].map((e, index) => (
              <ViewCus.Button
                key={index}
                onPress={() => e.onPress()}
                {...styleButton}
              >
                {e.label}
              </ViewCus.Button>
            ))
          }
        </ViewCus.ViewHorizontal>
      </ViewCus.Card>
    </>
  )
}
const LocalStorageComponent = () => {
  const refModal = useRef(null)
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const options = (await LocalStorage.getAllKeys()).map(e => ({ name: e, value: e, default: null }));
    console.log(options)
    setOptions(options);
  }
  return (options.length > 0 &&
    <>
      <ViewCus.Modal
        ref={refModal}
        title={selected?.name}
      >
        <ScrollView
          contentContainerStyle={{
            // flexShrink: 1
          }}
        >
          <ViewCus.Text>
            {
              value == null ? 'No data' : value
            }
          </ViewCus.Text>
        </ScrollView>
        <ViewCus.Button
          onPress={() => Clipboard.setString(value || "")}
          style={{
            marginTop: 20,
            backgroundColor: appColors.materialBlue
          }}
          styleText={{
            color: appColors.white
          }}
        >
          {'Copy'}
        </ViewCus.Button>
      </ViewCus.Modal>
      <ViewCus.Card
        title='LocalStorage'
        styleContainer={{
          marginTop: 20
        }}
      >
        <ViewCus.Selector
          // options={KEYS_LOCALSTORAGE}
          options={options}
          optionLabel={e => e.name}
          onSelected={(e, index) => setSelected(e)}
          styleButtonContainer={{
            minHeight: 10
          }}
        />
        <ViewCus.ViewHorizontal
          style={{
            marginTop: 10,
            flexWrap: 'wrap'
          }}
        >
          {
            [
              {
                label: 'Clean all',
                onPress: () => {
                  ViewCus.Alert.Confirm(() => {
                    LocalStorage.clear()
                    // KEYS_LOCALSTORAGE.map((e) => {
                    //   LocalStorage.saveString(e.value, e.default)
                    // })
                  }, null, 'Clean all')
                }
              },
              {
                label: 'Clean',
                onPress: () => {
                  ViewCus.Alert.Confirm(() => {
                    selected != null && LocalStorage.saveString(selected.value, selected.default)
                  }, null, 'Clean selected')
                }
              },
              {
                label: 'View',
                onPress: async () => {
                  if (selected == null)
                    return;
                  var value = await LocalStorage.loadString(selected.value, selected.default);
                  setValue(value);
                  refModal.current.toggle();
                }
              },
              {
                label: 'Copy',
                onPress: async () => {
                  if (selected == null)
                    return;

                  var value = await LocalStorage.loadString(selected.value, selected.default);

                  Clipboard.setString(value || '')
                }
              },
            ].map((e, index) => (
              <ViewCus.Button
                key={index}
                onPress={() => e.onPress()}
                {...styleButton}
              >
                {e.label}
              </ViewCus.Button>
            ))
          }
        </ViewCus.ViewHorizontal>
      </ViewCus.Card>
    </>
  )
}

const ScreenComponent = () => {
  const isShowTouchable = useSelector(state => {
    return state.debug.isShowTouchable
  });
  return (
    <ViewCus.Card
      title='Screen'
      styleContainer={{
        marginTop: 20
      }}
    >
      <ViewCus.Text>
        {'Window: {0} x {1}'.format(constants.window.width.toFixed(2), constants.window.height.toFixed(2))}
      </ViewCus.Text>
      <ViewCus.Text>
        {'Font scale: {0} | PixelRatio: {1}'.format(PixelRatio.getFontScale().toFixed(2), PixelRatio.get().toFixed(2))}
      </ViewCus.Text>
      <ViewCus.Button
        onPress={() => dispatch(forceUpdateDebug({
          isShowTouchable: !isShowTouchable
        }, true))}
        style={{
          paddingVertical: 3,
          paddingHorizontal: 3
        }}
      >
        {'{0} touchable'.format(isShowTouchable ? 'Hiden' : 'Show')}
      </ViewCus.Button>
    </ViewCus.Card>
  )
}

export default function DebugScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 10
      }}
    >
      <NavigationComponent />
      <ScreenComponent />
      <LocalStorageComponent />
      <ReduxComponent />
      <DeviceInfoComponent />
    </ScrollView>
  );
}

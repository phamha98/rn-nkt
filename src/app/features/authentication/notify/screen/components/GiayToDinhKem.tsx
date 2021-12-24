import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ConfigProps, Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import { AppState } from 'src/app/store/app_redux/type';
import { toggleLoading } from '../../../../../../../App';
import { Button, IoniconsFont, Text as TextRN } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { ServiceAsync } from '../../../../../library/networking/async';
import { store as storeRedux } from '../../../../../store/store';
import { palette as appColors } from '../../../../../themes';
var thumbImg = require('../../../../../assets/image/no-thumbnail.jpg');
const Text = props => <TextRN {...props} style={[{ color: 'black' }, props.style]} />

let defaultData = {
  listImgs: []
}

const FieldImage = (props: any) => {
  const { input: { value: valueReduxForm, onChange: onChangeReduxForm } = {} } = props
  const {
    input: inputReduxForm,
    meta: metaReduxForm,
  } = props;

  const { token }: AppState = storeRedux.getState().AppReducer;

  const onSelected = async (image) => {
    toggleLoading(true)
    var formData = new FormData();
    formData.append("File", image.blob)
    try {
      var resp = await ServiceAsync.UploadFile('https://apinkt.dttt.vn/api/v1/NNMB_FileDinhKem/UploadFile', formData, {
        Token: token
      });
      if (resp.status)
        onChangeReduxForm(resp.data);
    } catch (error) {
      console.log(error)
      ViewCus.Alert.Alert('Error upload.');
    }
    toggleLoading(false);
  }

  var isUrl = valueReduxForm != null && valueReduxForm != '';
  return (
    <>
      <View
        style={{
          margin: 5,
          padding: 5,
          borderColor: '#f2f2f2',
          borderWidth: 1,
          borderRadius: 5
        }}
      >
        <ViewCus.Image
          style={{
            width: '100%',
            height: 200,
          }}
          source={!isUrl ? thumbImg : { uri: valueReduxForm }}
        />
        {isUrl &&
          <Button
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: appColors.transparent
            }}
            onPress={() => ViewCus.Alert.Confirm(() => onChangeReduxForm(null))}
          >
            <ViewCus.Ionicons icon={IoniconsFont.close} color={appColors.metroRed} />
          </Button>
        }
      </View>

      <ViewCus.SelectorImage
        onSelected={image => onSelected(image)}
      >
        <ViewCus.Ionicons icon={IoniconsFont.camera} size={30} color={appColors.lightGrey} />
      </ViewCus.SelectorImage>
    </>
  )
}

const ImageItem = (props: any) => {
  const { fields, meta: { error } } = props;
  var allData = fields.getAll();

  return allData != null && fields.map((name, index) => {
    var isUrl = allData[index].url;
    isUrl = isUrl != null && isUrl != '';
    return (
      <ViewCus.ViewBoxShadown key={index}>
        <ViewCus.ViewHorizontal
          style={{
            alignItems: 'center',
          }}
        >
          <ViewCus.Ionicons
            icon={IoniconsFont.checkmarkCircleOutline}
            size={30} color={isUrl ? appColors.metronicSuccess : appColors.lightGrey}
            style={{
              paddingHorizontal: 10
            }}
          />
          <Text style={{paddingRight: 30}}>
            {allData[index].ten}
          </Text>
        </ViewCus.ViewHorizontal>
        <Field
          name={'{0}.url'.format(name)}
          component={FieldImage}
        />
      </ViewCus.ViewBoxShadown>
    )
  })
}

export const GiayToDinhKem = reduxForm({ form: 'GiayToDinhKem' })(
  (props: ConfigProps & InjectedFormProps) => {
    const { token }: AppState = useSelector((state: any) => state.AppReducer);
    const {
      handleSubmit,
      reset: resetForm,
      initialize: loadForm,
      anyTouched,
      invalid,
      submitView = null,
      refOut,
      onReady,
      onRefresh,
      lockTab,
      isRefresh: _isRefresh,
    } = props;
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
      setIsRefresh(false);
      init()
    }, [_isRefresh])

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      defaultData = {
        ...defaultData,
        // listImgs: dataSaved.dmGiayTo.map(e => ({ ...e, url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg' }))
        listImgs: dataSaved.dmGiayTo.map(e => ({ ...e, url: '' })).map(e => {
          var find = dataSaved.fileDinhKem.filter(e1 => e.id == e1.idLoai)[0];
          if (find != null) {
            e.url = find.duongDan// check host + theem
            e.IdFile = find.id
          }
          return e;
        })
      }
      setFormData(defaultData);
    }
    const setFormData = (data) => {
      loadForm(data)
    }

    const onResetFrom = () => {
      loadForm(defaultData)
    }

    return (
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
      >
        <FieldArray
          name={'listImgs'}
          component={ImageItem}
        />
        {
          (anyTouched && invalid) && <View>
            <Text
              style={{
                color: appColors.materialRed,
                paddingVertical: 20,
                paddingHorizontal: 10
              }}
            >
              {'Hãy kiểm tra lại dữ liệu'}
            </Text>
          </View>
        }
        {__DEV__ &&
          <Button
            onPress={() => onResetFrom()}
          >
            {'Reset'}
          </Button>
        }
        {
          lockTab &&
          submitView != null && submitView((payload: object) => {
            handleSubmit((obj) => {
              var data = obj.listImgs.map(e => ({
                DuongDan: e.url || '',
                Id: e.IdFile || 0,
                IdLoai: e.id
              }));
              props.onSubmitNext('ListFile', data, payload)
            })()
          })
        }

      </ScrollView >
    );
  },
);
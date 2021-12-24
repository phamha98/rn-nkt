import React, { Component } from 'react'
import { Dimensions, FlatList, TextInput, View } from 'react-native'
import { ReactNativeModal } from 'react-native-modal'
import { change_alias } from '../../utils/i18n/translate'
import { Button } from '../button/button'
import { Ionicons } from '../iconVector'
import { default as IoniconsFont } from '../iconVector/IoniconsFont'
import { Text } from '../text/text'


var { width, height } = Dimensions.get('window')

class Selector extends Component {
    constructor(props) {
        super(props);
        this.props.onRef(this);
        this.options = this.props.options.map((e, index) => ({
            index,
            item: e,
        }));
        this.state = {
            isVisible: false,
            isShowing: false,
            txtSearch: '',
            options: this.options,
            selected: [],
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.options) != JSON.stringify(this.props.options)) {
            this.options = nextProps.options.map((e, index) => ({
                index,
                item: e,
            }));
            this.setState(s => s.options = this.options)
        }

        if (nextProps.input != null && this.props.input != null && nextProps.input.value != this.props.input.value) {
            var id = nextProps.input.value;
            var _item = this.options.filter(e => {
                var _id = this.props.itemKey != null ? this.props.itemKey(e.item) : e.item;
                return id == _id;
            })[0];

            var selected = _item == null ? [] : [_item.index];

            JSON.stringify(selected) != JSON.stringify(this.state.selected) && this.setState(s => s.selected = selected)
        }
    }

    options = [];

    toggleShow = (flag, callback) => {
        this.onSearchText('');
        flag = flag = null ? !this.state.isVisible : flag;
        this.setState({ isVisible: flag, txtSearch: '', isShowing: !flag ? false : false }, () => {
            callback != null && callback();
        })
    }

    onSelected = () => {
        var item = this.options[this.state.selected[0]];
        this.toggleShow(false, () => {
            this.props.onSelected(item.item, item.index);
            var id = this.props.itemKey != null ? this.props.itemKey(item.item) : item.item;
            if (this.props.input != null) {
                this.props.input.onChange(id)
            }
        })
    }

    renderOption = ({ index, item }) => {
        return (
            <Button
                style={{
                    backgroundColor: this.state.selected.indexOf(item.index) >= 0 ? '#f2f2f2' : 'transparent',
                    alignItems: 'flex-start',
                    borderColor: '#f2f2f2',
                    borderBottomWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}
                onPress={() => this.setState(s => s.selected = [item.index], () => this.onSelected())}
            >
                <Text
                    style={{
                        color: 'black'
                    }}
                >
                    {
                        this.props.itemLabel != null ?
                            this.props.itemLabel(item.item, item.index)
                            : item.item
                    }
                </Text>
            </Button>
        )
    }

    onSearchText = (txt) => {
        txt = txt.trim();
        var options = [];
        if (txt.length == 0)
            options = this.options;
        else {
            options = this.options.filter(item => {
                var label = this.props.itemLabel != null ?
                    this.props.itemLabel(item.item, item.index)
                    : item.item

                return change_alias(label).indexOf(change_alias(txt)) >= 0
            })
        }

        this.setState(s => s.options = options)
    }

    select = (item) => {
        if (item == -1) {
            this.setState(s => s.selected = []);
        }
        else {
            var id = this.props.itemKey != null ? this.props.itemKey(item) : item;
            var _item = this.options.filter(e => {
                var _id = this.props.itemKey != null ? this.props.itemKey(e.item) : e.item;
                return id == _id;
            })[0];
            this.setState(s => s.selected = _item == null ? [] : [_item.index])
        }
    }

    render() {
        return (
            <>
                <ReactNativeModal
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.toggleShow(false)}
                    onModalShow={() => this.setState({ isShowing: true })}
                    avoidKeyboard={true}
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingBottom: 20,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            flexShrink: 1,
                            width: width * .8,
                            borderRadius: 5,

                        }}
                    >
                        {(this.props.title || '') != '' &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    padding: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{

                                        color: 'black',

                                    }}
                                >
                                    {this.props.title}
                                </Text>
                                <Button
                                    onPress={() => this.toggleShow(false)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        padding: 0
                                    }}
                                >
                                    <Ionicons icon={IoniconsFont.close} />
                                </Button>
                            </View>
                        }
                        <View
                            style={{
                                flexShrink: 1
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    padding: 5,
                                    borderColor: '#f2f2f2',
                                    borderWidth: 1,
                                    margin: 3,
                                    alignItems: 'center'
                                }}
                            >
                                <Ionicons icon={IoniconsFont.search} />
                                <TextInput
                                    style={{
                                        marginLeft: 8,
                                        flex: 1,
                                        height: 36
                                    }}
                                    placeholder='Tìm kiếm'
                                    value={this.state.txtSearch}
                                    onChangeText={t => this.setState(s => s.txtSearch = t, () => this.onSearchText(t))}
                                />
                                {
                                    this.state.txtSearch.length > 0 &&

                                    <Button
                                        style={{
                                            backgroundColor: 'transparent'
                                        }}
                                        onPress={() => this.setState(s => s.txtSearch = '', () => this.onSearchText(''))}
                                    >
                                        <Ionicons icon={IoniconsFont.close} size={16} color='#ccc' />
                                    </Button>
                                }
                            </View>
                            {
                                this.state.options.length <= 0 ?
                                    <View
                                        style={{
                                            padding: 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontSize: 14,
                                                textAlign: 'center'
                                            }}
                                        >
                                            {'Không có dữ liệu'}
                                        </Text>
                                    </View>
                                    :
                                    <FlatList
                                        style={{
                                            flexShrink: 1,
                                        }}
                                        data={this.state.options}
                                        renderItem={this.renderOption}
                                        keyExtractor={(item, index) => index + 'ss'}
                                    />
                            }
                        </View>
                    </View>
                </ReactNativeModal>
                <Button
                    onPress={() => this.toggleShow(true)}
                    style={[
                        {
                            backgroundColor: 'transparent',
                            // borderColor: '#f2f2f2',
                            borderColor:'transparent',
                            borderBottomColor:'#f2f2f2',
                            borderWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop:15
                        },
                        this.props.styleButton
                    ]}
                >
                    {
                        this.state.selected.length <= 0 ?

                            <Text
                                style={{
                                    color: '#828282',
                                    fontSize:16,

                                }}
                            >
                                {this.props.placeholder}
                            </Text>
                            :

                            <Text
                                style={{
                                    color: 'black',
                                }}
                            >
                                {(() => {
                                    if (this.options.length <= 0) return '';
                                    var item = this.options[this.state.selected[0]];
                                    var label = this.props.itemLabel != null ?
                                        this.props.itemLabel(item.item, item.index)
                                        : item.item

                                    return label;
                                })()}
                            </Text>
                    }
                    <Ionicons icon={IoniconsFont.caretDownCircleOutline} color='#ccc' size={18}  />
                </Button>
            </>
        )
    }
}

Selector.defaultProps = {
    onRef: () => { },
    title: '',
    options: [],
    itemLabel: null,
    // itemLabel: (e, index) => { return e },
    itemKey: null,
    // itemKey: (e, index) => { return e },
    placeholder: 'Chọn',
    onSelected: (e, index) => { },
    styleButton: {}
}

export default Selector

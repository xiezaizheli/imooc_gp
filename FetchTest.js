/**
 * Created by think on 2017/7/16.
 */
import React, {Component} from 'React';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ListView,
  RefreshControl
} from 'react-native';

import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class FetchTest extends Component {
  constructor(props){
    super(props);
    this.state={
      result:'',
    }
  }
  onLoad(url){
    fetch(url)
      .then((response) => response.json())
      .then(result => {
        this.setState({
          result:JSON.stringify(result)
        });
      })
      .catch((error) => {
        this.setState({
          result:JSON.stringify(error)
        });
      });
  }
  onSubmit(url,data){
    fetch(url,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(result => {
        this.setState({
          result:JSON.stringify(result)
        });
      })
      .catch((error) => {
        this.setState({
          result:JSON.stringify(error)
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="FetchTest"/>
        <Text
          style={styles.tips}
          onPress={()=>this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')}
        >获取数据</Text>
        <Text
          style={styles.tips}
          onPress={()=>this.onSubmit('http://rap.taobao.org/mockjsdata/11793/submit',{userName:'小明',password:'123456'})}
        >提交数据</Text>

        <Text>返回结果：{this.state.result}</Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tips: {
    fontSize: 18
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: '#000'
  }
});

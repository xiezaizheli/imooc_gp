/**
 * Created by think on 2017/7/18.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ListViewTest from "../../ListViewTest";
import RepositoryCell from '../common/RepositoryCell';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
    }
  }

  getUrl(key) {
    return URL + key + QUERY_STR;
  }

  onLoad(key) {
    let url = this.getUrl(this.text);
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{
            backgroundColor:'#2196F3'
          }}
        />
        <ScrollableTabView
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="#fff"
          tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
        >
          <PopularTab tabLabel="java">JAVA</PopularTab>
          <PopularTab tabLabel="ios">ios</PopularTab>
          <PopularTab tabLabel="android">android</PopularTab>
          <PopularTab tabLabel="javascript">javascript</PopularTab>
        </ScrollableTabView>
      </View>)
  }
}
class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      isLoading:false
    }
  }

  loadData() {
    this.setState({isLoading:true})
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items),
          isLoading:false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.loadData();
  }

  renderRow(data) {
    return <RepositoryCell data={data} />
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.loadData()}
              colors={['#2196f3']}
              tintColor ={'#2196f3'}
              title="Loading..."
              titleColor={'#2196f3'}
            />
          }
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tips: {
    fontSize: 20
  }
})

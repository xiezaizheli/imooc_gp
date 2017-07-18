/**
 * Created by think on 2017/7/18.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  StyleSheet,
} from 'react-native'
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ListViewTest from "../../ListViewTest";
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
          style={{backgroundColor: '#6495ED'}}
        />
        <ScrollableTabView>
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
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  loadData() {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items)
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
    return (
      <View style={{margin:10}}>
        <Text>{data.full_name}</Text>
        <Text>{data.description}</Text>
        <Text>{data.owner.avatar_url}</Text>
        <Text>{data.stargazers_count}</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
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

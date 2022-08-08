import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homepage = () => {
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);
  const ListItem = ({todo}) => {
    return (
      <View style={styles.ListItem}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>{todo?.task}</Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteTodo(todo?.id)}
          style={styles.actionicon}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('error', 'please add text');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };
  const deleteTodo = todoId => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };
  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.Header}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'navy'}}>
          To Do App
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      <View style={styles.Footer}>
        <View style={styles.Input}>
          <TextInput
            placeholder="Add To Do"
            value={textInput}
            onChangeText={text => setTextInput(text)}></TextInput>
        </View>
        <TouchableOpacity style={styles.Addtodo} onPress={addTodo}>
          <Text
            style={{
              fontSize: 25,
              color: 'navy',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  actionicon: {
    height: 25,

    width: 25,
    backgroundColor: 'red',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  ListItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 7,
    marginVertical: 10,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  Footer: {
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',

    paddingHorizontal: 5,
  },
  Input: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    elevation: 10,
    flex: 1,
    height: 50,
    paddingHorizontal: 15,

    marginVertical: 20,
  },
  Addtodo: {
    height: 50,
    // flex: 0.2,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'lightsteelblue',
    elevation: 5,
    // paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

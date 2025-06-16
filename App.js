import React, { useState,useEffect } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { deleteStudent, getStudents, saveStudent } from './Sqlite/studentService';

const App = () => {

  const [students,setStudents]= useState([]);
  const [data, setData]= useState({id:null,rollno:'',name:'',grade:''});

  const loadStudents = async()=>{
    const updated = await getStudents();
    setStudents(updated);
  }
 
  useEffect(() => {
    loadStudents();
 
 }, []);
  
  const onSubmit = async() =>{
          if(!data.name.trim() || !data.rollno.trim()){
              return Alert.alert('Validation Error', 'Name and RollNo are required');
          }
          try {
            await saveStudent(data);
           setData({id:null, name:'',rollno:'',grade:''});
             loadStudents();
          } catch(error) {
             Alert.alert('Error', error.message);
          }
  }

   const onEdit = student => setData(student);

  const onDelete = id => {
    Alert.alert('Confirm', 'Delete this student?', [
      { text: 'Cancel' },
      {
        text: 'Delete', style: 'destructive',
         onPress: async () => {
          await deleteStudent(id);
          loadStudents();
        }
      }
    ]);
  };


  const renderItem =({item})=>(
        <View style={styles.listContainer}>
          <Text style={styles.text}>Name :  {item.name}</Text>
          <Text style={styles.text}>rollno :  {item.rollno}</Text>
          <Text style={styles.text}>grade :  {item.grade}</Text>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.button} onPress={()=>onEdit(item)}>
              <Text style={{fontSize:16,fontWeight:'bold'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>onDelete(item.id)}>
              <Text style={styles.buttonText}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>
        </View>

  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.inputContainer}>
            <TextInput 
            style={styles.input}
            placeholder='enter name'
            value={data.name}
            onChangeText={(name)=>setData({...data,name : name})}/>
            <TextInput 
            style={styles.input}
            placeholder='enter rollno'
            value={data.rollno}
            onChangeText={(rollno)=>setData({...data,rollno : rollno})}/>

            <TextInput 
            style={styles.input}
            placeholder='enter grade'
            value={data.grade}
            onChangeText={(grade)=>setData({...data,grade : grade})}/>

            <TouchableOpacity style={styles.button} onPress={()=>onSubmit()}>
              <Text style={styles.buttonText}>{data.id ? "Update Student": "Add Student"}</Text>
            </TouchableOpacity>

            <FlatList 
            data={students}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={renderItem}
            style={styles.list}
            
            />


     
</View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer : {flex:1,},
  inputContainer : {flex:1,padding:10},
  input : {padding:15,borderRadius:5,borderWidth:1,borderColor:'gray',margin:10},
  button : {padding:10,borderWidth:1,borderRadius:5,backgroundColor:'blue',margin:5},
  buttonText : {textAlign:'center',fontSize :18,fontWeight:'bold'},
  text: {fontSize:16,fontWeight:'bold',padding:5},
  listContainer : {padding : 10,borderWidth:1,borderRadius:5,borderColor:'gray',margin:10},
})

export default App;


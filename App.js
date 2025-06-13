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
        <View style={{padding : 10,borderWidth:1,borderRadius:5,borderColor:'gray',margin:10}}>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5}}>Name :  {item.name}</Text>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5}}>rollno :  {item.rollno}</Text>
          <Text style={{fontSize:16,fontWeight:'bold',padding:5}}>grade :  {item.grade}</Text>

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{padding:10,borderWidth:1,borderRadius:5,backgroundColor:'blue',margin:5}} onPress={()=>onEdit(item)}>
              <Text style={{fontSize:16,fontWeight:'bold'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10,borderWidth:1,borderRadius:5,backgroundColor:'red',margin:5}} onPress={()=>onDelete(item.id)}>
              <Text style={{fontSize:16,fontWeight:'bold'}}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>
        </View>

  );

  return (
    <SafeAreaView style={{flex:1,}}>
      <View style={{flex:1,padding:10}}>
            <TextInput 
            style={{padding:15,borderRadius:5,borderWidth:1,borderColor:'gray',margin:10}}
            placeholder='enter name'
            value={data.name}
            onChangeText={(name)=>setData({...data,name : name})}/>

            <TextInput 
            style={{padding:15,borderRadius:5,borderWidth:1,borderColor:'gray',margin:10}}
            placeholder='enter rollno'
            value={data.rollno}
            onChangeText={(rollno)=>setData({...data,rollno : rollno})}/>

            <TextInput 
            style={{padding:15,borderRadius:5,borderWidth:1,borderColor:'gray',margin:10}}
            placeholder='enter grade'
            value={data.grade}
            onChangeText={(grade)=>setData({...data,grade : grade})}/>

            <TouchableOpacity style={{padding:10,borderWidth:1,borderRadius:5,backgroundColor:'blue',margin:5}} onPress={()=>onSubmit()}>
              <Text style={{textAlign:'center'}}>{data.id ? "Update Student": "Add Student"}</Text>
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

const styles = StyleSheet.create({})

export default App;


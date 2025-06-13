import { Alert } from 'react-native';
import { initDB } from './database';

// CREATE or UPDATE based on presence of ID
export const saveStudent = async (student) => {
  const db = await initDB();
  if (student.id) {
    return db.executeSql(
      'UPDATE students SET name=?, rollno=?, grade=? WHERE id=?',
      [student.name, student.rollno, student.grade, student.id]
    );
  } else {
    return db.executeSql(
      'INSERT INTO students (name, rollno, grade) VALUES (?,?,?)',
      [student.name, student.rollno, student.grade]
    );
  }
};

export const getStudents = async () => {
  const db = await initDB();
  const [res] = await db.executeSql('SELECT * FROM students;');
  const arr = [];
  for (let i = 0; i < res.rows.length; i++) 
    arr.push(res.rows.item(i));
  return arr;
};

export const deleteStudent = async (id) => {
  const db = await initDB();
  return db.executeSql('DELETE FROM students WHERE id=?', [id]);
};

import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
import { Task } from "../types/Task";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      done: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((task) => task.id === id);
    if (!task) return;
    task.done = !task.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Confirmar", "Você realmente deseja remover essa task?", [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => {
          const newTasks = tasks.filter((task) => task.id !== id);
          setTasks(newTasks);
        },
      },
    ]);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((task) => task.id === id);
    if (!task) return;
    task.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

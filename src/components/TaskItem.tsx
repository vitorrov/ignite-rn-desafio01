import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "../types/Task";
import { ItemWrapper } from "./ItemWrapper";
import trashIcon from "../assets/icons/trash/trash.png";

interface TasksItemsProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemsProps) {
  const [beingEdited, setBeingEdited] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setBeingEdited(true);
  }

  function handleCancelEditing() {
    setNewTitle(item.title);
    setBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle);
    setBeingEdited(false);
  }

  useEffect(() => {}, [beingEdited]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#000" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
            style={item.done ? styles.taskTextDone : styles.taskText}
            editable={beingEdited}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      <View>
        {beingEdited && (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEditing()}
          >
            <Text>X</Text>
          </TouchableOpacity>
        )}

        {!beingEdited && (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleStartEditing()}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
          disabled={beingEdited}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconDivider: {
    height: 24,
    width: 1,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});

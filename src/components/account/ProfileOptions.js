import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function ProfileOptions(props) {
  const [contained, setContained] = useState(null);
  const { onReload } = props;

  const onClose = () => {
    setShowModal((prevState) => !prevState);
  };

  const selectComponent = (key) => {
    if (key === "displayName") {
      setContained(<ChangeNameForm close={onClose} onReload={onReload} />);
    } else if (key === "password") {
      setContained(<ChangePasswordForm close={onClose} />);
    } else if (key === "correo") {
      setContained(<ChangeEmailForm close={onClose} onReload={onReload} />);
    }
    onClose();
  };
  const optionsMenu = getOptionsMenu(selectComponent);
  const [showModal, setShowModal] = useState(false);
  return (
    <View>
      {map(optionsMenu, (option, index) => (
        <ListItem key={index} onPress={option.onPress}>
          <Icon
            type={option.typeIcon}
            name={option.nameIconLeft}
            color={option.colorIcon}
          />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={option.typeIcon}
            name={option.nameIconRight}
            color={option.colorIcon}
          />
        </ListItem>
      ))}
      <Modal visible={showModal} close={onClose}>
        {contained}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});

function getOptionsMenu(selectComponent) {
  return [
    {
      title: "Cambiar nombre",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => {
        selectComponent("displayName");
      },
    },
    {
      title: "Cambiar contraseña",
      typeIcon: "material-community",
      nameIconLeft: "lock-reset",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => {
        selectComponent("password");
      },
    },
    {
      title: "Cambiar correo",
      typeIcon: "material-community",
      nameIconLeft: "at",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => {
        selectComponent("correo");
      },
    },
  ];
}

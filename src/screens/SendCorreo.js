import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import { Input, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import SendGrid from 'react-native-sendgrid';


export default function SendCorreo() {

    
    const navigation = useNavigation();

    const irMenu = () => {
        navigation.navigate("menu")
    }

    const formik = useFormik({
        initialValues: {
            sender: "",
            recipients: "",
            subject: "",
            body: ""
        },
        validationSchema: yup.object({
            sender: yup.string().required("Emisor obligatorio").email("Formato invalido"),
            recipients: yup.string().required("Receptor obligatorio").email("Formato invalido"),
            subject: yup.string().required("Asunto del correo obligatorio"),
            body: yup.string().required("Cuerpo del correo obligatorio")

        }),
        validateOnChange: false,
        onSubmit: (formValue) => {

            const sgMail = require('@sendgrid/mail');
            const key="Sx_fXz7YTEKeDaQEuG2rvg.mTNGJPvnMNcf40MEsJaKKEt-RlfZ-mX81U5GHLDJHqo"
            sgMail.setApiKey(process.env.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);

            // Crea el objeto de opciones del correo electrónico
            const msg = {
                to: formValue.recipients,
                from: formValue.sender,
                subject: formValue.subject,
                text: formValue.body
            };

            sgMail.send(msg)
                .then(() => {
                    console.log('Correo electrónico enviado');
                })
                .catch((error) => {
                    console.error(error);
                });


            // const key = "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"
            // const sendgrid = SendGrid(key);
            // const email = new SendGrid.Email();

            // const html = "<p>" + formValue.body + "</p>";

            // email.addTo(formValue.recipients);
            // email.setFrom(formValue.sender);
            // email.setSubject(formValue.subject);
            // email.setText(formValue.subject);
            // email.setHtml(html);





            sendgrid.send(email)
                .then(() => console.log('Email sent'))
                .catch((error) => console.error(error));
        }
    })
    return (
        <View style={styles.viewForm}>
            <Text></Text>
            <Input placeholder='De:' containerStyle={styles.input} onChangeText={text => formik.setFieldValue("sender", text)} errorMessage={formik.errors.sender} />
            <Input placeholder='Para:' containerStyle={styles.input} onChangeText={text => formik.setFieldValue("recipients", text)} errorMessage={formik.errors.recipients} />
            <Input placeholder='Asunto:' containerStyle={styles.input} onChangeText={text => formik.setFieldValue("subject", text)} errorMessage={formik.errors.subject} />
            <Input placeholder='Cuerpo' containerStyle={styles.input} onChangeText={text => formik.setFieldValue("body", text)} errorMessage={formik.errors.body} />
            <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
            <Button title="Cancelar" containerStyle={styles.containerBtn} buttonStyle={styles.btnC} onPress={() => irMenu()} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
        marginTop: 30
    },
    input: {
        width: "100%",
        margginTop: 20
    },
    icon: {
        color: "#C1C1C1"
    },
    containerBtn: {
        width: "95%",
        marginTop: 20,
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "blue"
    },
    btnC: {
        backgroundColor: "red"
    }
})
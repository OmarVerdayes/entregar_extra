import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'
import ListCareer from '../components/account/ListCareer'

export default function CareerScreen() {
    return (
        <ScrollView>
            <View>
                <ListCareer />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealDetails from '../components/MealDetails'
import Subtitle from '../components/MealDetail/Subtitle'
import List from '../components/MealDetail/List'
import IconButton from '../components/IconButton'
import { FavoritesContext } from '../store/context/favorites-context'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites'

const MealDetailScreen = ({ navigation, route }) => {

    // const favoriteMealsCtx = useContext(FavoritesContext)
    const favoritesMealsIds = useSelector((state) => state.favoriteMeals.ids)
    const dispatch = useDispatch();

    const mealId = route?.params?.mealId
    const selectedMeal = MEALS?.find(item => item.id === mealId)

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId)
    const mealIsFavorite = favoritesMealsIds.includes(mealId)

    const changeFavoriteStatusHandler = () => {
        if (mealIsFavorite) {
            // favoriteMealsCtx.removeFavorite(mealId)
            dispatch(removeFavorite({ id: mealId }))
        } else {
            // favoriteMealsCtx.addFavorite(mealId)
            dispatch(addFavorite({ id: mealId }))
        }
    }

    useLayoutEffect(() => {
        const mealTitle = MEALS.find(item => item.id === mealId)?.title
        console.log('Meal', mealTitle)
        navigation.setOptions({
            title: mealTitle,
            headerRight: () => {
                return <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    color='white'
                    onPress={changeFavoriteStatusHandler} />
            }
        })
    }, [navigation, changeFavoriteStatusHandler])

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        maxWidth: '80%'
    }
})
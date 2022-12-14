import { configureStore } from '@reduxjs/toolkit'
import user from './slices/UserSlice'
import login from './slices/LoginSlice'
import Id from './slices/IdSlice'
import Name from './slices/ProductNameSlice'
import Filter from '../store/slices/FilterSlice'
import ProductsFilter from './slices/ProductsFilterSlice'

import UserMenu from './slices/UserMenu'
import PlusMenu from './slices/PlusMenu'
import Area from './slices/AreaSlice'
import Item from './slices/ItemSlice'
import ItemName from './slices/ItemNameSlice'
import NewsVisible from './slices/NewsVisibleSlice'
export default configureStore({
    reducer: {
        UserMenu,
        PlusMenu,
        Area,
        Item,
        ItemName,

        NewsVisible
    }
})
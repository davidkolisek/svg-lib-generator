<template>
    <bm-typography component="span">
        <router-link :to="{ name: 'HomeView' }">Hlavná stránka</router-link>
    </bm-typography>
    <bm-typography component="span" v-if="categoryUrlParam">
        /
        <router-link :to="{ name: 'ProductsView', params: { categoryUrl: categoryUrlParam } }">
            {{ categoryName }}
        </router-link>
    </bm-typography>
    <bm-typography component="span" v-if="subcategoryUrlParam">
        /
        <router-link
            :to="{ name: 'SubProductsView', params: { subCategoryUrl: subcategoryUrlParam } }"
        >
            {{ subcategoryName }}
        </router-link>
    </bm-typography>
</template>

<script>
    import BmTypography from '@atoms/Typography.vue'
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    export default {
        name: 'BmBreadcrumbs',
        components: { BmTypography },
        setup() {
            const store = useStore()
            const categoryUrlParam = computed(() => store.getters['params/getCategoryUrlParam'])
            const subcategoryUrlParam = computed(
                () => store.getters['params/getSubcategoryUrlParam']
            )
            const categoryName = computed(() =>
                store.getters['enums/getCategoryNameByUrl'](categoryUrlParam.value)
            )
            const subcategoryName = computed(() =>
                store.getters['enums/getSubcategoryNameByUrl'](
                    categoryUrlParam.value,
                    subcategoryUrlParam.value
                )
            )
            return {
                categoryName,
                subcategoryName,
                categoryUrlParam,
                subcategoryUrlParam
            }
        }
    }
</script>

<style scoped></style>

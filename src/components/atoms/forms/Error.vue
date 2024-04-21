<template>
    <div class="bm-error">
        <div class="input-errors">
            <span class="error-msg" v-for="error of errors" :key="error.$uid">
                {{ frontendError(error) }}
            </span>
        </div>
    </div>
</template>

<script>
    import BmIcon from '@atoms/Icon.vue'
    export default {
        name: 'BmError',
        props: {
            // pole obsahujuce erory
            errors: {
                type: Array,
                required: true
            }
        },
        components: { BmIcon },
        setup() {
            const frontendError = (value) => {
                // ak ma dany error response - tak som ho nadefinoval
                // podla toho ako definujem errory v pravidlach
                // nemusi riešiť programator ale porieši si to tento komponent
                return value.$response ? value.$response.message : value.$message
            }

            return { frontendError }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-error {
        font-family: $f-primary;
        display: block;
        font-size: 13px;
        line-height: 18px;
        position: relative;
        margin-top: 6px;
        &:deep(svg) {
            top: 3px;
            min-width: 16px;
            min-height: 16px;
            position: absolute;
            left: 0;
            path {
                fill: $c-red-500;
            }
        }
        span {
            display: block;
            color: $c-red-500;
            margin-right: 2px;
            font-weight: 400;
        }
    }
</style>

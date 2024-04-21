<template>
    <template v-if="variant === 'ordered'">
        <ol :class="getClassList()">
            <slot />
        </ol>
    </template>
    <template v-else>
        <ul :class="getClassList()">
            <slot />
        </ul>
    </template>
</template>

<script>
    export default {
        name: 'BmList',

        props: {
            component: {
                type: String,
                default: 'ul'
            },
            variant: {
                type: String,
                default: 'unordered',
                validator: (value) => ['unordered', 'ordered', 'success', 'error'].includes(value)
            }
        },
        setup(props) {
            const getClassList = () => {
                let list = ['bm-list']
                if (props.variant) list.push(`bm-list-${props.variant}`)
                return `${list.join(' ')}`
            }

            return {
                getClassList
            }
        }
    }
</script>

<style lang="scss">
    .bm-list {
        margin: 0;
        padding: 0 0 0 40px;
        .bm-list-item {
            margin-bottom: 16px;
            &:before {
                position: absolute;
                left: -32px;
                top: 3px;
            }
            &:last-child {
                margin-bottom: 0;
            }
            h3 {
                margin: 0;
            }
            p {
                margin: 0 0 16px 0;
            }
        }
        &-unordered {
            list-style-type: none;
            .bm-list-item {
                position: relative;
                &:before {
                    content: '';
                    display: block;
                    width: 6px;
                    height: 6px;
                    // background: $c-blue-main;
                    // border-radius: $br-md;
                    left: -24px;
                    top: 8px;
                }
            }
        }

        &-ordered {
            list-style-type: none;
            counter-reset: ordered;
            .bm-list-item {
                position: relative;
                &:before {
                    content: counter(ordered) '.';
                    counter-increment: ordered;
                    position: absolute;
                    left: -24px;
                    top: 1px;
                    // font-family: $f-primary;
                    font-weight: 400;
                    font-size: 1rem;
                    @media (min-width: $bp-mobile) {
                        top: 1px;
                    }
                }
            }
        }

        &-error {
            list-style-type: none;
            .bm-list-item {
                position: relative;
                &:before {
                    content: '';
                    display: block;
                    //  @include create-icon($i-circle-xmark, $c-red-500, null, 16px);
                }
            }
        }

        &-success {
            list-style-type: none;
            .bm-list-item {
                position: relative;
                &:before {
                    content: '';
                    display: block;
                    //  @include create-icon($i-circle-check, $c-green-500, null, 16px);
                }
            }
        }
    }
</style>

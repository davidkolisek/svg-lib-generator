<template>
    <bm-box :class="getClassList()">
        <bm-box class="initials">
            {{ name && name.substring(0, 2) }}
        </bm-box>
        <bm-box class="fullname">
            <bm-typography component="p">
                {{ name }}
            </bm-typography>
            <bm-typography component="p">
                {{ subName }}
            </bm-typography>
        </bm-box>
    </bm-box>
</template>

<script>
    import BmBox from '@/components/layout/Box.vue'
    import BmTypography from '@atoms/Typography.vue'

    export default {
        name: 'BmPersonInitials',
        components: { BmTypography, BmBox },
        props: {
            name: {
                type: String,
                required: true
            },
            subName: {
                default: '',
                type: String,
                required: false
            }
        },
        setup() {
            const getClassList = () => {
                const list = ['bm-person-initials']

                return list.join(' ')
            }

            return { getClassList }
        }
    }
</script>
<style lang="scss" scoped>
    .bm-person-initials {
        display: flex;
        align-items: center;
        cursor: pointer;
        .initials {
            width: 38px;
            height: 38px;
            min-width: 38px;
            background: $c-gray-400;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: $c-white-500;
            font-family: $f-primary;
            text-transform: uppercase;
            position: relative;
            z-index: 3;
            &:before {
                content: '';
                width: 42px;
                height: 42px;
                background: transparent;
                border-radius: $br-circle;
                position: absolute;
                top: -3px;
                left: -3px;
                border: 1px solid $c-green-500;
                z-index: 2;
            }
            &:after {
                content: '';
                width: 4px;
                height: 4px;
                background: $c-white-500;
                border-radius: $br-circle;
                position: absolute;
                right: -3px;
                bottom: -3px;
                border: 6px solid $c-green-500;
                z-index: 2;
                box-shadow: $bs-modern-soft;
            }
        }
        .fullname {
            overflow: hidden;
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            &:deep(.bm-typography) {
                &:first-child {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: $c-black-500;
                    margin: 0;
                    line-height: 12px;
                }
                &:last-child {
                    font-weight: 300;
                    font-size: 0.9rem;
                    color: $c-gray-500;
                    margin: 0;
                }
            }
            &:deep(.bm-icon) {
                margin-left: 8px;
            }
        }
    }
</style>

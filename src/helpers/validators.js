import * as validators from '@vuelidate/validators'

const _unique = (group, key) => {
    return (value) => {
        const found = group.filter(item => {
            if (key) {
                return item[key] == value
            }
            return item == value
        })
        return found.length <= 1
    }
}

export const unique = (group, key) => validators.helpers.withMessage('This value is duplicated.', _unique(group.value, key))
function Validate (data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]
    if (rule.required) {
      let error = Validate.required(value)
      if (error) {
        ensureObject(errors, rule.key)
        errors[rule.key]["required"] = error
        return errors
      }
    }
    /*
    * 遍历验证规则
    * */
    let validator = Object.keys(rule).filter(key => key !== 'key' || key !== 'required')
    validator.forEach(validatorKey => {
      let error = Validate[validatorKey] && Validate[validatorKey](value, rule[validatorKey])
      if (error) {
        ensureObject(errors, rule.key)
        errors[rule.key][validatorKey] = error
      }
    })
  })
  return errors
}

Validate.required = (value) => {
  if (!value && value !== 0) {
    return '必填'
  }
}

Validate.maxLength = (value, rule) => {
  if (value.length > rule) {
    return '太长'
  }
}

Validate.minLength = (value, rule) => {
  if (value.length < rule) {
    return '太短'
  }
}

Validate.pattern = (value, rule) => {
  if (rule === 'email') {
    rule = /^.+@.+$/
  }
  if (rule.test(value) === false) {
    return '格式不正确'
  }
}


const ensureObject = (errors, key) => {
  if (!(typeof errors[key] === 'object')) {
    errors[key] = {}
  }
}

export default Validate

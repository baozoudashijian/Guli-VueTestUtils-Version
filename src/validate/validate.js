const Validate = function (data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]
    if(rule.required) {
      if(!value && value !== 0) {
        ensureObject(errors, rule.key)
        errors[rule.key].required = '必填'
        return
      }
    }
    if(rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if(rule.pattern.test(value) === false) {
        ensureObject(errors, rule.key)
        errors[rule.key].pattern =  '格式不正确'
      }
    }

    if(rule.minLength) {
      if(value.length < rule.minLength) {
        ensureObject(errors, rule.key)
        errors[rule.key].minLength = '太短'
      }
    }

    if(rule.maxLength) {
      if(value.length > rule.maxLength) {
        ensureObject(errors, rule.key)
        errors[rule.key].maxLength = '太长'
      }
    }
  })
  console.log(errors)
  return errors
}

const ensureObject = (errors, key) => {
  if(!(typeof errors[key] === 'object')) {
    errors[key] = {}
  }
}

export default Validate

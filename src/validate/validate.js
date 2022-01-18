const Validate = function (data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]
    if(rule.required) {
      if(!value && value !== 0) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if(rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if(rule.pattern.test(value) === false) {
        if(!errors[rule.key]) {
          errors[rule.key] = {}
        }
        errors[rule.key].pattern =  '格式不正确'
      }
    }

    if(rule.minLength) {
      if(value.length < rule.minLength) {
        if(!errors[rule.key]) {
          errors[rule.key] = {}
        }
        errors[rule.key].minLength = '太短'
      }
    }

    if(rule.maxLength) {
      if(value.length > rule.maxLength) {
        if(!errors[rule.key]) {
          errors[rule.key] = {}
        }
        errors[rule.key].maxLength = '太长'
      }
    }
  })
  console.log(errors)
  return errors
}

export default Validate

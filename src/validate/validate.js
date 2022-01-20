class Validator {
  // 添加自定义方法
  add(type, cb) {
    Validator.prototype[type] = cb
  }

  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
      let value = data[rule.key]
      if (rule.required) {
        let error = this.required(value)
        if (error) {
          this.ensureObject(errors, rule.key)
          errors[rule.key]["required"] = error
          return errors
        }
      }
      /*
      * 遍历验证规则
      * */
      let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
      console.log(validators)
      validators.forEach(validatorKey => {
        if(this[validatorKey]) {
          let error = this[validatorKey](value, rule[validatorKey])
          if (error) {
            this.ensureObject(errors, rule.key)
            errors[rule.key][validatorKey] = error
          }
        } else {
          throw `不存在的校验器：${validatorKey}`
        }

      })
    })
    return errors
  }

  required(value) {
    if (!value && value !== 0) {
      return '必填'
    }
  }

  maxLength(value, rule) {
    if (value.length > rule) {
      return '太长'
    }
  }

  minLength(value, rule) {
    if (value.length < rule) {
      return '太短'
    }
  }


  pattern(value, rule) {
    if (rule === 'email') {
      rule = /^.+@.+$/
    }
    if (rule.test(value) === false) {
      return '格式不正确'
    }
  }


  ensureObject(errors, key) {
    if (!(typeof errors[key] === 'object')) {
      errors[key] = {}
    }
  }

}

export default Validator

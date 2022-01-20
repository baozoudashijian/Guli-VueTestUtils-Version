import {expect} from 'chai'
import Validator from '../../src/validate/validate.js'

describe('Validate', () => {
  it('exist', () => {
    expect(Validator).to.exist
  })

  it('required true 报错', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('required true 值等于0的情况', () => {
    let data = {
      email: 0
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist
  })

  it('pattern 报错', () => {
    let data = {
      email: '@frank.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')

  })

  it('pattern 通过', () => {
    let data = {
      email: 'zhang@frank.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist

  })

  it('pattern email 报错', () => {
    let data = {
      email: '@frank.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')

  })

  it('pattern email 通过', () => {
    let data = {
      email: '123@frank.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email).to.not.exist

  })

  it('required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.required).to.exist
    expect(errors.email.pattern).to.not.exist

  })

  it('minLength', () => {
    let data = {
      email: '123'
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true, minLength: 6}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist

  })

  it('maxLength', () => {
    let data = {
      email: '1234567812345678910'
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true, maxLength: 16}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.minLength).to.not.exist
    expect(errors.email.maxLength).to.exist

  })

  it('many keys', () => {
    let data = {
      email: '1234567812345678910'
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true, maxLength: 16, minLength: 6}
    ]
    let validator = new Validator()
    let errors = validator.validate(data, rules)
    expect(errors.email.minLength).to.not.exist
    expect(errors.email.maxLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('自定义测试规则 hasNumber', () => {
    let data = {
      email: 'abc'
    }
    let rules = [
      {key: 'email', required: true, hasNumber: true}
    ]
    let validator = new Validator()
    validator['hasNumber'] = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let errors
    let fn = () => {
      errors = validator.validate(data, rules)
    }
    expect(fn).to.not.throw()
    expect(errors.email.hasNumber).to.eq('必须含有数字')
  })

  it('两个validator 互相不影响', () => {
    let data = {
      email: 'ab222c'
    }
    let rules = [
      {key: 'email', required: true, hasNumber: true}
    ]
    let validator1 = new Validator()
    let validator2 = new Validator()
    validator1['hasNumber'] = (value) => {
      if (!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let errors
    expect(() => {
      validator1.validate(data, rules)
    }).to.not.throw()
    expect(() => {
      validator2.validate(data, rules)
    }).to.throw()
  })


})
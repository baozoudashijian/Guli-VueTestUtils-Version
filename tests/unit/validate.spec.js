import {expect} from 'chai'
import Validate from '../../src/validate/validate.js'

describe('Validate', () => {
  it('exist', () => {
    expect(Validate).to.exist
  })

  it('required true 报错', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let errors = Validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('required true 值等于0的情况', () => {
    let data = {
      email: 0
    }
    let rules = [
      {key: 'email', required: true}
    ]
    let errors = Validate(data, rules)
    expect(errors.email).to.not.exist
  })

  it('pattern 报错', () => {
    let data = {
      email: '@frank.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]

    let errors = Validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')

  })

  it('pattern 通过', () => {
    let data = {
      email: 'zhang@frank.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]

    let errors = Validate(data, rules)
    expect(errors.email).to.not.exist

  })

  it('pattern email 报错', () => {
    let data = {
      email: '@frank.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]

    let errors = Validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')

  })

  it('pattern email 通过', () => {
    let data = {
      email: '123@frank.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]

    let errors = Validate(data, rules)
    expect(errors.email).to.not.exist

  })

  it('required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true}
    ]

    let errors = Validate(data, rules)
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

    let errors = Validate(data, rules)
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

    let errors = Validate(data, rules)
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
    let errors = Validate(data, rules)
    expect(errors.email.minLength).to.not.exist
    expect(errors.email.maxLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('自定义测试规则 hasNumber', () => {
    let data = {
      email: 'abc'
    }
    let rules = [
      {key: 'email', required: true, hasNumber: true }
    ]
    Validate.hasNumber = (value) => {
      if(!/\d/.test(value)) {
        return '必须含有数字'
      }
    }
    let errors
    let fn = () => {
      errors = Validate(data, rules)
    }
    expect(fn).to.not.throw()
    expect(errors.email.hasNumber).to.eq('必须含有数字')
  })





})
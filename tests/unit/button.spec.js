import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Button from '../../src/button/button'

describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.exist
  })

  it('设置icon', () => {
    const wrapper = mount(Button, {
      propsData: { icon: 'setting' }
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#icon-setting')
  })
})

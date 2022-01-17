<template>
  <button class="g-button" :class="{ [`icon-${iconPosition}`]: iconPosition, [`btn-${type}`]: true }"
          @click="$emit('click')">
    <g-icon v-if="loading" class="loading" icon="loading"></g-icon>
    <g-icon v-if="icon &&!loading" :icon="icon"></g-icon>
    <span><slot></slot></span>
  </button>
</template>
<script>

  import Icon from '../icon/icon.vue'

  export default {
    props: {
      icon: {},
      iconPosition: {
        validator(value) {
          return value === "left" || value === "right"
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "primary"
      }
    },
    components: {
      'g-icon': Icon
    }
  }

</script>

<style lang="sass">
  @import "./src/var"
  @keyframes spin
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)

  .g-button
    display: inline-flex
    justify-content: center
    align-items: center
    font-size: $button-font-size
    height: $button-height
    padding: 0 1em
    border-radius: $button-border-radius
    border: 1px solid $button-border-color
    background: $button-bg
    vertical-align: middle
    margin-left: .1em
    outline: none
    -webkit-appearance: button


    &:hover
      border-color: $button-border-color-hover

    &:active
      background-color: $button-active-bg

    > span
      margin-left: .2em

    .loading
      animation: spin 2s infinite linear

  .icon-left
    > svg
      order: 1

    > span
      order: 2
      margin-left: .2em

  .icon-right
    > svg
      order: 2

    > span
      order: 1
      margin-left: 0
      margin-right: .2em

  .btn-primary
    background-color: $primary

  .btn-primary:active
    background-color: $primary
    opacity: 0.8

  .btn-success
    background-color: $success

  .btn-success:active
    background-color: $success
    opacity: 0.8

  .btn-info
    background-color: $info

  .btn-info:active
    background-color: $info
    opacity: 0.8

  .btn-warning
    background-color: $warning

  .btn-warning:active
    background-color: $warning
    opacity: 0.8

  .btn-danger
    background-color: $danger

  .btn-danger:active
    background-color: $danger
    opacity: 0.8
</style>
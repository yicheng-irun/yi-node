<template>
   <div
      class="list-components-string-image"
   >
      <a
         :href="value"
         target="_blank"
      >
         <img
            :src="value"
            :alt="value"
         >
      </a>
   </div>
</template>

<script>
export default {
   model: {
      prop: 'value',
      event: 'input',
   },
   props: {
      value: {
         type: Boolean,
         default: null,
      },
      config: {
         type: Object,
         default () {
            return {};
         },
      },
   },
};
</script>

<style lang="stylus">
.list-components-string-image {
   display inline-block
   >a {
      display inline-block
      >img {
         vertical-align top
         max-width 10em
         max-height 6em
         border 1px solid #fff
         box-shadow 0 0 6px #0003
      }
   }
}
</style>

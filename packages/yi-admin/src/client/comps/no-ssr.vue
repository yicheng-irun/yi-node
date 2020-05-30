<template>
   <div v-if="show">
      <slot />
   </div>
</template>

<script>
export default {
   data () {
      return {
         show: false,
      };
   },
   mounted () {
      this.show = true;
   },
};
</script>

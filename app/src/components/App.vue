<template>
   <div>
      <spoonfeedr-recipes></spoonfeedr-recipes>
      <recipe-overview></recipe-overview>
   </div>
</template>

<style lang="less">
  
</style>

<script>
   import SpoonfeedrRecipes from './SpoonfeedrRecipes.vue';
   import RecipeOverview from './RecipeOverview.vue';
   export default {
      components: {
         'SpoonfeedrRecipes': SpoonfeedrRecipes,
         'RecipeOverview': RecipeOverview
      }
   }
</script>
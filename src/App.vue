<template>
	<v-app>
		<v-main>
			<router-link to="/hello">Home</router-link> <br/>
			<router-link to="/greet">Greet</router-link> <br/>
			<router-link to="/airline-table">Airline Table</router-link>
			

			<router-view/>
		</v-main>
	</v-app>
</template>

<script>
	export default {
    name: 'app'
  }
</script>
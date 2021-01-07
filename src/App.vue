<template>
	<v-app>
		<v-main>			
			<router-link to="/airline-table">Airline Table</router-link> <br/>
			<router-link to="/passenger-table">Passenger Table</router-link> <br/>
			<router-link to="/validate-form">Validate Form</router-link>
			<br/>
			<router-link to="/test">Test</router-link>
			<router-view/>
			
		</v-main>
	</v-app>
</template>

<script>
	export default {
    name: 'app'
  }
</script>
module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		uglify: {
			dist: {
				options: {
					sourceMap: false,
					sourceMapName : '../public/scripts.map'
				},
				files: {
					'../plugin.min.js': ['../plugin.js']
				}
			}
		}
	});

	grunt.registerTask('default',['uglify']);
	grunt.loadNpmTasks('grunt-contrib-uglify');
};

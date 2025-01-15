'use strict';

module.exports = function(grunt) {
    const globalThreshold = 50; // Global code coverage threshold (as a percentage)

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // QUnit task for running tests
        qunit: {
            options: {
                coverage: {
                    src: ['src/**/*.js'], // Source files to measure coverage
                    instrumentedFiles: 'temp/', // Temporary directory for instrumented files
                    htmlReport: 'coverage/html', // HTML coverage report
                    coberturaReport: 'coverage/cobertura', // Cobertura coverage report
                    linesThresholdPct: globalThreshold, // Lines coverage threshold
                },
            },
            all: ['js_tests/tests.html'], // Test files
        },

        // ESLint task for linting
        eslint: {
            target: ['src/**/*.js', 'js_tests/**/*.js'], // Files to lint
        },

        // Watch task for automatic testing
        watch: {
            scripts: {
                files: ['src/**/*.js', 'js_tests/**/*.js'],
                tasks: ['test'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register custom tasks
    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('test', ['lint', 'qunit']);
    grunt.registerTask('default', ['test']);
};

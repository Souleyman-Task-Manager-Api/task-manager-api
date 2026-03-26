export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  swagger: {
    title: process.env.SWAGGER_TITLE || 'Task Manager API',
    description: process.env.SWAGGER_DESCRIPTION || 'API de gestion des tâches',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
});
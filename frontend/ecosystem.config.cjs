// PM2 Ecosystem — LojalyxIT Frontend (Next.js 15)
// Usage :
//   pm2 start ecosystem.config.cjs
//   pm2 save
//   pm2 startup   (pour démarrage automatique)

module.exports = {
  apps: [
    {
      name: 'lojalyxit-frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/opt/lojalyxit/frontend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://lojalyxit.com',
      },
      error_file: '/var/log/lojalyxit/pm2-frontend-error.log',
      out_file: '/var/log/lojalyxit/pm2-frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}

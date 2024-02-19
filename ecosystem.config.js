module.exports = {
  apps: [
    {
      name: "paket-murahxl.ztoko.my.id", // Ganti dengan nama aplikasi Anda
      script: "npm", // Gunakan 'yarn' jika Anda menggunakan Yarn
      args: "start",
      cwd: "/var/www/html/nextjs-paket-murah-xl", // Ganti dengan path menuju direktori aplikasi Next.js Anda
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3003, // Ganti dengan port yang Anda inginkan
      },
    },
  ],
};

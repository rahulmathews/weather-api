const app = require('./server');

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejection and uncaught Exceptions.
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
})
.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception Thrown');

  //Close server as we need to prioritize fixing run time bugs
  process.exit(1);
});

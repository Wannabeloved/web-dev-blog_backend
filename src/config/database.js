import mongoose from "mongoose";

export const connectDB = async mongoUrl => {
  try {
    const conn = await mongoose.connect(mongoUrl, {
      // Эти опции больше не нужны в новых версиях mongoose,
      // но оставим их для совместимости
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB подключена: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
};

import { connect, Types } from "mongoose";

const connectDB = () => {
    const URI = "mongodb+srv://ignlira:f3TlUR05dy7QvZ4E@ecommerceignacio.dxsm1t4.mongodb.net/?retryWrites=true&w=majority&appName=ecommerceIgnacio";

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "store",
    };

    connect(URI, options)
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.error("Error al conectar con MongoDB", err));

};

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default {
    connectDB,
    isValidID,
};


const AddressClient = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold">Direcciones</h3>
      <div className="border p-4">
        <p><strong>Casa:</strong> Totoralillo 825, Quilicura</p>
        <button className="text-blue-500 mr-4">Editar</button>
        <button className="text-red-500">Eliminar</button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4">Agregar dirección</button>
    </div>
  );
};

export default AddressClient;

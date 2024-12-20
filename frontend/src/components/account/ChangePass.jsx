

const ChangePass = () => {
  return (
   <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-2xl font-bold">Contraseña</h3>
         </div>
         <form>
           <div className="mb-4">
             <label className="block text-gray-700">Contraseña Actual</label>
             <input
               type="password"
               className="w-full px-3 py-2 border rounded shadow-sm"
               defaultValue=""
             />
           </div>
           <div className="mb-4">
             <label className="block text-gray-700">Nueva Contraseña</label>
             <input
               type="password"
               className="w-full px-3 py-2 border rounded shadow-sm"
               defaultValue=""
             />
           </div>
           <div className="mb-4">
             <label className="block text-gray-700">Nueva Contraseña</label>
             <input
               type="password"
               className="w-full px-3 py-2 border rounded shadow-sm"
               defaultValue=""
             />
           </div>
           <button type="submit" className="w-full">
             Guardar
           </button>
         </form>
       </div>
  );
};

export default ChangePass;

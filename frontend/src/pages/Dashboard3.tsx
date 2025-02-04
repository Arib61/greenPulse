// import React, { useEffect, useState } from "react";
// import { DashboardLayout } from "../layouts/DashboardLayout";
// import { Sun, Plus, MapPin } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import Map from "../components/Map";

// export function Dashboard() {
//   const { isAuthenticated, userId, token } = useAuth();
//   const [showSoleForm, setShowSoleForm] = useState(false);
//   const [superficie, setSuperficie] = useState("");
//   const [localisation, setLocalisation] = useState("");
//   const [message, setMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showMap, setShowMap] = useState(false);
//   const [soleInfo, setSoleInfo] = useState<any>(null);

//   useEffect(() => {
//     console.log("Token:", token);
//     console.log("UserId:", userId);
//   }, [token, userId]);

//   if (!isAuthenticated || !userId || !token) {
//     return (
//       <DashboardLayout>
//         <div className="text-center text-red-500 text-lg font-bold mt-10">
//           ❌ Vous devez être connecté pour voir cette page.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const handleCreateSole = async () => {
//     if (!superficie || !localisation) {
//       setMessage("❌ Veuillez remplir tous les champs.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage(null);

//       const response = await fetch("http://localhost:8080/api/soles", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           superficie: parseFloat(superficie),
//           localisation,
//           agriculteurId: userId,
//         }),
//       });

//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message || "Erreur lors de la création de la sole.");
//       }

//       setSoleInfo(responseData);
//       setMessage("✅ Sole créée avec succès !");
//       setSuperficie("");
//       setLocalisation("");
//       setShowSoleForm(false);
//     } catch (err) {
//       setMessage("❌ Impossible de créer la sole.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <div className="text-4xl font-bold">25°C</div>
//               <div className="text-gray-600">Sunny</div>
//             </div>
//             <Sun className="w-16 h-16 text-yellow-400" />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Gestion des Soles</h2>
//           <button
//             className="w-full bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
//             onClick={() => setShowSoleForm(!showSoleForm)}
//           >
//             <Plus className="w-5 h-5" />
//             Ajouter une Sole
//           </button>

//           {showSoleForm && (
//             <div className="mt-4 space-y-3">
//               <input
//                 type="number"
//                 placeholder="Superficie (m²)"
//                 value={superficie}
//                 onChange={(e) => setSuperficie(e.target.value)}
//                 className="block w-full rounded-md border-gray-300 shadow-sm p-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Localisation"
//                 value={localisation}
//                 onChange={(e) => setLocalisation(e.target.value)}
//                 className="block w-full rounded-md border-gray-300 shadow-sm p-2"
//               />
//               <button
//                 className="w-full bg-indigo-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
//                 onClick={() => setShowMap(true)}
//               >
//                 <MapPin className="w-5 h-5" />
//                 📍 Auto-localiser sur la carte
//               </button>

//               {showMap && (
//                 <Map onSelectLocation={(name) => setLocalisation(name)} />
//               )}

//               <button onClick={handleCreateSole} className="w-full bg-green-600 text-white p-3 rounded-lg" disabled={loading}>
//               {loading ? "Création en cours..." : "Valider la Sole"}
//               </button>
//               {message && (
//                 <p
//                   className={`text-sm ${
//                     message.startsWith("✅") ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* ✅ Affichage des informations de la sole créée */}
//           {soleInfo && (
//             <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
//               <h3 className="text-lg font-semibold mb-2">🌱 Sole Créée :</h3>
//               <p><strong>ID :</strong> {soleInfo.id}</p>
//               <p><strong>Superficie :</strong> {soleInfo.superficie} m²</p>
//               <p><strong>Localisation :</strong> {soleInfo.localisation}</p>
//               <p><strong>Latitude :</strong> {soleInfo.latitude}</p>
//               <p><strong>Longitude :</strong> {soleInfo.longitude}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
